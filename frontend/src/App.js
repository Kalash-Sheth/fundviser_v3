import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TheFirm from "./pages/TheFirm";
import WhatWeDo from "./pages/WhatWeDo";
import BoardOfDirectors from "./pages/BoardOfDirectors";
import InvestorInfo from "./pages/InvestorInfo";
import Compliance from "./pages/Compliance";
import OurSubsidiaries from "./pages/OurSubsidiaries";

const ContactPage = () => (
  <div className="min-h-screen bg-white">
    <Navbar />
    <div className="pt-20">
      <ContactSection />
    </div>
    <Footer />
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/the-firm" element={<TheFirm />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/investment-sectors" element={<Navigate to="/what-we-do#sectors" replace />} />
          <Route path="/board-of-directors" element={<BoardOfDirectors />} />
          <Route path="/investor-info" element={<InvestorInfo />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/our-subsidiaries" element={<OurSubsidiaries />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
