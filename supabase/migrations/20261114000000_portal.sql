-- Velero Capital portal: accounts, applications and the admin panel.
--
-- Who can do what is decided here, in the database, not in the browser:
--   * a signed-in person sees and edits only their own applications, and only while they are drafts;
--   * an admin (an address in public.admins, with a confirmed email) sees submitted applications,
--     never drafts, and can change their status and keep internal notes;
--   * nobody reaches anything without signing in.

create schema if not exists private;
grant usage on schema private to authenticated;

-- ---------------------------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamptz not null default now()
);

-- The admin list. Addresses are stored in lower case.
create table public.admins (
  email text primary key check (email = lower(email) and email like '%_@_%'),
  added_by text,
  added_at timestamptz not null default now()
);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  email text not null default '',
  role text not null check (role in ('investor', 'founder', 'sponsor')),
  goal text check (goal in ('raise', 'services')),
  -- The answers, keyed by the same field names the public enquiry form sends.
  fields jsonb not null default '{}'::jsonb check (jsonb_typeof(fields) = 'object' and pg_column_size(fields) < 32768),
  status text not null default 'draft' check (status in ('draft', 'submitted', 'in_review', 'call_scheduled', 'closed')),
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- A founder's application says whether it is a raise or advisory before it can be submitted.
  constraint founder_has_goal check (status = 'draft' or role <> 'founder' or goal is not null),
  constraint goal_only_for_founders check (role = 'founder' or goal is null)
);
create index applications_user_idx on public.applications (user_id);
create index applications_status_idx on public.applications (status, submitted_at desc);

-- Internal notes on an application. Applicants never see these.
create table public.application_notes (
  id bigint generated always as identity primary key,
  application_id uuid not null references public.applications (id) on delete cascade,
  author text not null default '',
  body text not null check (length(btrim(body)) between 1 and 4000),
  created_at timestamptz not null default now()
);
create index application_notes_application_idx on public.application_notes (application_id, created_at);

-- ---------------------------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------------------------

-- The caller's confirmed email address, read from the account itself rather than from the token.
create or replace function private.my_email() returns text
language sql stable security definer set search_path = ''
as $$
  select lower(u.email) from auth.users u where u.id = auth.uid() and u.email_confirmed_at is not null
$$;

create or replace function private.is_admin() returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (select 1 from public.admins a where a.email = private.my_email())
$$;

revoke all on function private.my_email() from public;
revoke all on function private.is_admin() from public;
grant execute on function private.my_email() to authenticated;
grant execute on function private.is_admin() to authenticated;

-- A profile row for every new account.
create or replace function private.on_new_user() returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, lower(coalesce(new.email, '')), nullif(btrim(coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', '')), ''))
  on conflict (id) do nothing;
  return new;
end
$$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function private.on_new_user();

-- Applications: what a row may become, whoever is asking.
create or replace function private.applications_guard() returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    if auth.uid() is not null then
      new.user_id := auth.uid();
      if (select count(*) from public.applications a where a.user_id = new.user_id) >= 10 then
        raise exception 'You have reached the limit of ten applications. Please email us instead.';
      end if;
    end if;
    new.status := 'draft';
    new.submitted_at := null;
    new.created_at := now();
    select lower(u.email) into new.email from auth.users u where u.id = new.user_id;
    new.email := coalesce(new.email, '');
  else
    new.id := old.id;
    new.user_id := old.user_id;
    new.email := old.email;
    new.created_at := old.created_at;
    new.submitted_at := old.submitted_at;
    if old.status = 'draft' then
      -- Only the applicant reaches a draft. It stays a draft or is submitted, nothing else.
      if new.status not in ('draft', 'submitted') then
        raise exception 'A draft can only be saved or submitted.';
      end if;
      if new.status = 'submitted' then
        new.submitted_at := now();
      end if;
    else
      -- Once submitted, the answers are fixed; only the status moves, and never back to draft.
      new.role := old.role;
      new.goal := old.goal;
      new.fields := old.fields;
      if new.status = 'draft' then
        raise exception 'A submitted application cannot go back to draft.';
      end if;
    end if;
  end if;
  new.updated_at := now();
  return new;
end
$$;
create trigger applications_guard before insert or update on public.applications
  for each row execute function private.applications_guard();

create or replace function private.notes_guard() returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  new.author := coalesce(private.my_email(), new.author, '');
  new.created_at := now();
  return new;
end
$$;
create trigger application_notes_guard before insert on public.application_notes
  for each row execute function private.notes_guard();

create or replace function private.admins_guard() returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  new.email := lower(btrim(new.email));
  new.added_by := coalesce(private.my_email(), new.added_by);
  new.added_at := now();
  return new;
end
$$;
create trigger admins_guard before insert on public.admins
  for each row execute function private.admins_guard();

-- ---------------------------------------------------------------------------------------------
-- Access
-- ---------------------------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.admins enable row level security;
alter table public.applications enable row level security;
alter table public.application_notes enable row level security;

revoke all on public.profiles, public.admins, public.applications, public.application_notes from anon, authenticated;
grant select on public.profiles to authenticated;
grant select, insert, delete on public.admins to authenticated;
grant select, insert, delete on public.applications to authenticated;
grant update (role, goal, fields, status) on public.applications to authenticated;
grant select, insert, delete on public.application_notes to authenticated;
grant usage on sequence public.application_notes_id_seq to authenticated;

create policy "Own profile, or any profile for an admin" on public.profiles
  for select to authenticated
  using (id = (select auth.uid()) or (select private.is_admin()));

create policy "Admins read the admin list" on public.admins
  for select to authenticated using ((select private.is_admin()));
create policy "Admins add admins" on public.admins
  for insert to authenticated with check ((select private.is_admin()));
-- An admin cannot remove their own address, so the list can never be emptied from the panel.
create policy "Admins remove other admins" on public.admins
  for delete to authenticated using ((select private.is_admin()) and email <> (select private.my_email()));

create policy "Applicants read their own applications" on public.applications
  for select to authenticated using (user_id = (select auth.uid()));
create policy "Admins read submitted applications" on public.applications
  for select to authenticated using (status <> 'draft' and (select private.is_admin()));
create policy "Applicants start a draft" on public.applications
  for insert to authenticated with check (user_id = (select auth.uid()) and status = 'draft');
create policy "Applicants edit or submit their draft" on public.applications
  for update to authenticated
  using (user_id = (select auth.uid()) and status = 'draft')
  with check (user_id = (select auth.uid()) and status in ('draft', 'submitted'));
create policy "Admins move submitted applications on" on public.applications
  for update to authenticated
  using (status <> 'draft' and (select private.is_admin()))
  with check (status <> 'draft' and (select private.is_admin()));
create policy "Applicants delete their draft" on public.applications
  for delete to authenticated using (user_id = (select auth.uid()) and status = 'draft');

create policy "Admins read notes" on public.application_notes
  for select to authenticated using ((select private.is_admin()));
create policy "Admins write notes" on public.application_notes
  for insert to authenticated with check ((select private.is_admin()));
create policy "Admins delete notes" on public.application_notes
  for delete to authenticated using ((select private.is_admin()));
