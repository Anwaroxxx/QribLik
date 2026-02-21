import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";

const gradient = "linear-gradient(135deg, #8B3FDE 0%, #C837AB 50%, #FF6B35 100%)";

const stats = [
  { value: "2M+", label: "Real Neighbors" },
  { value: "48K", label: "Neighborhoods" },
  { value: "97%", label: "Feel Connected" },
];

export default function WhoWeAre() {
  const { dark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: dark
          ? "linear-gradient(160deg, #130820 0%, #0f0a1e 60%, #130820 100%)"
          : "#ffff",
        transition: "background 0.5s ease",
      }}
    >
      {/* Background glows — same pattern as hero */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: dark
          ? "radial-gradient(ellipse 65% 55% at 85% 50%, rgba(139,63,222,0.14) 0%, transparent 65%)"
          : "radial-gradient(ellipse 65% 55% at 85% 50%, rgba(139,63,222,0.07) 0%, transparent 65%)",
      }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: dark
          ? "radial-gradient(ellipse 50% 50% at 10% 30%, rgba(200,55,171,0.1) 0%, transparent 60%)"
          : "radial-gradient(ellipse 50% 50% at 10% 30%, rgba(200,55,171,0.05) 0%, transparent 60%)",
      }} />

      

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1200, margin: "0 auto", padding: "6rem 3rem", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>

          {/* ── LEFT ── */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55 }}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.75rem" }}
            >
              <div style={{ width: 28, height: 2, background: gradient, borderRadius: 2 }} />
              <span style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                background: gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Our Story
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: "clamp(2.8rem, 6vw, 5rem)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                color: dark ? "#f5f0ff" : "#1a0a2e",
                margin: "0 0 1.5rem",
                fontFamily: "'Fraunces', Georgia, serif",
                fontStyle: "italic",
                transition: "color 0.5s",
              }}
            >
              Who{" "}
              <span style={{
                background: gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                we are.
              </span>
            </motion.h2>

            {/* Body text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2 }}
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: dark ? "rgba(220,210,255,0.6)" : "#6b5f78",
                maxWidth: 440,
                margin: "0 0 1rem",
                fontFamily: "'DM Sans', sans-serif",
                transition: "color 0.5s",
              }}
            >
              A platform for <strong style={{ color: dark ? "#d4bbff" : "#3d1f6d", fontWeight: 700 }}>real people</strong>,{" "}
              <strong style={{ color: dark ? "#d4bbff" : "#3d1f6d", fontWeight: 700 }}>real neighborhoods</strong>, and{" "}
              <strong style={{ color: dark ? "#d4bbff" : "#3d1f6d", fontWeight: 700 }}>real connections</strong>.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.3 }}
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.75,
                color: dark ? "rgba(196,168,240,0.45)" : "#9b80c0",
                maxWidth: 420,
                margin: "0 0 2.5rem",
                fontFamily: "'DM Sans', sans-serif",
                transition: "color 0.5s",
              }}
            >
              Where neighbors become friends and communities thrive — one block at a time.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: "0.9rem 2rem",
                    background: gradient,
                    border: "none",
                    borderRadius: "9999px",
                    color: "white",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: dark
                      ? "0 8px 32px rgba(139,63,222,0.45)"
                      : "0 8px 28px rgba(200,55,171,0.3)",
                    letterSpacing: "0.02em",
                  }}
                >
                  Join your neighborhood →
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT — Stats ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 32 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.25 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
                style={{
                  padding: "1.6rem 2rem",
                  borderRadius: "1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  background: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.85)",
                  border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(139,63,222,0.12)",
                  backdropFilter: "blur(16px)",
                  boxShadow: dark
                    ? "0 4px 20px rgba(0,0,0,0.3)"
                    : "0 4px 20px rgba(139,63,222,0.06)",
                  transition: "background 0.5s, border-color 0.5s, box-shadow 0.3s",
                }}
              >
                {/* Color bar */}
                <div style={{
                  width: 4,
                  height: 48,
                  borderRadius: 4,
                  background: gradient,
                  flexShrink: 0,
                }} />
                <div>
                  <div style={{
                    fontSize: "2.4rem",
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    marginBottom: 4,
                    background: gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontFamily: "'Fraunces', Georgia, serif",
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: dark ? "rgba(196,168,240,0.5)" : "#9b72cf",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    transition: "color 0.5s",
                  }}>
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Small floating badge — mirrors hero's "active right now" */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.65 }}
              style={{
                marginTop: "0.5rem",
                padding: "0.85rem 1.25rem",
                borderRadius: "1rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                background: dark ? "rgba(139,63,222,0.15)" : "rgba(139,63,222,0.07)",
                border: dark ? "1px solid rgba(139,63,222,0.3)" : "1px solid rgba(139,63,222,0.15)",
                alignSelf: "flex-start",
                transition: "background 0.5s, border-color 0.5s",
              }}
            >
              <span style={{ position: "relative", display: "inline-flex", width: 10, height: 10 }}>
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#22c55e", opacity: 0.5, animation: "ping 2s ease-in-out infinite" }} />
                <span style={{ position: "relative", width: 10, height: 10, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              </span>
              <div>
                <p style={{ margin: 0, fontSize: "0.8rem", fontWeight: 700, color: dark ? "#d4bbff" : "#5b21b6" }}>
                  5,000+ neighbors online
                </p>
                <p style={{ margin: "2px 0 0", fontSize: "0.7rem", color: dark ? "rgba(196,168,240,0.5)" : "#9b72cf" }}>
                  across 48K neighborhoods
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: "5rem",
            height: 1,
            background: gradient,
            opacity: dark ? 0.25 : 0.15,
            transformOrigin: "left",
          }}
        />
      </div>

      <style>{`
                @keyframes ping {
                    0%, 100% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(2.2); opacity: 0; }
                }
            `}</style>
    </section>
  );
}