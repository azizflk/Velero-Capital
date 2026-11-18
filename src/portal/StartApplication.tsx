import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { services } from "@/components/EnquiryForm";
import { supabase, usePageTitle, type Application } from "./client";
import { Loading } from "./Shell";

/**
 * /account/apply/?for=services&service=… — the “Apply” buttons on the service pages land here.
 * It opens the application editor as a founder who wants advisory services, with the service filled in.
 * An unfinished draft of the same kind is reopened rather than starting a second one.
 */
export default function StartApplication() {
  usePageTitle("Starting your application");
  const nav = useNavigate();
  const [params] = useSearchParams();
  const [error, setError] = useState("");
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const asked = params.get("service") ?? "";
    const service = services.includes(asked) ? asked : "";
    void (async () => {
      const { data: drafts } = await supabase.from("applications").select("*").eq("status", "draft").eq("role", "founder").order("updated_at", { ascending: false });
      const reuse = ((drafts ?? []) as Application[]).find((a) => !a.goal || (a.goal === "services" && (!service || !a.fields.service || a.fields.service === service)));
      if (reuse) {
        const fields = service && !reuse.fields.service ? { ...reuse.fields, service } : reuse.fields;
        await supabase.from("applications").update({ goal: "services", fields }).eq("id", reuse.id);
        nav(`/account/application/${reuse.id}/`, { replace: true });
        return;
      }
      const { data, error } = await supabase.from("applications").insert({ role: "founder", goal: "services", fields: service ? { service } : {} }).select().single();
      if (error || !data) { setError(error?.message || "Your application could not be started. Please try again."); return; }
      nav(`/account/application/${(data as Application).id}/`, { replace: true });
    })();
  }, [nav, params]);

  if (!error) return <Loading what="Starting your application" />;
  return (
    <div className="mx-auto max-w-2xl">
      <p className="rounded-md border border-red-700/25 bg-red-50 px-3.5 py-2.5 text-[13px] text-red-800" role="alert">{error}</p>
      <Link to="/account/" className="pill mt-6">Go to your applications</Link>
    </div>
  );
}
