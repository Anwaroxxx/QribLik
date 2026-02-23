import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import currentUser, { DEFAULT_AVATAR } from "../utils/userUtils";

// ── Build overview user from stored data ──────────────────────────────────────
export const initialUser = {
  name: currentUser.name,
  username: currentUser.firstName && currentUser.lastName
    ? (currentUser.firstName + currentUser.lastName).toLowerCase().replace(/\s/g, "")
    : "neighbor_user",
  neighborhood: currentUser.neighborhood,
  city:         currentUser.city,
  // ← No more pravatar. Use uploaded photo or silhouette.
  avatar: currentUser.avatar,
  bio: `Hi! I'm ${currentUser.name}, living in ${currentUser.neighborhood}. Love connecting with neighbors 🤝`,
  languages: ["English", "French"],
  favoriteCategories: ["Sport", "Trading", "Events"],
  offeredSkills: ["React", "Python", "UI Design"],
  wantedSkills:  ["Guitar", "Cooking"],
  verified: true,
  joinedAt: "2024-03-15",
  stats: {
    totalPostsCreated: 34, totalComments: 128,
    totalLikesReceived: 310, followers: 89,
    following: 64, profileViews: 1240,
  },
  helpSystem: {
    helpPoints: 420,
    level: 3,
    badge: "Trusted Neighbor",
    stars: 3,
    maxStars: 5,
    levelProgress: Math.round(((420 % 200) / 200) * 100),
    nextLevelPoints: 200 - (420 % 200),
    lostAndFound: { resolved: 7, pointsEarned: 175 },
    swapSkills:   { completedSwaps: 5 },
    trading:      { successfulTrades: 8, rating: 4.7, reviews: 12 },
  },
};

// ── Animated counter ──────────────────────────────────────────────────────────
function AnimatedNumber({ value, duration = 1.5, delay = 0 }) {
  const count   = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const controls   = animate(count, value, { duration, delay, ease: [0.16, 1, 0.3, 1] });
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return () => { controls.stop(); unsubscribe(); };
  }, [value]);

  return <span>{display}</span>;
}

