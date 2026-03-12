import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Users, TrendingUp, Target, BarChart3,
  CheckCircle, Clock, Globe, Lightbulb, Building2,
  ArrowRight, ChevronDown, ChevronUp, Rocket,
  GraduationCap, Handshake, Megaphone, Award,
  PieChart, Activity, Zap, Heart
} from "lucide-react";
import { useDarkMode } from "../DarkModeContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

// ─── Data ────────────────────────────────────────────────────────────────────

const impactMetrics = [
  { label: "Founders Reached", value: "150+", icon: Users, color: "#306CEC" },
  { label: "Pitches Delivered", value: "32", icon: Megaphone, color: "#10B981" },
  { label: "Mentorship Sessions", value: "48", icon: GraduationCap, color: "#F59E0B" },
  { label: "Partnerships Formed", value: "12", icon: Handshake, color: "#306CEC" },
];

const reportSections = [
  {
    id: "overview",
    title: "Campaign Overview",
    icon: Globe,
    content: `The Impact360 Decentralization Roadshow landed in Nakuru as part of our mission to bring innovation infrastructure, entrepreneurial support, and tech ecosystem services beyond Nairobi. Nakuru, Kenya's fourth-largest city and a rapidly growing economic hub in the Rift Valley, was chosen for its vibrant youth population, emerging startup scene, and untapped potential for innovation-led growth.`,
    highlight: "Nakuru — Rift Valley's Innovation Frontier",
  },
  {
    id: "objectives",
    title: "Campaign Objectives",
    icon: Target,
    items: [
      "Map and connect the local entrepreneurial ecosystem in Nakuru County",
      "Identify high-potential founders and startups for incubation & acceleration",
      "Deliver practical workshops on business validation, pitching, and fundraising",
      "Establish partnerships with local universities, hubs, and county government",
      "Create a replicable decentralization playbook for future county roadshows",
    ],
  },
  {
    id: "activities",
    title: "Key Activities & Timeline",
    icon: Clock,
    timeline: [
      {
        phase: "Pre-Event Outreach",
        date: "Week 1-2",
        description: "Community mobilization through university partnerships, social media campaigns, and local hub collaborations. Over 500 applications received.",
        status: "completed",
      },
      {
        phase: "Founder Discovery Day",
        date: "Day 1",
        description: "Open pitch sessions where 32 founders presented their ideas to a panel of mentors and investors. Focus areas: AgriTech, FinTech, EdTech, and HealthTech.",
        status: "completed",
      },
      {
        phase: "Masterclass & Workshops",
        date: "Day 2",
        description: "Hands-on workshops covering lean startup methodology, financial modelling, product-market fit, and go-to-market strategies.",
        status: "completed",
      },
      {
        phase: "Ecosystem Roundtable",
        date: "Day 3",
        description: "Stakeholder forum with Nakuru County officials, university deans, local business leaders, and ecosystem builders to align on long-term support frameworks.",
        status: "completed",
      },
      {
        phase: "Follow-Up & Incubation Selection",
        date: "Week 3-4",
        description: "Evaluation of top founders for Impact360 incubation cohort. 8 startups selected for the accelerator pipeline.",
        status: "completed",
      },
    ],
  },
  {
    id: "findings",
    title: "Key Findings",
    icon: Lightbulb,
    findings: [
      {
        title: "Untapped Talent Pool",
        description: "Nakuru hosts 6+ universities and technical colleges producing graduates with strong technical skills but limited access to startup support systems.",
        metric: "6+ Institutions",
        icon: GraduationCap,
      },
      {
        title: "AgriTech Dominance",
        description: "Over 40% of pitches focused on agricultural technology — reflecting Nakuru's position as a farming economy ripe for digital transformation.",
        metric: "40% AgriTech",
        icon: TrendingUp,
      },
      {
        title: "Funding Gap",
        description: "Most founders reported zero access to formal funding mechanisms. Angel networks and VC presence is virtually nonexistent outside Nairobi.",
        metric: "0 Local VCs",
        icon: BarChart3,
      },
      {
        title: "Infrastructure Needs",
        description: "Lack of co-working spaces, reliable internet, and innovation hubs remains the top barrier. Only 2 functional tech hubs identified in the county.",
        metric: "2 Tech Hubs",
        icon: Building2,
      },
    ],
  },
  {
    id: "outcomes",
    title: "Outcomes & Impact",
    icon: Award,
    outcomes: [
      { label: "Startups Selected for Incubation", value: "8", description: "Top ventures chosen from 32 pitches for the Impact360 accelerator pipeline" },
      { label: "MoUs Signed", value: "4", description: "Partnerships with Kabarak University, Egerton University, Nakuru County Government, and Rift Valley Tech Hub" },
      { label: "Jobs Projected (12 months)", value: "60+", description: "Estimated direct employment from the 8 selected ventures within their first operational year" },
      { label: "Community Members Engaged", value: "500+", description: "Total reach through events, social media, and partner networks during the campaign" },
    ],
  },
];

