import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModalContext } from "../../../contexts/Context-moda";
import { useTheme } from "../../../contexts/ThemeContext";
import QribLikModal from "./modal";

// ─── Card data — bg/border defined as STATIC Tailwind class strings ──────────
// These are written fully so Tailwind's scanner picks them up at build time
const cards = [
  {
    id: 1,
    tag: "Events",
    icon: "✦",
    title: "Upcoming\nGatherings",
    desc: "Discover local & global events curated just for your community. From meetups to festivals, never miss what matters.",
    accent: "#8B3FDE",
    lightBg: "from-violet-50 to-purple-100",
    darkBg: "from-violet-950 to-purple-900",
    lightBorder: "border-violet-200",
    darkBorder: "border-violet-800",
    stats: [{ label: "This Week", val: "24" }, { label: "Cities", val: "12" }],
    cta: "Browse Events",
  },
  {
    id: 2,
    tag: "Sports",
    icon: "⬡",
    title: "Play &\nCompete",
    desc: "Join leagues, find teammates, and track your performance. Every game starts here — from pickup to pro.",
    accent: "#C837AB",
    lightBg: "from-pink-50 to-fuchsia-100",
    darkBg: "from-pink-950 to-fuchsia-900",
    lightBorder: "border-pink-200",
    darkBorder: "border-pink-800",
    stats: [{ label: "Active Leagues", val: "88" }, { label: "Players", val: "3k" }],
    cta: "Find a Game",
  },
  {
    id: 3,
    tag: "Trading",
    icon: "◈",
    title: "Trade &\nExchange",
    desc: "Buy, sell, and trade collectibles, gear, and goods. Trusted escrow and ratings keep every deal safe.",
    accent: "#a134c8",
    lightBg: "from-purple-50 to-violet-100",
    darkBg: "from-purple-950 to-violet-900",
    lightBorder: "border-purple-200",
    darkBorder: "border-purple-800",
    stats: [{ label: "Live Listings", val: "5.2k" }, { label: "Trades Done", val: "19k" }],
    cta: "Start Trading",
  },
  {
    id: 4,
    tag: "Lost & Found",
    icon: "◎",
    title: "Lost\nSomething?",
    desc: "Post lost items or report finds. Our geo-smart board connects owners with keepers across your neighbourhood.",
    accent: "#FF6B35",
    lightBg: "from-orange-50 to-amber-100",
    darkBg: "from-orange-950 to-amber-900",
    lightBorder: "border-orange-200",
    darkBorder: "border-orange-900",
    stats: [{ label: "Reunited", val: "740" }, { label: "Active Posts", val: "312" }],
    cta: "Post a Find",
  },
  {
    id: 5,
    tag: "Swap Skills",
    icon: "⟁",
    title: "Share Your\nTalent",
    desc: "Trade what you know. Offer guitar lessons, get web dev help. Skill-for-skill economy, no cash needed.",
    accent: "#e0356a",
    lightBg: "from-rose-50 to-pink-100",
    darkBg: "from-rose-950 to-pink-900",
    lightBorder: "border-rose-200",
    darkBorder: "border-rose-900",
    stats: [{ label: "Skills Listed", val: "2.1k" }, { label: "Matches", val: "890" }],
    cta: "Swap a Skill",
  },
];

