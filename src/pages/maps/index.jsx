import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardMap from "./partials/DashboardMap";

// ── Global styles ─────────────────────────────────────────────────────────
const CSS = `
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
  * { box-sizing: border-box; }
`;

// ── Navbar link ────────────────────────────────────────────────────────────
function NavLink({ to, children }) {
  const [hov, setHov] = useState(false);
  return (
    <Link to={to} style={{
      padding: "7px 15px", borderRadius: 22,
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

// ── Profile avatar (logged-in user) ───────────────────────────────────────
function ProfileAvatar() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(o => !o)} style={{
        display: "flex", alignItems: "center", gap: 9,
        padding: "5px 14px 5px 5px", borderRadius: 24,
        background: "rgba(139,92,246,0.08)",
        border: "1.5px solid rgba(139,92,246,0.2)",
        cursor: "pointer", transition: "all .2s",
        fontFamily: "Sora,sans-serif",
      }}
      onMouseEnter={e => e.currentTarget.style.background = "rgba(139,92,246,0.14)"}
      onMouseLeave={e => e.currentTarget.style.background = "rgba(139,92,246,0.08)"}>
        {/* Avatar circle */}
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "linear-gradient(135deg,#8B5CF6,#D946EF,#F97316)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 900, color: "#fff",
          fontFamily: "Georgia,serif",
          boxShadow: "0 2px 10px rgba(139,92,246,0.38)",
        }}>Y</div>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#1e1b4b", lineHeight: 1 }}>You</div>
          <div style={{ fontSize: 10, color: "#9CA3AF", lineHeight: 1.4 }}>Active Helper</div>
        </div>
        <span style={{ fontSize: 10, color: "#9CA3AF", marginLeft: 2 }}>▾</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", right: 0,
          width: 180, borderRadius: 16, overflow: "hidden",
          background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)",
          border: "1px solid rgba(139,92,246,0.14)",
          boxShadow: "0 16px 48px rgba(139,92,246,0.16)",
          fontFamily: "Sora,sans-serif",
        }}>
          {[
            { icon: "👤", label: "My Profile",   to: "/profile"   },
            { icon: "🔔", label: "Notifications", to: "/notifications" },
            { icon: "⚙️", label: "Settings",      to: "/settings"  },
            { icon: "🚪", label: "Log Out",        to: "/logout",  danger: true },
          ].map(({ icon, label, to, danger }) => (
            <Link key={label} to={to} onClick={() => setOpen(false)} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "11px 16px", textDecoration: "none",
              color: danger ? "#EF4444" : "#374151",
              fontSize: 12.5, fontWeight: 500,
              transition: "background .15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = danger ? "rgba(239,68,68,0.07)" : "rgba(139,92,246,0.06)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <span style={{ fontSize: 14 }}>{icon}</span>
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 4000, height: 60,
      background: scrolled ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.76)",
      backdropFilter: "blur(24px)",
      borderBottom: "1px solid rgba(139,92,246,0.1)",
      boxShadow: scrolled ? "0 2px 20px rgba(139,92,246,0.1)" : "none",
      display: "flex", alignItems: "center", padding: "0 24px",
      transition: "all .3s",
    }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 9, marginRight: "auto" }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: "linear-gradient(135deg,#8B5CF6,#D946EF,#F97316)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 17, fontWeight: 900, color: "#fff", fontFamily: "Georgia,serif",
          boxShadow: "0 4px 14px rgba(139,92,246,0.38)",
        }}>Q</div>
        <span style={{
          fontSize: 19, fontWeight: 800, fontFamily: "Georgia,serif",
          background: "linear-gradient(135deg,#8B5CF6,#D946EF,#F97316)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>QribLik</span>
      </Link>

      {/* Nav links */}
      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        <NavLink to="/">← Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/support">Support</NavLink>
        <div style={{ width: 1, height: 22, background: "rgba(139,92,246,0.18)", margin: "0 8px" }}/>
        <ProfileAvatar />
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