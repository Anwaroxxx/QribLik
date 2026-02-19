import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import users from "../../../data/UserData.json";

const TILE = {
  light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  dark:  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
};

const LVL = {
  "Master Helper": "#F97316",
  "Expert Helper": "#8B5CF6",
  "Active Helper": "#22C55E",
  "Rising Helper": "#06B6D4",
  "New Helper":    "#94A3B8",
};

// ── Animated SVG marker ───────────────────────────────────────────────────
function makeIcon(user, active) {
  const c  = LVL[user.helpSystem?.level] || "#8B5CF6";
  const sz = active ? 52 : 40;
  const pulse = active ? `
    <circle cx="${sz/2 + 8}" cy="${sz/2}" r="${sz/2 + 2}" fill="none" stroke="${c}" stroke-width="2" opacity="0.6">
      <animate attributeName="r" values="${sz/2};${sz/2+14}" dur="1.4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.6;0" dur="1.4s" repeatCount="indefinite"/>
    </circle>
    <circle cx="${sz/2 + 8}" cy="${sz/2}" r="${sz/2 + 2}" fill="none" stroke="${c}" stroke-width="1.5" opacity="0.3">
      <animate attributeName="r" values="${sz/2};${sz/2+20}" dur="1.4s" begin="0.3s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.4;0" dur="1.4s" begin="0.3s" repeatCount="indefinite"/>
    </circle>` : "";

  const svg = `<svg width="${sz + 16}" height="${sz + 18}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="glow${user.id}" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="${active ? 5 : 2.5}" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <linearGradient id="lg${user.id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="white"/>
        <stop offset="100%" stop-color="${c}22"/>
      </linearGradient>
    </defs>
    <g transform="translate(8,0)">
      ${pulse}
      <circle cx="${sz/2}" cy="${sz/2}" r="${sz/2 - 1}" fill="url(#lg${user.id})"
        stroke="${c}" stroke-width="${active ? 3 : 2.5}" filter="url(#glow${user.id})"/>
      <text x="${sz/2}" y="${sz/2 + sz*0.15}" text-anchor="middle"
        font-size="${sz*0.42}" font-family="Georgia,serif" font-weight="800" fill="${c}">
        ${user.name.charAt(0)}
      </text>
      <polygon points="${sz/2-6},${sz+1} ${sz/2+6},${sz+1} ${sz/2},${sz+14}" fill="${c}"/>
      ${user.verified
        ? `<circle cx="${sz-3}" cy="5" r="7" fill="#22C55E" stroke="white" stroke-width="1.5"/>
           <text x="${sz-3}" y="9.5" text-anchor="middle" font-size="9" fill="white" font-weight="bold">✓</text>`
        : ""}
    </g>
  </svg>`;

  return L.divIcon({
    html: svg, className: "",
    iconSize:   [sz + 16, sz + 18],
    iconAnchor: [(sz + 16) / 2, sz + 18],
    popupAnchor:[0, -(sz + 18)],
  });
}

// ── Fly to selected user ──────────────────────────────────────────────────
function FlyTo({ target }) {
  const map = useMap();
  useEffect(() => {
    if (target) map.flyTo([target.lat, target.lng], 15, { duration: 1.1, easeLinearity: 0.25 });
  }, [target]);
  return null;
}

// ── Dynamic tile layer ────────────────────────────────────────────────────
function TileSwitcher({ dark }) {
  const map = useMap();
  const tileRef = useRef(null);
  useEffect(() => {
    if (tileRef.current) map.removeLayer(tileRef.current);
    tileRef.current = L.tileLayer(dark ? TILE.dark : TILE.light, { maxZoom: 19 });
    tileRef.current.addTo(map);
    return () => { if (tileRef.current) map.removeLayer(tileRef.current); };
  }, [dark]);
  return null;
}

