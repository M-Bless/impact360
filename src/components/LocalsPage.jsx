import React from "react";
import { motion } from "framer-motion";
import { useDarkMode } from "../DarkModeContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LocalEventsCarousel from "./LocalEventsCarousel";

export default function LocalsPage() {
  const { darkMode } = useDarkMode();
  const [showQR, setShowQR] = React.useState(false);

  const bg  = darkMode ? "#000" : "#FFFEF9";
  const fg  = darkMode ? "#fff" : "#0a0a14";
  const sub = darkMode ? "rgba(255,255,255,0.5)" : "rgba(10,10,20,0.5)";

  return (
    <div style={{ backgroundColor: bg, color: fg }} className="font-sans min-h-screen transition-colors duration-700">
      <Navbar />

      {/* QR Modal */}
      {showQR && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          onClick={() => setShowQR(false)}
        >
          <motion.div
            className={`rounded-3xl p-8 max-w-sm w-full relative shadow-2xl ${darkMode ? "bg-[#111]" : "bg-white"}`}
            initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.4 }}
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setShowQR(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-gray-400 hover:bg-black/10 transition-colors">✕</button>
            <div className="text-center space-y-5">
              <h2 className="text-2xl font-black" style={{ fontFamily: "'League Spartan', sans-serif", color: fg }}>JOIN THE COMMUNITY</h2>
              <p className="text-sm" style={{ color: sub }}>Scan to join our WhatsApp community</p>
              <div className={`p-6 rounded-2xl flex items-center justify-center ${darkMode ? "bg-white/5" : "bg-gray-50"}`}>
                <img src="/frame.png" alt="WhatsApp QR Code" className="w-56 h-56 object-contain" />
              </div>
              <a href="https://chat.whatsapp.com/I0g8kpCNvSn84yWQxybzHa" target="_blank" rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition-all duration-300 text-sm">
                Open WhatsApp →
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ── HERO ── */}
      <section style={{ padding: "130px 0 56px", position: "relative", overflow: "hidden" }}>
        {/* Subtle blue glow top-right */}
        <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "radial-gradient(ellipse at 80% 30%, rgba(48,108,236,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ color: "#306CEC", fontSize: "11px", fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: "20px", fontFamily: "'DM Sans', sans-serif" }}
          >
            Local Events
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: "clamp(4.5rem, 13vw, 10rem)", fontWeight: 900, lineHeight: 0.88, letterSpacing: "-0.04em", fontFamily: "'League Spartan', sans-serif", textTransform: "uppercase", marginBottom: "40px" }}
          >
            <span style={{ WebkitTextStroke: "2.5px #306CEC", color: "transparent" }}>Locals.</span>
          </motion.h1>

          {/* Description + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "32px", flexWrap: "wrap" }}
          >
            <p style={{ fontSize: "16px", lineHeight: 1.75, maxWidth: "500px", color: sub, fontFamily: "'DM Sans', sans-serif" }}>
              Established local founders sharing real-world experience with upcoming businesses. Genuine connections, mentorship, and practical advice to grow together.
            </p>
            <button
              onClick={() => setShowQR(true)}
              style={{ background: "#306CEC", color: "#fff", padding: "14px 32px", borderRadius: "100px", fontFamily: "'League Spartan', sans-serif", fontWeight: 800, fontSize: "14px", border: "none", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}
              className="hover:bg-[#4A80FF] transition-colors duration-200"
            >
              Join the Community →
            </button>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
        <div style={{ height: "1px", background: darkMode ? "rgba(255,255,255,0.07)" : "rgba(10,10,20,0.08)" }} />
      </div>

      {/* ── EVENTS ── */}
      <section style={{ padding: "64px 0 80px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
          <LocalEventsCarousel darkMode={darkMode} />
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          maxWidth: "1280px", margin: "0 auto 80px", padding: "0 48px"
        }}
      >
        <div style={{
          borderRadius: "24px",
          background: darkMode ? "rgba(48,108,236,0.07)" : "#EEF3FF",
          border: `1px solid ${darkMode ? "rgba(48,108,236,0.15)" : "rgba(48,108,236,0.2)"}`,
          padding: "48px 56px",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px"
        }}>
          <div>
            <p style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, fontFamily: "'League Spartan', sans-serif", marginBottom: "6px", color: fg }}>
              Next meetup dropping soon.
            </p>
            <p style={{ fontSize: "14px", color: sub, fontFamily: "'DM Sans', sans-serif" }}>
              Join the community so you don't miss it.
            </p>
          </div>
          <button
            onClick={() => setShowQR(true)}
            style={{ background: "#306CEC", color: "#fff", padding: "14px 36px", borderRadius: "100px", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "15px", border: "none", cursor: "pointer", flexShrink: 0 }}
            className="hover:bg-[#4A80FF] transition-colors duration-200 hover:scale-105"
          >
            I'm in →
          </button>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}
