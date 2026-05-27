import React from "react";
import { useDarkMode } from "../DarkModeContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

const videos = [
  { id: 1, title: "Impact360 Nakuru Roadshow", location: "Nakuru, Kenya", date: "Feb 7, 2026", tag: "RECAP", youtubeId: "lGnBbmGK6V8", thumb: "https://i.ytimg.com/vi/lGnBbmGK6V8/hqdefault.jpg" },
  { id: 2, title: "Founders Taking The Stage", location: "Eldoret, Kenya", date: "May 9th, 2026", tag: "PITCHES", youtubeId: "DDM1aMN1YRE", thumb: "https://i.ytimg.com/vi/DDM1aMN1YRE/hqdefault.jpg" },
  { id: 3, title: "Innovation On The Ground", location: "Kisumu, Kenya", date: "July 4th, 2026", tag: "PANEL", youtubeId: "Mbl0osnVSHI", thumb: "https://i.ytimg.com/vi/Mbl0osnVSHI/hqdefault.jpg" },
  { id: 4, title: "Decentralising Opportunity", location: "Nairobi, Kenya", date: "Coming Soon", tag: "KEYNOTE", youtubeId: "sUzzM2vPBLo", thumb: "https://i.ytimg.com/vi/sUzzM2vPBLo/hqdefault.jpg" },
  { id: 5, title: "Coastal Innovation Highlight", location: "Mombasa, Kenya", date: "Coming Soon", tag: "HIGHLIGHT", youtubeId: "ExUopo1-Zh4", thumb: "https://i.ytimg.com/vi/ExUopo1-Zh4/hqdefault.jpg" },
  { id: 6, title: "Ecosystem Builders Unite", location: "Kigali, Rwanda", date: "Coming Soon", tag: "ECOSYSTEM", youtubeId: "M3upIInuQN0", thumb: "https://i.ytimg.com/vi/M3upIInuQN0/hqdefault.jpg" },
  { id: 7, title: "Africa's Next Wave", location: "Kampala, Uganda", date: "Coming Soon", tag: "FEATURE", youtubeId: "ESMyXLzFpoc", thumb: "https://i.ytimg.com/vi/ESMyXLzFpoc/hqdefault.jpg" },
  { id: 8, title: "Short Highlight 1", location: "Various", date: "Shorts", tag: "SHORTS", youtubeId: "zEiKL6Qhdm8", thumb: "https://i.ytimg.com/vi/zEiKL6Qhdm8/hqdefault.jpg" },
  { id: 9, title: "Short Highlight 2", location: "Various", date: "Shorts", tag: "SHORTS", youtubeId: "dPAcsg9q0SM", thumb: "https://i.ytimg.com/vi/dPAcsg9q0SM/hqdefault.jpg" },
  { id: 10, title: "Short Highlight 3", location: "Various", date: "Shorts", tag: "SHORTS", youtubeId: "DeZKAuRT100", thumb: "https://i.ytimg.com/vi/DeZKAuRT100/hqdefault.jpg" },
  { id: 11, title: "Short Highlight 4", location: "Various", date: "Shorts", tag: "SHORTS", youtubeId: "UndyYPDi1EI", thumb: "https://i.ytimg.com/vi/UndyYPDi1EI/hqdefault.jpg" },
  { id: 12, title: "Short Highlight 5", location: "Various", date: "Shorts", tag: "SHORTS", youtubeId: "jSVH6QVFjbY", thumb: "https://i.ytimg.com/vi/jSVH6QVFjbY/hqdefault.jpg" },
  { id: 13, title: "Short Highlight 6", location: "Various", date: "Shorts", tag: "SHORTS", youtubeId: "AEUy2fEbIto", thumb: "https://i.ytimg.com/vi/AEUy2fEbIto/hqdefault.jpg" },
  { id: 14, title: "Short Highlight 7", location: "Various", date: "Shorts", tag: "SHORTS", youtubeId: "EhB5HlhdoUo", thumb: "https://i.ytimg.com/vi/EhB5HlhdoUo/hqdefault.jpg" },
  { id: 15, title: "Short Highlight 8", location: "Various", date: "Shorts", tag: "SHORTS", youtubeId: "HM_mL0OKMBo", thumb: "https://i.ytimg.com/vi/HM_mL0OKMBo/hqdefault.jpg" },
  { id: 16, title: "Short Highlight 9", location: "Various", date: "Shorts", tag: "SHORTS", youtubeId: "IlenBuymfMY", thumb: "https://i.ytimg.com/vi/IlenBuymfMY/hqdefault.jpg" },
  { id: 17, title: "Short Highlight 10", location: "Various", date: "Shorts", tag: "SHORTS", youtubeId: "hk7mql-_Jnw", thumb: "https://i.ytimg.com/vi/hk7mql-_Jnw/hqdefault.jpg" },
  { id: 18, title: "Short Highlight 11", location: "Various", date: "Shorts", tag: "SHORTS", youtubeId: "Wi6_S4Ri5SE", thumb: "https://i.ytimg.com/vi/Wi6_S4Ri5SE/hqdefault.jpg" },
  { id: 19, title: "Short Highlight 12", location: "Various", date: "Shorts", tag: "SHORTS", youtubeId: "TX6uR5PlgaE", thumb: "https://i.ytimg.com/vi/TX6uR5PlgaE/hqdefault.jpg" },
  { id: 20, title: "Short Highlight 13", location: "Various", date: "Shorts", tag: "SHORTS", youtubeId: "zIhmOesMVqE", thumb: "https://i.ytimg.com/vi/zIhmOesMVqE/hqdefault.jpg" },
];

