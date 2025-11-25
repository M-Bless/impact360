import React, { useState, useEffect } from "react";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const photos = [
    "/photo_1.jpg",
    "/photo_2.jpg",
    "/photo_3.jpg",
    "/photo_4.jpg",
    "/photo_5.jpg",
    "/photo_6.jpg"
  ];

  // Preload images for swift loading
  useEffect(() => {
    // Set images as loaded immediately to prevent grey screen
    setImagesLoaded(true);
    
    const imagePromises = photos.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(imagePromises).catch(() => {});
  }, []);

  // Auto slideshow
  useEffect(() => {
    if (!imagesLoaded) return;
    
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [imagesLoaded]);

  return (
    <div className="font-sans">

      {/* NAVBAR */}
      <nav className="w-full flex justify-between items-center px-8 fixed top-0 left-0 right-0 z-50 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center">
            <img 
              src="/logo2.png" 
              alt="Impact360 Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-xl font-bold tracking-wide text-white">Impact360</h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 font-semibold text-sm text-white">
          <li><a href="/" className="hover:text-gray-300 transition-colors">Home</a></li>
          <li><a href="/about" className="hover:text-gray-300 transition-colors">About</a></li>
          <li><a href="/programs" className="hover:text-gray-300 transition-colors">Programs</a></li>
          <li><a href="/events" className="hover:text-gray-300 transition-colors">Events</a></li>
          <li><a href="/subscription" className="hover:text-gray-300 transition-colors">Join Community</a></li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden bg-black/90 backdrop-blur-sm fixed top-12 left-0 right-0 py-4 px-8 space-y-3 text-white text-base font-semibold z-40"
          style={{
            animation: "slideDown 0.3s ease-out"
          }}
        >
          <a href="/" onClick={() => setMenuOpen(false)} className="block">Home</a>
          <a href="/about" onClick={() => setMenuOpen(false)} className="block">About</a>
          <a href="/programs" onClick={() => setMenuOpen(false)} className="block">Programs</a>
          <a href="/events" onClick={() => setMenuOpen(false)} className="block">Events</a>
          <a href="/subscription" onClick={() => setMenuOpen(false)} className="block">Join Community</a>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">

        {/* Slideshow Background */}
        <div className="absolute inset-0">
          {photos.map((photo, index) => (
            <div
              key={photo}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
              style={{
                backgroundImage: `url(${photo})`,
                zIndex: currentPhoto === index ? 2 : 1,
                opacity: currentPhoto === index ? 1 : 0
              }}
            />
          ))}

          {/* Darker Gradient Overlay Effect */}
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
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
              <button className="border-2 border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl">
                Learn More
              </button>
            </a>

            <a href="/subscription">
              <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                Join Community
              </button>
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}