// ── Star icon ─────────────────────────────────────────────────────────────────
function StarIcon({ filled, delay, dark }) {
  return (
    <motion.svg
      initial={{ scale: 0, rotate: -30, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20, delay }}
      width="28" height="28" viewBox="0 0 24 24"
      fill={filled ? "url(#starGradLight)" : "none"}
      stroke={filled ? "none" : (dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.15)")}
      strokeWidth="1.5"
      style={{ filter: filled ? "drop-shadow(0 2px 6px rgba(255,107,53,0.45))" : "none" }}
    >
      <defs>
        <linearGradient id="starGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FF6B35" />
        </linearGradient>
      </defs>
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </motion.svg>
  );
}

// ── Overview Card ─────────────────────────────────────────────────────────────
export default function OverviewCard({ user = initialUser }) {
  const { dark }    = useTheme();
  const [hovered, setHovered] = useState(false);

  const { name, helpSystem } = user;
  const { helpPoints, level, stars, maxStars, levelProgress, nextLevelPoints } = helpSystem;

  const labelColor = dark ? "rgba(167,139,250,0.45)" : "rgba(0,0,0,0.35)";
  const subColor   = dark ? "rgba(167,139,250,0.35)" : "rgba(0,0,0,0.4)";
  const cardBg     = dark
    ? "linear-gradient(160deg,#1a0a2e 0%,#150d27 60%,#1c0d30 100%)"
    : "linear-gradient(160deg,#ffffff 0%,#faf8ff 60%,#fdf5ff 100%)";

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={{ position: "relative", width: "100%", maxWidth: "420px" }}
      >
        <motion.div
          animate={{ opacity: hovered ? 0.55 : 0.25, scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.4 }}
          style={{ position: "absolute", inset: "8px", borderRadius: "28px", filter: "blur(28px)", zIndex: 0 }}
        />

        <motion.div
          animate={{ y: hovered ? -4 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="shimmer-light w-full"
          style={{ position: "relative", zIndex: 1, borderRadius: "26px", padding: "2px", background: "var(--gradient-qriblik)" }}
        >
          <div style={{ borderRadius: "24px", background: cardBg, padding: "32px", overflow: "hidden", position: "relative", transition: "background 0.5s ease" }}>
            {/* Blobs */}
            <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "160px", height: "160px", background: dark ? "radial-gradient(circle,rgba(139,63,222,0.18) 0%,transparent 70%)" : "radial-gradient(circle,rgba(139,63,222,0.08) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "-30px", left: "-30px", width: "120px", height: "120px", background: dark ? "radial-gradient(circle,rgba(255,107,53,0.14) 0%,transparent 70%)" : "radial-gradient(circle,rgba(255,107,53,0.07) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
              <div>
                <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                  style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: labelColor, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, marginBottom: "6px" }}>
                  Overview
                </motion.p>
                <motion.h2 initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                  style={{ fontFamily: "'Syne',sans-serif", fontSize: "22px", fontWeight: 800, color: dark ? "#f5f0ff" : "#1a0a2e", margin: 0, letterSpacing: "-0.5px" }}>
                  {name}
                </motion.h2>
              </div>

              {/* Level badge */}
              <motion.div initial={{ scale: 0, rotate: 20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.4 }}
                style={{ background: "var(--gradient-qriblik)", borderRadius: "14px", padding: "8px 14px", textAlign: "center", boxShadow: "0 4px 18px rgba(139,63,222,0.3)" }}>
                <p style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)", margin: 0, fontWeight: 600 }}>Level</p>
                <p style={{ fontFamily: "'Syne',sans-serif", fontSize: "26px", fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1 }}>
                  <AnimatedNumber value={level} duration={1} delay={0.5} />
                </p>
              </motion.div>
            </div>

            {/* Divider */}
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
              style={{ height: "1px", background: dark ? "linear-gradient(90deg,rgba(139,63,222,0.5),rgba(200,55,171,0.3),transparent)" : "linear-gradient(90deg,rgba(139,63,222,0.3),rgba(200,55,171,0.2),transparent)", marginBottom: "24px", transformOrigin: "left" }} />

            {/* Points */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} style={{ marginBottom: "28px" }}>
              <p style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: labelColor, marginBottom: "6px", fontWeight: 600 }}>Help Points</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "44px", fontWeight: 800, lineHeight: 1, background: "var(--gradient-qriblik)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  <AnimatedNumber value={helpPoints} duration={1.8} delay={0.6} />
                </span>
                <span style={{ fontSize: "14px", color: subColor, fontWeight: 500 }}>pts</span>
              </div>
            </motion.div>

            {/* Progress */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} style={{ marginBottom: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "11px", color: labelColor, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>Next Level</span>
                <span style={{ fontSize: "12px", color: subColor, fontWeight: 500 }}>{nextLevelPoints.toLocaleString()} pts away</span>
              </div>
              <div style={{ height: "6px", borderRadius: "99px", background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)", overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }} animate={{ width: `${levelProgress}%` }}
                  transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ height: "100%", borderRadius: "99px", background: "var(--gradient-qriblik)", boxShadow: "0 0 10px rgba(200,55,171,0.35)" }}
                />
              </div>
            </motion.div>

            {/* Stars */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <p style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: labelColor, marginBottom: "12px", fontWeight: 600 }}>Stars Earned</p>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                {Array.from({ length: maxStars }).map((_, i) => (
                  <StarIcon key={i} filled={i < stars} delay={0.9 + i * 0.08} dark={dark} />
                ))}
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
                  style={{ marginLeft: "8px", fontSize: "13px", color: subColor, fontWeight: 500 }}>
                  {stars}/{maxStars}
                </motion.span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}