const displayedVideos = videos.slice(0, 5);

function VideoCard({ video, cardRef, darkMode }) {
  const isMobile = window.innerWidth < 768;
  return (
    <div
      ref={cardRef}
      style={{
        position: "absolute",
        width: isMobile ? "min(280px, 80vw)" : "min(380px, 30vw)",
        borderRadius: "20px",
        overflow: "hidden",
        willChange: "transform, opacity, filter",
        background: "#000",
        border: `1px solid ${darkMode ? "rgba(48,108,236,0.25)" : "rgba(48,108,236,0.15)"}`,
        cursor: "pointer",
        opacity: 0,
        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
      }}
      onClick={() => {
        if (parseInt(cardRef.current?.style.zIndex) === 50) {
          window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, "_blank", "noopener,noreferrer");
        }
      }}
    >
      <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", background: "#000" }}>
        <img
          src={video.thumb}
          alt={video.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
          onError={e => { e.target.src = `https://placehold.co/400x400/306CEC/ffffff?text=${encodeURIComponent(video.location)}`; }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(48,108,236,0.92) 0%, rgba(48,108,236,0.25) 45%, transparent 70%)" }} />
        <div className="play-btn" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "52px", height: "52px", borderRadius: "50%", background: "rgba(255,255,255,0.95)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 24px rgba(48,108,236,0.5)", opacity: 0, pointerEvents: "none" }}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M5 3.5l12 6.5-12 6.5V3.5z" fill="#306CEC" /></svg>
        </div>
        <div style={{ position: "absolute", top: "12px", left: "12px", background: "#306CEC", color: "#fff", borderRadius: "6px", padding: "4px 10px", fontSize: "8px", fontWeight: 800, letterSpacing: "0.12em", fontFamily: "'League Spartan', sans-serif" }}>
          {video.tag}
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 14px 14px" }}>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "8px", fontWeight: 700, letterSpacing: "0.1em", margin: "0 0 4px", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
            {video.location}
          </p>
          <p style={{ color: "#fff", fontSize: "12px", fontWeight: 800, lineHeight: 1.25, margin: 0, textTransform: "uppercase", letterSpacing: "0.01em", fontFamily: "'League Spartan', sans-serif" }}>
            {video.title}
          </p>
        </div>
      </div>
    </div>
  );
}

