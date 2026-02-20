import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

function AnimatedNumber({ value, duration = 1.5, delay = 0 }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const controls = animate(count, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value]);

  return <span>{display}</span>;
}

function StarIcon({ filled, delay }) {
  return (
    <motion.svg
      initial={{ scale: 0, rotate: -30, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20, delay }}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill={filled ? "url(#starGradLight)" : "none"}
      stroke={filled ? "none" : "rgba(0,0,0,0.15)"}
      strokeWidth="1.5"
      style={{ filter: filled ? "drop-shadow(0 2px 6px rgba(255,107,53,0.45))" : "none" }}
    >
      <defs>
        <linearGradient id="starGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FF6B35" />
        </linearGradient>
      </defs>
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </motion.svg>
  );
}

const userData = {
  name: "Alex Rivera",
  points: 24750,
  level: 42,
  stars: 4,
  maxStars: 5,
  levelProgress: 72,
  nextLevelPoints: 5250,
};

export default function OverviewCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      
    >
      

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={{ position: "relative", width: "100%", maxWidth: "420px" }}
      >
        {/* Soft glow shadow */}
        <motion.div
          animate={{ opacity: hovered ? 0.55 : 0.25, scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "absolute",
            inset: "8px",
           
            borderRadius: "28px",
            filter: "blur(28px)",
            zIndex: 0,
          }}
        />

        {/* Card border gradient wrapper */}
        <motion.div
          animate={{ y: hovered ? -4 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="shimmer-light w-full fixed"
          style={{
            position: "relative",
            zIndex: 1,
            borderRadius: "26px",
            padding: "2px",
            background: "var(--gradient-qriblik)",
          }}
        >
          <div
            style={{
              borderRadius: "24px",
              background: "linear-gradient(160deg, #ffffff 0%, #faf8ff 60%, #fdf5ff 100%)",
              padding: "32px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Decorative blobs */}
            <div style={{
              position: "absolute", top: "-40px", right: "-40px",
              width: "160px", height: "160px",
              background: "radial-gradient(circle, rgba(139,63,222,0.08) 0%, transparent 70%)",
              borderRadius: "50%", pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", bottom: "-30px", left: "-30px",
              width: "120px", height: "120px",
              background: "radial-gradient(circle, rgba(255,107,53,0.07) 0%, transparent 70%)",
              borderRadius: "50%", pointerEvents: "none",
            }} />

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
              <div>
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginBottom: "6px" }}
                >
                  Overview
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{ fontFamily: "'Syne', sans-serif", fontSize: "22px", fontWeight: 800, color: "#1a0a2e", margin: 0, letterSpacing: "-0.5px" }}
                >
                  {userData.name}
                </motion.h2>
              </div>

              {/* Level badge */}
              <motion.div
                initial={{ scale: 0, rotate: 20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.4 }}
                style={{
                  background: "var(--gradient-qriblik)",
                  borderRadius: "14px",
                  padding: "8px 14px",
                  textAlign: "center",
                  boxShadow: "0 4px 18px rgba(139,63,222,0.3), 0 1px 3px rgba(0,0,0,0.08)",
                }}
              >
                <p style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)", margin: 0, fontWeight: 600 }}>Level</p>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "26px", fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1 }}>
                  <AnimatedNumber value={userData.level} duration={1} delay={0.5} />
                </p>
              </motion.div>
            </div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: "1px", background: "linear-gradient(90deg, rgba(139,63,222,0.3), rgba(200,55,171,0.2), transparent)", marginBottom: "24px", transformOrigin: "left" }}
            />

            {/* Points */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              style={{ marginBottom: "28px" }}
            >
              <p style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: "6px", fontWeight: 600 }}>Total Points</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "44px", fontWeight: 800, lineHeight: 1, background: "var(--gradient-qriblik)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  <AnimatedNumber value={userData.points} duration={1.8} delay={0.6} />
                </span>
                <span style={{ fontSize: "14px", color: "rgba(0,0,0,0.25)", fontWeight: 500 }}>pts</span>
              </div>
            </motion.div>

            {/* Progress */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              style={{ marginBottom: "28px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "11px", color: "rgba(0,0,0,0.35)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>Next Level</span>
                <span style={{ fontSize: "12px", color: "rgba(0,0,0,0.4)", fontWeight: 500 }}>{userData.nextLevelPoints.toLocaleString()} pts away</span>
              </div>
              <div style={{ height: "6px", borderRadius: "99px", background: "rgba(0,0,0,0.07)", overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${userData.levelProgress}%` }}
                  transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ height: "100%", borderRadius: "99px", background: "var(--gradient-qriblik)", boxShadow: "0 0 10px rgba(200,55,171,0.35)" }}
                />
              </div>
            </motion.div>

            {/* Stars */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <p style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: "12px", fontWeight: 600 }}>Stars Earned</p>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                {Array.from({ length: userData.maxStars }).map((_, i) => (
                  <StarIcon key={i} filled={i < userData.stars} delay={0.9 + i * 0.08} />
                ))}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  style={{ marginLeft: "8px", fontSize: "13px", color: "rgba(0,0,0,0.3)", fontWeight: 500 }}
                >
                  {userData.stars}/{userData.maxStars}
                </motion.span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}