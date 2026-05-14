import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket, Zap, GraduationCap, Wrench, Dumbbell,
  Laptop, Handshake, Mic, Target, Sparkles, Users, Globe, ArrowRight
} from "lucide-react";
import { useDarkMode } from "../DarkModeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ─── DATA ─── */
const mainPrograms = [
  {
    Icon: Rocket,
    tag: "3–6 Months",
    title: "Incubation Program",
    description: "Transform your idea into a viable business with structured support, mentorship, and resources.",
    features: [
      "Idea validation and market research support",
      "Business model development workshops",
      "1-on-1 mentorship from experienced entrepreneurs",
      "Access to co-working spaces and resources",
      "Pitch training and investor connections",
      "Legal and technical advisory services",
    ],
  },
  {
    Icon: Zap,
    tag: "3–4 Months",
    title: "Acceleration Program",
    description: "Scale your existing startup rapidly with intensive support, funding opportunities, and expert guidance.",
    features: [
      "Growth strategy development and execution",
      "Access to funding and investment networks",
      "Marketing and sales optimization workshops",
      "Technical infrastructure scaling support",
      "Partnership and collaboration opportunities",
      "Demo day with investors and stakeholders",
    ],
  },
];

const eventTypes = [
  { Icon: GraduationCap, title: "Masterclasses", description: "Deep-dive sessions with successful entrepreneurs sharing years of experience building and scaling businesses." },
  { Icon: Wrench,        title: "Workshops",     description: "Hands-on, practical sessions focused on specific skills like pitch development, financial modeling, and product design." },
  { Icon: Dumbbell,      title: "Bootcamps",     description: "Intensive multi-day programs covering fundraising, market entry strategies, and more." },
  { Icon: Laptop,        title: "Hackathons",    description: "Collaborative events where teams build innovative solutions to real-world challenges in limited time." },
  { Icon: Handshake,     title: "Meetups",       description: "Casual networking events connecting founders, mentors, investors, and ecosystem players." },
  { Icon: Mic,           title: "Panels",        description: "Expert panels discussing current trends, challenges, and opportunities in entrepreneurship." },
];

const forgeVenturesList = [
  { name: "Blavia",       category: "Startup",          logo: "/assets/BLAVIA.jpeg",      description: "Specializing in SME digitization." },
  { name: "Campus Mart",  category: "Marketplace",      logo: "/assets/CAMPUSMART.jpeg",  description: "A specialized marketplace built for the university ecosystem." },
  { name: "GloTech",      category: "Dev House",        logo: "/assets/GLOTECH.jpeg",     description: "A technical development house and digital infrastructure provider." },
  { name: "Synchro",      category: "Fintech",          logo: "/assets/SYNCHRO.jpeg",     description: "Revolutionizing the Fintech landscape." },
  { name: "Donjo Video",  category: "Hiring Platform",  logo: "/assets/DONJO_VIDEO.jpeg", description: "Connecting top-tier video editing talent with global brands and creators." },
];