const floatVariants = {
  animate: (i) => ({
    y: [0, -10, 0],
    transition: { duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" },
  }),
};

function Orb({ style, delay = 0, dark }) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl pointer-events-none"
      style={{ ...style, opacity: dark ? 0.12 : 0.28 }}
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 4, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

function Card({ card, index, dark }) {
  const [hovered, setHovered] = useState(false);
  const { setOpen } = useContext(ModalContext);

  // Pick the correct static class set based on dark flag
  const bgClass = dark ? card.darkBg : card.lightBg;
  const borderClass = dark ? card.darkBorder : card.lightBorder;

  return (
    <motion.div
      custom={index}
      variants={floatVariants}
      animate="animate"
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -12, scale: 1.03 }}
      className={`relative rounded-3xl border ${borderClass} bg-gradient-to-br ${bgClass} p-7 flex flex-col gap-5 cursor-pointer overflow-hidden shadow-sm`}
      style={{
        boxShadow: hovered ? `0 16px 40px ${card.accent}33` : undefined,
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${card.accent}22 0%, transparent 70%)` }}
      />

      {/* Tag row */}
      <div className="flex items-center justify-between">
        <motion.span
          className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{ background: `${card.accent}20`, color: card.accent }}
          animate={{ scale: hovered ? 1.06 : 1 }}
        >
          {card.tag}
        </motion.span>
        <motion.span
          className="text-2xl select-none"
          style={{ color: card.accent }}
          animate={{ rotate: hovered ? 90 : 0, scale: hovered ? 1.3 : 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {card.icon}
        </motion.span>
      </div>

      {/* Title */}
      <h3
        className={`text-2xl font-black leading-tight whitespace-pre-line transition-colors duration-500 ${dark ? "text-purple-50" : "text-gray-900"}`}
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {card.title}
      </h3>

      {/* Description */}
      <p className={`text-sm leading-relaxed flex-1 transition-colors duration-500 ${dark ? "text-purple-200/60" : "text-gray-500"}`}>
        {card.desc}
      </p>

      {/* Stats */}
      <div className="flex gap-5">
        {card.stats.map((s) => (
          <div key={s.label}>
            <p className={`text-xl font-black transition-colors duration-500 ${dark ? "text-purple-100" : "text-gray-800"}`}>
              {s.val}
            </p>
            <p className={`text-xs font-medium transition-colors duration-500 ${dark ? "text-purple-300/40" : "text-gray-400"}`}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen(true)}
        className="mt-1 w-full py-3 rounded-2xl cursor-pointer text-white text-sm font-bold tracking-wide"
        style={{ background: `linear-gradient(135deg, ${card.accent}, ${card.accent}aa)` }}
        animate={{ boxShadow: hovered ? `0 8px 24px ${card.accent}55` : `0 2px 8px ${card.accent}22` }}
        transition={{ duration: 0.3 }}
      >
        {card.cta} →
      </motion.button>
    </motion.div>
  );
}

export default function Cards() {
  const { dark } = useTheme();

  const words = ["Connect.", "Discover.", "Exchange.", "Belong."];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setWordIndex((i) => (i + 1) % words.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`
        :root {
          --gradient-qriblik: linear-gradient(135deg, #8B3FDE 0%, #C837AB 50%, #FF6B35 100%);
        }
      `}</style>

      {/* Root wrapper — Tailwind classes switch based on dark boolean */}
      <div
        className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${dark
            ? "bg-gradient-to-br from-[#0f0a1e] via-[#130820] to-[#0a0514]"
            : "bg-gradient-to-br from-slate-50 via-purple-50/40 to-orange-50/30"
          }`}
      >
        {/* ── HEADER ── */}
        <header className="relative overflow-hidden">

          <Orb dark={dark} style={{ width: 500, height: 500, background: "#8B3FDE", top: -180, left: -120 }} delay={0} />
          <Orb dark={dark} style={{ width: 400, height: 400, background: "#C837AB", top: -100, right: -80 }} delay={1.2} />
          <Orb dark={dark} style={{ width: 300, height: 300, background: "#FF6B35", bottom: -60, left: "40%" }} delay={0.6} />

          {/* Header inner — switches bg */}
          <div
            className={`relative flex-col flex gap-10 z-10 padding py-16 px-6 justify-between items-center text-center transition-colors duration-500 ${dark ? "bg-[#0d061a]/95" : "bg-[#FAF7FE]"
              }`}
          >
            <div className="flex justify-center flex-col items-center">

              {/* Main title */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={`text-6xl md:text-5xl lg:text-6xl font-black leading-none mb-4 transition-colors duration-500 ${dark ? "text-purple-50" : "text-gray-900"
                  }`}
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                What We Offer
              </motion.h1>

              {/* Animated word */}
              <div className="h-14 flex items-center justify-center mb-4">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="text-4xl md:text-5xl font-black"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      background: "var(--gradient-qriblik)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {words[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-center w-full">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.55 }}
                  className={`text-lg max-w-xl mx-auto text-center mb-10 leading-relaxed transition-colors duration-500 ${dark ? "text-purple-200/55" : "text-gray-500"
                    }`}
                >
                  Five ways to engage with the people around you — events, sports, trading, lost & found, and skill swaps.
                </motion.p>
              </div>
            </div>

            {/* Floating pills */}
            {["🎉 Events", "⚽ Sports", "📦 Trading", "🔍 Lost & Found", "🤝 Swap Skills"].map((p, i) => (
              <motion.span
                key={p}
                className={`absolute hidden md:inline-block text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm transition-colors duration-500 ${dark
                    ? "bg-purple-900/40 border border-purple-600/30 text-purple-300"
                    : "bg-white border border-gray-100 text-gray-600"
                  }`}
                style={{
                  top: `${20 + (i % 3) * 28}%`,
                  left: i < 2 ? `${4 + i * 6}%` : undefined,
                  right: i >= 2 ? `${4 + (i - 2) * 6}%` : undefined,
                }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
                {p}
              </motion.span>
            ))}
          </div>
        </header>

        {/* ── CARDS SECTION ── */}
        <section className="grid pb-20 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2">
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 padding w-screen sm:grid-cols-2 lg:place-items-center gap-6 max-w-2xl mx-auto lg:max-w-none lg:grid-cols-3 lg:mx-0 lg:w-2/3 lg:ml-auto lg:mr-auto">
              {cards.map((card, i) => (
                <Card key={card.id} card={card} index={i + 3} dark={dark} />
              ))}
            </div>
          </div>
        </section>

        <div className="h-1 w-full" style={{ background: "var(--gradient-qriblik)" }} />
        <QribLikModal />
      </div>
    </>
  );
}