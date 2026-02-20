import { useState, useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import users from "../../../data/UserData.json";    

// ── Tiles ─────────────────────────────────────────────────────────────────
const TILE = {
  light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  dark:  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
};

// ── Categories ────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all",          label: "All",           icon: "🗺️",  color: "#8B5CF6" },
  { id: "sport",        label: "Sport",         icon: "⚽",  color: "#22C55E" },
  { id: "trade",        label: "Trade",         icon: "💼",  color: "#F59E0B" },
  { id: "event",        label: "Event",         icon: "🎉",  color: "#EC4899" },
  { id: "lost_found",   label: "Lost & Found",  icon: "🔍",  color: "#06B6D4" },
  { id: "swap_skills",  label: "Swap Skills",   icon: "🔄",  color: "#F97316" },
];

// Map a user to a category based on their skills/data
function getUserCategory(user) {
  const offered = (user.offeredSkills || []).join(" ").toLowerCase();
  const wanted  = (user.wantedSkills  || []).join(" ").toLowerCase();
  const bio     = (user.bio || "").toLowerCase();
  const all     = offered + " " + wanted + " " + bio;

  if (/sport|football|basketball|tennis|gym|fitness|run|swim|yoga|martial|box/.test(all))    return "sport";
  if (/trade|sell|buy|business|market|product|goods|commerce|shop/.test(all))                 return "trade";
  if (/event|party|concert|festival|meetup|gathering|organiz/.test(all))                      return "event";
  if (/lost|found|missing|search|looking for|find/.test(all))                                 return "lost_found";
  if (/skill|teach|learn|tutor|coach|language|code|design|music|cook|craft/.test(all))        return "swap_skills";

  // Fallback by index
  const cats = ["sport","trade","event","lost_found","swap_skills"];
  return cats[user.id % cats.length] || "swap_skills";
}

// ── Category color ────────────────────────────────────────────────────────
function getCatColor(cat) {
  return CATEGORIES.find(c => c.id === cat)?.color || "#8B5CF6";
}

// ── Animated SVG profile marker ───────────────────────────────────────────
function makeIcon(user, active, category) {
  const c  = getCatColor(category || getUserCategory(user));
  const sz = active ? 54 : 42;

  // Profile circle with initial + category color ring + pin tail
  const pulse = active ? `
    <circle cx="${sz/2}" cy="${sz/2}" r="${sz/2+1}" fill="none" stroke="${c}" stroke-width="2.5" opacity="0.5">
      <animate attributeName="r" values="${sz/2};${sz/2+16}" dur="1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.55;0" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="${sz/2}" cy="${sz/2}" r="${sz/2+1}" fill="none" stroke="${c}" stroke-width="1.5" opacity="0.3">
      <animate attributeName="r" values="${sz/2};${sz/2+24}" dur="1.5s" begin="0.35s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.35;0" dur="1.5s" begin="0.35s" repeatCount="indefinite"/>
    </circle>` : "";

  const uid = `${user.id}_${active ? 1 : 0}`;
  const initial = (user.name || "?").charAt(0).toUpperCase();
  const catIcon = CATEGORIES.find(cat => cat.id === getUserCategory(user))?.icon || "👤";

  const svg = `<svg width="${sz+20}" height="${sz+22}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="sh${uid}" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="${active ? 4 : 2}" stdDeviation="${active ? 6 : 3}" flood-color="${c}" flood-opacity="${active ? 0.5 : 0.3}"/>
    </filter>
    <radialGradient id="bg${uid}" cx="35%" cy="35%">
      <stop offset="0%" stop-color="white"/>
      <stop offset="100%" stop-color="${c}25"/>
    </radialGradient>
    <clipPath id="clip${uid}">
      <circle cx="${sz/2}" cy="${sz/2}" r="${sz/2 - 2}"/>
    </clipPath>
  </defs>
  <g transform="translate(10,0)">
    ${pulse}
    <!-- Shadow circle -->
    <circle cx="${sz/2}" cy="${sz/2}" r="${sz/2}" fill="${c}" opacity="0.12"/>
    <!-- Main circle -->
    <circle cx="${sz/2}" cy="${sz/2}" r="${sz/2 - 1}" fill="url(#bg${uid})"
      stroke="${c}" stroke-width="${active ? 3 : 2.5}" filter="url(#sh${uid})"/>
    <!-- Profile initial -->
    <text x="${sz/2}" y="${sz/2 + sz*0.13}" text-anchor="middle"
      font-size="${sz*0.43}" font-family="Georgia,serif" font-weight="900"
      fill="${c}" letter-spacing="-0.5">${initial}</text>
    <!-- Pin tail -->
    <path d="M${sz/2-7},${sz} Q${sz/2},${sz+14} ${sz/2+7},${sz}"
      fill="${c}" opacity="0.9"/>
    <!-- Verified badge -->
    ${user.verified ? `
    <circle cx="${sz-3}" cy="6" r="8" fill="${c}" stroke="white" stroke-width="1.5" filter="url(#sh${uid})"/>
    <text x="${sz-3}" y="10.5" text-anchor="middle" font-size="9" fill="white" font-weight="bold">✓</text>` : ""}
  </g>
</svg>`;

  return L.divIcon({
    html: svg,
    className: "",
    iconSize:   [sz + 20, sz + 22],
    iconAnchor: [(sz + 20) / 2, sz + 22],
    popupAnchor:[0, -(sz + 16)],
  });
}