// ── Custom zoom buttons ───────────────────────────────────────────────────
function ZoomControls({ dark }) {
  const map = useMap();
  const base = {
    width: 38, height: 38, borderRadius: 12,
    background: dark ? "rgba(15,8,30,0.88)" : "rgba(255,255,255,0.9)",
    border: `1.5px solid ${dark ? "rgba(139,92,246,0.3)" : "rgba(139,92,246,0.18)"}`,
    backdropFilter: "blur(20px)", color: "#8B5CF6",
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 20, lineHeight: 1, boxShadow: "0 4px 16px rgba(139,92,246,0.14)",
    transition: "all .18s", fontFamily: "sans-serif", border: "none",
  };
  const btns = [
    { icon: "+", fn: () => map.zoomIn()  },
    { icon: "−", fn: () => map.zoomOut() },
    { icon: "⌖", fn: () => map.flyTo([33.585, -7.635], 13, { duration: 1.1 }) },
  ];
  return (
    <div style={{ position: "absolute", bottom: 32, left: 16, zIndex: 999, display: "flex", flexDirection: "column", gap: 6 }}>
      {btns.map(({ icon, fn }) => (
        <button key={icon} onClick={fn}
          style={{ ...base, background: dark ? "rgba(15,8,30,0.88)" : "rgba(255,255,255,0.9)", border: `1.5px solid ${dark ? "rgba(139,92,246,0.3)" : "rgba(139,92,246,0.18)"}` }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(139,92,246,0.15)"; e.currentTarget.style.transform = "scale(1.1)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = dark ? "rgba(15,8,30,0.88)" : "rgba(255,255,255,0.9)"; e.currentTarget.style.transform = "scale(1)"; }}>
          {icon}
        </button>
      ))}
    </div>
  );
}

// ── Level legend ──────────────────────────────────────────────────────────
function Legend({ dark }) {
  return (
    <div style={{
      position: "absolute", bottom: 32, right: 16, zIndex: 999,
      background: dark ? "rgba(12,6,28,0.9)" : "rgba(255,255,255,0.92)",
      backdropFilter: "blur(24px)",
      border: `1px solid ${dark ? "rgba(139,92,246,0.22)" : "rgba(139,92,246,0.14)"}`,
      borderRadius: 16, padding: "12px 16px",
      boxShadow: "0 8px 32px rgba(139,92,246,0.14)",
    }}>
      <p style={{ margin: "0 0 8px", fontSize: 9, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "1px", fontFamily: "Sora,sans-serif", fontWeight: 600 }}>Level</p>
      {Object.entries(LVL).map(([lvl, color]) => (
        <div key={lvl} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: color, boxShadow: `0 0 7px ${color}` }}/>
          <span style={{ fontSize: 11, color: dark ? "#CBD5E1" : "#374151", fontFamily: "Sora,sans-serif" }}>{lvl}</span>
        </div>
      ))}
    </div>
  );
}

