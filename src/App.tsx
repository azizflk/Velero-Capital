import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import OTC from "@/pages/OTC";
import Strategic from "@/pages/Strategic";
import Tech from "@/pages/Tech";
import Web3 from "@/pages/Web3";
import About from "@/pages/About";
import Team from "@/pages/Team";
import Contact from "@/pages/Contact";
import Verification from "@/pages/Verification";
import NotFound from "@/pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0 }); }, [pathname]);
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
          <Route path="/web3-services" element={<Web3 />} />
          <Route path="/otc-investment" element={<OTC />} />
          <Route path="/strategic-investments" element={<Strategic />} />
          <Route path="/tech-investments-part" element={<Tech />} />
          <Route path="/tech" element={<Navigate to="/tech-investments-part/" replace />} />
          <Route path="/tech-startups-investments-part" element={<Navigate to="/tech-investments-part/" replace />} />
          <Route path="/web3-and-crypto-marketing" element={<Navigate to="/web3-services/" replace />} />
          <Route path="/advisory" element={<Navigate to="/strategic-investments/" replace />} />
          <Route path="/about-us" element={<About />} />
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