// ── Fly to user ────────────────────────────────────────────────────────────
function FlyTo({ target }) {
  const map = useMap();
  useEffect(() => {
    if (target) map.flyTo([target.lat, target.lng], 15, { duration: 1.0, easeLinearity: 0.28 });
  }, [target]);
  return null;
}

// ── Tile switcher ──────────────────────────────────────────────────────────
function TileSwitcher({ dark }) {
  const map = useMap();
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) map.removeLayer(ref.current);
    ref.current = L.tileLayer(dark ? TILE.dark : TILE.light, { maxZoom: 19 });
    ref.current.addTo(map);
    return () => { if (ref.current) map.removeLayer(ref.current); };
  }, [dark]);
  return null;
}

// ── Zoom controls ──────────────────────────────────────────────────────────
function ZoomControls({ dark }) {
  const map = useMap();
  const btn = {
    width: 38, height: 38, borderRadius: 11,
    background: dark ? "rgba(15,8,30,0.9)" : "rgba(255,255,255,0.92)",
    border: `1.5px solid ${dark ? "rgba(139,92,246,0.3)" : "rgba(139,92,246,0.18)"}`,
    backdropFilter: "blur(20px)",
    color: "#8B5CF6", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 20, boxShadow: "0 4px 16px rgba(139,92,246,0.14)",
    transition: "all .18s", fontFamily: "sans-serif",
  };
  return (
    <div style={{ position: "absolute", bottom: 32, left: 16, zIndex: 999, display: "flex", flexDirection: "column", gap: 6 }}>
      {[
        { icon: "+", fn: () => map.zoomIn() },
        { icon: "−", fn: () => map.zoomOut() },
        { icon: "⌖", fn: () => map.flyTo([33.585, -7.635], 13, { duration: 1 }) },
      ].map(({ icon, fn }) => (
        <button key={icon} style={btn} onClick={fn}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(139,92,246,0.15)"; e.currentTarget.style.transform = "scale(1.1)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = dark ? "rgba(15,8,30,0.9)" : "rgba(255,255,255,0.92)"; e.currentTarget.style.transform = "scale(1)"; }}>
          {icon}
        </button>
      ))}
    </div>
  );
}

