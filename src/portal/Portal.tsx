import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { isAdminHost } from "@/lib/portal";
import { usePageTitle, useSession } from "./client";
import Account from "./Account";
import Admin from "./Admin";
import ApplicationPage from "./ApplicationPage";
import AuthCard, { AuthPage } from "./AuthCard";
import Shell from "./Shell";

const blank = <div className="min-h-screen bg-paper" />;

function Login() {
  usePageTitle("Log in");
  return (
    <AuthPage>
      <AuthCard heading="Log in or sign up" lead="Start a Velero Capital application, or pick up where you left off." next="/account/" />
    </AuthPage>
  );
}

/**
 * Everything behind a sign-in: the login page, the account area, and on its own address the admin panel.
 * It is a separate bundle, so the public pages never download the database client.
 */
export default function Portal() {
  const session = useSession();
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0 }); }, [pathname]);
  // Coming back from a sign-in link or from Google leaves an empty "#" on the address; tidy it away.
  useEffect(() => { if (session !== undefined && location.href.endsWith("#")) history.replaceState(history.state, "", location.pathname + location.search); }, [session]);
  if (session === undefined) return blank;

  // The admin address shows the panel and nothing else; the public address never shows the panel.
  if (isAdminHost()) {
    return (
      <Routes>
        <Route path="/admin/*" element={<Admin session={session} />} />
        <Route path="*" element={<Navigate to="/admin/" replace />} />
      </Routes>
    );
  }
  const email = session?.user.email ?? "";
  const inside = (page: React.ReactNode) => (session ? <Shell email={email} home="/">{page}</Shell> : <Navigate to="/login/" replace />);
  return (
    <Routes>
      <Route path="/login" element={session ? <Navigate to="/account/" replace /> : <Login />} />
      <Route path="/account" element={inside(session && <Account session={session} />)} />
      <Route path="/account/application/:id" element={inside(session && <ApplicationPage session={session} />)} />
      <Route path="/account/*" element={<Navigate to="/account/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
