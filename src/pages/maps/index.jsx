import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardMap from "./partials/DashboardMap";
import SectionMap   from "./partials/SectionMap";
import PixelBlast from "../../animations/Pixel";

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');

  .qriblik-popup .leaflet-popup-content-wrapper {
    background: transparent !important;
    border: none !important;
    border-radius: 20px !important;
    padding: 0 !important;
    box-shadow: 0 24px 64px rgba(139,92,246,0.22), 0 4px 16px rgba(0,0,0,0.14) !important;
    overflow: hidden;
  }
  .qriblik-popup .leaflet-popup-tip-container { display: none !important; }
  .qriblik-popup .leaflet-popup-content { margin: 0 !important; line-height: normal !important; }
  .leaflet-control-attribution {
    background: rgba(255,255,255,0.7) !important;
    backdrop-filter: blur(8px) !important;
    border-radius: 8px 0 0 0 !important;
    font-size: 9px !important;
  }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.28); border-radius: 4px; }

  /* Mobile drawer */
  @media (max-width: 767px) {
    .map-sidebar {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      bottom: 0 !important;
      z-index: 3001 !important;
      transform: translateX(-100%) !important;
      transition: transform 0.3s ease !important;
    }
    .map-sidebar.open {
      transform: translateX(0) !important;
    }
    .map-backdrop {
      display: block !important;
    }
    nav {
      left: 0 !important;
    }
  }
  @media (min-width: 768px) {
    .map-sidebar {
      position: relative !important;
      transform: none !important;
      flex-shrink: 0 !important;
    }
    .map-backdrop {
      display: none !important;
    }
  }
  .map-backdrop {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 3000;
    background: rgba(0,0,0,0.4);
    backdrop-filter: blur(2px);
  }
`;

function Navbar({ dark, onToggleDark, onToggleSidebar }) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 280, right: 0, zIndex: 4000, height: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px",
      background: dark ? "rgba(8,4,20,0.92)" : "rgba(255,255,255,0.92)",
      backdropFilter: "blur(24px)",
      borderBottom: `1px solid ${dark ? "rgba(139,92,246,0.2)" : "rgba(139,92,246,0.1)"}`,
      boxShadow: "0 2px 20px rgba(139,92,246,0.07)",
      overflow: "hidden",
    }}>
      {/* Pixel background */}
      <div style={{ position:"absolute", inset:0, zIndex:0, opacity:0.08, pointerEvents:"none" }}>
        <PixelBlast
          variant="square" pixelSize={3} color="#d946ef"
          patternScale={2} patternDensity={1} pixelSizeJitter={0}
          enableRipples rippleSpeed={0.5} rippleThickness={0.1}
          rippleIntensityScale={1.2} speed={0.6} edgeFade={0.3} transparent
        />
      </div>
      {/* Hamburger — mobile only */}
      <button onClick={onToggleSidebar} style={{
        width: 36, height: 36, borderRadius: 10, border: "none",
        background: "transparent", cursor: "pointer",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: 5, padding: 8,
        color: dark ? "#CBD5E1" : "#6B7280",
        position: "relative",
        zIndex: 1,
      }} className="sidebar-hamburger">
        <span style={{ display:"block", width:18, height:2, background:"currentColor", borderRadius:2 }}/>
        <span style={{ display:"block", width:18, height:2, background:"currentColor", borderRadius:2 }}/>
        <span style={{ display:"block", width:18, height:2, background:"currentColor", borderRadius:2 }}/>
      </button>

      {/* Center - Navigation Links */}
      <div style={{ display:"flex", alignItems:"center", gap:8, flex:1, justifyContent:"center", position:"relative", zIndex:1 }}>
        {["Home","About","Support"].map((label, i) => (
          <Link key={label} to={["/home","/about","/support"][i]} style={{
            padding:"6px 14px", borderRadius:20, textDecoration:"none",
            fontSize:13, fontWeight:500,
            color: dark ? "#CBD5E1" : "#6B7280",
            transition:"all .2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.color="#8B5CF6"; e.currentTarget.style.background="rgba(139,92,246,0.08)"; }}
          onMouseLeave={e => { e.currentTarget.style.color= dark?"#CBD5E1":"#6B7280"; e.currentTarget.style.background="transparent"; }}
          className="nav-desktop-link">
            {label}
          </Link>
        ))}
      </div>

      {/* Right - Dark Mode & Profile */}
      <div style={{ display:"flex", alignItems:"center", gap:12, position:"relative", zIndex:1 }}>
        <button onClick={onToggleDark} style={{
          display:"flex", alignItems:"center", gap:6,
          padding:"6px 14px", borderRadius:20, cursor:"pointer",
          background: dark ? "rgba(139,92,246,0.15)" : "rgba(139,92,246,0.07)",
          border:`1.5px solid ${dark?"rgba(139,92,246,0.38)":"rgba(139,92,246,0.18)"}`,
          color: dark?"#A78BFA":"#7C3AED",
          fontSize:12, fontWeight:600, fontFamily:"Sora,sans-serif",
        }}>
          {dark ? "🌙 Dark" : "☀️ Light"}
        </button>

        {/* Profile */}
        <div style={{ display:"flex", alignItems:"center", gap:8, paddingLeft:12, borderLeft:"1px solid rgba(139,92,246,0.18)" }}>
          <div style={{
            width:32, height:32, borderRadius:"50%",
            background:"linear-gradient(135deg,#8B5CF6,#D946EF,#F97316)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:14, fontWeight:900, color:"#fff", fontFamily:"Georgia,serif",
            boxShadow:"0 2px 10px rgba(139,92,246,0.38)",
          }}>Y</div>
          <div>
            <div style={{ fontSize:12, fontWeight:700, color: dark?"#e2e8f0":"#1e1b4b", lineHeight:1 }}>You</div>
            <div style={{ fontSize:10, color:"#9CA3AF", lineHeight:1.4 }}>Active Helper</div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function MapPage() {
  const [dark,        setDark]        = useState(false);
  const [category,    setCategory]    = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);

    // Hide hamburger on desktop via CSS
    const resp = document.createElement("style");
    resp.textContent = `
      @media (min-width: 768px) { .sidebar-hamburger { display: none !important; } .nav-desktop-link { display: flex !important; } }
      @media (max-width: 767px) { .nav-desktop-link { display: none !important; } }
    `;
    document.head.appendChild(resp);
    return () => { document.head.removeChild(el); document.head.removeChild(resp); };
  }, []);

  return (
    <div style={{
      width:"100vw", height:"100vh",
      display:"flex", flexDirection:"column", overflow:"hidden",
      background: dark ? "#080414" : "#f5f3ff",
    }}>
      <Navbar dark={dark} onToggleDark={() => setDark(d=>!d)} onToggleSidebar={() => setSidebarOpen(o=>!o)} />

      {/* Body */}
      <div style={{ display:"flex", flex:1, overflow:"hidden", paddingLeft: 280 }}>

        {/* Mobile backdrop */}
        <div
          className={`map-backdrop${sidebarOpen ? " open" : ""}`}
          onClick={() => setSidebarOpen(false)}
          style={{ display: sidebarOpen ? "block" : "none" }}
        />

        {/* Sidebar */}
        <DashboardMap
          category={category}
          setCategory={(cat) => { setCategory(cat); setSidebarOpen(false); }}
          dark={dark}
        />

        {/* Map — fills remaining space */}
        <div style={{ flex:1, position:"relative", minWidth:0, height:"100%" }}>
          <SectionMap category={category} dark={dark} />
        </div>
      </div>
    </div>
  );
}