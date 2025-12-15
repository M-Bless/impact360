import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Camera, Mic, Handshake, Lightbulb, Target, Globe, Rocket, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FeaturedEventCard = ({ event, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.2 }}
    viewport={{ once: true }}
    className="relative"
  >
    <div className="grid md:grid-cols-2 gap-12 items-start">

      {/* IMAGE SECTION */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`relative rounded-3xl overflow-hidden shadow-2xl group ${index % 2 === 1 ? "md:order-2" : ""}`}
      >
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#306CEC]/70 via-[#306CEC]/20 to-transparent"></div>

        {/* STATUS */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-6 left-6"
        >
          <div
            className={`${
              event.status === "Upcoming"
                ? "bg-gradient-to-r from-green-400 to-green-600"
                : "bg-gradient-to-r from-gray-400 to-gray-600"
            } text-white px-6 py-3 rounded-full font-bold shadow-2xl backdrop-blur-sm`}
          >
            {event.status}
          </div>
        </motion.div>

        {/* DATE */}
        {event.date && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-6 left-6"
          >
            <div className="bg-[#306CEC] text-[#FFFEF9] px-6 py-3 rounded-full font-bold shadow-2xl backdrop-blur-sm flex items-center gap-2">
              <Calendar className="w-5 h-5" strokeWidth={2} />
              {event.date}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* CONTENT SECTION */}
      <div className={index % 2 === 1 ? "md:order-1" : ""}>
        <motion.div
          initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-block mb-4"
          >
            <span className="text-[#306CEC] font-bold text-sm uppercase tracking-wider bg-[#306CEC]/10 px-4 py-2 rounded-full">
              Featured Event
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#306CEC] to-[#1a4d9e] bg-clip-text text-transparent mb-6">
            {event.title}
          </h2>

          <p className="text-xl text-gray-700 leading-relaxed mb-8">{event.description}</p>

          {/* HIGHLIGHTS */}
          <div className="space-y-4 mb-8 bg-gradient-to-br from-[#306CEC]/5 to-transparent p-6 rounded-2xl border border-[#306CEC]/10">
            <h3 className="text-2xl font-bold text-[#306CEC] flex items-center gap-2">
              <Sparkles className="w-6 h-6" strokeWidth={2} /> Key Highlights
            </h3>

            {event.highlights.map((highlight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-start space-x-3 group"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#306CEC] to-[#4A80FF] mt-2 flex-shrink-0 group-hover:scale-150 transition-transform"></div>
                <p className="text-gray-700 text-lg group-hover:text-[#306CEC] transition-colors">
                  {highlight}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

/* --------------------------- Event Gallery Card --------------------------- */

const EventGalleryCard = ({ image, title, category, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.3 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05, y: -10 }}
    className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl group cursor-pointer"
  >
    <img
      src={image}
      alt={title}
      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6 group-hover:from-[#306CEC]/90 transition-all duration-500">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
        className="bg-white/90 backdrop-blur-sm text-[#306CEC] px-3 py-1 rounded-full text-xs font-bold inline-block w-fit mb-2 shadow-lg"
      >
        {category}
      </motion.div>
      <h3 className="text-[#FFFEF9] text-xl font-bold group-hover:scale-105 transition-transform origin-left">{title}</h3>
    </div>
  </motion.div>
);

/* ---------------------------- Main Events Page --------------------------- */

export default function EventsPage() {
  const featuredEvents = [
    {
      title: "Round Xchange",
      status: "Upcoming",
      date: "Febuary 7th 2026",
      description:
        "The premier networking and knowledge-sharing event connecting founders, investors, and ecosystem players. Round Xchange brings together the brightest minds in African entrepreneurship for a day of insights, connections, and opportunities.",
      highlights: [
        "Connect with leading investors and venture capitalists",
        "Pitch sessions with live feedback from experienced entrepreneurs",
        "Roundtable discussions on scaling, fundraising, and market expansion",
        "Networking sessions with 200+ founders and ecosystem players",
        "Expert panels on current trends in African tech and innovation"
      ],
      speakers: ["Industry Leaders", "Successful Founders", "Top Investors", "Policy Makers"],
      image: "/events/round-xchange.png",
      cta: "Register for Round Xchange"
    },
    {
      title: "Beyond Capital",
      status: "Past Event",
      description:
        "An intensive deep-dive into alternative funding strategies and capital creation for African startups. Learn how to build sustainable businesses without traditional venture capital.",
      highlights: [
        "Bootstrapping strategies from successful founders",
        "Alternative funding methods: grants, competitions, crowdfunding",
        "Revenue model design and optimization",
        "Strategic partnerships for growth",
        "Financial modeling and unit economics"
      ],
      speakers: ["Self-funded Entrepreneurs", "Financial Advisors", "Grant Experts", "Strategic Investors"],
      image: "/events/beyond-capital.jpg"
    },
     {
      title: "Beyond Now",
      status: "Past Event",
      description:
        "A transformative event focused on the future of entrepreneurship in the age of artificial intelligence. Explore how AI is reshaping industries and creating new opportunities for African founders.",
      highlights: [
         "AI applications for African startups",
        "Building AI-powered products on a budget",
        "Ethical AI considerations and responsible innovation",
        "Real-world case studies from AI startups",
        "Hands-on workshops with AI tools and frameworks"
      ],
      speakers: ["Self-funded Entrepreneurs", "Financial Advisors", "Grant Experts", "Strategic Investors"],
      image: "/events/beyond-now.png"
    }
  ];

  const eventGallery = [
    {
      image: "/gallery/workshop-1.jpg",
      title: "Workshop Session",
      category: "Beyond Capital"
    },
    {
      image: "/gallery/panel-1.jpg",
      title: "Open mic",
      category: "Beyond Capital"
    },
    {
      image: "/gallery/networking-1.png",
      title: "Networking Break",
      category: "Beyond Capital"
    }
   
  ];

  const expectations = [
    {
      Icon: Mic,
      title: "Expert Speakers",
      description: "Learn from successful entrepreneurs across Africa and beyond."
    },
    {
      Icon: Handshake,
      title: "Networking Opportunities",
      description: "Meet founders, investors, mentors, and ecosystem leaders."
    },
    {
      Icon: Lightbulb,
      title: "Actionable Insights",
      description: "Gain practical tools and frameworks you can apply instantly."
    },
    {
      Icon: Target,
      title: "Interactive Sessions",
      description: "Workshops, roundtables, and deep-dive Q&A sessions."
    },
    {
      Icon: Globe,
      title: "Decentralized Access",
      description: "Participate in person or virtually from different counties."
    },
    {
      Icon: Rocket,
      title: "Growth Opportunities",
      description: "Funding, partnerships, and scaling frameworks."
    }
  ];

  return (
    <div className="font-sans bg-[#FFFEF9]">
      <Navbar />

      {/* HEADER */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-[#306CEC]/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-96 h-96 bg-[#4A80FF]/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#306CEC] via-[#4A80FF] to-[#306CEC] bg-clip-text text-transparent">
                Our Events
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Transformative experiences designed to accelerate your entrepreneurial journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURED SECTION */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          {featuredEvents.map((event, index) => (
            <FeaturedEventCard key={index} event={event} index={index} />
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#F5F5F0] to-[#FFFEF9]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <Camera className="w-14 h-14 text-[#306CEC] mx-auto" strokeWidth={1.5} />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#306CEC] to-[#4A80FF] bg-clip-text text-transparent mb-4">
              Event Highlights
            </h2>

            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">Moments captured from our past events</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventGallery.map((item, index) => (
              <EventGalleryCard key={index} {...item} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#306CEC] to-[#4A80FF] bg-clip-text text-transparent mb-4">
              What to Expect at Our Events
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {expectations.map((item, index) => {
              const IconComponent = item.Icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 group transition-all"
                >
                  <IconComponent className="w-14 h-14 mb-4 text-[#306CEC] group-hover:text-[#4A80FF] transition-colors" strokeWidth={1.5} />
                  <h3 className="text-2xl font-bold text-[#306CEC] mb-3">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}