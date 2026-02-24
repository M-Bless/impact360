import React from "react";
import { motion } from "framer-motion";
import { Rocket, Zap, GraduationCap, Wrench, Dumbbell, Laptop, Handshake, Mic, Calendar, Users, Globe, Lightbulb, Link, Target, Sparkles } from "lucide-react";
import { useDarkMode } from "../DarkModeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const ProgramCard = ({ Icon, title, description, features, gradient, delay = 0, darkMode }) => (
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
      <Icon className="w-16 h-16 mb-6" strokeWidth={1.5} />
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

const EventCard = ({ type, title, description, image, delay = 0, darkMode }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.2 }}
    viewport={{ once: true }}
    whileHover={{ y: -12, scale: 1.02 }}
    className={`rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group ${
      darkMode ? 'bg-[#1a1f3a] border border-[#306CEC]/20' : 'bg-white'
    }`}
  >
    <div className="relative h-64 overflow-hidden">
      <motion.img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className={`absolute inset-0 flex items-end p-0 transition-all duration-500 ${
        'bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:from-black group-hover:via-black/40'
      }`}>
        {/* Overlay content can go here if needed */}
      </div>
      <div className={`absolute top-4 left-4 px-4 py-2 rounded-full font-bold text-sm ${
        darkMode
          ? 'bg-[#306CEC] text-white'
          : 'bg-[#FFFEF9] text-[#306CEC]'
      }`}>
        {type}
      </div>
    </div>
    <div className="p-8">
      <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`}>{title}</h3>
      <p className={`leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
    </div>
  </motion.div>
);