// ── Popup card with Accept / Skip ─────────────────────────────────────────
function PopupCard({ user, dark, onAccept, onSkip, category }) {
  const cat   = getUserCategory(user);
  const c     = getCatColor(cat);
  const catMeta = CATEGORIES.find(x => x.id === cat);
  const bg    = dark ? "#0e0720" : "#ffffff";
  const txt   = dark ? "#f1f5f9" : "#1a1040";
  const mute  = dark ? "#94a3b8" : "#6b7280";
  const pill  = dark ? "rgba(255,255,255,0.05)" : `${c}0a`;

  return (
    <div style={{ width: 252, fontFamily: "Sora,sans-serif", background: bg, borderRadius: 20, overflow: "hidden" }}>
      {/* Gradient header bar */}
      <div style={{ height: 5, background: `linear-gradient(90deg,${c},${c}88,${c}44)` }}/>

      <div style={{ padding: "14px 16px 16px" }}>
        {/* Category badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{
            fontSize: 10, fontWeight: 700,
            background: `${c}18`, color: c,
            border: `1px solid ${c}30`,
            padding: "3px 10px", borderRadius: 20,
            letterSpacing: "0.4px",
          }}>
            {catMeta?.icon} {catMeta?.label}
          </span>
          {user.verified && (
            <span style={{ fontSize: 9.5, background: "#22C55E15", color: "#22C55E", padding: "2px 8px", borderRadius: 20, fontWeight: 700, border: "1px solid #22C55E25" }}>
              ✓ Verified
            </span>
          )}
        </div>

        {/* Profile row */}
        <div style={{ display: "flex", gap: 11, alignItems: "center", marginBottom: 12 }}>
          <div style={{
            width: 52, height: 52, borderRadius: "50%", flexShrink: 0,
            background: `${c}15`, border: `3px solid ${c}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, fontWeight: 900, color: c, fontFamily: "Georgia,serif",
            boxShadow: `0 0 18px ${c}44`,
          }}>
            {(user.name || "?").charAt(0)}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: txt, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user.name}
            </div>
            <div style={{ fontSize: 11, color: mute, marginTop: 2 }}>📍 {user.neighborhood}</div>
            <div style={{ fontSize: 10.5, color: c, fontWeight: 700, marginTop: 2 }}>
              {user.helpSystem?.level}
            </div>
          </div>
        </div>

        {/* Bio */}
        <p style={{ fontSize: 11.5, color: mute, lineHeight: 1.65, margin: "0 0 12px",
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {user.bio}
        </p>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          {[
            { v: `★ ${user.stats?.rating ?? "—"}`, l: "Rating",  cl: "#F59E0B" },
            { v: user.stats?.helpGiven ?? 0,        l: "Helped",  cl: "#22C55E" },
            { v: user.helpSystem?.points ?? 0,      l: "Points",  cl: c },
          ].map(({ v, l, cl }) => (
            <div key={l} style={{ flex: 1, textAlign: "center", padding: "6px 2px",
              background: pill, borderRadius: 10,
              border: `1px solid ${dark ? "rgba(139,92,246,0.14)" : "rgba(139,92,246,0.09)"}` }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: cl }}>{v}</div>
              <div style={{ fontSize: 9, color: mute, marginTop: 1 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div style={{ marginBottom: 6 }}>
          <p style={{ fontSize: 9, color: mute, textTransform: "uppercase", letterSpacing: "0.7px", margin: "0 0 5px", fontWeight: 700 }}>Offering</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {(user.offeredSkills || []).slice(0, 3).map(s => (
              <span key={s} style={{ fontSize: 10, padding: "3px 9px", borderRadius: 20, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{s}</span>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 9, color: mute, textTransform: "uppercase", letterSpacing: "0.7px", margin: "0 0 5px", fontWeight: 700 }}>Looking for</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {(user.wantedSkills || []).slice(0, 3).map(s => (
              <span key={s} style={{ fontSize: 10, padding: "3px 9px", borderRadius: 20, background: "rgba(217,70,239,0.09)", color: "#D946EF", border: "1px solid rgba(217,70,239,0.22)" }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Accept / Skip buttons */}
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => onSkip?.(user)} style={{
            flex: 1, padding: "10px 0",
            background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
            border: `1.5px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
            borderRadius: 24, color: mute,
            fontSize: 12, fontWeight: 700, cursor: "pointer",
            fontFamily: "Sora,sans-serif", transition: "all .2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; e.currentTarget.style.color = "#EF4444"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.25)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"; e.currentTarget.style.color = mute; e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"; }}>
            ✕ Skip
          </button>
          <button onClick={() => onAccept?.(user)} style={{
            flex: 1.6, padding: "10px 0",
            background: `linear-gradient(135deg,${c},${c}cc)`,
            border: "none", borderRadius: 24, color: "#fff",
            fontSize: 12, fontWeight: 700, cursor: "pointer",
            fontFamily: "Sora,sans-serif",
            boxShadow: `0 6px 20px ${c}44`,
            transition: "all .2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 10px 28px ${c}66`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 6px 20px ${c}44`; }}>
            ✓ Connect
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Category Filter Bar ────────────────────────────────────────────────────
export function CategoryFilter({ active, onChange, dark }) {
  return (
    <div style={{
      position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)",
      zIndex: 1000, display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center",
      padding: "8px 12px",
      background: dark ? "rgba(10,5,25,0.88)" : "rgba(255,255,255,0.9)",
      backdropFilter: "blur(24px)",
      border: `1px solid ${dark ? "rgba(139,92,246,0.2)" : "rgba(139,92,246,0.14)"}`,
      borderRadius: 20,
      boxShadow: "0 8px 32px rgba(139,92,246,0.14)",
    }}>
      {CATEGORIES.map(cat => {
        const isActive = active === cat.id;
        return (
          <button key={cat.id} onClick={() => onChange(cat.id)} style={{
            display: "flex", alignItems: "center", gap: 5,
            padding: "6px 14px", borderRadius: 20,
            background: isActive ? cat.color : "transparent",
            border: `1.5px solid ${isActive ? cat.color : dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
            color: isActive ? "#fff" : dark ? "#CBD5E1" : "#4B5563",
            fontSize: 11.5, fontWeight: isActive ? 700 : 500,
            cursor: "pointer", fontFamily: "Sora,sans-serif",
            transition: "all .22s",
            boxShadow: isActive ? `0 4px 14px ${cat.color}44` : "none",
            transform: isActive ? "translateY(-1px)" : "translateY(0)",
          }}
          onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = `${cat.color}15`; e.currentTarget.style.borderColor = `${cat.color}40`; e.currentTarget.style.color = cat.color; }}}
          onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"; e.currentTarget.style.color = dark ? "#CBD5E1" : "#4B5563"; }}}>
            <span style={{ fontSize: 13 }}>{cat.icon}</span>
            {cat.label}
            {cat.id !== "all" && (
              <span style={{
                fontSize: 9, fontWeight: 800,
                background: isActive ? "rgba(255,255,255,0.25)" : `${cat.color}20`,
                color: isActive ? "#fff" : cat.color,
                padding: "1px 5px", borderRadius: 10,
              }}>
                {users.filter(u => u && typeof u.name === "string" && getUserCategory(u) === cat.id).length}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ── Valid users only ───────────────────────────────────────────────────────
const validUsers = users.filter(u =>
  u && typeof u.name === "string" &&
  typeof u.lat === "number" &&
  typeof u.lng === "number"
);

// ══════════════════════════════════════════════════════════════════════════
export default function SectionMap({ dark }) {
  const [selected,  setSelected]  = useState(null);
  const [category,  setCategory]  = useState("all");
  const [connected, setConnected] = useState(new Set());
  const [skipped,   setSkipped]   = useState(new Set());

  const filtered = category === "all"
    ? validUsers
    : validUsers.filter(u => getUserCategory(u) === category);

  const handleAccept = (user) => {
    setConnected(prev => new Set([...prev, user.id]));
    setSelected(null);
  };
  const handleSkip = (user) => {
    setSkipped(prev => new Set([...prev, user.id]));
    setSelected(null);
  };

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

        {/* Category legend bottom-right */}
        <div style={{
          position: "absolute", bottom: 32, right: 16, zIndex: 999,
          background: dark ? "rgba(12,6,28,0.9)" : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(24px)",
          border: `1px solid ${dark ? "rgba(139,92,246,0.22)" : "rgba(139,92,246,0.14)"}`,
          borderRadius: 16, padding: "12px 16px",
          boxShadow: "0 8px 32px rgba(139,92,246,0.12)",
        }}>
          <p style={{ margin: "0 0 8px", fontSize: 9, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "1px", fontFamily: "Sora,sans-serif", fontWeight: 700 }}>Category</p>
          {CATEGORIES.filter(c => c.id !== "all").map(cat => (
            <div key={cat.id} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5, cursor: "pointer" }}
              onClick={() => setCategory(cat.id === category ? "all" : cat.id)}>
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: cat.color, boxShadow: `0 0 6px ${cat.color}` }}/>
              <span style={{ fontSize: 11, color: dark ? "#CBD5E1" : "#374151", fontFamily: "Sora,sans-serif",
                fontWeight: category === cat.id ? 700 : 400 }}>{cat.icon} {cat.label}</span>
            </div>
          ))}
        </div>

        {/* Filter bar */}
        <CategoryFilter active={category} onChange={setCategory} dark={dark} />

        {filtered
          .filter(u => !skipped.has(u.id))
          .map(user => {
            const cat = getUserCategory(user);
            const isConnected = connected.has(user.id);
            return (
              <Marker
                key={user.id}
                position={[user.lat, user.lng]}
                icon={makeIcon(user, selected?.id === user.id, cat)}
                zIndexOffset={selected?.id === user.id ? 1000 : isConnected ? 500 : 0}
                eventHandlers={{ click: () => setSelected(p => p?.id === user.id ? null : user) }}
              >
                {!isConnected && (
                  <Popup offset={[0, -52]} closeButton={false} className="qriblik-popup">
                    <PopupCard
                      user={user} dark={dark}
                      category={cat}
                      onAccept={handleAccept}
                      onSkip={handleSkip}
                    />
                  </Popup>
                )}
                {isConnected && (
                  <Popup offset={[0, -52]} closeButton={false} className="qriblik-popup">
                    <div style={{
                      padding: "16px 20px", background: dark ? "#0e0720" : "#fff",
                      borderRadius: 16, textAlign: "center", fontFamily: "Sora,sans-serif",
                      boxShadow: "0 8px 28px rgba(34,197,94,0.18)",
                    }}>
                      <div style={{ fontSize: 28, marginBottom: 6 }}>🎉</div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: "#22C55E", marginBottom: 4 }}>Connected!</div>
                      <div style={{ fontSize: 11, color: dark ? "#94a3b8" : "#6b7280" }}>{user.name} is in your network</div>
                    </div>
                  </Popup>
                )}
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
}