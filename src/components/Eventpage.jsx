import React from "react";
import { motion } from "framer-motion";
import { MapPin, Users, Lightbulb, Network, MessageCircle, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../DarkModeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ---------------------------- Main Events Page --------------------------- */

export default function EventsPage() {
  const { darkMode } = useDarkMode();

  // --- Speakers Section State ---
  const speakerImages = [
    "/events/Timothy.jpeg",
    "/events/Deborah.jpeg",
    "/events/geofrey.jpeg",
    "/events/Gilbert.jpeg" 
  ];
  const [currentSpeaker, setCurrentSpeaker] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpeaker(prev => (prev + 1) % speakerImages.length);
    }, 10000); // Slowed down to 10 seconds
    return () => clearInterval(interval);
  }, [speakerImages.length]);

  return (
    <div
      className={`font-sans transition-colors duration-1000 min-h-screen ${darkMode ? 'bg-black' : 'bg-[#FFFEF9]'}`}
      style={darkMode ? { backgroundColor: '#000000' } : {}}
    >
      <Navbar />

      {/* HERO SECTION */}
      <section
        className="relative min-h-[140vh] flex items-center justify-center px-6 pt-12 pb-32"
        style={{
          backgroundImage: `url('/events/Roadshow-event.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-0" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl mb-6 text-white font-extrabold drop-shadow-lg"
            style={{ fontFamily: "'League Spartan', 'DM Sans', Arial, sans-serif", textTransform: "uppercase" }}
          >
           Impact360 Roadshow
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl mb-8 text-gray-300"
            style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}
          >
            Join us for a transformative journey connecting founders, investors, and changemakers across Africa. Discover new opportunities, build lasting partnerships, and shape the future of innovation.
          </motion.p>
        </div>
        {/* Animated scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className="w-8 h-8 text-white opacity-70" />
          </motion.div>
        </div>
      </section>

      {/* WHY SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } }
        }}
        className="py-20 px-4 md:px-0 transition-colors"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
            <h2
              style={{
                fontFamily: "'League Spartan', 'DM Sans', Arial, sans-serif",
                textTransform: "uppercase",
                color: '#306CEC',
                fontWeight: 700,
                // @ts-ignore
                '--tw-text-opacity': '1',
              }}
              className="text-2xl md:text-4xl font-bold mb-4"
            >
              Why the Decentralization Roadshow?
            </h2>
            <p className="text-lg mb-4" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
              Most innovation conversations, capital, and infrastructure remain concentrated in major cities. Yet talent, ideas, and real problems exist everywhere.
            </p>
            <ul className="space-y-3 text-base md:text-lg" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
              <li className="flex items-center gap-2"><Network className="w-5 h-5 text-[#306CEC]" /> Bring opportunity closer to founders outside capital cities</li>
              <li className="flex items-center gap-2"><Lightbulb className="w-5 h-5 text-[#306CEC]" /> Surface local solutions built within real local contexts</li>
              <li className="flex items-center gap-2"><Users className="w-5 h-5 text-[#306CEC]" /> Connect regional founders to networks, knowledge, and capital</li>
              <li className="flex items-center gap-2"><MapPin className="w-5 h-5 text-[#306CEC]" /> Strengthen grassroots ecosystems town by town</li>
            </ul>
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }} className="flex justify-center">
            <img src="/events/map.jpg" alt="Roadshow Map" className="rounded-2xl shadow-xl w-full max-w-md" />
          </motion.div>
        </div>
      </motion.section>

      {/* TESTIMONIAL SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-12 px-4 md:px-0 bg-gradient-to-r from-[#306CEC]/10 to-[#4A80FF]/10"
      >
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="italic text-xl md:text-2xl text-gray-700 dark:text-gray-200" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
            “The Impact360 Roadshow brought real opportunities to our town. It’s more than an event—it's a movement for local founders.”
          </blockquote>
          <div className="mt-4 text-[#306CEC] font-bold" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
            — Local Founder, Nakuru
          </div>
        </div>
      </motion.section>

      {/* WHAT HAPPENS SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } }
        }}
        className="py-20 px-4 md:px-0 transition-colors"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center text-[#306CEC]"
            style={{
              fontFamily: "'League Spartan', 'DM Sans', Arial, sans-serif",
              textTransform: "uppercase"
            }}
          >
            What Happens at Each Roadshow Stop
          </h2>
          <div className="grid md:grid-cols-2 grid-cols-1 justify-center gap-4 items-stretch">
            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="rounded-2xl shadow p-8 flex flex-col gap-4 mx-auto items-start text-left h-full justify-center">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-7 h-7 text-[#306CEC]" />
                <span className="font-bold text-lg" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>Founder conversations & ecosystem dialogues</span>
              </div>
              <div className="flex items-center gap-3">
                <Lightbulb className="w-7 h-7 text-[#306CEC]" />
                <span className="font-bold text-lg" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>Entrepreneurship & innovation sessions</span>
              </div>
              <div className="flex items-center gap-3">
                <Network className="w-7 h-7 text-[#306CEC]" />
                <span className="font-bold text-lg" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>Technology as an enabler for local solutions</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-7 h-7 text-[#306CEC]" />
                <span className="font-bold text-lg" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>Community, partner, and stakeholder engagement</span>
              </div>
              <div className="italic text-sm mt-2 text-gray-500 dark:text-gray-400" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
                (Session formats may vary by town to reflect local context.)
              </div>
            </motion.div>
            <div className="flex justify-center items-center h-full w-full">
              <Lightbulb className="w-40 h-40 text-[#306CEC] drop-shadow-xl" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* TOWNS SECTION */}
      <section className="py-20 px-4 md:px-0 transition-colors">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center text-[#306CEC]"
            style={{
              fontFamily: "'League Spartan', 'DM Sans', Arial, sans-serif",
              textTransform: "uppercase"
            }}
          >
            Planned Roadshow Towns
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            { [
              {
                name: "Nakuru",
                img: "/events/Nakuru.jpg",
                desc: "A fast-growing city with a dynamic youth ecosystem.",
                date: "Feb 7, 2026"
              },
              {
                name: "Eldoret",
                img: "/events/Eldoret.jpg",
                desc: "Known for its enterprising spirit and startups.",
                date: "April 18, 2026"
              },
              {
                name: "Kisumu",
                img: "/events/Kisumu.jpg",
                desc: "A lakeside city with a rising innovation scene.",
                date: "June 6, 2026"
              },
              {
                name: "Nairobi",
                img: "/events/Nairobi.jpg",
                desc: "Kenya's capital, a vibrant tech and innovation hub.",
                date: "Coming Soon"
              },
              {
                name: "Mombasa",
                img: "/events/Mombasa.jpg",
                desc: "Coastal city blending trade, tourism, and tech.",
                date: "Coming Soon"
              },
              {
                name: "Arusha",
                img: "/events/Arusha.jpg",
                desc: "Tanzania's gateway to East African entrepreneurship.",
                date: "Coming Soon"
              },
              {
                name: "Kigali",
                img: "/events/Kigali.jpg",
                desc: "Rwanda's capital, a model for smart city growth.",
                date: "Coming Soon"
              },
              {
                name: "Addis Ababa",
                img: "/events/Addis ababa.jpg",
                desc: "Ethiopia's capital, a center for continental diplomacy and startups.",
                date: "Coming Soon"
              },
              {
                name: "Kampala",
                img: "/events/Kampala.jpg",
                desc: "Uganda's capital, a vibrant city with a growing tech ecosystem.",
                date: "Comming Soon"
              }
            ].map((town, idx) => (
              <div
                key={town.name}
                className="relative rounded-2xl shadow-lg group transition-all cursor-pointer"
                style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}
              >
                <div className="relative h-40 w-full overflow-hidden rounded-t-2xl">
                  <img
                    src={town.img}
                    alt={town.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div
                      className="text-center flex flex-col items-center"
                    >
                      <div className="text-white font-bold text-lg mb-2" style={{ fontFamily: "'League Spartan', Arial, sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)" }}>
                        Event Date
                      </div>
                      <div className="text-[#4A80FF] font-extrabold text-2xl mb-4" style={{ fontFamily: "'League Spartan', Arial, sans-serif", textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)" }}>
                        {town.date}
                      </div>
                      <Link to="/subscription" className="px-6 py-2 bg-[#306CEC] text-white rounded-lg font-semibold hover:bg-[#4A80FF] transition-colors duration-300" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
                        Get Ticket
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-[#306CEC] text-white rounded-full p-2 shadow-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="p-6 pt-4 flex flex-col items-start justify-between min-h-32">
                  <div>
                    <div className="font-bold text-xl mb-2 text-[#306CEC] group-hover:text-[#4A80FF] transition-colors" style={{ fontFamily: "'League Spartan', Arial, sans-serif", textTransform: "uppercase" }}>
                      {town.name}
                    </div>
                    <div className="text-gray-700 dark:text-gray-300 text-base">{town.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-base mt-8 text-gray-600 dark:text-gray-400" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
            Additional towns may be added as partnerships and logistics are confirmed.
          </p>
        </div>
      </section>

      {/* WHO IT'S FOR SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
        }}
        className="py-20 px-4 md:px-0 transition-colors"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center text-[#306CEC]"
            style={{
              fontFamily: "'League Spartan', 'DM Sans', Arial, sans-serif",
              textTransform: "uppercase"
            }}
          >
            Who It’s For
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            { [
              { label: "Founders & early‑stage entrepreneurs", icon: Users },
              { label: "Students & young innovators", icon: Lightbulb },
              { label: "SME builders", icon: Network },
              { label: "Ecosystem enablers, hubs, leaders", icon: MessageCircle },
              { label: "Policy Makers & Think Tanks", icon: Users },
              { label: "Partners for decentralization impact", icon: MapPin }
            ].map(({ label, icon: Icon }, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.05, boxShadow: "0 8px 32px #306CEC33" }}
                className="rounded-2xl shadow p-6 flex flex-col items-center gap-3 transition-all cursor-pointer"
              >
                <Icon className="w-10 h-10 text-[#306CEC]" />
                <span className="font-bold text-lg text-center" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* GET INVOLVED SECTION */}
      <motion.section
        id="get-involved"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-20 px-4 md:px-0 transition-colors"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-[#306CEC]"
            style={{
              fontFamily: "'League Spartan', 'DM Sans', Arial, sans-serif",
              textTransform: "uppercase"
            }}
          >
            Get Involved
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-300" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
            Decentralized innovation thrives when opportunities reach every corner. Help us bring entrepreneurship and technology solutions to underserved communities. There are many ways to champion decentralized growth with the Impact360 Roadshow.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <motion.div
              whileHover={{ y: -6, boxShadow: "0 8px 32px #306CEC33" }}
              className="rounded-2xl p-6 flex flex-col items-center gap-3 border border-[#306CEC]/10"
            >
              <MessageCircle className="w-8 h-8 text-[#306CEC]" />
              <div className="font-bold text-lg text-[#306CEC]">Partner & Collaborate</div>
              <div className="text-gray-700 dark:text-gray-300 text-base text-center">
                Join as a sponsor, ecosystem partner, or local champion to co-create impact in your region.
              </div>
            </motion.div>
            <motion.div
              whileHover={{ y: -6, boxShadow: "0 8px 32px #306CEC33" }}
              className="rounded-2xl p-6 flex flex-col items-center gap-3 border border-[#306CEC]/10"
            >
              <MapPin className="w-8 h-8 text-[#306CEC]" />
              <div className="font-bold text-lg text-[#306CEC]">Host a Stop</div>
              <div className="text-gray-700 dark:text-gray-300 text-base text-center">
                Bring the Roadshow to your town, hub, or campus. Help us activate new communities.
              </div>
            </motion.div>
            <motion.div
              whileHover={{ y: -6, boxShadow: "0 8px 32px #306CEC33" }}
              className="rounded-2xl p-6 flex flex-col items-center gap-3 border border-[#306CEC]/10"
            >
              <Users className="w-8 h-8 text-[#306CEC]" />
              <div className="font-bold text-lg text-[#306CEC]">Fellowship program</div>
              <div className="text-gray-700 dark:text-gray-300 text-base text-center">
                Help with logistics, outreach, or content. Be part of the team making decentralization real.
              </div>
            </motion.div>
          </div>
          <div className="bg-gradient-to-r from-[#306CEC] to-[#4A80FF] text-white rounded-xl px-6 py-4 font-bold text-lg flex items-center gap-2 justify-center mb-4"
            style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
            <span role="img" aria-label="mail">📩</span>
            Interested in hosting, partnering, or supporting a roadshow stop?
          </div>
          <div className="text-base text-gray-700 dark:text-gray-300 mb-6" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
            Reach out to the Impact360 team to start the conversation.
          </div>
          
        </div>
      </motion.section>

      {/* SPEAKERS SECTION */}
      <section className="py-20 px-4 md:px-0 transition-colors">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Slideshow */}
          <div className="relative w-full h-96 flex items-center justify-center overflow-hidden rounded-2xl shadow-xl">
            {speakerImages.map((img, idx) => (
              <div
                key={img}
                className="absolute inset-0 transition-opacity duration-1000"
                style={{
                  opacity: currentSpeaker === idx ? 1 : 0,
                  zIndex: currentSpeaker === idx ? 2 : 1,
                  backgroundImage: `url(${img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                {/* fallback placeholder */}
                <img
                  src={img}
                  alt={`Speaker ${idx + 1}`}
                  className="w-full h-full object-cover rounded-2xl"
                  style={{ opacity: 0 }}
                  onError={e => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400?text=Speaker"; }}
                />
              </div>
            ))}
            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {speakerImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSpeaker(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${currentSpeaker === idx ? "bg-[#306CEC] w-8" : "bg-[#306CEC]/40 w-2"}`}
                  style={{ outline: "none", border: "none" }}
                  tabIndex={-1}
                  aria-label={`Go to speaker ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          {/* Right: Speaker Info */}
          <div>
            <h2 className="text-2xl md:text-4xl font-bold mb-6 text-[#306CEC]" style={{ fontFamily: "'League Spartan', 'DM Sans', Arial, sans-serif", textTransform: "uppercase" }}>
              Meet the Speakers
            </h2>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
              Our events feature a diverse lineup of visionary founders, investors, industry leaders, and ecosystem builders from across Africa and beyond.
            </p>
            <ul className="list-disc pl-6 mb-4 text-base text-gray-700 dark:text-gray-300" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
              <li>Serial entrepreneurs and startup founders</li>
              <li>Top venture capitalists and angel investors</li>
              <li>Innovation ecosystem leaders and hub managers</li>
              <li>Policy makers and thought leaders</li>
              <li>Technical experts and product builders</li>
            </ul>
            <div className="font-bold text-[#306CEC] text-lg" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
              Get inspired by real stories, actionable insights, and authentic connections.
            </div>
          </div>
        </div>
      </section>

      {/* Floating Contact Button */}
      {/* 
      <a
        href="mailto:hello@impact360.africa"
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-[#306CEC] to-[#4A80FF] text-white font-bold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
        style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}
      >
        Contact Us
      </a>
      */}

      {/* ── VIDEO HIGHLIGHTS SECTION ── */}
      <VideoHighlights darkMode={darkMode} />

      <Footer />
    </div>
  );
}

/* Add this to the bottom of the file or in your CSS:
.custom-blue-important {
  color: #306CEC !important;
}
*/

/* ─────────────────────────────────────────────
   VIDEO HIGHLIGHTS — horizontal scroll-driven card stack
───────────────────────────────────────────── */

const videos = [
  {
    id: 1,
    title: "Impact360 Nakuru Roadshow",
    location: "Nakuru, Kenya",
    date: "Feb 7, 2026",
    tag: "RECAP",
    youtubeId: "lGnBbmGK6V8",
    thumb: "https://i.ytimg.com/vi/lGnBbmGK6V8/hqdefault.jpg",
  },
  {
    id: 2,
    title: "Founders Taking The Stage",
    location: "Eldoret, Kenya",
    date: "April 18, 2026",
    tag: "PITCHES",
    youtubeId: "DDM1aMN1YRE",
    thumb: "https://i.ytimg.com/vi/DDM1aMN1YRE/hqdefault.jpg",
  },
  {
    id: 3,
    title: "Innovation On The Ground",
    location: "Kisumu, Kenya",
    date: "June 6, 2026",
    tag: "PANEL",
    youtubeId: "Mbl0osnVSHI",
    thumb: "https://i.ytimg.com/vi/Mbl0osnVSHI/hqdefault.jpg",
  },
  {
    id: 4,
    title: "Decentralising Opportunity",
    location: "Nairobi, Kenya",
    date: "Coming Soon",
    tag: "KEYNOTE",
    youtubeId: "sUzzM2vPBLo",
    thumb: "https://i.ytimg.com/vi/sUzzM2vPBLo/hqdefault.jpg",
  },
  {
    id: 5,
    title: "Coastal Innovation Highlight",
    location: "Mombasa, Kenya",
    date: "Coming Soon",
    tag: "HIGHLIGHT",
    youtubeId: "ExUopo1-Zh4",
    thumb: "https://i.ytimg.com/vi/ExUopo1-Zh4/hqdefault.jpg",
  },
  {
    id: 6,
    title: "Ecosystem Builders Unite",
    location: "Kigali, Rwanda",
    date: "Coming Soon",
    tag: "ECOSYSTEM",
    youtubeId: "M3upIInuQN0",
    thumb: "https://i.ytimg.com/vi/M3upIInuQN0/hqdefault.jpg",
  },
  {
    id: 7,
    title: "Africa's Next Wave",
    location: "Kampala, Uganda",
    date: "Coming Soon",
    tag: "FEATURE",
    youtubeId: "ESMyXLzFpoc",
    thumb: "https://i.ytimg.com/vi/ESMyXLzFpoc/hqdefault.jpg",
  },
  // Additional shorts requested
  {
    id: 8,
    title: "Short Highlight 1",
    location: "Various",
    date: "Shorts",
    tag: "SHORTS",
    youtubeId: "zEiKL6Qhdm8",
    thumb: "https://i.ytimg.com/vi/zEiKL6Qhdm8/hqdefault.jpg",
  },
  {
    id: 9,
    title: "Short Highlight 2",
    location: "Various",
    date: "Shorts",
    tag: "SHORTS",
    youtubeId: "dPAcsg9q0SM",
    thumb: "https://i.ytimg.com/vi/dPAcsg9q0SM/hqdefault.jpg",
  },
  {
    id: 10,
    title: "Short Highlight 3",
    location: "Various",
    date: "Shorts",
    tag: "SHORTS",
    youtubeId: "DeZKAuRT100",
    thumb: "https://i.ytimg.com/vi/DeZKAuRT100/hqdefault.jpg",
  },
  {
    id: 11,
    title: "Short Highlight 4",
    location: "Various",
    date: "Shorts",
    tag: "SHORTS",
    youtubeId: "UndyYPDi1EI",
    thumb: "https://i.ytimg.com/vi/UndyYPDi1EI/hqdefault.jpg",
  },
  {
    id: 12,
    title: "Short Highlight 5",
    location: "Various",
    date: "Shorts",
    tag: "SHORTS",
    youtubeId: "jSVH6QVFjbY",
    thumb: "https://i.ytimg.com/vi/jSVH6QVFjbY/hqdefault.jpg",
  },
  {
    id: 13,
    title: "Short Highlight 6",
    location: "Various",
    date: "Shorts",
    tag: "SHORTS",
    youtubeId: "AEUy2fEbIto",
    thumb: "https://i.ytimg.com/vi/AEUy2fEbIto/hqdefault.jpg",
  },
  {
    id: 14,
    title: "Short Highlight 7",
    location: "Various",
    date: "Shorts",
    tag: "SHORTS",
    youtubeId: "EhB5HlhdoUo",
    thumb: "https://i.ytimg.com/vi/EhB5HlhdoUo/hqdefault.jpg",
  },
  {
    id: 15,
    title: "Short Highlight 8",
    location: "Various",
    date: "Shorts",
    tag: "SHORTS",
    youtubeId: "HM_mL0OKMBo",
    thumb: "https://i.ytimg.com/vi/HM_mL0OKMBo/hqdefault.jpg",
  },
  {
    id: 16,
    title: "Short Highlight 9",
    location: "Various",
    date: "Shorts",
    tag: "SHORTS",
    youtubeId: "IlenBuymfMY",
    thumb: "https://i.ytimg.com/vi/IlenBuymfMY/hqdefault.jpg",
  },
  {
    id: 17,
    title: "Short Highlight 10",
    location: "Various",
    date: "Shorts",
    tag: "SHORTS",
    youtubeId: "hk7mql-_Jnw",
    thumb: "https://i.ytimg.com/vi/hk7mql-_Jnw/hqdefault.jpg",
  },
  {
    id: 18,
    title: "Short Highlight 11",
    location: "Various",
    date: "Shorts",
    tag: "SHORTS",
    youtubeId: "Wi6_S4Ri5SE",
    thumb: "https://i.ytimg.com/vi/Wi6_S4Ri5SE/hqdefault.jpg",
  },
  {
    id: 19,
    title: "Short Highlight 12",
    location: "Various",
    date: "Shorts",
    tag: "SHORTS",
    youtubeId: "TX6uR5PlgaE",
    thumb: "https://i.ytimg.com/vi/TX6uR5PlgaE/hqdefault.jpg",
  },
  {
    id: 20,
    title: "Short Highlight 13",
    location: "Various",
    date: "Shorts",
    tag: "SHORTS",
    youtubeId: "zIhmOesMVqE",
    thumb: "https://i.ytimg.com/vi/zIhmOesMVqE/hqdefault.jpg",
  },
];

function VideoCard({ video, cardIndex, cardRef, darkMode }) {
  const isMobile = window.innerWidth < 768;

  return (
    <div
      ref={cardRef}
      style={{
        position: "absolute",
        width: isMobile ? "min(150px, 80vw)" : "min(200px, 22vw)",
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
      {/* Portrait 9:16 ratio for Shorts */}
      <div style={{ position: "relative", aspectRatio: "9/16", overflow: "hidden", background: "#000" }}>
        <img
          src={video.thumb}
          alt={video.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
          onError={e => { e.target.src = `https://placehold.co/400x711/306CEC/ffffff?text=${encodeURIComponent(video.location)}`; }}
        />
        {/* Gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(48,108,236,0.92) 0%, rgba(48,108,236,0.25) 45%, transparent 70%)",
        }} />
        {/* Play button — opacity driven by RAF */}
        <div className="play-btn" style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "52px", height: "52px", borderRadius: "50%",
          background: "rgba(255,255,255,0.95)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 24px rgba(48,108,236,0.5)",
          opacity: 0, pointerEvents: "none",
        }}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M5 3.5l12 6.5-12 6.5V3.5z" fill="#306CEC" />
          </svg>
        </div>
        {/* Tag */}
        <div style={{
          position: "absolute", top: "12px", left: "12px",
          background: "#306CEC", color: "#fff", borderRadius: "6px",
          padding: "4px 10px", fontSize: "8px", fontWeight: 800,
          letterSpacing: "0.12em", fontFamily: "'League Spartan', sans-serif",
        }}>
          {video.tag}
        </div>
        {/* Shorts badge */}
        <div style={{
          position: "absolute", top: "12px", right: "12px",
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)",
          borderRadius: "6px", padding: "3px 7px",
          display: "flex", alignItems: "center", gap: "3px",
        }}>
          <svg width="10" height="12" viewBox="0 0 24 24" fill="#fff">
            <path d="M13.5 2.14L11 6.27l-1.55-.9A5 5 0 004 10a5 5 0 005 5h1v2H9a7 7 0 110-14 7 7 0 011.5.16L13.5 2.14zM15 5a7 7 0 11-1.5 13.84l-2.5-4.13L12.55 13A5 5 0 0020 10a5 5 0 00-5-5z"/>
          </svg>
          <span style={{ color: "#fff", fontSize: "8px", fontWeight: 800, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em" }}>SHORTS</span>
        </div>
        {/* Bottom title overlay */}
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
  const cardRefs     = React.useRef(videos.map(() => React.createRef()));
  const pipRefs      = React.useRef(videos.map(() => React.createRef()));
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
      rawRef.current   = Math.min(1, scrolled / Math.max(1, scrollable)) * videos.length;
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

      const ai = Math.min(Math.floor(sp), videos.length - 1);

      if (counterRef.current) {
        counterRef.current.textContent = `${String(ai + 1).padStart(2,"0")} / ${String(videos.length).padStart(2,"0")}`;
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
        const v = videos[ai];
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

  const first = videos[0];

  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative", height: isMobile ? `${150 + videos.length * 120}vh` : `${100 + videos.length * 90}vh` }}>
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
              Watch moments from across Africa — pitches, panels, and connections that are reshaping innovation.
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
                {videos.map((_, i) => (
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
          padding: isMobile ? "20px" : "0"
        }}>
          <div style={{ position: "absolute", width: isMobile ? "200px" : "380px", height: isMobile ? "200px" : "380px", borderRadius: "50%", background: "radial-gradient(circle, rgba(48,108,236,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />

          {videos.map((video, i) => (
            <VideoCard
              key={video.id}
              video={video}
              cardIndex={i}
              cardRef={cardRefs.current[i]}
              darkMode={darkMode}
            />
          ))}

          <div ref={hintRef} style={{ position: "absolute", bottom: isMobile ? "20px" : "44px", right: isMobile ? "20px" : "40px", display: "flex", alignItems: "center", gap: "10px", opacity: 1, pointerEvents: "none" }}>
            <div style={{ width: "40px", height: "2px", borderRadius: "1px", background: "linear-gradient(to right, transparent, #306CEC)" }} />
            <p style={{ color: "#306CEC", fontSize: "9px", fontWeight: 800, letterSpacing: "0.16em", margin: 0, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>SCROLL</p>
          </div>

          <div ref={counterRef} style={{ position: "absolute", top: isMobile ? "20px" : "44px", right: isMobile ? "20px" : "40px", color: darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", fontFamily: "'DM Sans', sans-serif" }}>
            01 / {String(videos.length).padStart(2, "0")}
          </div>
        </div>

      </div>
    </div>
  );
}


/* Add this to the bottom of the file or in your CSS:
.custom-blue-important {
  color: #306CEC !important;
}
*/