function VideoHighlights({ darkMode }) {
  const containerRef = React.useRef(null);
  const cardRefs     = React.useRef(displayedVideos.map(() => React.createRef()));
  const pipRefs      = React.useRef(displayedVideos.map(() => React.createRef()));
  const tagRef       = React.useRef(null);
  const titleRef     = React.useRef(null);
  const locationRef  = React.useRef(null);
  const counterRef   = React.useRef(null);
  const hintRef      = React.useRef(null);
  const rawRef       = React.useRef(0);
  const smoothRef    = React.useRef(0);
  const rafRef       = React.useRef(null);
  const prevIdxRef   = React.useRef(0);

  React.useEffect(() => {
    const LERP = 0.08;

    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect       = el.getBoundingClientRect();
      const scrollable = el.scrollHeight - window.innerHeight;
      const scrolled   = Math.max(0, -rect.top);
      rawRef.current   = Math.min(1, scrolled / Math.max(1, scrollable)) * displayedVideos.length;
    };

    const applyCard = (el, sp, i) => {
      const cp  = sp - i;
      const cl  = Math.max(0, Math.min(1, cp));
      const qd  = Math.max(0, -cp);
      const gone   = cp >= 1;
      const queued = cp < 0;

      const tx  = gone ? -130 : queued ?  qd * 9 : -cl * 130;
      const ty  = queued ? qd * 6 : 0;
      const sc  = gone ? 0.85 : queued ? Math.max(0.75, 1 - qd * 0.045) : 1 - cl * 0.06;
      const op  = gone ? 0    : queued ? Math.max(0.2,  1 - qd * 0.13)  : 1 - cl * 0.55;
      const rot = gone ? -10  : queued ? Math.min(qd * 1.8, 8)          : cl * -8;
      const br  = queued ? Math.max(0.55, 1 - qd * 0.13) : 1;
      const zi  = gone ? 0    : queued ? Math.max(1, 45 - Math.floor(qd) * 5) : 50;

      el.style.transform  = `translateX(${tx}%) translateY(${ty}px) scale(${sc}) rotate(${rot}deg)`;
      el.style.opacity    = op;
      el.style.filter     = `brightness(${br})`;
      el.style.zIndex     = zi;

      const btn = el.querySelector(".play-btn");
      if (btn) btn.style.opacity = (cp >= 0 && cp < 1) ? String(Math.max(0, 1 - cl * 2)) : "0";
    };

    const tick = () => {
      const sp   = smoothRef.current + (rawRef.current - smoothRef.current) * LERP;
      smoothRef.current = sp;

      cardRefs.current.forEach((ref, i) => {
        if (ref.current) applyCard(ref.current, sp, i);
      });

      const ai = Math.min(Math.floor(sp), displayedVideos.length - 1);

      if (counterRef.current) {
        counterRef.current.textContent = `${String(ai + 1).padStart(2,"0")} / ${String(displayedVideos.length).padStart(2,"0")}`;
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = String(Math.max(0, 1 - sp * 2));
      }
      pipRefs.current.forEach((ref, i) => {
        if (!ref.current) return;
        ref.current.style.width      = i === ai ? "28px" : "10px";
        ref.current.style.background = i === ai ? "#306CEC" : (darkMode ? "rgba(255,255,255,0.12)" : "#ddd");
      });

      if (ai !== prevIdxRef.current) {
        prevIdxRef.current = ai;
        const v = displayedVideos[ai];
        if (tagRef.current)      tagRef.current.textContent      = v.tag;
        if (titleRef.current)    titleRef.current.textContent    = v.title;
        if (locationRef.current) locationRef.current.textContent = `${v.location} · ${v.date}`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [darkMode]);

  const first = displayedVideos[0];
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative", height: isMobile ? `${150 + displayedVideos.length * 120}vh` : `${100 + displayedVideos.length * 90}vh` }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        background: darkMode
          ? "radial-gradient(ellipse at 65% 50%, rgba(48,108,236,0.15) 0%, #000 60%)"
          : "radial-gradient(ellipse at 65% 50%, rgba(48,108,236,0.08) 0%, #FFFEF9 60%)",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
      }}>
        {/* LEFT PANEL */}
        <div style={{
          width: isMobile ? "100%" : "40%",
          display: "flex", flexDirection: "column", justifyContent: isMobile ? "flex-start" : "space-between",
          padding: isMobile ? "40px 20px 30px" : "80px 48px 52px",
          borderRight: isMobile ? "none" : `1px solid ${darkMode ? "rgba(48,108,236,0.12)" : "rgba(48,108,236,0.08)"}`,
          borderBottom: isMobile ? `1px solid ${darkMode ? "rgba(48,108,236,0.12)" : "rgba(48,108,236,0.08)"}` : "none",
          minHeight: isMobile ? "auto" : "100vh",
        }}>
          <div>
            <p style={{ fontSize: isMobile ? "9px" : "10px", fontWeight: 800, letterSpacing: "0.18em", color: "#306CEC", margin: "0 0 12px", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
              IMPACT360 ROADSHOW
            </p>
            <h2 style={{ fontSize: isMobile ? "clamp(28px, 6vw, 48px)" : "clamp(40px, 5.5vw, 72px)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.04em", margin: "0 0 16px", fontFamily: "'League Spartan', sans-serif", textTransform: "uppercase", color: darkMode ? "#fff" : "#111" }}>
              EVENT<br /><span style={{ color: "#306CEC" }}>HIGHLIGHTS</span>
            </h2>
            <p style={{ fontSize: isMobile ? "13px" : "14px", lineHeight: 1.6, color: darkMode ? "#888" : "#666", fontFamily: "'DM Sans', sans-serif", maxWidth: "280px" }}>
              Watch moments from across Africa: pitches, panels, and connections that are reshaping innovation.
            </p>
          </div>
          {!isMobile && (
            <div>
              <div style={{ borderTop: `1px solid ${darkMode ? "rgba(48,108,236,0.18)" : "rgba(48,108,236,0.12)"}`, paddingTop: "22px", marginBottom: "22px" }}>
                <span ref={tagRef} style={{ display: "inline-block", background: "#306CEC", color: "#fff", borderRadius: "6px", padding: "3px 10px", fontSize: "9px", fontWeight: 800, letterSpacing: "0.12em", marginBottom: "10px", fontFamily: "'League Spartan', sans-serif" }}>
                  {first.tag}
                </span>
                <p ref={titleRef} style={{ fontSize: "16px", fontWeight: 700, lineHeight: 1.25, color: darkMode ? "#fff" : "#111", fontFamily: "'League Spartan', sans-serif", textTransform: "uppercase", margin: "0 0 6px" }}>
                  {first.title}
                </p>
                <p ref={locationRef} style={{ fontSize: "11px", fontWeight: 600, color: "#306CEC", fontFamily: "'DM Sans', sans-serif", margin: 0, letterSpacing: "0.04em" }}>
                  {first.location} · {first.date}
                </p>
              </div>
              <div style={{ display: "flex", gap: "7px" }}>
                {displayedVideos.map((_, i) => (
                  <div key={i} ref={pipRefs.current[i]} style={{
                    height: "3px", borderRadius: "2px",
                    width: i === 0 ? "28px" : "10px",
                    background: i === 0 ? "#306CEC" : (darkMode ? "rgba(255,255,255,0.12)" : "#ddd"),
                    transition: "width 0.35s ease, background 0.35s ease",
                  }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div style={{
          flex: isMobile ? "none" : 1,
          width: isMobile ? "100%" : "auto",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: isMobile ? "60vh" : "100vh",
          padding: isMobile ? "20px" : "0",
        }}>
          <div style={{ position: "absolute", width: isMobile ? "200px" : "380px", height: isMobile ? "200px" : "380px", borderRadius: "50%", background: "radial-gradient(circle, rgba(48,108,236,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />

          {displayedVideos.map((video, i) => (
            <VideoCard key={video.id} video={video} cardIndex={i} cardRef={cardRefs.current[i]} darkMode={darkMode} />
          ))}

          <div ref={hintRef} style={{ position: "absolute", bottom: isMobile ? "20px" : "44px", right: isMobile ? "20px" : "40px", display: "flex", alignItems: "center", gap: "10px", opacity: 1, pointerEvents: "none" }}>
            <div style={{ width: "40px", height: "2px", borderRadius: "1px", background: "linear-gradient(to right, transparent, #306CEC)" }} />
            <p style={{ color: "#306CEC", fontSize: "9px", fontWeight: 800, letterSpacing: "0.16em", margin: 0, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>SCROLL</p>
          </div>

          <div ref={counterRef} style={{ position: "absolute", top: isMobile ? "20px" : "44px", right: isMobile ? "20px" : "40px", color: darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", fontFamily: "'DM Sans', sans-serif" }}>
            01 / {String(displayedVideos.length).padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HighlightsPage() {
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`font-sans transition-colors duration-1000 min-h-screen ${darkMode ? "bg-black" : "bg-[#FFFEF9]"}`}
      style={darkMode ? { backgroundColor: "#000000" } : {}}
    >
      <Navbar />
      <div className="pt-20">
        <VideoHighlights darkMode={darkMode} />
      </div>
      <Footer />
    </div>
  );
}
