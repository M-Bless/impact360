import React, { useState, useEffect } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const currentYear = new Date().getFullYear();
const defaultEvents = [
  {
    id: 1,
    title: "Nakuru Builders Meetup",
    location: "Nakuru, Kenya",
    displayDate: "6th June 2026",
    date: new Date(`${currentYear}-06-06T10:00:00Z`).toISOString(),
    image: "/events/Nakuru.jpg",
    tag: "FEATURED",
    description: "Pitching, fundraising, product thinking. We pick a topic and go deep."
  },
  {
    id: 2,
    title: "Nairobi Founder Mixer",
    location: "Nairobi, Kenya",
    displayDate: "23rd June 2026",
    date: new Date(`${currentYear}-06-23T10:00:00Z`).toISOString(),
    image: "/events/Nairobi.jpg",
    tag: "MIXER",
    description: "A casual evening of networking and raw founder stories."
  }
];

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff > 0) setTimeLeft({
        days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [targetDate]);

  return (
    <div style={{ display: "flex", gap: "6px" }}>
      {[
        { label: "D", value: timeLeft.days },
        { label: "H", value: timeLeft.hours },
        { label: "M", value: timeLeft.minutes },
        { label: "S", value: timeLeft.seconds },
      ].map((item, i) => (
        <div key={i} style={{ textAlign: "center", minWidth: "42px", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", borderRadius: "8px", padding: "6px 4px", border: "1px solid rgba(255,255,255,0.18)" }}>
          <div style={{ fontSize: "17px", fontWeight: 800, color: "#fff", lineHeight: 1, fontFamily: "monospace" }}>{String(item.value).padStart(2, "0")}</div>
          <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", marginTop: "3px", fontFamily: "'DM Sans', sans-serif" }}>{item.label}</div>
        </div>
      ))}
    </div>
  );
};

const LocalEventsCarousel = ({ events = defaultEvents, darkMode = true }) => {
  if (!events || events.length === 0) return null;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
      {events.map((event, idx) => (
        <div
          key={event.id}
          style={{ position: "relative", borderRadius: "20px", overflow: "hidden", height: "420px", cursor: "pointer" }}
          className="group"
        >
          {/* Full-bleed image */}
          <img
            src={event.image}
            alt={event.title}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease", display: "block" }}
            className="group-hover:scale-105"
          />

          {/* Base gradient — always dark at bottom for legibility */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.1) 100%)" }} />

          {/* Blue tint for featured card */}
          {idx === 0 && (
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(48,108,236,0.45) 0%, transparent 55%)" }} />
          )}

          {/* Top: tag badge */}
          <div style={{ position: "absolute", top: "20px", left: "20px", right: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{
              background: idx === 0 ? "#306CEC" : "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              color: "#fff",
              padding: "5px 14px",
              borderRadius: "100px",
              fontSize: "9px",
              fontWeight: 800,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontFamily: "'DM Sans', sans-serif",
              border: idx === 0 ? "none" : "1px solid rgba(255,255,255,0.2)"
            }}>
              {event.tag}
            </span>
            <span style={{
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(10px)",
              color: "#fff",
              padding: "6px 16px",
              borderRadius: "100px",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              fontFamily: "'DM Sans', sans-serif",
              border: "1px solid rgba(255,255,255,0.25)"
            }}>
              {event.displayDate}
            </span>
          </div>

          {/* Bottom: content */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px" }}>
            {/* Location */}
            <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "10px" }}>
              <MapPin size={11} color="rgba(255,255,255,0.55)" />
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em" }}>
                {event.location}
              </span>
            </div>

            {/* Title */}
            <h3 style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
              fontWeight: 900,
              color: "#fff",
              fontFamily: "'League Spartan', sans-serif",
              lineHeight: 0.95,
              marginBottom: "12px",
              textTransform: "uppercase",
              letterSpacing: "-0.02em"
            }}>
              {event.title}
            </h3>

            {/* Description */}
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, marginBottom: "22px" }}>
              {event.description}
            </p>

            {/* Countdown + CTA */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
              <CountdownTimer targetDate={event.date} />
              <Link
                to="/subscription"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  background: idx === 0 ? "#306CEC" : "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(8px)",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "100px",
                  fontSize: "12px",
                  fontWeight: 800,
                  textDecoration: "none",
                  border: `1px solid ${idx === 0 ? "transparent" : "rgba(255,255,255,0.25)"}`,
                  fontFamily: "'League Spartan', sans-serif",
                  flexShrink: 0,
                  transition: "background 0.2s"
                }}
              >
                Get Ticket <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocalEventsCarousel;
