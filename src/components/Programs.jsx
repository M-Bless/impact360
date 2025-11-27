import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const ProgramCard = ({ icon, title, description, features, gradient, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.2 }}
    viewport={{ once: true }}
    whileHover={{ y: -10, scale: 1.02 }}
    className={`${gradient} text-[#FFFEF9] p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden group`}
  >
    <div className="absolute top-0 right-0 w-40 h-40 bg-[#FFFEF9]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
    
    <div className="relative z-10">
      <div className="text-6xl mb-6">{icon}</div>
      <h3 className="text-3xl font-bold mb-4">{title}</h3>
      <p className="text-[#FFFEF9]/90 text-lg leading-relaxed mb-6">{description}</p>
      
      <div className="space-y-3">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-[#FFFEF9] mt-2 flex-shrink-0"></div>
            <p className="text-[#FFFEF9]/90">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const EventCard = ({ type, title, description, image, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.2 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
    className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
  >
    <div className="relative h-64 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#306CEC]/60 to-transparent"></div>
      <div className="absolute top-4 left-4 bg-[#FFFEF9] text-[#306CEC] px-4 py-2 rounded-full font-bold text-sm">
        {type}
      </div>
    </div>
    
    <div className="p-8">
      <h3 className="text-2xl font-bold text-[#306CEC] mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-6">{description}</p>
    </div>
  </motion.div>
);

export default function ProgramsPage() {
  const navigate = useNavigate();

  const handleSubscribe = () => {
    navigate("/subscription");
  };

  const mainPrograms = [
    {
      icon: "🚀",
      title: "Incubation Program",
      description: "Transform your idea into a viable business with structured support, mentorship, and resources over 3-6 months.",
      features: [
        "Idea validation and market research support",
        "Business model development workshops",
        "1-on-1 mentorship from experienced entrepreneurs",
        "Access to co-working spaces and resources",
        "Pitch training and investor connections",
        "Legal and technical advisory services"
      ],
      gradient: "bg-gradient-to-br from-[#306CEC] to-[#1a4d9e]"
    },
    {
      icon: "⚡",
      title: "Acceleration Program",
      description: "Scale your existing startup rapidly with intensive support, funding opportunities, and expert guidance over 3-4 months.",
      features: [
        "Growth strategy development and execution",
        "Access to funding and investment networks",
        "Marketing and sales optimization workshops",
        "Technical infrastructure scaling support",
        "Partnership and collaboration opportunities",
        "Demo day with investors and stakeholders"
      ],
      gradient: "bg-gradient-to-br from-[#1a4d9e] to-[#000000]"
    }
  ];

  const upcomingEvents = [
    {
      type: "Workshop",
      title: "From Idea to Market Fit",
      description: "Learn practical strategies for validating your idea, finding your target market, and achieving product-market fit from industry experts.",
      image: "/events/workshop.png"
    },
    {
      type: "Meetup",
      title: "Founders Connect",
      description: "Monthly networking event where founders, mentors, and investors come together to share experiences and build connections.",
      image: "/events/meetup.png"
    },
    {
      type: "Panel Discussion",
      title: "Scaling Beyond Borders",
      description: "Hear from founders who successfully expanded their businesses across Africa and internationally about challenges and opportunities.",
      image: "/events/panel.png"
    }
  ];

  const eventTypes = [
    {
      icon: "🎓",
      title: "Masterclasses",
      description: "Deep-dive sessions with successful entrepreneurs who share years of experience building and scaling businesses."
    },
    {
      icon: "🛠️",
      title: "Workshops",
      description: "Hands-on, practical sessions focused on specific skills like pitch development, financial modeling, and product design."
    },
    {
      icon: "⚡",
      title: "Bootcamps",
      description: "Intensive multi-day programs covering comprehensive topics from fundraising to market entry strategies."
    },
    {
      icon: "💻",
      title: "Hackathons",
      description: "Collaborative coding events where teams build innovative solutions to real-world challenges in limited time."
    },
    {
      icon: "🤝",
      title: "Meetups",
      description: "Casual networking events connecting founders, mentors, investors, and ecosystem players."
    },
    {
      icon: "🎤",
      title: "Panel Discussions",
      description: "Expert panels discussing current trends, challenges, and opportunities in entrepreneurship and innovation."
    }
  ];

  const benefits = [
    {
      icon: "👥",
      title: "Expert Mentorship",
      description: "Connect with successful entrepreneurs who have built and scaled businesses in Africa and beyond."
    },
    {
      icon: "🌍",
      title: "Decentralized Access",
      description: "Programs and events delivered across counties and towns, not just in capital cities."
    },
    {
      icon: "💡",
      title: "Practical Learning",
      description: "Real-world knowledge and actionable insights you can apply immediately to your venture."
    },
    {
      icon: "🔗",
      title: "Community Network",
      description: "Join a growing community of 10,000+ founders, mentors, and supporters across Africa."
    }
  ];

  return (
    <div className="font-sans bg-[#FFFEF9]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        {/* Animated background shapes */}
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

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#306CEC] to-[#4A80FF] flex items-center justify-center shadow-2xl shadow-[#306CEC]/30">
                <span className="text-4xl">🎯</span>
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#306CEC] via-[#4A80FF] to-[#306CEC] bg-clip-text text-transparent">
                Our Programs
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive programs designed to support you at every stage of your entrepreneurial journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Programs Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {mainPrograms.map((program, index) => (
              <ProgramCard key={index} {...program} delay={index * 0.2} />
            ))}
          </div>
        </div>
      </section>

      {/* Events Overview Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#F5F5F0] to-[#FFFEF9]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <span className="text-5xl">🎓</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#306CEC] to-[#4A80FF] bg-clip-text text-transparent mb-4">
              Learning Events
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with successful entrepreneurs who share years of experience and answer your questions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {eventTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <motion.div 
                  className="text-5xl mb-4 inline-block"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {type.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-[#306CEC] mb-3 group-hover:text-[#4A80FF] transition-colors">{type.title}</h3>
                <p className="text-gray-600 leading-relaxed">{type.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-24 px-6">
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
              <span className="text-5xl">📅</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#306CEC] to-[#4A80FF] bg-clip-text text-transparent mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Join our next events and learn from those who have successfully built businesses
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <EventCard key={index} {...event} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

    

    

      <Footer />
    </div>
  );
}