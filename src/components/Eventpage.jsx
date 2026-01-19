import React from "react";
import { motion } from "framer-motion";
import { MapPin, Users, Lightbulb, Network, MessageCircle, ArrowDown } from "lucide-react";
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
                name: "Nairobi",
                img: "/events/Nairobi.jpg",
                desc: "Kenya's capital, a vibrant tech and innovation hub."
              },
              {
                name: "Nakuru",
                img: "/events/Nakuru.jpg",
                desc: "A fast-growing city with a dynamic youth ecosystem."
              },
              {
                name: "Eldoret",
                img: "/events/Eldoret.jpg",
                desc: "Known for its enterprising spirit and startups."
              },
              {
                name: "Kisumu",
                img: "/events/Kisumu.jpg",
                desc: "A lakeside city with a rising innovation scene."
              },
              {
                name: "Mombasa",
                img: "/events/Mombasa.jpg",
                desc: "Coastal city blending trade, tourism, and tech."
              },
              {
                name: "Arusha",
                img: "/events/Arusha.jpg",
                desc: "Tanzania's gateway to East African entrepreneurship."
              },
              {
                name: "Kigali",
                img: "/events/Kigali.jpg",
                desc: "Rwanda's capital, a model for smart city growth."
              },
              {
                name: "Addis Ababa",
                img: "/events/Addis ababa.jpg",
                desc: "Ethiopia's capital, a center for continental diplomacy and startups."
              },
              {
                name: "Kampala",
                img: "/events/Kampala.jpg",
                desc: "Uganda's capital, a vibrant city with a growing tech ecosystem."
              }
            ].map((town, idx) => (
              <div
                key={town.name}
                className="relative rounded-2xl shadow-lg overflow-hidden group transition-all cursor-pointer"
                style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}
              >
                <div className="h-40 w-full overflow-hidden">
                  <img
                    src={town.img}
                    alt={town.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="absolute top-4 left-4 bg-[#306CEC] text-white rounded-full p-2 shadow-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="p-6 pt-4 flex flex-col items-start">
                  <div className="font-bold text-xl mb-2 text-[#306CEC] group-hover:text-[#4A80FF] transition-colors" style={{ fontFamily: "'League Spartan', Arial, sans-serif", textTransform: "uppercase" }}>
                    {town.name}
                  </div>
                  <div className="text-gray-700 dark:text-gray-300 text-base">{town.desc}</div>
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
            Want to help shape the future of entrepreneurship across Africa? There are many ways to get involved with the Impact360 Roadshow.
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
              <div className="font-bold text-lg text-[#306CEC]">Volunteer & Support</div>
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

      <Footer />
    </div>
  );
}

/* Add this to the bottom of the file or in your CSS:
.custom-blue-important {
  color: #306CEC !important;
}
*/