// ── Popup card ────────────────────────────────────────────────────────────
function PopupCard({ user, dark }) {
  const c    = LVL[user.helpSystem?.level] || "#8B5CF6";
  const bg   = dark ? "#0f0720" : "#ffffff";
  const txt  = dark ? "#f1f5f9" : "#1e1b4b";
  const mute = dark ? "#94a3b8" : "#6b7280";
  const pillBg = dark ? "rgba(255,255,255,0.05)" : "rgba(139,92,246,0.05)";

  return (
    <div style={{ width: 244, fontFamily: "Sora,sans-serif", background: bg, borderRadius: 20, overflow: "hidden" }}>
      <div style={{ height: 5, background: "linear-gradient(90deg,#8B5CF6,#D946EF,#F97316)" }}/>
      <div style={{ padding: "14px 16px 16px" }}>

        {/* Avatar + name */}
        <div style={{ display: "flex", gap: 11, alignItems: "center", marginBottom: 11 }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
            background: `${c}15`, border: `3px solid ${c}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, fontWeight: 800, color: c, fontFamily: "Georgia,serif",
            boxShadow: `0 0 14px ${c}44`,
          }}>{user.name.charAt(0)}</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: txt, display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 118 }}>{user.name}</span>
              {user.verified && <span style={{ fontSize: 9, background: "#22C55E1a", color: "#22C55E", padding: "2px 6px", borderRadius: 10, fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>✓</span>}
            </div>
            <div style={{ fontSize: 11, color: mute, marginTop: 2 }}>📍 {user.neighborhood}</div>
            <div style={{ fontSize: 10, color: c, fontWeight: 600, marginTop: 1 }}>{user.helpSystem?.level}</div>
          </div>
        </div>

        {/* Bio */}
        <p style={{ fontSize: 11.5, color: mute, lineHeight: 1.6, margin: "0 0 11px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {user.bio}
        </p>

        {/* Stats */}
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          {[
            { v: `★ ${user.stats?.rating ?? "—"}`, l: "Rating",  clr: "#F59E0B" },
            { v: user.stats?.helpGiven ?? 0,        l: "Helped",  clr: "#22C55E" },
            { v: user.helpSystem?.points ?? 0,      l: "Points",  clr: c },
          ].map(({ v, l, clr }) => (
            <div key={l} style={{ flex: 1, textAlign: "center", padding: "6px 2px", background: pillBg, borderRadius: 10, border: `1px solid ${dark ? "rgba(139,92,246,0.14)" : "rgba(139,92,246,0.1)"}` }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: clr }}>{v}</div>
              <div style={{ fontSize: 9, color: mute, marginTop: 1 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Skills */}
        {[
          { label: "Offering",     skills: user.offeredSkills, bg: `${c}14`, color: c, border: `${c}30` },
          { label: "Looking for",  skills: user.wantedSkills,  bg: "rgba(217,70,239,0.1)", color: "#D946EF", border: "rgba(217,70,239,0.25)" },
        ].map(({ label, skills, bg: sBg, color: sC, border: sB }) => (
          <div key={label} style={{ marginBottom: 10 }}>
            <p style={{ fontSize: 9.5, color: mute, textTransform: "uppercase", letterSpacing: "0.6px", margin: "0 0 5px", fontWeight: 600 }}>{label}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {(skills ?? []).slice(0, 3).map(s => (
                <span key={s} style={{ fontSize: 10, padding: "3px 10px", borderRadius: 20, background: sBg, color: sC, border: `1px solid ${sB}` }}>{s}</span>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <button style={{
          width: "100%", padding: "10px", marginTop: 4,
          background: "linear-gradient(135deg,#8B5CF6,#D946EF,#F97316)",
          border: "none", borderRadius: 24, color: "#fff",
          fontSize: 12, fontWeight: 700, cursor: "pointer",
          letterSpacing: "0.3px", fontFamily: "Sora,sans-serif",
          boxShadow: "0 6px 22px rgba(139,92,246,0.42)",
          transition: "all .2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(139,92,246,0.55)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 22px rgba(139,92,246,0.42)"; }}>
          Connect →
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// Filter out any non-user entries (comments, posts, etc. that may be in the JSON)
const validUsers = users.filter(u =>
  u &&
  typeof u.name === "string" &&
  typeof u.lat  === "number" &&
  typeof u.lng  === "number"
);

export default function SectionMap({ dark }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <MapContainer
        center={[33.585, -7.635]} zoom={13} minZoom={11} maxZoom={17}
        style={{ width: "100%", height: "100%" }}
        zoomControl={false} scrollWheelZoom
      >
        <TileSwitcher dark={dark} />
        <FlyTo target={selected} />
        <ZoomControls dark={dark} />
        <Legend dark={dark} />

        {validUsers.map(user => (
          <Marker
            key={user.id}
            position={[user.lat, user.lng]}
            icon={makeIcon(user, selected?.id === user.id)}
            zIndexOffset={selected?.id === user.id ? 1000 : 0}
            eventHandlers={{ click: () => setSelected(p => p?.id === user.id ? null : user) }}
          >
            <Popup offset={[0, -50]} closeButton={false} className="qriblik-popup">
              <PopupCard user={user} dark={dark} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}