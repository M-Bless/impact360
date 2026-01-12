import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "./DarkModeContext";
import HomePage from "./components/HomePage.jsx";
import About from "./components/About.jsx"; 
import Programs from "./components/Programs.jsx"; 
import Eventpage from "./components/Eventpage.jsx"; 
import Subscription from "./components/Subscription.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Campaign from "./components/Campaign.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import AdminDashboard from "./components/admin.jsx";
import TicketVerification from "./components/TicketVerification.jsx";


export default function App() {
  return (
    <DarkModeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
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
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/verify" element={<TicketVerification />} />
          </Routes>
        </div>
      </Router>
    </DarkModeProvider>
  );
}