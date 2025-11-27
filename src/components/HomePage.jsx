import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [showFooter, setShowFooter] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const photos = [
    "/photo_1.jpg",
    "/photo_2.jpg",
    "/photo_3.jpg",
    "/photo_4.jpg",
    "/photo_5.jpg",
    "/photo_6.jpg"
  ];
React.useEffect(() => {
  photos.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}, []);

  const featuresData = [
    { icon: "💡", title: "Innovation", desc: "Transform ideas into reality with cutting-edge tools" },
    { icon: "🤝", title: "Community", desc: "Connect with Africa's top changemakers" },
    { icon: "📈", title: "Growth", desc: "Scale your ventures with proven frameworks" },
  ];

  const offers = [
    {
      title: "Incubation & Acceleration",
      description: "We support founders from idea to execution through mentorship, structured programs, and strategic resources.",
      image: "/incubation.png",
      link: "/programs",
    },
    {
      title: "Events",
      description: "We run workshops, bootcamps, and founder meetups to help innovators learn, connect, and grow.",

      image: "/event.png",
      link: "/events",
    },
  ];

  // Auto slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="bg-white" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <Navbar />

      {/* WhatsApp QR Code Modal */}
      {showQR && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowQR(false)}
        >
          <motion.div
            className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQR(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Join Our Community</h2>
              <p className="text-gray-600">Scan the QR code to join our WhatsApp community</p>
              <div className="bg-gray-100 p-8 rounded-2xl flex items-center justify-center">
                <img 
                  src="/frame.png" 
                  alt="WhatsApp QR Code"
                  className="w-64 h-64 object-contain"
                />
              </div>
              <p className="text-sm text-gray-500">Or click below to join directly</p>
              <a
                href="https://chat.whatsapp.com/I0g8kpCNvSn84yWQxybzHa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition-all duration-300"
              >
                Open WhatsApp
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
        
      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-white">

       {/* Slideshow Background */}
    <div className="absolute inset-0">
  {photos.map((photo, index) => (
    <div
      key={photo}
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(${photo})`,
        zIndex: currentPhoto === index ? 2 : 1,
        opacity: currentPhoto === index ? 1 : 0,
        // Only fade the ones that are not the first visible image
        transition: index === 0 && currentPhoto === 0 ? 'none' : 'opacity 2s ease-in-out'
      }}
    />
  ))}
</div>


        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPhoto(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentPhoto === index ? "bg-white w-8" : "bg-white/40 w-2"
              }`}
            />
          ))}
        </div>

        {/* CENTERED HERO TEXT */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
            style={{
              fontFamily: 'League Spartan, sans-serif',
              textShadow: "0 4px 20px rgba(0,0,0,0.7), 0 2px 10px rgba(0,0,0,0.5)"
            }}
          >
            Empowering Innovation for Real-World Impact
          </h1>

          <p
            className="text-lg md:text-xl lg:text-2xl text-white mb-10 max-w-4xl mx-auto font-light leading-relaxed"
            style={{
              textShadow: "0 2px 12px rgba(0,0,0,0.7)"
            }}
          >
            Transform your ideas into sustainable, scalable solutions with our global-standard innovation pipeline.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-5 justify-center">
            <a href="/about">
              <button className="border-2 border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-[#000000] transition-all duration-300 shadow-lg hover:shadow-xl" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Learn More
              </button>
            </a>

            <button 
              onClick={() => setShowQR(true)}
              className="bg-[#306CEC] text-white px-10 py-4 rounded-full font-bold hover:bg-[#1a4d99] transition-all duration-300 shadow-lg hover:shadow-xl" 
              style={{ fontFamily: 'League Spartan, sans-serif' }}
            >
              Join Community
            </button>
          </div>
        </div>
      </section>

       
    {/* WHAT WE OFFER SECTION */}
    <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: false, amount: 0.2 }}
>
      <section className="py-24 px-6 bg-[#FFFEF9] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#306CEC]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#306CEC]/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-[#306CEC] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              What We Offer
            </h2>
            <p className="text-xl text-[#000000]/70">
              Clear, structured pathways for founders to grow
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {offers.map((offer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.2, 
                  duration: 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group"
                whileHover={{ y: -12, scale: 1.02 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#306CEC]/90 via-[#306CEC]/40 to-transparent flex items-end p-8 transition-all duration-500 group-hover:from-[#306CEC]/95">
                    <motion.span 
                      className="text-6xl"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {offer.icon}
                    </motion.span>
                  </div>
                </div>
                <div className="p-8 relative">
                  <div className="absolute top-0 left-0 w-20 h-1 bg-[#306CEC] transform origin-left transition-all duration-500 group-hover:w-full"></div>
                  <h3 className="text-3xl font-bold text-[#306CEC] mb-4 mt-2 transition-colors duration-300 group-hover:text-[#1a4d99]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    {offer.title}
                  </h3>
                  <p className="text-[#000000]/70 text-lg mb-6 leading-relaxed">
                    {offer.description}
                  </p>
                  <a
                    href={offer.link}
                    className="inline-flex items-center text-[#306CEC] font-semibold gap-2 transition-all duration-300 group-hover:gap-4 group-hover:text-[#1a4d99]"
                    style={{ fontFamily: 'League Spartan, sans-serif' }}
                  >
                    Learn More 
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
        </motion.div>
      

      {/* WHY CHOOSE US SECTION */}
      <motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: false, amount: 0.2 }}
  className="py-24 px-6 bg-[#F5F6F8]"
>

<section className="py-24 px-6 bg-[#F5F6F8]">
  <div className="max-w-7xl mx-auto">

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2
        className="text-5xl md:text-6xl font-bold text-[#306CEC] mb-3"
        style={{ fontFamily: "League Spartan, sans-serif" }}
      >
        Why Choose Impact360
      </h2>

      <p className="text-xl text-gray-600">
        Built for founders who want to make a difference
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {featuresData.map((item, i) => (
        <motion.div
          key={i}
          className="
            bg-white
            border border-[#306CEC]/20
            p-10 rounded-3xl
            shadow-lg hover:shadow-xl
            transition-all duration-300
            group
          "
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ y: -10 }}
        >
          {/* Blue top bar */}
          <div className="h-2 w-full bg-[#306CEC] rounded-full mb-6"></div>

          <div className="text-6xl mb-6 text-[#306CEC]">{item.icon}</div>

          <h3
            className="text-3xl font-bold text-[#306CEC] mb-3"
            style={{ fontFamily: "League Spartan, sans-serif" }}
          >
            {item.title}
          </h3>

          <p className="text-gray-700 text-lg leading-relaxed">
            {item.desc}
          </p>
        </motion.div>
      ))}
    </div>

  </div>
</section>
</motion.section>

      {/* FOOTER - Shows only when scrolled near bottom */}
     
      <Footer/>

    </div>
  );
}