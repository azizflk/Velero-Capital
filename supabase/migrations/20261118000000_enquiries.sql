-- General enquiries from the contact page (owner, 18 Nov 2026).
--
-- Anyone may send one without signing in, so the table accepts inserts from visitors and nothing else:
-- they cannot read, change or delete anything. Admins (public.admins, confirmed email) read them in the panel,
-- move them through new → answered → closed, and delete them.

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(btrim(name)) between 1 and 200),
  email text not null check (length(email) between 3 and 320 and email like '%_@_%._%'),
  organisation text check (organisation is null or length(organisation) <= 200),
  topic text not null check (topic in ('General question', 'Partnership or introduction', 'Press or media', 'Other')),
  message text not null check (length(btrim(message)) between 1 and 5000),
  status text not null default 'new' check (status in ('new', 'answered', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index enquiries_status_idx on public.enquiries (status, created_at desc);
create index enquiries_email_idx on public.enquiries (lower(email), created_at desc);

-- What a visitor can set is only the message itself; status and dates are the database's.
-- A light brake on floods: at most five enquiries from one address in an hour, and two hundred a day overall.
create or replace function private.enquiries_guard() returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    new.email := lower(btrim(new.email));
    new.name := btrim(new.name);
    new.organisation := nullif(btrim(coalesce(new.organisation, '')), '');
    new.status := 'new';
    new.created_at := now();
    if (select count(*) from public.enquiries e where e.email = new.email and e.created_at > now() - interval '1 hour') >= 5 then
      raise exception 'Too many enquiries from this address. Please try again later or email us.';
    end if;
    if (select count(*) from public.enquiries e where e.created_at > now() - interval '1 day') >= 200 then
      raise exception 'We are receiving too many enquiries. Please email us instead.';
    end if;
  else
    -- Admins change the status only; the enquiry itself stays as it was sent.
    new.id := old.id; new.name := old.name; new.email := old.email; new.organisation := old.organisation;
    new.topic := old.topic; new.message := old.message; new.created_at := old.created_at;
  end if;
  new.updated_at := now();
  return new;
end
$$;
create trigger enquiries_guard before insert or update on public.enquiries
  for each row execute function private.enquiries_guard();

alter table public.enquiries enable row level security;
revoke all on public.enquiries from anon, authenticated;
grant insert (name, email, organisation, topic, message) on public.enquiries to anon, authenticated;
grant select, delete on public.enquiries to authenticated;
grant update (status) on public.enquiries to authenticated;

create policy "Anyone can send an enquiry" on public.enquiries
  for insert to anon, authenticated with check (true);
create policy "Admins read enquiries" on public.enquiries
  for select to authenticated using ((select private.is_admin()));
create policy "Admins update enquiry status" on public.enquiries
  for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins delete enquiries" on public.enquiries
  for delete to authenticated using ((select private.is_admin()));
