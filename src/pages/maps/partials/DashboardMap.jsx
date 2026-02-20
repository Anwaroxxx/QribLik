<<<<<<< HEAD
import React, { useState } from "react";
import { BsStars } from "react-icons/bs";
import { FaArrowRightArrowLeft, FaMagnifyingGlass } from "react-icons/fa6";
import { MdEvent, MdOutlineSportsSoccer } from "react-icons/md";
import { TbClearAll, TbHome } from "react-icons/tb";
import PixelBlast from "../../../animations/Pixel";

const DashboardMap = () => {
    const [active, setActive] = useState("All");

    const itemStyle =
    "flex items-center gap-3 px-5 py-2.5 rounded-2xl cursor-pointer transition-all duration-300 text-[15px] relative";

  const activeStyle =
    "bg-gradient-to-r from-fuchsia-50 to-rose-50 text-fuchsia-600 shadow-sm";

  const inactiveStyle =
    "text-slate-500 hover:bg-slate-100";
  return (
    <>
    {/* logo */}
    <div className="w-[280px] h-screen bg-white sticky top-0 flex flex-col py-4 pr-6 border-r border-[#e6dfd7] overflow-y-auto relative">
      <div className="absolute inset-0 z-0 opacity-30">
        <PixelBlast
          variant="square"
          pixelSize={4}
          color="#d946ef"
          patternScale={2}
          patternDensity={1}
          pixelSizeJitter={0}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={false}
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.5}
          edgeFade={0.25}
          transparent
        />
      </div>
      <div className="px-5 mb-12 flex items-center gap-3.5 group cursor-pointer relative z-10">
            <div className="w-11 h-11 bg-gradient-to-tr from-fuchsia-600 to-rose-500 rounded-[16px] flex items-center justify-center shadow-lg shadow-fuchsia-200 transition-transform group-hover:rotate-6 duration-300">
              <TbHome className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tighter text-slate-900 leading-none">
                Qriblik
              </span>
              <span className="text-[10px] font-bold text-fuchsia-500 uppercase tracking-[0.2em] mt-1.5">
                Community Hub
              </span>
            </div>
          </div>
      <section className="flex flex-col gap-8 relative z-10">
        <h3 className="px-5 text-[11px] font-black text-slate-300 uppercase tracking-[0.25em] mb-2 flex items-center">
          <span>Discover</span>
          <div className="h-px bg-slate-100 flex-1 ml-4"></div>
        </h3>

        {[
          { id: "All" , icon : <TbClearAll/> , label: "All"},
          { id: "Sport", icon: <MdOutlineSportsSoccer />, label: "Sport" },
          { id: "Trading", icon: <FaArrowRightArrowLeft />, label: "Trading" },
          { id: "Lost", icon: <FaMagnifyingGlass />, label: "Lost and Found" },
          { id: "Swap", icon: <BsStars />, label: "Swap Skills" },
          { id: "Events", icon: <MdEvent />, label: "Events" },
        ].map((el) => (
            <div
            key={el.id}
            onClick={() => setActive(el.id)}
            className={`${itemStyle} ${active === el.id ? activeStyle : inactiveStyle}`}
          >
            {el.icon}
            {el.label}
            {active === el.id && (
                <span className="absolute right-5 w-2 h-2 bg-fuchsia-500 rounded-full"></span>
            )}
          </div>
        ))}
      </section>
      
    </div>
    </>
  );
};

export default DashboardMap;
=======
import { useState, useEffect, useRef } from "react";
import SectionMap from "./SectionMap";
import users from "../../../data/UserData.json";

// ── Animated counter ──────────────────────────────────────────────────────
function Counter({ target, duration = 1400 }) {
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
function StatPill({ icon, value, label, dark, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "8px 18px", borderRadius: 16, minWidth: 76,
      background: dark ? "rgba(139,92,246,0.1)" : "rgba(139,92,246,0.06)",
      border: `1px solid ${dark ? "rgba(139,92,246,0.25)" : "rgba(139,92,246,0.14)"}`,
      transition: "all .4s ease",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(6px)",
    }}>
      <span style={{
        fontSize: 17, fontWeight: 800,
        fontFamily: "Georgia,serif",
        background: "linear-gradient(135deg,#8B5CF6,#D946EF,#F97316)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        lineHeight: 1.1,
      }}>
        {icon}{visible ? <Counter target={value} /> : 0}
      </span>
      <span style={{
        fontSize: 9.5, color: dark ? "#94A3B8" : "#9CA3AF",
        textTransform: "uppercase", letterSpacing: "0.7px",
        fontFamily: "Sora,sans-serif", marginTop: 2,
      }}>{label}</span>
    </div>
  );
}

