import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Capital from "@/pages/Capital";
import Investment from "@/pages/Investment";
import { investments } from "@/data/investments";
import Portfolio from "@/pages/Portfolio";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import { services } from "@/data/services";
import Solutions from "@/pages/Solutions";
import SolutionDetail from "@/pages/SolutionDetail";
import { sectors } from "@/data/solutions";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Verification from "@/pages/Verification";
import NotFound from "@/pages/NotFound";
import Privacy from "@/pages/Privacy";
import CookieBanner from "@/components/CookieBanner";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" }), 50);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Nav />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solutions" element={<Solutions />} />
          {sectors.map((sc) => <Route key={sc.slug} path={sc.path.replace(/\/$/, "")} element={<SolutionDetail key={sc.slug} sector={sc} />} />)}
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/capital" element={<Capital />} />
          {investments.map((i) => <Route key={i.slug} path={i.path.replace(/\/$/, "")} element={<Investment key={i.slug} item={i} />} />)}
          <Route path="/otc-investment" element={<Navigate to="/secondaries/" replace />} />
          <Route path="/strategic-investments" element={<Navigate to="/late-stage/" replace />} />
          <Route path="/tech-investments-part" element={<Navigate to="/late-stage/" replace />} />
          <Route path="/tech-startups-investments-part" element={<Navigate to="/late-stage/" replace />} />
          <Route path="/tech" element={<Navigate to="/late-stage/" replace />} />
          <Route path="/company" element={<About />} />
          <Route path="/famiglia" element={<Navigate to="/company/" replace />} />
          <Route path="/services" element={<Services />} />
          {services.map((sv) => <Route key={sv.slug} path={sv.path.replace(/\/$/, "")} element={<ServiceDetail key={sv.slug} service={sv} />} />)}
          <Route path="/transformations" element={<Navigate to="/services/" replace />} />
          {/* News & Content is parked for now. The page lives on in src/pages/Stories.tsx; restore this route and the nav entry to bring it back. */}
          <Route path="/stories" element={<Navigate to="/" replace />} />
          <Route path="/web3-services" element={<Navigate to="/capital/" replace />} />
          <Route path="/web3-and-crypto-marketing" element={<Navigate to="/services/" replace />} />
          <Route path="/advisory" element={<Navigate to="/services/" replace />} />
          <Route path="/about-us" element={<Navigate to="/company/" replace />} />
          <Route path="/team" element={<Navigate to="/company/" replace />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
