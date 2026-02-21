import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardMap from "./partials/DashboardMap";
import SectionMap from "./partials/SectionMap";
import PixelBlast from "../../animations/Pixel";

export const NAVBAR_H  = 60;
export const SIDEBAR_W = 280;

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
`;

// ── Navbar ────────────────────────────────────────────────────────────────
// FIX: always left:0 / right:0 — full width on both desktop & mobile.
// Previously left: SIDEBAR_W on desktop which left a dead zone above the sidebar.
function Navbar({ dark, onToggleDark, onToggleSidebar, isMobile }) {
  const navigate = useNavigate();

  return (
    <nav style={{
      position: "fixed",
      top: 0, left: 0, right: 0,   // ← FULL WIDTH always
      zIndex: 4000,
      height: NAVBAR_H,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      background: dark ? "rgba(8,4,20,0.93)" : "rgba(255,255,255,0.93)",
      backdropFilter: "blur(24px)",
      borderBottom: `1px solid ${dark ? "rgba(139,92,246,0.2)" : "rgba(139,92,246,0.1)"}`,
      boxShadow: "0 2px 20px rgba(139,92,246,0.07)",
    }}>

      {/* Pixel bg */}
      <div style={{ position:"absolute", inset:0, zIndex:0, opacity:0.07, pointerEvents:"none" }}>
        <PixelBlast
          variant="square" pixelSize={3} color="#d946ef"
          patternScale={2} patternDensity={1} pixelSizeJitter={0}
          enableRipples rippleSpeed={0.5} rippleThickness={0.1}
          rippleIntensityScale={1.2} speed={0.6} edgeFade={0.3} transparent
        />
      </div>

      {/* LEFT */}
      <div style={{ display:"flex", alignItems:"center", gap:8, position:"relative", zIndex:1 }}>
        <button
          onClick={() => navigate("/home")}
          style={{
            display:"flex", alignItems:"center", gap:6,
            padding:"6px 12px", borderRadius:20, border:"none",
            background: dark ? "rgba(139,92,246,0.15)" : "rgba(139,92,246,0.08)",
            color: dark ? "#C084FC" : "#8B5CF6",
            fontSize:12, fontWeight:700, cursor:"pointer",
            fontFamily:"Sora,sans-serif", transition:"all 0.2s",
            WebkitTapHighlightColor:"transparent",
          }}
          onMouseEnter={e => e.currentTarget.style.background = dark?"rgba(139,92,246,0.25)":"rgba(139,92,246,0.15)"}
          onMouseLeave={e => e.currentTarget.style.background = dark?"rgba(139,92,246,0.15)":"rgba(139,92,246,0.08)"}
        >
          ← {isMobile ? "" : "Back to Feed"}
        </button>

        {/* Hamburger — mobile only */}
        {isMobile && (
          <button
            onClick={onToggleSidebar}
            style={{
              width:36, height:36, borderRadius:10, border:"none",
              background: dark?"rgba(139,92,246,0.15)":"rgba(139,92,246,0.08)",
              cursor:"pointer", display:"flex", flexDirection:"column",
              alignItems:"center", justifyContent:"center", gap:5, padding:8,
              color: dark?"#C084FC":"#8B5CF6",
              WebkitTapHighlightColor:"transparent",
            }}
          >
            <span style={{ display:"block", width:16, height:2, background:"currentColor", borderRadius:2 }}/>
            <span style={{ display:"block", width:16, height:2, background:"currentColor", borderRadius:2 }}/>
            <span style={{ display:"block", width:16, height:2, background:"currentColor", borderRadius:2 }}/>
          </button>
        )}
      </div>

      {/* CENTER */}
      <div style={{ position:"relative", zIndex:1 }}>
        <span style={{
          fontSize: isMobile ? 14 : 16, fontWeight:800, fontFamily:"Sora,sans-serif",
          background:"linear-gradient(135deg,#8B3FDE,#C837AB,#FF6B35)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
        }}>🗺️ QribLik Map</span>
      </div>

      {/* RIGHT */}
      <div style={{ display:"flex", alignItems:"center", gap:10, position:"relative", zIndex:1 }}>
        <button
          onClick={onToggleDark}
          style={{
            position:"relative", width:"3rem", height:"1.7rem",
            borderRadius:"9999px", border:"none", cursor:"pointer", padding:0,
            background: dark?"linear-gradient(135deg,#8B3FDE,#C837AB)":"#e2e8f0",
            transition:"background 0.35s ease",
            boxShadow: dark?"0 0 12px rgba(139,63,222,0.45)":"0 1px 4px rgba(0,0,0,0.12)",
            flexShrink:0,
          }}
        >
          <span style={{
            position:"absolute", top:"0.22rem",
            left: dark?"calc(100% - 1.48rem)":"0.22rem",
            width:"1.25rem", height:"1.25rem", borderRadius:"50%", background:"#fff",
            transition:"left 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.6rem",
          }}>
            {dark ? "🌙" : "☀️"}
          </span>
        </button>

        {!isMobile && (
          <div style={{
            display:"flex", alignItems:"center", gap:8,
            paddingLeft:10,
            borderLeft:`1px solid ${dark?"rgba(139,92,246,0.2)":"rgba(139,92,246,0.15)"}`,
          }}>
            <div style={{
              width:30, height:30, borderRadius:"50%",
              background:"linear-gradient(135deg,#8B5CF6,#D946EF,#F97316)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:13, fontWeight:900, color:"#fff", fontFamily:"Georgia,serif",
              boxShadow:"0 2px 10px rgba(139,92,246,0.35)",
            }}>A</div>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:dark?"#e2e8f0":"#1e1b4b", lineHeight:1 }}>Alex</div>
              <div style={{ fontSize:9, color:"#9CA3AF", lineHeight:1.4 }}>Active Helper</div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// ── useIsMobile ───────────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return isMobile;
}

// ── MapPage ───────────────────────────────────────────────────────────────
export default function MapPage() {
  const [dark,        setDark]        = useState(false);
  const [category,    setCategory]    = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  return (
    <div style={{
      width:"100vw", height:"100vh", display:"flex",
      flexDirection:"column", overflow:"hidden",
      background: dark?"#080414":"#f5f3ff",
      fontFamily:"Sora,sans-serif",
    }}>
      <Navbar
        dark={dark}
        onToggleDark={() => setDark(d => !d)}
        onToggleSidebar={() => setSidebarOpen(o => !o)}
        isMobile={isMobile}
      />

      {/* Body — sits below full-width navbar */}
      <div style={{
        position:"fixed",
        top: NAVBAR_H, left:0, right:0, bottom:0,
        display:"flex", overflow:"hidden",
      }}>

        {/* Mobile backdrop */}
        {isMobile && sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position:"fixed", inset:0, zIndex:3000,
              background:"rgba(0,0,0,0.45)", backdropFilter:"blur(3px)",
            }}
          />
        )}

        {/* Sidebar */}
        <div style={{
          position: isMobile ? "fixed" : "relative",
          top: isMobile ? 0 : "auto",
          left: 0,
          bottom: isMobile ? 0 : "auto",
          width: SIDEBAR_W,
          zIndex: isMobile ? 3100 : "auto",
          transform: isMobile
            ? sidebarOpen ? "translateX(0)" : "translateX(-100%)"
            : "none",
          transition:"transform 0.3s cubic-bezier(0.32,0.72,0,1)",
          flexShrink: 0,
          height: "100%",
        }}>
          <DashboardMap
            category={category}
            setCategory={(cat) => { setCategory(cat); setSidebarOpen(false); }}
            dark={dark}
            isMobile={isMobile}
          />
        </div>

        {/* Map */}
        <div style={{
          flex:1, position:"relative", minWidth:0, height:"100%",
          marginLeft: isMobile ? `-${SIDEBAR_W}px` : 0,
          width: isMobile ? `calc(100% + ${SIDEBAR_W}px)` : "auto",
        }}>
          <SectionMap category={category} dark={dark} isMobile={isMobile} />
        </div>
      </div>
    </div>
  );
}