export default function ProgramsPage() {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const handleSubscribe = () => {
    navigate("/subscription");
  };

  const mainPrograms = [
    {
      Icon: Rocket,
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
      gradientLight: "bg-gradient-to-br from-[#306CEC] to-[#1a4d9e]",
      gradientDark: "bg-gradient-to-br from-[#1a3a66] to-[#0f1f3a]"
    },
    {
      Icon: Zap,
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
      gradientLight: "bg-gradient-to-br from-[#1a4d9e] to-[#000000]",
      gradientDark: "bg-gradient-to-br from-[#1a2d4d] to-[#0f1a2e]"
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
      Icon: GraduationCap,
      title: "Masterclasses",
      description: "Deep-dive sessions with successful entrepreneurs who share years of experience building and scaling businesses."
    },
    {
      Icon: Wrench,
      title: "Workshops",
      description: "Hands-on, practical sessions focused on specific skills like pitch development, financial modeling, and product design."
    },
    {
      Icon: Dumbbell,
      title: "Bootcamps",
      description: "Intensive multi-day programs covering comprehensive topics from fundraising to market entry strategies."
    },
    {
      Icon: Laptop,
      title: "Hackathons",
      description: "Collaborative coding events where teams build innovative solutions to real-world challenges in limited time."
    },
    {
      Icon: Handshake,
      title: "Meetups",
      description: "Casual networking events connecting founders, mentors, investors, and ecosystem players."
    },
    {
      Icon: Mic,
      title: "Panel Discussions",
      description: "Expert panels discussing current trends, challenges, and opportunities in entrepreneurship and innovation."
    }
  ];

  const benefits = [
    {
      Icon: Users,
      title: "Expert Mentorship",
      description: "Connect with successful entrepreneurs who have built and scaled businesses in Africa and beyond."
    },
    {
      Icon: Globe,
      title: "Decentralized Access",
      description: "Programs and events delivered across counties and towns, not just in capital cities."
    },
    {
      Icon: Lightbulb,
      title: "Practical Learning",
      description: "Real-world knowledge and actionable insights you can apply immediately to your venture."
    },
    {
      Icon: Link,
      title: "Community Network",
      description: "Join a growing community of 10,000+ founders, mentors, and supporters across Africa."
    }
  ];

  const mainPrograms_with_gradient = mainPrograms.map(p => ({
    ...p,
    gradient: darkMode ? p.gradientDark : p.gradientLight
  }));

  return (
    <div className={`font-sans transition-colors duration-1000 ${darkMode ? 'bg-[#000000]' : 'bg-[#FFFEF9]'}`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className={`relative pt-32 pb-16 px-6 overflow-hidden transition-colors duration-1000 ${darkMode ? 'bg-[#000000]' : 'bg-[#FFFEF9]'}`}>
        {/* Animated background shapes */}
        <motion.div
          className={`absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl ${darkMode ? 'bg-[#306CEC]/10' : 'bg-[#306CEC]/5'}`}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className={`absolute bottom-10 left-10 w-96 h-96 rounded-full blur-3xl ${darkMode ? 'bg-[#306CEC]/10' : 'bg-[#4A80FF]/5'}`}
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className={`bg-clip-text text-transparent ${
                darkMode
                  ? 'bg-gradient-to-r from-[#306CEC] via-[#4A80FF] to-[#306CEC]'
                  : 'bg-gradient-to-r from-[#306CEC] via-[#4A80FF] to-[#306CEC]'
              }`}>
                Our Programs
              </span>
            </h1>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Comprehensive programs designed to support you at every stage of your entrepreneurial journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Programs Section */}
      <section className={`py-16 px-6 transition-colors duration-1000 ${darkMode ? 'bg-[#000000]' : 'bg-[#FFFEF9]'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {mainPrograms_with_gradient.map((program, index) => (
              <ProgramCard key={index} {...program} delay={index * 0.2} darkMode={darkMode} />
            ))}
          </div>
        </div>
      </section>

      {/* FORGE WEEKLY SESSION */}
      <section className={`py-24 px-6 transition-colors duration-1000 ${
        darkMode
          ? 'bg-[#000000]'
          : 'bg-gradient-to-b from-[#F5F5F0] to-[#FFFEF9]'
      }`}>
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, #306CEC 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0,}}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, }}
              className="inline-block mb-6"
            >
              <div className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider shadow-2xl ${
                darkMode
                  ? 'bg-gradient-to-r from-[#306CEC] to-[#4A80FF] text-white'
                  : 'bg-gradient-to-r from-[#306CEC] to-[#4A80FF] text-white'
              }`}>
                 Weekly Session
              </div>
            </motion.div>
            
            <h2 className={`text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent ${
              darkMode
                ? 'bg-gradient-to-r from-[#306CEC] via-[#4A80FF] to-[#306CEC]'
                : 'bg-gradient-to-r from-[#306CEC] via-[#4A80FF] to-[#306CEC]'
            }`}>
              FORGE
            </h2>
            
            <p className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-[#4A80FF]' : 'text-[#306CEC]'}`}>
              Happens Every Week
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl group"
            >
              <img
                src="/events/forge.png"
                alt="FORGE Weekly Build Session"
                className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className={`absolute inset-0 ${
                darkMode
                  ? 'bg-gradient-to-t from-[#306CEC]/80 via-[#306CEC]/20 to-transparent'
                  : 'bg-gradient-to-t from-[#306CEC]/70 via-[#306CEC]/20 to-transparent'
              }`}></div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-6 right-6"
              >
                
              </motion.div>
            </motion.div>

            {/* CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className={`text-xl leading-relaxed mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                A weekly build session where we take <span className={`font-bold ${darkMode ? 'text-[#4A80FF]' : 'text-[#306CEC]'}`}>raw ideas</span> and turn them into <span className={`font-bold ${darkMode ? 'text-[#4A80FF]' : 'text-[#306CEC]'}`}>real businesses</span>, <span className={`font-bold ${darkMode ? 'text-[#4A80FF]' : 'text-[#306CEC]'}`}>real systems</span>, and <span className={`font-bold ${darkMode ? 'text-[#4A80FF]' : 'text-[#306CEC]'}`}>real action</span>.
              </p>

              <div className={`space-y-6 mb-10 p-8 rounded-2xl border transition-colors duration-1000 ${
                darkMode
                  ? 'bg-[#1a1f3a] border-[#306CEC]/30'
                  : 'bg-white border-[#306CEC]/10 shadow-lg'
              }`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-4 group"
                >
                  <Rocket className={`w-6 h-6 flex-shrink-0 mt-1 group-hover:scale-125 transition-transform ${
                    darkMode ? 'text-[#4A80FF]' : 'text-[#306CEC]'
                  }`} strokeWidth={2} />
                  <div>
                    <h4 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Live, Practical & Hands-On</h4>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Build in real-time with guidance and feedback</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start gap-4 group"
                >
                  <Target className={`w-6 h-6 flex-shrink-0 mt-1 group-hover:scale-125 transition-transform ${
                    darkMode ? 'text-[#4A80FF]' : 'text-[#306CEC]'
                  }`} strokeWidth={2} />
                  <div>
                    <h4 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>No Theory, No Waiting</h4>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Skip the fluff and get straight to execution</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start gap-4 group"
                >
                  <Sparkles className={`w-6 h-6 flex-shrink-0 mt-1 group-hover:scale-125 transition-transform ${
                    darkMode ? 'text-[#4A80FF]' : 'text-[#306CEC]'
                  }`} strokeWidth={2} />
                  <div>
                    <h4 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Just Execution</h4>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Turn ideas into tangible progress every single week</p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className={`p-6 rounded-2xl text-center font-bold text-lg shadow-2xl ${
                  darkMode
                    ? 'bg-gradient-to-r from-[#306CEC] to-[#4A80FF] text-white'
                    : 'bg-gradient-to-r from-[#306CEC] to-[#4A80FF] text-white'
                }`}
              >
                If you're ready to stop planning and start building, this is your room.
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* IMPACT360 OS SECTION */}
      <section className={`py-24 px-6 transition-colors duration-1000 ${
        darkMode
          ? 'bg-[#000000]'
          : 'bg-gradient-to-b from-[#F5F5F0] to-[#FFFEF9]'
      }`}>
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, #306CEC 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0,}}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, }}
              className="inline-block mb-6"
            >
              <div className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider shadow-2xl ${
                darkMode
                  ? 'bg-gradient-to-r from-[#306CEC] to-[#4A80FF] text-white'
                  : 'bg-gradient-to-r from-[#306CEC] to-[#4A80FF] text-white'
              }`}>
                 Our Infrastructure
              </div>
            </motion.div>
            
            <h2 className={`text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent ${
              darkMode
                ? 'bg-gradient-to-r from-[#306CEC] via-[#4A80FF] to-[#306CEC]'
                : 'bg-gradient-to-r from-[#306CEC] via-[#4A80FF] to-[#306CEC]'
            }`}>
              Impact360 OS
            </h2>
            
            <p className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-[#4A80FF]' : 'text-[#306CEC]'}`}>
              The Operating System For African Builders
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className={`text-xl leading-relaxed mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                A comprehensive ecosystem designed to <span className={`font-bold ${darkMode ? 'text-[#4A80FF]' : 'text-[#306CEC]'}`}>empower African entrepreneurs</span> with <span className={`font-bold ${darkMode ? 'text-[#4A80FF]' : 'text-[#306CEC]'}`}>tools, networks</span>, and <span className={`font-bold ${darkMode ? 'text-[#4A80FF]' : 'text-[#306CEC]'}`}>resources</span> to build world-class solutions.
              </p>

              <div className={`space-y-6 mb-10 p-8 rounded-2xl border transition-colors duration-1000 ${
                darkMode
                  ? 'bg-[#1a1f3a] border-[#306CEC]/30'
                  : 'bg-white border-[#306CEC]/10 shadow-lg'
              }`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-4 group"
                >
                  <Laptop className={`w-6 h-6 flex-shrink-0 mt-1 group-hover:scale-125 transition-transform ${
                    darkMode ? 'text-[#4A80FF]' : 'text-[#306CEC]'
                  }`} strokeWidth={2} />
                  <div>
                    <h4 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Complete Tech Stack</h4>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Access to cutting-edge tools and technologies</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start gap-4 group"
                >
                  <Users className={`w-6 h-6 flex-shrink-0 mt-1 group-hover:scale-125 transition-transform ${
                    darkMode ? 'text-[#4A80FF]' : 'text-[#306CEC]'
                  }`} strokeWidth={2} />
                  <div>
                    <h4 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Global Network</h4>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Connect with builders and investors across Africa</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start gap-4 group"
                >
                  <Globe className={`w-6 h-6 flex-shrink-0 mt-1 group-hover:scale-125 transition-transform ${
                    darkMode ? 'text-[#4A80FF]' : 'text-[#306CEC]'
                  }`} strokeWidth={2} />
                  <div>
                    <h4 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Scale Globally</h4>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Build in Africa, scale to the world</p>
                  </div>
                </motion.div>
              </div>

              <motion.a
                href="https://impact360-os.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className={`inline-block p-6 rounded-2xl text-center font-bold text-lg shadow-2xl cursor-pointer transition-all ${
                  darkMode
                    ? 'bg-gradient-to-r from-[#306CEC] to-[#4A80FF] text-white hover:shadow-3xl'
                    : 'bg-gradient-to-r from-[#306CEC] to-[#4A80FF] text-white hover:shadow-3xl'
                }`}
              >
                Join the operating system built for African innovation.
              </motion.a>
            </motion.div>

            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl group"
            >
              <img
                src="https://i.pinimg.com/736x/f5/e8/72/f5e87230f73c9811d9f9a69feb392b5a.jpg"
                alt="Impact360 OS"
                className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className={`absolute inset-0 ${
                darkMode
                  ? 'bg-gradient-to-t from-[#306CEC]/80 via-[#306CEC]/20 to-transparent'
                  : 'bg-gradient-to-t from-[#306CEC]/70 via-[#306CEC]/20 to-transparent'
              }`}></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Events Overview Section */}
      <section className={`py-24 px-6 transition-colors duration-1000 ${
        darkMode
          ? 'bg-[#000000]'
          : 'bg-gradient-to-b from-[#F5F5F0] to-[#FFFEF9]'
      }`}>
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
              <GraduationCap className={`w-14 h-14 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} strokeWidth={1.5} />
            </motion.div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent ${
              darkMode
                ? 'bg-gradient-to-r from-[#306CEC] to-[#4A80FF]'
                : 'bg-gradient-to-r from-[#306CEC] to-[#4A80FF]'
            }`}>
              Learning Events
            </h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Connect with successful entrepreneurs who share years of experience and answer your questions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {eventTypes.map((type, index) => {
              const IconComponent = type.Icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group ${
                    darkMode
                      ? 'bg-[#1a1f3a] border border-[#306CEC]/20 hover:border-[#306CEC]'
                      : 'bg-white border border-gray-100'
                  }`}
                >
                  <IconComponent className={`w-14 h-14 mb-4 group-hover:transition-colors ${
                    darkMode
                      ? 'text-[#306CEC] group-hover:text-[#4A80FF]'
                      : 'text-[#306CEC] group-hover:text-[#4A80FF]'
                  }`} strokeWidth={1.5} />
                  <h3 className={`text-2xl font-bold mb-3 group-hover:transition-colors ${
                    darkMode
                      ? 'text-[#306CEC] group-hover:text-[#4A80FF]'
                      : 'text-[#306CEC] group-hover:text-[#4A80FF]'
                  }`}>{type.title}</h3>
                  <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{type.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

    {/* Upcoming Events Section */}
      <section className={`py-24 px-6 transition-colors duration-1000 ${darkMode ? 'bg-[#000000]' :  'bg-gradient-to-b from-[#F5F5F0] to-[#FFFEF9]'}`}>
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
              <Calendar className={`w-14 h-14 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} strokeWidth={1.5} />
            </motion.div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent ${
              darkMode
                ? 'bg-gradient-to-r from-[#306CEC] to-[#4A80FF]'
                : 'bg-gradient-to-r from-[#306CEC] to-[#4A80FF]'
            }`}>
              Upcoming Events
            </h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Join our next events and learn from those who have successfully built businesses
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <EventCard key={index} {...event} delay={index * 0.1} darkMode={darkMode} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}