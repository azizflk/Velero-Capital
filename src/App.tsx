import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import OTC from "@/pages/OTC";
import Strategic from "@/pages/Strategic";
import Tech from "@/pages/Tech";
import Capital from "@/pages/Capital";
import Portfolio from "@/pages/Portfolio";
import Transformations from "@/pages/Transformations";
import Stories from "@/pages/Stories";
import About from "@/pages/About";
import Team from "@/pages/Team";
import Contact from "@/pages/Contact";
import Verification from "@/pages/Verification";
import NotFound from "@/pages/NotFound";

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
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/capital" element={<Capital />} />
          <Route path="/famiglia" element={<About />} />
          <Route path="/transformations" element={<Transformations />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/web3-services" element={<Navigate to="/capital/" replace />} />
          <Route path="/otc-investment" element={<OTC />} />
          <Route path="/strategic-investments" element={<Strategic />} />
          <Route path="/tech-investments-part" element={<Tech />} />
          <Route path="/tech" element={<Navigate to="/tech-investments-part/" replace />} />
          <Route path="/tech-startups-investments-part" element={<Navigate to="/tech-investments-part/" replace />} />
          <Route path="/web3-and-crypto-marketing" element={<Navigate to="/transformations/#marketing" replace />} />
          <Route path="/advisory" element={<Navigate to="/transformations/#advisory" replace />} />
          <Route path="/about-us" element={<Navigate to="/famiglia/" replace />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
