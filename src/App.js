import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import About from "./components/About.jsx"; 
import Programs from "./components/Programs.jsx"; 
import Eventpage from "./components/Eventpage.jsx"; 
import Subscription from "./components/Subscription.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Campaign from "./components/Campaign.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/events" element={<Eventpage />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="*" element={<HomePage />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/campaign" element={<Campaign />} />
      </Routes>
    </Router>
  );
}