const recommendations = [
  {
    title: "Establish a Nakuru Innovation Satellite",
    description: "Set up a permanent Impact360 presence in Nakuru through a partnership with an existing hub or university to provide ongoing mentorship and resources.",
    priority: "High",
    icon: Building2,
  },
  {
    title: "Launch AgriTech Vertical Program",
    description: "Given the dominant interest in agricultural technology, develop a specialized AgriTech incubation track for Rift Valley founders.",
    priority: "High",
    icon: Rocket,
  },
  {
    title: "County Government Integration",
    description: "Work with Nakuru County to integrate startup support into the County Integrated Development Plan (CIDP) and access devolution funds.",
    priority: "Medium",
    icon: Handshake,
  },
  {
    title: "Quarterly Follow-Up Events",
    description: "Schedule quarterly check-ins and mini-bootcamps to maintain momentum, track founder progress, and onboard new participants.",
    priority: "Medium",
    icon: Clock,
  },
];

const sectorBreakdown = [
  { name: "AgriTech", percentage: 40, color: "#10B981" },
  { name: "FinTech", percentage: 22, color: "#306CEC" },
  { name: "EdTech", percentage: 18, color: "#F59E0B" },
  { name: "HealthTech", percentage: 12, color: "#EF4444" },
  { name: "Other", percentage: 8, color: "#64748B" },
];

// ─── Animation Variants ─────────────────────────────────────────────────────

const fadeRise = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1 },
};

// ─── Sub-Components ──────────────────────────────────────────────────────────

