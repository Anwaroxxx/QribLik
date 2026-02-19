import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";

const gradient = "linear-gradient(135deg, #8B3FDE 0%, #C837AB 50%, #FF6B35 100%)";

const floatingOrbs = [
  { size: 320, x: "5%", y: "10%", delay: 0, opacity: 0.12 },
  { size: 200, x: "75%", y: "5%", delay: 0.5, opacity: 0.09 },
  { size: 260, x: "60%", y: "55%", delay: 1, opacity: 0.1 },
  { size: 150, x: "20%", y: "65%", delay: 1.5, opacity: 0.07 },
];

const stats = [
  { value: "2M+", label: "Real Neighbors" },
  { value: "48K", label: "Neighborhoods" },
  { value: "97%", label: "Feel Connected" },
];

const words = ["real people,", "real neighborhoods,", "real connections."];

export default function WhoWeAre() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#faf8ff",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        fontFamily: "'Fraunces', Georgia, serif",
      }}
    >
      {/* Import fonts */}
      <style>{`
       

        .gradient-text {
          background: linear-gradient(135deg, #8B3FDE 0%, #C837AB 50%, #FF6B35 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-card {
          border: 1px solid rgba(139, 63, 222, 0.12);
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(12px);
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, #8B3FDE 0%, #C837AB 50%, #FF6B35 100%);
          filter: blur(70px);
          pointer-events: none;
        }

        .grid-line {
          position: absolute;
          background: linear-gradient(135deg, rgba(139,63,222,0.06) 0%, rgba(255,107,53,0.06) 100%);
        }
      `}</style>

      {/* Floating orbs */}
      {floatingOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className="orb"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            opacity: orb.opacity,
          }}
          animate={{
            y: [0, -24, 0],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 7 + i * 1.3,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle grid lines */}
      <div className="grid-line" style={{ width: "1px", height: "100%", left: "33%", top: 0 }} />
      <div className="grid-line" style={{ width: "100%", height: "1px", left: 0, top: "40%" }} />

      {/* Main content */}
      <div style={{
        position: "relative",
        zIndex: 10,
        maxWidth: 1100,
        margin: "0 auto",
        padding: "80px 48px",
        width: "100%",
      }}>

        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 36,
          }}
        >
          <div style={{
            width: 32,
            height: 2,
            background: gradient,
            borderRadius: 2,
          }} />
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 600,
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

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(52px, 8vw, 104px)",
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            color: "#1a0a2e",
            marginBottom: 0,
            fontStyle: "italic",
          }}
        >
          Who{" "}
          <span className="gradient-text">we are.</span>
        </motion.h1>

        {/* Layout: body + stats side-by-side */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          marginTop: 60,
          alignItems: "start",
        }}>

          {/* Left: description */}
          <div>
            {/* Staggered word lines */}
            {words.map((word, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(17px, 2.2vw, 22px)",
                  fontWeight: 400,
                  lineHeight: 1.65,
                  color: i < 2 ? "#3d1f6d" : "#6b4fa0",
                  marginBottom: i < 2 ? 2 : 0,
                }}
              >
                {i === 0 ? (
                  <>A platform for <strong style={{ fontWeight: 700 }}>{word}</strong></>
                ) : i === 1 ? (
                  <><strong style={{ fontWeight: 700 }}>{word}</strong> and <strong style={{ fontWeight: 700 }}>real connections.</strong></>
                ) : (
                  <span style={{ color: "#9b72cf" }}>
                    Where neighbors become friends and communities thrive.
                  </span>
                )}
              </motion.div>
            ))}

            {/* CTA pill */}
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <motion.button
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  marginTop: 40,
                  padding: "14px 32px",
                  background: gradient,
                  border: "none",
                  borderRadius: 100,
                  color: "white",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  cursor: "pointer",
                  boxShadow: "0 12px 40px rgba(200, 55, 171, 0.28)",
                }}
              >
                Join your neighborhood →
              </motion.button>
            </Link>
          </div>

          {/* Right: stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.35 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="stat-card"
                style={{
                  padding: "24px 32px",
                  borderRadius: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 48,
                    borderRadius: 4,
                    background: gradient,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div className="gradient-text" style={{
                    fontSize: 40,
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#9b72cf",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}>
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: 72,
            height: 1,
            background: gradient,
            opacity: 0.2,
            transformOrigin: "left",
          }}
        />
      </div>
    </section>
  );
}