/* ─── FORGE NETWORK ─── */
function ForgeNetwork({ darkMode }) {
  const [selected, setSelected] = useState(null);
  const doubled = [...forgeVenturesList, ...forgeVenturesList];
  const bg     = darkMode ? "#000" : "#FFFEF9";
  const card   = darkMode ? "#0f0f0f" : "#fff";
  const border = darkMode ? "rgba(255,255,255,0.07)" : "rgba(10,10,20,0.08)";

  return (
    <section style={{ background: bg, padding: "80px 0 96px", overflow: "hidden" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px 48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <div style={{ height: "1px", width: "28px", background: "#306CEC" }} />
          <span style={{ fontSize: "10px", fontWeight: 800, color: "#306CEC", letterSpacing: "0.28em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>Our Network</span>
        </div>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, fontFamily: "'League Spartan', sans-serif", letterSpacing: "-0.02em", textTransform: "uppercase", color: darkMode ? "#fff" : "#0a0a14" }}>
          Forge <span style={{ color: "#306CEC" }}>Ventures.</span>
        </h2>
      </div>

      {/* Scrolling logos */}
      <div style={{ overflow: "hidden" }}>
        <motion.div
          style={{ display: "flex", gap: "16px" }}
          animate={selected ? { x: 0 } : { x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 22, repeat: Infinity }}
        >
          {doubled.map((v, i) => (
            <div
              key={i}
              onMouseEnter={() => setSelected(v)}
              onMouseLeave={() => setSelected(null)}
              style={{
                width: "160px", height: "160px", flexShrink: 0,
                background: card, border: `1px solid ${selected?.name === v.name ? "#306CEC" : border}`,
                borderRadius: "16px", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", padding: "16px",
                cursor: "pointer", transition: "border-color 0.2s",
              }}
            >
              <img src={v.logo} alt={v.name} style={{ height: "64px", width: "64px", objectFit: "contain", marginBottom: "8px" }} onError={e => { e.target.style.opacity = "0"; }} />
              <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: darkMode ? "#fff" : "#0a0a14", fontFamily: "'League Spartan', sans-serif", textAlign: "center" }}>{v.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Detail box */}
      <div style={{ maxWidth: "1280px", margin: "24px auto 0", padding: "0 48px", minHeight: "80px" }}>
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
              style={{ background: card, border: `1px solid ${border}`, borderRadius: "16px", padding: "20px 24px", display: "flex", gap: "16px", alignItems: "center" }}
            >
              <div style={{ width: "48px", height: "48px", background: "#fff", borderRadius: "10px", padding: "6px", flexShrink: 0 }}>
                <img src={selected.logo} alt={selected.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 800, fontSize: "14px", color: darkMode ? "#fff" : "#0a0a14", fontFamily: "'League Spartan', sans-serif" }}>{selected.name}</span>
                  <span style={{ fontSize: "9px", fontWeight: 700, color: "#306CEC", background: "rgba(48,108,236,0.1)", padding: "2px 8px", borderRadius: "100px", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>{selected.category}</span>
                </div>
                <p style={{ fontSize: "13px", color: darkMode ? "rgba(255,255,255,0.5)" : "rgba(10,10,20,0.5)", fontFamily: "'DM Sans', sans-serif" }}>{selected.description}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── MAIN PAGE ─── */
export default function ProgramsPage() {
  const { darkMode } = useDarkMode();

  const bg     = darkMode ? "#000"                    : "#FFFEF9";
  const altBg  = darkMode ? "#0a0a14"                 : "#F5F6F8";
  const fg     = darkMode ? "#fff"                    : "#0a0a14";
  const muted  = darkMode ? "rgba(255,255,255,0.5)"   : "rgba(10,10,20,0.5)";
  const border = darkMode ? "rgba(255,255,255,0.07)"  : "rgba(10,10,20,0.08)";
  const card   = darkMode ? "#0f0f0f"                 : "#fff";

  return (
    <div style={{ backgroundColor: bg, color: fg }} className="font-sans min-h-screen transition-colors duration-700">
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ padding: "130px 0 64px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "radial-gradient(ellipse at 80% 30%, rgba(48,108,236,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ color: "#306CEC", fontSize: "11px", fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: "20px", fontFamily: "'DM Sans', sans-serif" }}>
            What We Offer
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.04em", fontFamily: "'League Spartan', sans-serif", textTransform: "uppercase", marginBottom: "36px" }}>
            Our<br /><span style={{ color: "#306CEC" }}>Programs.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.22 }}
            style={{ fontSize: "17px", lineHeight: 1.75, maxWidth: "520px", color: muted, fontFamily: "'DM Sans', sans-serif" }}>
            Comprehensive support at every stage of your entrepreneurial journey, from idea to scale.
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
        <div style={{ height: "1px", background: border }} />
      </div>

      {/* ── MAIN PROGRAMS ── */}
      <section style={{ padding: "80px 0", background: bg }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {mainPrograms.map((program, i) => {
              const { Icon, tag, title, description, features } = program;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
                  style={{ background: card, border: `1px solid ${border}`, borderRadius: "20px", padding: "40px", position: "relative", overflow: "hidden" }}
                >
                  {/* Subtle blue glow corner */}
                  <div style={{ position: "absolute", top: 0, right: 0, width: "180px", height: "180px", background: "radial-gradient(circle at top right, rgba(48,108,236,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(48,108,236,0.1)", border: "1px solid rgba(48,108,236,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={22} color="#306CEC" strokeWidth={1.8} />
                    </div>
                    <span style={{ fontSize: "10px", fontWeight: 800, color: "#306CEC", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", background: "rgba(48,108,236,0.08)", padding: "4px 12px", borderRadius: "100px" }}>{tag}</span>
                  </div>

                  <h3 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 900, fontFamily: "'League Spartan', sans-serif", letterSpacing: "-0.02em", textTransform: "uppercase", marginBottom: "12px", color: fg }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: 1.75, color: muted, fontFamily: "'DM Sans', sans-serif", marginBottom: "28px" }}>
                    {description}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {features.map((f, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#306CEC", flexShrink: 0, marginTop: "7px" }} />
                        <p style={{ fontSize: "13px", color: muted, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>{f}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FORGE ── */}
      <section style={{ background: altBg, padding: "80px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }} className="lg:grid-cols-2 grid-cols-1">

          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ borderRadius: "20px", overflow: "hidden", position: "relative", height: "480px" }} className="group">
            <img src="/events/forge.png" alt="FORGE Weekly Session" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }} className="group-hover:scale-105" />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(48,108,236,0.6) 0%, transparent 55%)" }} />
            <div style={{ position: "absolute", bottom: "24px", left: "24px" }}>
              <span style={{ background: "#306CEC", color: "#fff", fontSize: "9px", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", padding: "6px 14px", borderRadius: "100px", fontFamily: "'DM Sans', sans-serif" }}>Weekly Session</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{ height: "1px", width: "28px", background: "#306CEC" }} />
              <span style={{ fontSize: "10px", fontWeight: 800, color: "#306CEC", letterSpacing: "0.28em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>Build Program</span>
            </div>
            <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900, fontFamily: "'League Spartan', sans-serif", letterSpacing: "-0.03em", lineHeight: 0.9, textTransform: "uppercase", marginBottom: "24px", color: fg }}>
              Forge.<span style={{ color: "#306CEC" }}>_</span>
            </h2>
            <p style={{ fontSize: "16px", lineHeight: 1.75, color: muted, fontFamily: "'DM Sans', sans-serif", marginBottom: "36px", maxWidth: "420px" }}>
              A weekly build session where we take raw ideas and turn them into real businesses, real systems, and real action.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "36px" }}>
              {[
                { Icon: Rocket,    title: "Live, Practical and Hands-On", desc: "Build in real-time with guidance and feedback" },
                { Icon: Target,    title: "No Theory. No Waiting.",        desc: "Skip the fluff and get straight to execution" },
                { Icon: Sparkles,  title: "Just Execution",                desc: "Turn ideas into tangible progress every week" },
              ].map(({ Icon, title, desc }, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(48,108,236,0.1)", border: "1px solid rgba(48,108,236,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={16} color="#306CEC" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: fg, fontFamily: "'League Spartan', sans-serif", marginBottom: "2px" }}>{title}</p>
                    <p style={{ fontSize: "12px", color: muted, fontFamily: "'DM Sans', sans-serif" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: "18px 24px", borderRadius: "14px", background: "rgba(48,108,236,0.08)", border: "1px solid rgba(48,108,236,0.2)" }}>
              <p style={{ fontSize: "14px", fontWeight: 600, color: fg, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>
                If you're ready to stop planning and start building, this is your room.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FORGE NETWORK ── */}
      <ForgeNetwork darkMode={darkMode} />

      {/* ── IMPACT360 OS ── */}
      <section style={{ background: altBg, padding: "80px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>

          {/* Content */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{ height: "1px", width: "28px", background: "#306CEC" }} />
              <span style={{ fontSize: "10px", fontWeight: 800, color: "#306CEC", letterSpacing: "0.28em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>Our Infrastructure</span>
            </div>
            <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900, fontFamily: "'League Spartan', sans-serif", letterSpacing: "-0.03em", lineHeight: 0.9, textTransform: "uppercase", marginBottom: "24px", color: fg }}>
              Impact360 <span style={{ color: "#306CEC" }}>OS.</span>
            </h2>
            <p style={{ fontSize: "15px", lineHeight: 1.75, color: muted, fontFamily: "'DM Sans', sans-serif", marginBottom: "36px", maxWidth: "420px" }}>
              The operating system for African builders. A comprehensive ecosystem with tools, networks, and resources to build world-class solutions.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "36px" }}>
              {[
                { Icon: Laptop, title: "Complete Tech Stack",  desc: "Access to cutting-edge tools and technologies" },
                { Icon: Users,  title: "Global Network",       desc: "Connect with builders and investors across Africa" },
                { Icon: Globe,  title: "Scale Globally",       desc: "Build in Africa, scale to the world" },
              ].map(({ Icon, title, desc }, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(48,108,236,0.1)", border: "1px solid rgba(48,108,236,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={16} color="#306CEC" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: fg, fontFamily: "'League Spartan', sans-serif", marginBottom: "2px" }}>{title}</p>
                    <p style={{ fontSize: "12px", color: muted, fontFamily: "'DM Sans', sans-serif" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <motion.a
              href="https://impact360-os.vercel.app/" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#306CEC", color: "#fff", padding: "14px 28px", borderRadius: "100px", fontFamily: "'League Spartan', sans-serif", fontWeight: 800, fontSize: "13px", textDecoration: "none" }}
            >
              Explore Impact360 OS <ArrowRight size={14} />
            </motion.a>
          </motion.div>

          {/* Image */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ borderRadius: "20px", overflow: "hidden", position: "relative", height: "480px" }} className="group">
            <img src="https://i.pinimg.com/736x/f5/e8/72/f5e87230f73c9811d9f9a69feb392b5a.jpg" alt="Impact360 OS"
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }} className="group-hover:scale-105" />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(48,108,236,0.5) 0%, transparent 55%)" }} />
          </motion.div>
        </div>
      </section>

      {/* ── LEARNING EVENTS ── */}
      <section style={{ background: bg, padding: "80px 0 96px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "52px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{ height: "1px", width: "28px", background: "#306CEC" }} />
              <span style={{ fontSize: "10px", fontWeight: 800, color: "#306CEC", letterSpacing: "0.28em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>Learning</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", fontWeight: 900, fontFamily: "'League Spartan', sans-serif", letterSpacing: "-0.02em", textTransform: "uppercase", color: fg }}>
              How We <span style={{ color: "#306CEC" }}>Teach.</span>
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            {eventTypes.map(({ Icon, title, description }, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                style={{ background: card, border: `1px solid ${border}`, borderRadius: "16px", padding: "28px", transition: "border-color 0.2s" }}
                className="hover:border-[#306CEC]/40"
              >
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(48,108,236,0.08)", border: "1px solid rgba(48,108,236,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                  <Icon size={18} color="#306CEC" strokeWidth={1.8} />
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 800, fontFamily: "'League Spartan', sans-serif", color: fg, marginBottom: "8px" }}>{title}</h3>
                <p style={{ fontSize: "13px", color: muted, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.65 }}>{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