function MetricCard({ metric, index, darkMode }) {
  const Icon = metric.icon;
  return (
    <motion.div
      variants={scaleIn}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.03 }}
      className={`relative overflow-hidden rounded-2xl p-6 text-center group cursor-default ${
        darkMode
          ? "bg-[#1a1f3a] border border-gray-700/50"
          : "bg-white border border-gray-100 shadow-lg shadow-gray-200/50"
      }`}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{ backgroundColor: metric.color }}
      />
      <div
        className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${metric.color}15` }}
      >
        <Icon className="w-7 h-7" style={{ color: metric.color }} />
      </div>
      <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color: metric.color }}>
        {metric.value}
      </p>
      <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
        {metric.label}
      </p>
    </motion.div>
  );
}

function TimelineItem({ item, index, darkMode }) {
  return (
    <motion.div
      variants={fadeRise}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex gap-4 md:gap-6"
    >
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-[#306CEC] flex items-center justify-center shrink-0 shadow-lg shadow-[#306CEC]/30">
          <CheckCircle className="w-5 h-5 text-white" />
        </div>
        {index < 4 && (
          <div className={`w-0.5 flex-1 mt-2 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} />
        )}
      </div>

      {/* Content */}
      <div className={`pb-8 flex-1 rounded-xl p-4 -mt-1 ${darkMode ? "bg-[#1a1f3a]/50" : "bg-gray-50"}`}>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#306CEC]/10 text-[#306CEC]">
            {item.date}
          </span>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-500/10 text-green-500">
            Completed
          </span>
        </div>
        <h4 className={`text-lg font-bold mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
          {item.phase}
        </h4>
        <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

function SectorBar({ sector, darkMode }) {
  return (
    <motion.div
      variants={fadeRise}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className={`text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          {sector.name}
        </span>
        <span className="text-sm font-bold" style={{ color: sector.color }}>
          {sector.percentage}%
        </span>
      </div>
      <div className={`w-full h-3 rounded-full overflow-hidden ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: sector.color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${sector.percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

function AccordionSection({ section, darkMode }) {
  const [open, setOpen] = useState(false);
  const Icon = section.icon;

  return (
    <motion.div
      variants={fadeRise}
      className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
        darkMode
          ? "bg-[#1a1f3a] border-gray-700/50 hover:border-[#306CEC]/50"
          : "bg-white border-gray-100 shadow-md hover:shadow-lg"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#306CEC]/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-[#306CEC]" />
          </div>
          <h3 className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            {section.title}
          </h3>
        </div>
        {open ? (
          <ChevronUp className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
        ) : (
          <ChevronDown className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`px-5 md:px-6 pb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              {section.content && (
                <p className="text-base leading-relaxed">{section.content}</p>
              )}
              {section.items && (
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#306CEC] mt-0.5 shrink-0" />
                      <span className="text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function CampaignReport() {
  const { darkMode } = useDarkMode();
  const [showQR, setShowQR] = useState(false);

  return (
    <div
      className={`font-sans transition-colors duration-1000 min-h-screen ${
        darkMode ? "bg-black" : "bg-[#F5F6F8]"
      }`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
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
            className={`rounded-3xl p-8 max-w-md w-full relative shadow-2xl ${darkMode ? 'bg-[#1a1f3a]' : 'bg-white'}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQR(false)}
              className={`absolute top-4 right-4 text-2xl font-bold ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
            >
              ×
            </button>
            <div className="text-center space-y-6">
              <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Join Our Community</h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Scan the QR code to join our WhatsApp community</p>
              <div className={`p-8 rounded-2xl flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <img 
                  src="/frame.png" 
                  alt="WhatsApp QR Code"
                  className="w-64 h-64 object-contain"
                />
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Or click below to join directly</p>
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

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#162044] to-[#1a1f3a]" />

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(48,108,236,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(48,108,236,0.3) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Floating orbs */}
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 rounded-full bg-[#306CEC]/20 blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-[#306CEC]/15 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-32">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#306CEC]/20 border border-[#306CEC]/30 mb-8"
          >
            <Activity className="w-4 h-4 text-[#306CEC]" />
            <span className="text-sm font-semibold text-[#306CEC]">Campaign Report</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight"
          >
            State of{" "}
            <span className="bg-gradient-to-r from-[#306CEC] via-[#5b8af5] to-[#4a7eec] bg-clip-text text-transparent">
              Decentralization
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <MapPin className="w-5 h-5 text-[#306CEC]" />
            <span className="text-xl md:text-2xl font-semibold text-gray-300">Nakuru County, Kenya</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            A comprehensive report on Impact360's decentralization roadshow in Nakuru — mapping talent, 
            connecting ecosystems, and building the foundation for innovation beyond the capital.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="#report"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#306CEC] text-white font-bold rounded-full hover:bg-[#2558c9] transition-all duration-300 shadow-lg shadow-[#306CEC]/30 hover:shadow-[#306CEC]/50"
            >
              Read Full Report <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ IMPACT METRICS ═══════════ */}
      <motion.section
        id="report"
        className={`py-20 px-6 transition-colors duration-1000 ${darkMode ? "bg-black" : "bg-[#F5F6F8]"}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeRise} className="text-center mb-14">
            <span className="text-sm font-bold text-[#306CEC] tracking-widest uppercase">Impact At A Glance</span>
            <h2 className={`text-3xl md:text-5xl font-extrabold mt-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Nakuru Campaign Numbers
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {impactMetrics.map((metric, i) => (
              <MetricCard key={metric.label} metric={metric} index={i} darkMode={darkMode} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* ═══════════ REPORT OVERVIEW & OBJECTIVES (Accordion) ═══════════ */}
      <motion.section
        className={`py-20 px-6 transition-colors duration-1000 ${darkMode ? "bg-[#0a0f1e]" : "bg-white"}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
      >
        <div className="max-w-4xl mx-auto space-y-4">
          <motion.div variants={fadeRise} className="text-center mb-10">
            <span className="text-sm font-bold text-[#306CEC] tracking-widest uppercase">Deep Dive</span>
            <h2 className={`text-3xl md:text-4xl font-extrabold mt-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Campaign Details
            </h2>
          </motion.div>

          {reportSections.slice(0, 2).map((section) => (
            <AccordionSection key={section.id} section={section} darkMode={darkMode} />
          ))}
        </div>
      </motion.section>

      {/* ═══════════ TIMELINE ═══════════ */}
      <motion.section
        className={`py-20 px-6 transition-colors duration-1000 ${darkMode ? "bg-black" : "bg-[#F5F6F8]"}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
      >
        <div className="max-w-3xl mx-auto">
          <motion.div variants={fadeRise} className="text-center mb-14">
            <span className="text-sm font-bold text-[#306CEC] tracking-widest uppercase">Activities</span>
            <h2 className={`text-3xl md:text-4xl font-extrabold mt-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Campaign Timeline
            </h2>
          </motion.div>

          <div className="space-y-0">
            {reportSections[2].timeline.map((item, i) => (
              <TimelineItem key={item.phase} item={item} index={i} darkMode={darkMode} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* ═══════════ KEY FINDINGS ═══════════ */}
      <motion.section
        className={`py-20 px-6 transition-colors duration-1000 ${darkMode ? "bg-[#0a0f1e]" : "bg-white"}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeRise} className="text-center mb-14">
            <span className="text-sm font-bold text-[#306CEC] tracking-widest uppercase">Insights</span>
            <h2 className={`text-3xl md:text-4xl font-extrabold mt-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Key Findings
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {reportSections[3].findings.map((finding, i) => {
              const FIcon = finding.icon;
              return (
                <motion.div
                  key={finding.title}
                  variants={fadeRise}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={`rounded-2xl p-6 border transition-all duration-300 ${
                    darkMode
                      ? "bg-[#1a1f3a] border-gray-700/50 hover:border-[#306CEC]/40"
                      : "bg-[#F5F6F8] border-gray-100 hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#306CEC]/10 flex items-center justify-center shrink-0">
                      <FIcon className="w-6 h-6 text-[#306CEC]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                          {finding.title}
                        </h4>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#306CEC]/10 text-[#306CEC]">
                          {finding.metric}
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {finding.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ═══════════ SECTOR BREAKDOWN ═══════════ */}
      <motion.section
        className={`py-20 px-6 transition-colors duration-1000 ${darkMode ? "bg-black" : "bg-[#F5F6F8]"}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeRise} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-3">
              <PieChart className="w-5 h-5 text-[#306CEC]" />
              <span className="text-sm font-bold text-[#306CEC] tracking-widest uppercase">Sectors</span>
            </div>
            <h2 className={`text-3xl md:text-4xl font-extrabold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Pitch Sector Breakdown
            </h2>
            <p className={`mt-3 text-base ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Distribution of startup pitches by industry vertical during the Nakuru roadshow
            </p>
          </motion.div>

          <motion.div
            variants={fadeRise}
            className={`rounded-2xl p-8 border ${
              darkMode ? "bg-[#1a1f3a] border-gray-700/50" : "bg-white border-gray-100 shadow-lg"
            }`}
          >
            <div className="space-y-6">
              {sectorBreakdown.map((sector) => (
                <SectorBar key={sector.name} sector={sector} darkMode={darkMode} />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══════════ OUTCOMES ═══════════ */}
      <motion.section
        className={`py-20 px-6 transition-colors duration-1000 ${darkMode ? "bg-[#0a0f1e]" : "bg-white"}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeRise} className="text-center mb-14">
            <span className="text-sm font-bold text-[#306CEC] tracking-widest uppercase">Results</span>
            <h2 className={`text-3xl md:text-4xl font-extrabold mt-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Campaign Outcomes
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {reportSections[4].outcomes.map((outcome, i) => (
              <motion.div
                key={outcome.label}
                variants={fadeRise}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-6 border-l-4 border-l-[#306CEC] ${
                  darkMode ? "bg-[#1a1f3a]" : "bg-[#F5F6F8]"
                }`}
              >
                <p className="text-4xl font-extrabold text-[#306CEC] mb-2">{outcome.value}</p>
                <h4 className={`text-lg font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {outcome.label}
                </h4>
                <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {outcome.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ═══════════ RECOMMENDATIONS ═══════════ */}
      <motion.section
        className={`py-20 px-6 transition-colors duration-1000 ${darkMode ? "bg-black" : "bg-[#F5F6F8]"}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeRise} className="text-center mb-14">
            <span className="text-sm font-bold text-[#306CEC] tracking-widest uppercase">Next Steps</span>
            <h2 className={`text-3xl md:text-4xl font-extrabold mt-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Recommendations
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {recommendations.map((rec, i) => {
              const RIcon = rec.icon;
              return (
                <motion.div
                  key={rec.title}
                  variants={fadeRise}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={`rounded-2xl p-6 border transition-all duration-300 relative overflow-hidden ${
                    darkMode
                      ? "bg-[#1a1f3a] border-gray-700/50"
                      : "bg-white border-gray-100 shadow-md hover:shadow-xl"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#306CEC]/10 flex items-center justify-center shrink-0">
                      <RIcon className="w-6 h-6 text-[#306CEC]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                          {rec.title}
                        </h4>
                      </div>
                      <span
                        className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${
                          rec.priority === "High"
                            ? "bg-red-500/10 text-red-500"
                            : "bg-yellow-500/10 text-yellow-600"
                        }`}
                      >
                        {rec.priority} Priority
                      </span>
                      <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {rec.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ═══════════ CTA ═══════════ */}
      <motion.section
        className="relative py-24 px-6 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeRise}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#306CEC] via-[#4a7eec] to-[#2558c9]" />
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            variants={fadeRise}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6"
          >
            <Heart className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white/90">Be Part of the Movement</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Decentralization Starts With You
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
            Whether you're a founder, mentor, investor, or community leader — join Impact360 in
            building thriving innovation ecosystems across every county in Kenya.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowQR(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#306CEC] font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              <Zap className="w-4 h-4" />
              Join Impact360
            </button>
            <a
              href="/events"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300"
            >
              View Upcoming Events
            </a>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
