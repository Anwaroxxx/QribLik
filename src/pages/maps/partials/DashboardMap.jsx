import { useState, useEffect, useRef } from "react";
import SectionMap from "./SectionMap";
import users from "../../../data/UserData.json";

// ── Animated count-up ─────────────────────────────────────────────────────
function Counter({ target, duration = 1200 }) {
  const [val, setVal] = useState(0);
  const frame = useRef(null);
  useEffect(() => {
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [target]);
  return <>{val}</>;
}

// ── Stat pill ─────────────────────────────────────────────────────────────
function StatPill({ value, label, dark, delay = 0 }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), delay); return () => clearTimeout(t); }, []);
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "7px 18px", borderRadius: 14, minWidth: 70,
      background: dark ? "rgba(139,92,246,0.1)" : "rgba(139,92,246,0.06)",
      border: `1px solid ${dark ? "rgba(139,92,246,0.25)" : "rgba(139,92,246,0.14)"}`,
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(8px)",
      transition: "all .4s ease",
    }}>
      <span style={{
        fontSize: 16, fontWeight: 800, fontFamily: "Georgia,serif", lineHeight: 1.1,
        background: "linear-gradient(135deg,#8B5CF6,#D946EF,#F97316)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>
        {vis ? <Counter target={value} /> : 0}
      </span>
      <span style={{
        fontSize: 9, color: dark ? "#94A3B8" : "#9CA3AF",
        textTransform: "uppercase", letterSpacing: "0.7px",
        fontFamily: "Sora,sans-serif", marginTop: 2,
      }}>{label}</span>
    </div>
  );
}

// ── Live pulse ─────────────────────────────────────────────────────────────
function PulseDot() {
  return (
    <span style={{ position: "relative", display: "inline-flex", width: 10, height: 10, flexShrink: 0 }}>
      <style>{`@keyframes qpulse{0%{transform:scale(1);opacity:.7}100%{transform:scale(2.4);opacity:0}}`}</style>
      <span style={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", background: "#22C55E", opacity: 0.7, animation: "qpulse 1.5s ease-out infinite" }}/>
      <span style={{ position: "relative", width: 10, height: 10, borderRadius: "50%", background: "#22C55E" }}/>
    </span>
  );
}

// ── Dark toggle ────────────────────────────────────────────────────────────
function DarkToggle({ dark, onToggle }) {
  return (
    <button onClick={onToggle} style={{
      display: "flex", alignItems: "center", gap: 9,
      padding: "7px 16px", borderRadius: 24, cursor: "pointer",
      background: dark ? "rgba(139,92,246,0.15)" : "rgba(139,92,246,0.07)",
      border: `1.5px solid ${dark ? "rgba(139,92,246,0.38)" : "rgba(139,92,246,0.18)"}`,
      transition: "all .3s", fontFamily: "Sora,sans-serif",
    }}
    onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(139,92,246,0.25)" : "rgba(139,92,246,0.13)"}
    onMouseLeave={e => e.currentTarget.style.background = dark ? "rgba(139,92,246,0.15)" : "rgba(139,92,246,0.07)"}>
      <div style={{
        width: 36, height: 20, borderRadius: 10, position: "relative", flexShrink: 0,
        background: dark ? "linear-gradient(135deg,#8B5CF6,#D946EF,#F97316)" : "rgba(156,163,175,0.4)",
        transition: "background .35s",
        boxShadow: dark ? "0 0 10px rgba(139,92,246,0.4)" : "none",
      }}>
        <div style={{
          position: "absolute", top: 3, width: 14, height: 14, borderRadius: "50%", background: "#fff",
          left: dark ? 19 : 3, transition: "left .3s cubic-bezier(.4,0,.2,1)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.22)",
        }}/>
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color: dark ? "#A78BFA" : "#7C3AED", userSelect: "none" }}>
        {dark ? "🌙 Dark" : "☀️ Light"}
      </span>
    </button>
  );
}

// ══════════════════════════════════════════════════════════════════════════
export default function DashboardMap() {
  const [dark, setDark] = useState(false);

  const validUsers   = users.filter(u => u && typeof u.name === "string");
  const verified     = validUsers.filter(u => u.verified).length;
  const neighborhoods = [...new Set(validUsers.map(u => u.neighborhood).filter(Boolean))].length;

  const topBg  = dark ? "rgba(10,4,26,0.92)"  : "rgba(255,255,255,0.88)";
  const border = dark ? "rgba(139,92,246,0.18)" : "rgba(139,92,246,0.12)";
  const txt    = dark ? "#f1f5f9" : "#1e1b4b";

  return (
    <div style={{
      width: "100%", height: "100%",
      background: dark ? "#080414" : "#F5F3FF",
      display: "flex", flexDirection: "column",
      transition: "background .4s",
      fontFamily: "Sora,sans-serif",
    }}>
      {/* Top bar */}
      <div style={{
        padding: "10px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: topBg, backdropFilter: "blur(24px)",
        borderBottom: `1px solid ${border}`,
        flexShrink: 0, gap: 12, flexWrap: "wrap",
        boxShadow: dark ? "0 1px 0 rgba(139,92,246,0.12)" : "0 4px 24px rgba(139,92,246,0.07)",
        transition: "background .4s",
      }}>
        {/* Left: live status */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
            <PulseDot />
            <span style={{ fontSize: 10.5, color: "#22C55E", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" }}>
              Live · {validUsers.length} neighbors active
            </span>
          </div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: txt, lineHeight: 1, fontFamily: "Georgia,serif" }}>
            Explore your{" "}
            <span style={{ background: "linear-gradient(135deg,#8B5CF6,#D946EF,#F97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              neighborhood
            </span>
          </h2>
        </div>

        {/* Center: stats */}
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
          <StatPill value={validUsers.length} label="Neighbors"    dark={dark} delay={0}   />
          <StatPill value={neighborhoods}     label="Areas"        dark={dark} delay={100} />
          <StatPill value={verified}          label="Verified"     dark={dark} delay={200} />
        </div>

        {/* Right: dark toggle */}
        <DarkToggle dark={dark} onToggle={() => setDark(d => !d)} />
      </div>

      {/* Map */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <SectionMap dark={dark} />
      </div>
    </div>
  );
}