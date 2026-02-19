import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardMap from "./partials/DashboardMap";

// ── Inject global styles once ─────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');

  /* Leaflet popup override — QribLik skin */
  .qriblik-popup .leaflet-popup-content-wrapper {
    background: transparent !important;
    border: none !important;
    border-radius: 20px !important;
    padding: 0 !important;
    box-shadow:
      0 24px 64px rgba(139,92,246,0.22),
      0 4px 16px rgba(0,0,0,0.14) !important;
    overflow: hidden;
  }
  .qriblik-popup .leaflet-popup-tip-container { display: none !important; }
  .qriblik-popup .leaflet-popup-content { margin: 0 !important; line-height: normal !important; }

  /* leaflet attribution */
  .leaflet-control-attribution {
    background: rgba(255,255,255,0.7) !important;
    backdrop-filter: blur(8px) !important;
    border-radius: 8px 0 0 0 !important;
    font-size: 9px !important;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.28); border-radius: 4px; }

  * { box-sizing: border-box; }
`;

// ── Navbar link ───────────────────────────────────────────────────────────
function NavLink({ to, children }) {
  const [hov, setHov] = useState(false);
  return (
    <Link to={to} style={{
      padding: "7px 16px", borderRadius: 24,
      color: hov ? "#7C3AED" : "#6B7280",
      background: hov ? "rgba(124,58,237,0.08)" : "transparent",
      fontSize: 13, fontFamily: "Sora,sans-serif",
      textDecoration: "none", fontWeight: 500,
      transition: "all .2s",
    }}
    onMouseEnter={() => setHov(true)}
    onMouseLeave={() => setHov(false)}>
      {children}
    </Link>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 4000,
      height: 60,
      background: scrolled ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.72)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(139,92,246,0.1)",
      boxShadow: scrolled ? "0 2px 24px rgba(139,92,246,0.1)" : "none",
      display: "flex", alignItems: "center",
      padding: "0 28px",
      transition: "all .3s",
    }}>

      {/* Logo */}
      <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 9, marginRight: "auto" }}>
        <div style={{
          width: 36, height: 36, borderRadius: 11,
          background: "linear-gradient(135deg,#8B5CF6,#D946EF,#F97316)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, fontWeight: 900, color: "#fff",
          fontFamily: "Georgia,serif",
          boxShadow: "0 4px 16px rgba(139,92,246,0.38)",
        }}>Q</div>
        <span style={{
          fontSize: 20, fontWeight: 800, fontFamily: "Georgia,serif",
          background: "linear-gradient(135deg,#8B5CF6,#D946EF,#F97316)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>QribLik</span>
      </Link>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        <NavLink to="/">← Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/support">Support</NavLink>

        {/* Divider */}
        <div style={{ width: 1, height: 22, background: "rgba(139,92,246,0.18)", margin: "0 6px" }}/>

        {/* Sign Up CTA */}
        <Link to="/signup" style={{
          padding: "8px 22px", borderRadius: 24,
          background: "linear-gradient(135deg,#8B5CF6,#D946EF,#F97316)",
          color: "#fff", fontSize: 13, fontWeight: 700,
          textDecoration: "none", fontFamily: "Sora,sans-serif",
          boxShadow: "0 4px 16px rgba(139,92,246,0.35)",
          transition: "all .25s",
          letterSpacing: "0.2px",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(139,92,246,0.48)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(139,92,246,0.35)"; }}>
          Sign Up →
        </Link>
      </div>
    </nav>
  );
}

// ══════════════════════════════════════════════════════════════════════════
export default function MapPage() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Navbar />
      <div style={{ marginTop: 60, flex: 1, overflow: "hidden" }}>
        <DashboardMap />
      </div>
    </div>
  );
}