// ── Dark mode toggle ──────────────────────────────────────────────────────
function DarkToggle({ dark, onToggle }) {
  return (
    <button onClick={onToggle} style={{
      display: "flex", alignItems: "center", gap: 9,
      padding: "8px 18px", borderRadius: 24,
      background: dark ? "rgba(139,92,246,0.18)" : "rgba(139,92,246,0.08)",
      border: `1.5px solid ${dark ? "rgba(139,92,246,0.4)" : "rgba(139,92,246,0.2)"}`,
      cursor: "pointer", transition: "all .3s",
      fontFamily: "Sora,sans-serif",
    }}
    onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(139,92,246,0.28)" : "rgba(139,92,246,0.14)"}
    onMouseLeave={e => e.currentTarget.style.background = dark ? "rgba(139,92,246,0.18)" : "rgba(139,92,246,0.08)"}
    >
      {/* Track */}
      <div style={{
        width: 38, height: 21, borderRadius: 11, position: "relative", flexShrink: 0,
        background: dark
          ? "linear-gradient(135deg,#8B5CF6,#D946EF,#F97316)"
          : "rgba(156,163,175,0.35)",
        transition: "background .35s",
        boxShadow: dark ? "0 0 12px rgba(139,92,246,0.4)" : "none",
      }}>
        <div style={{
          position: "absolute", top: 3.5,
          left: dark ? 20 : 3.5,
          width: 14, height: 14, borderRadius: "50%",
          background: "#fff",
          transition: "left .3s cubic-bezier(.4,0,.2,1)",
          boxShadow: "0 1px 5px rgba(0,0,0,0.22)",
        }}/>
      </div>
      <span style={{
        fontSize: 12, fontWeight: 600,
        color: dark ? "#A78BFA" : "#7C3AED",
        userSelect: "none",
      }}>
        {dark ? "🌙 Dark" : "☀️ Light"}
      </span>
    </button>
  );
}

// ── Live pulse dot ────────────────────────────────────────────────────────
function PulseDot() {
  return (
    <span style={{ position: "relative", display: "inline-flex", width: 10, height: 10, flexShrink: 0 }}>
      <span style={{
        position: "absolute", width: "100%", height: "100%", borderRadius: "50%",
        background: "#22C55E", opacity: 0.7,
        animation: "ping 1.4s cubic-bezier(0,0,0.2,1) infinite",
      }}/>
      <span style={{ position: "relative", width: 10, height: 10, borderRadius: "50%", background: "#22C55E" }}/>
      <style>{`@keyframes ping { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(2.2);opacity:0} }`}</style>
    </span>
  );
}

// ══════════════════════════════════════════════════════════════════════════
export default function DashboardMap() {
  const [dark, setDark] = useState(false);

  const verified     = users.filter(u => u.verified).length;
  const neighborhoods = [...new Set(users.map(u => u.neighborhood))].length;

  const bg     = dark ? "#0a0518" : "#F5F3FF";
  const topBg  = dark ? "rgba(10,5,28,0.9)"  : "rgba(255,255,255,0.86)";
  const border = dark ? "rgba(139,92,246,0.18)" : "rgba(139,92,246,0.12)";
  const txt    = dark ? "#f1f5f9" : "#1e1b4b";

  return (
    <div style={{
      width: "100%", height: "100%",
      background: bg, display: "flex", flexDirection: "column",
      transition: "background .4s",
      fontFamily: "Sora,sans-serif",
    }}>

      {/* ── Top bar ───────────────────────────────────────────────────── */}
      <div style={{
        padding: "12px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: topBg, backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${border}`,
        flexShrink: 0, gap: 14, flexWrap: "wrap",
        boxShadow: dark
          ? "0 1px 0 rgba(139,92,246,0.15)"
          : "0 4px 24px rgba(139,92,246,0.08)",
        transition: "background .4s",
      }}>

        {/* Left: title */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
            <PulseDot />
            <span style={{ fontSize: 11, color: "#22C55E", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" }}>
              Live · {users.length} neighbors active
            </span>
          </div>
          <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: txt, lineHeight: 1, fontFamily: "Georgia,serif" }}>
            Explore your{" "}
            <span style={{ background: "linear-gradient(135deg,#8B5CF6,#D946EF,#F97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              neighborhood
            </span>
          </h2>
        </div>

        {/* Center: stats */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <StatPill icon=""    value={users.length}   label="Neighbors"   dark={dark} delay={0}   />
          <StatPill icon=""    value={neighborhoods}  label="Areas"       dark={dark} delay={120} />
          <StatPill icon=""    value={verified}       label="Verified"    dark={dark} delay={240} />
        </div>

        {/* Right: toggle */}
        <DarkToggle dark={dark} onToggle={() => setDark(d => !d)} />
      </div>

      {/* ── Map ──────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <SectionMap dark={dark} />
      </div>
    </div>
  );
}
>>>>>>> 14ead5c0b39fe055bbf5b5f3fe95ce3a07c7ca87
