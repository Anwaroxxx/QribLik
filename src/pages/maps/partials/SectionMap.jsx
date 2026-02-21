import { useState, useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import users from "../../../data/UserData.json";

const USER_IMGS = import.meta.glob(
  "../../../assets/images/users/*",
  { eager: true, import: "default" }
);
const IMG_MAP = {};
Object.entries(USER_IMGS).forEach(([path, url]) => {
  if (!url) return;
  const filename = path.split("/").pop();
  const noExt    = filename.replace(/\.[^.]+$/, "");
  IMG_MAP[noExt.toLowerCase()] = url;
  IMG_MAP[noExt]               = url;
});

function resolveImg(user, index) {
  const id   = String(user.id ?? "");
  const idx  = String(index + 1);
  const name = (user.name || "").toLowerCase();
  return (
    IMG_MAP[id] || IMG_MAP[idx] ||
    IMG_MAP[name.replace(/\s+/g, "_")] ||
    IMG_MAP[name.replace(/\s+/g, "-")] ||
    IMG_MAP[name.replace(/\s+/g, "")] || null
  );
}

const TILE = {
  light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  dark:  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
};

const CATEGORIES = [
  { id: "all",         label: "All",          icon: "🗺️", color: "#8B5CF6" },
  { id: "sport",       label: "Sport",        icon: "⚽", color: "#22C55E" },
  { id: "trade",       label: "Trade",        icon: "💼", color: "#F59E0B" },
  { id: "event",       label: "Event",        icon: "🎉", color: "#EC4899" },
  { id: "lost_found",  label: "Lost & Found", icon: "🔍", color: "#06B6D4" },
  { id: "swap_skills", label: "Swap Skills",  icon: "🔄", color: "#F97316" },
];

function getUserCategory(user) {
  const all = [...(user.offeredSkills||[]),...(user.wantedSkills||[]),user.bio||""].join(" ").toLowerCase();
  if (/sport|football|basketball|tennis|gym|fitness|run|swim|yoga|martial|box/.test(all)) return "sport";
  if (/trade|sell|buy|business|market|product|goods|commerce|shop/.test(all))             return "trade";
  if (/event|party|concert|festival|meetup|gathering|organiz/.test(all))                   return "event";
  if (/lost|found|missing|search|looking for|find/.test(all))                              return "lost_found";
  if (/skill|teach|learn|tutor|coach|language|code|design|music|cook|craft/.test(all))    return "swap_skills";
  const cats = ["sport","trade","event","lost_found","swap_skills"];
  return cats[(user.id??0) % cats.length] || "swap_skills";
}

function getCatColor(cat) {
  return CATEGORIES.find(c => c.id === cat)?.color || "#8B5CF6";
}

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

// ── Compute safe bottom nav height (accounts for iOS safe area) ──────────
function useBottomNavHeight() {
  const [height, setHeight] = useState(70);
  useEffect(() => {
    // Read the actual CSS env variable for safe-area-inset-bottom
    const el = document.createElement("div");
    el.style.cssText = "position:fixed;bottom:0;height:env(safe-area-inset-bottom,0px);pointer-events:none;visibility:hidden;";
    document.body.appendChild(el);
    const safeArea = parseFloat(getComputedStyle(el).height) || 0;
    document.body.removeChild(el);
    setHeight(70 + safeArea);
  }, []);
  return height;
}

// ── SVG marker ────────────────────────────────────────────────────────────
function makeIcon(user, isActive, category, imgUrl) {
  const c   = getCatColor(category || getUserCategory(user));
  const sz  = isActive ? 56 : 44;
  const uid = `u${user.id}_${isActive?1:0}`;
  const r   = sz / 2;
  const initial = (user.name || "?").charAt(0).toUpperCase();

  const pulse = isActive ? `
    <circle cx="${r}" cy="${r}" r="${r+2}" fill="none" stroke="${c}" stroke-width="2.5" opacity="0.5">
      <animate attributeName="r" values="${r};${r+18}" dur="1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.55;0" dur="1.5s" repeatCount="indefinite"/>
    </circle>` : "";

  const inner = imgUrl
    ? `<image href="${imgUrl}" x="3" y="3" width="${sz-6}" height="${sz-6}" clip-path="url(#cp${uid})" preserveAspectRatio="xMidYMid slice"/>`
    : `<circle cx="${r}" cy="${r}" r="${r-2}" fill="${c}18"/>
       <text x="${r}" y="${r+sz*0.13}" text-anchor="middle" font-size="${sz*0.42}" font-family="Georgia,serif" font-weight="900" fill="${c}">${initial}</text>`;

  const svg = `<svg width="${sz+20}" height="${sz+22}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="cp${uid}"><circle cx="${r}" cy="${r}" r="${r-2.5}"/></clipPath>
    <filter id="sh${uid}" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="${isActive?5:2}" stdDeviation="${isActive?7:3}" flood-color="${c}" flood-opacity="${isActive?0.55:0.3}"/>
    </filter>
  </defs>
  <g transform="translate(10,0)" filter="url(#sh${uid})">
    ${pulse}${inner}
    <circle cx="${r}" cy="${r}" r="${r-1}" fill="none" stroke="${c}" stroke-width="${isActive?3.5:2.5}"/>
    <path d="M${r-8},${sz-1} Q${r},${sz+15} ${r+8},${sz-1}" fill="${c}" opacity="0.9"/>
    ${user.verified
      ? `<circle cx="${sz-4}" cy="7" r="8" fill="${c}" stroke="white" stroke-width="1.5"/>
         <text x="${sz-4}" y="11.5" text-anchor="middle" font-size="9.5" fill="white" font-weight="bold">✓</text>`
      : ""}
  </g>
</svg>`;

  return L.divIcon({
    html: svg, className: "",
    iconSize:   [sz+20, sz+22],
    iconAnchor: [(sz+20)/2, sz+22],
    popupAnchor:[0, -(sz+16)],
  });
}

// ── Map helpers ───────────────────────────────────────────────────────────
function FlyTo({ target }) {
  const map = useMap();
  useEffect(() => { if (target) map.flyTo([target.lat, target.lng], 15, { duration:1.0 }); }, [target]);
  return null;
}

function TileSwitcher({ dark }) {
  const map = useMap();
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) map.removeLayer(ref.current);
    ref.current = L.tileLayer(dark ? TILE.dark : TILE.light, { maxZoom:19 });
    ref.current.addTo(map);
    return () => { if (ref.current) map.removeLayer(ref.current); };
  }, [dark]);
  return null;
}

function ZoomControls({ dark, bottomOffset }) {
  const map = useMap();
  const bg  = dark ? "rgba(14,7,32,0.92)" : "rgba(255,255,255,0.92)";
  const bdr = dark ? "rgba(139,92,246,0.3)" : "rgba(139,92,246,0.18)";
  return (
    <div style={{
      position: "absolute",
      bottom: bottomOffset + 12,
      right: 14,
      zIndex: 999,
      display: "flex",
      flexDirection: "column",
      gap: 6,
    }}>
      {[
        { icon: "+", fn: () => map.zoomIn() },
        { icon: "−", fn: () => map.zoomOut() },
        { icon: "⌖", fn: () => map.flyTo([33.585,-7.635], 13, { duration: 1 }) },
      ].map(({ icon, fn }) => (
        <button key={icon} onClick={fn} style={{
          width: 44, height: 44, borderRadius: 13,
          background: bg,
          border: `1.5px solid ${bdr}`,
          backdropFilter: "blur(20px)",
          color: "#8B5CF6",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22,
          boxShadow: "0 4px 16px rgba(139,92,246,0.14)",
          WebkitTapHighlightColor: "transparent",
          touchAction: "manipulation",
        }}>
          {icon}
        </button>
      ))}
    </div>
  );
}

// ── Mobile bottom sheet for user card ────────────────────────────────────
function MobileUserSheet({ user, dark, onAccept, onSkip, onClose, imgUrl, bottomOffset }) {
  const cat     = getUserCategory(user);
  const c       = getCatColor(cat);
  const catMeta = CATEGORIES.find(x => x.id === cat);
  const bg      = dark ? "#0e0720" : "#ffffff";
  const txt     = dark ? "#f1f5f9" : "#1a1040";
  const mute    = dark ? "#94a3b8" : "#6b7280";

  return (
    <>
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, zIndex: 4000,
        background: "rgba(0,0,0,0.4)", backdropFilter: "blur(3px)",
      }} />
      <div style={{
        position: "fixed",
        bottom: bottomOffset,
        left: 0, right: 0,
        zIndex: 4001,
        background: bg,
        borderRadius: "24px 24px 0 0",
        boxShadow: "0 -8px 48px rgba(139,92,246,0.22)",
        maxHeight: `calc(85vh - ${bottomOffset}px)`,
        overflowY: "auto",
        animation: "mapSlideUp 0.28s cubic-bezier(0.32,0.72,0,1) forwards",
        fontFamily: "Sora,sans-serif",
        // Prevent the sheet from intercepting map touches when closed
        WebkitOverflowScrolling: "touch",
      }}>
        <div style={{ height: 4, background: `linear-gradient(90deg,${c},${c}88,${c}33)` }} />

        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
          <div style={{ width: 40, height: 4, borderRadius: 4, background: dark ? "rgba(255,255,255,0.15)" : "#e2e8f0" }} />
        </div>

        <div style={{ padding: "8px 20px 32px" }}>
          {/* Top row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{
              fontSize: 11, fontWeight: 700,
              background: `${c}18`, color: c,
              border: `1px solid ${c}30`,
              padding: "4px 12px", borderRadius: 20,
            }}>
              {catMeta?.icon} {catMeta?.label}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {user.verified && (
                <span style={{
                  fontSize: 10, background: "#22C55E15", color: "#22C55E",
                  padding: "3px 10px", borderRadius: 20, fontWeight: 700,
                  border: "1px solid #22C55E25",
                }}>✓ Verified</span>
              )}
              <button onClick={onClose} style={{
                border: "none", background: "transparent", cursor: "pointer",
                fontSize: 24, color: mute, lineHeight: 1, padding: 4,
                WebkitTapHighlightColor: "transparent",
              }}>✕</button>
            </div>
          </div>

          {/* Profile */}
          <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 14 }}>
            <div style={{
              width: 68, height: 68, borderRadius: "50%", flexShrink: 0,
              border: `3px solid ${c}`, overflow: "hidden",
              background: `${c}15`, display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 0 24px ${c}44`,
            }}>
              {imgUrl
                ? <img src={imgUrl} alt={user.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <span style={{ fontSize: 28, fontWeight: 900, color: c, fontFamily: "Georgia,serif" }}>{(user.name||"?").charAt(0)}</span>
              }
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: txt }}>{user.name}</div>
              <div style={{ fontSize: 12, color: mute, marginTop: 3 }}>📍 {user.neighborhood}</div>
              <div style={{ fontSize: 11, color: c, fontWeight: 700, marginTop: 2 }}>{user.helpSystem?.level}</div>
            </div>
          </div>

          <p style={{ fontSize: 13, color: mute, lineHeight: 1.7, margin: "0 0 14px" }}>{user.bio}</p>

          {/* Stats */}
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            {[
              { v: `★ ${user.stats?.rating??"—"}`, l: "Rating", cl: "#F59E0B" },
              { v: user.stats?.helpGiven??0,        l: "Helped", cl: "#22C55E" },
              { v: user.helpSystem?.points??0,       l: "Points", cl: c },
            ].map(({ v, l, cl }) => (
              <div key={l} style={{
                flex: 1, textAlign: "center",
                padding: "8px 4px",
                background: dark ? "rgba(255,255,255,0.04)" : `${c}08`,
                borderRadius: 12,
                border: `1px solid ${dark ? "rgba(139,92,246,0.14)" : "rgba(139,92,246,0.09)"}`,
              }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: cl }}>{v}</div>
                <div style={{ fontSize: 10, color: mute, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Skills */}
          {[
            { label: "Offering",    list: user.offeredSkills||[], bg: `${c}14`,                  color: c,         border: `1px solid ${c}28` },
            { label: "Looking for", list: user.wantedSkills||[],  bg: "rgba(217,70,239,0.09)",   color: "#D946EF", border: "1px solid rgba(217,70,239,0.22)" },
          ].map(({ label, list, bg: sb, color: sc, border: sbo }) => (
            <div key={label} style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 10, color: mute, textTransform: "uppercase", letterSpacing: "0.7px", margin: "0 0 6px", fontWeight: 700 }}>{label}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {list.slice(0, 4).map(s => (
                  <span key={s} style={{ fontSize: 11, padding: "5px 12px", borderRadius: 20, background: sb, color: sc, border: sbo }}>{s}</span>
                ))}
              </div>
            </div>
          ))}

          {/* Buttons */}
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button onClick={() => { onSkip?.(user); onClose(); }} style={{
              flex: 1, padding: "15px 0", borderRadius: 28, cursor: "pointer",
              background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
              border: `1.5px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
              color: mute, fontSize: 15, fontWeight: 700, fontFamily: "Sora,sans-serif",
              WebkitTapHighlightColor: "transparent", touchAction: "manipulation",
            }}>✕ Skip</button>
            <button onClick={() => { onAccept?.(user); onClose(); }} style={{
              flex: 1.8, padding: "15px 0", borderRadius: 28, cursor: "pointer",
              background: `linear-gradient(135deg,${c},${c}cc)`,
              border: "none", color: "#fff", fontSize: 15, fontWeight: 700,
              fontFamily: "Sora,sans-serif",
              boxShadow: `0 6px 24px ${c}44`,
              WebkitTapHighlightColor: "transparent", touchAction: "manipulation",
            }}>✓ Connect</button>
          </div>
        </div>
      </div>
      <style>{`@keyframes mapSlideUp { from{transform:translateY(100%);opacity:0} to{transform:translateY(0);opacity:1} }`}</style>
    </>
  );
}

// ── Desktop popup card ────────────────────────────────────────────────────
function PopupCard({ user, dark, onAccept, onSkip, imgUrl }) {
  const cat     = getUserCategory(user);
  const c       = getCatColor(cat);
  const catMeta = CATEGORIES.find(x => x.id === cat);
  const bg      = dark ? "#0e0720" : "#ffffff";
  const txt     = dark ? "#f1f5f9" : "#1a1040";
  const mute    = dark ? "#94a3b8" : "#6b7280";

  return (
    <div style={{ width: 258, fontFamily: "Sora,sans-serif", background: bg, borderRadius: 20, overflow: "hidden" }}>
      <div style={{ height: 5, background: `linear-gradient(90deg,${c},${c}88,${c}33)` }} />
      <div style={{ padding: "14px 16px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 10, fontWeight: 700, background: `${c}18`, color: c, border: `1px solid ${c}30`, padding: "3px 10px", borderRadius: 20 }}>{catMeta?.icon} {catMeta?.label}</span>
          {user.verified && <span style={{ fontSize: 9.5, background: "#22C55E15", color: "#22C55E", padding: "2px 8px", borderRadius: 20, fontWeight: 700, border: "1px solid #22C55E25" }}>✓ Verified</span>}
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
          <div style={{ width: 54, height: 54, borderRadius: "50%", flexShrink: 0, border: `3px solid ${c}`, overflow: "hidden", background: `${c}15`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 20px ${c}44` }}>
            {imgUrl
              ? <img src={imgUrl} alt={user.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <span style={{ fontSize: 22, fontWeight: 900, color: c, fontFamily: "Georgia,serif" }}>{(user.name||"?").charAt(0)}</span>
            }
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: txt, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name}</div>
            <div style={{ fontSize: 11, color: mute, marginTop: 2 }}>📍 {user.neighborhood}</div>
            <div style={{ fontSize: 10.5, color: c, fontWeight: 700, marginTop: 2 }}>{user.helpSystem?.level}</div>
          </div>
        </div>
        <p style={{ fontSize: 11.5, color: mute, lineHeight: 1.65, margin: "0 0 12px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{user.bio}</p>
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          {[
            { v: `★ ${user.stats?.rating??"—"}`, l: "Rating", cl: "#F59E0B" },
            { v: user.stats?.helpGiven??0,        l: "Helped", cl: "#22C55E" },
            { v: user.helpSystem?.points??0,       l: "Points", cl: c },
          ].map(({ v, l, cl }) => (
            <div key={l} style={{ flex: 1, textAlign: "center", padding: "6px 2px", background: dark ? "rgba(255,255,255,0.04)" : `${c}08`, borderRadius: 10, border: `1px solid ${dark ? "rgba(139,92,246,0.14)" : "rgba(139,92,246,0.09)"}` }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: cl }}>{v}</div>
              <div style={{ fontSize: 9, color: mute, marginTop: 1 }}>{l}</div>
            </div>
          ))}
        </div>
        {[
          { label: "Offering",    list: user.offeredSkills||[], bg: `${c}14`,                  color: c,         border: `1px solid ${c}28` },
          { label: "Looking for", list: user.wantedSkills||[],  bg: "rgba(217,70,239,0.09)", color: "#D946EF", border: "1px solid rgba(217,70,239,0.22)" },
        ].map(({ label, list, bg: sb, color: sc, border: sbo }) => (
          <div key={label} style={{ marginBottom: 10 }}>
            <p style={{ fontSize: 9, color: mute, textTransform: "uppercase", letterSpacing: "0.7px", margin: "0 0 5px", fontWeight: 700 }}>{label}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {list.slice(0, 3).map(s => <span key={s} style={{ fontSize: 10, padding: "3px 9px", borderRadius: 20, background: sb, color: sc, border: sbo }}>{s}</span>)}
            </div>
          </div>
        ))}
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <button onClick={() => onSkip?.(user)} style={{
            flex: 1, padding: "10px 0", borderRadius: 24, cursor: "pointer",
            background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
            border: `1.5px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
            color: mute, fontSize: 12, fontWeight: 700, fontFamily: "Sora,sans-serif",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; e.currentTarget.style.color = "#EF4444"; }}
            onMouseLeave={e => { e.currentTarget.style.background = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"; e.currentTarget.style.color = mute; }}
          >
            ✕ Skip
          </button>
          <button onClick={() => onAccept?.(user)} style={{
            flex: 1.6, padding: "10px 0", borderRadius: 24, cursor: "pointer",
            background: `linear-gradient(135deg,${c},${c}cc)`,
            border: "none", color: "#fff", fontSize: 12, fontWeight: 700,
            fontFamily: "Sora,sans-serif",
            boxShadow: `0 6px 20px ${c}44`,
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 10px 28px ${c}66`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 6px 20px ${c}44`; }}
          >
            ✓ Connect
          </button>
        </div>
      </div>
    </div>
  );
}

const validUsers = users.filter(u => u && typeof u.name === "string" && typeof u.lat === "number" && typeof u.lng === "number");

const TOP_BAR_H = 52;

export default function SectionMap({ category = "all", dark = false }) {
  const [selected,       setSelected]       = useState(null);
  const [mobileSelected, setMobileSelected] = useState(null);
  const [connected,      setConnected]      = useState(new Set());
  const [skipped,        setSkipped]        = useState(new Set());
  const isMobile     = useIsMobile();
  // FIX 1: Dynamically compute bottom nav height including iOS safe area
  const BOTTOM_NAV_H = useBottomNavHeight();

  const filtered = category === "all"
    ? validUsers
    : validUsers.filter(u => getUserCategory(u) === category);

  return (
    <>
      <style>{`
        .leaflet-popup-content-wrapper {
          padding: 0 !important;
          border-radius: 20px !important;
          overflow: hidden;
          box-shadow: 0 16px 48px rgba(139,92,246,0.22) !important;
        }
        .leaflet-popup-content { margin: 0 !important; }
        .leaflet-popup-tip-container { display: none; }

        /*
         * FIX 2: Use "manipulation" instead of "pan-x pan-y".
         * "manipulation" allows panning + pinch-zoom while still
         * enabling fast tap detection (no 300ms delay) on mobile.
         * "pan-x pan-y" was suppressing tap events on some Android browsers.
         */
        .leaflet-container { touch-action: manipulation; }

        .leaflet-marker-icon {
          -webkit-user-select: none;
          user-select: none;
          -webkit-touch-callout: none;
        }
        .leaflet-bottom.leaflet-right {
          bottom: ${BOTTOM_NAV_H + 4}px !important;
        }
      `}</style>

      <div style={{
        position: "fixed",
        top: TOP_BAR_H,
        left: 0,
        right: 0,
        bottom: BOTTOM_NAV_H,
        zIndex: 1,
      }}>
        <MapContainer
          center={[33.585, -7.635]} zoom={13} minZoom={11} maxZoom={17}
          style={{ width: "100%", height: "100%" }}
          zoomControl={false}
          scrollWheelZoom
          /*
           * FIX 3: Remove tap={false}.
           * Leaflet's internal tap handler is what fires "click" events
           * from touchstart/touchend on iOS Safari. Disabling it meant
           * marker taps were silently swallowed on iPhones.
           * Default (true) is correct for mobile.
           */
          dragging={true}
          touchZoom={true}
          doubleClickZoom={true}
        >
          <TileSwitcher dark={dark} />
          <FlyTo target={isMobile ? mobileSelected : selected} />
          <ZoomControls dark={dark} bottomOffset={8} />

          {filtered.filter(u => !skipped.has(u.id)).map((user, index) => {
            const cat         = getUserCategory(user);
            const isActive    = isMobile ? mobileSelected?.id === user.id : selected?.id === user.id;
            const isConnected = connected.has(user.id);
            const imgUrl      = resolveImg(user, index);

            return (
              <Marker
                key={user.id}
                position={[user.lat, user.lng]}
                icon={makeIcon(user, isActive, cat, imgUrl)}
                zIndexOffset={isActive ? 1000 : isConnected ? 500 : 0}
                eventHandlers={{
                  click: () => {
                    if (isMobile) {
                      setMobileSelected(prev => prev?.id === user.id ? null : user);
                    } else {
                      setSelected(prev => prev?.id === user.id ? null : user);
                    }
                  },
                }}
              >
                {/* Desktop only: Leaflet Popup */}
                {!isMobile && (
                  <Popup offset={[0, -52]} closeButton={false} className="qriblik-popup">
                    {isConnected ? (
                      <div style={{
                        padding: "18px 22px",
                        background: dark ? "#0e0720" : "#fff",
                        borderRadius: 16, textAlign: "center",
                        fontFamily: "Sora,sans-serif",
                      }}>
                        <div style={{ fontSize: 30, marginBottom: 6 }}>🎉</div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: "#22C55E", marginBottom: 4 }}>Connected!</div>
                        <div style={{ fontSize: 11, color: dark ? "#94a3b8" : "#6b7280" }}>{user.name} is in your network</div>
                      </div>
                    ) : (
                      <PopupCard user={user} dark={dark} imgUrl={imgUrl}
                        onAccept={u => { setConnected(prev => new Set([...prev, u.id])); setSelected(null); }}
                        onSkip={u => { setSkipped(prev => new Set([...prev, u.id])); setSelected(null); }}
                      />
                    )}
                  </Popup>
                )}
              </Marker>
            );
          })}
        </MapContainer>

        {/* Mobile: bottom sheet */}
        {isMobile && mobileSelected && (
          connected.has(mobileSelected.id) ? (
            <>
              <div onClick={() => setMobileSelected(null)} style={{
                position: "fixed", inset: 0, zIndex: 4000,
                background: "rgba(0,0,0,0.35)", backdropFilter: "blur(3px)",
              }} />
              <div style={{
                position: "fixed",
                bottom: BOTTOM_NAV_H,
                left: 0, right: 0,
                zIndex: 4001,
                background: dark ? "#0e0720" : "#fff",
                borderRadius: "24px 24px 0 0",
                padding: "32px 24px 48px",
                textAlign: "center",
                fontFamily: "Sora,sans-serif",
                animation: "mapSlideUp .28s cubic-bezier(0.32,0.72,0,1) forwards",
              }}>
                <div style={{ fontSize: 48, marginBottom: 10 }}>🎉</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#22C55E", marginBottom: 6 }}>Connected!</div>
                <div style={{ fontSize: 13, color: dark ? "#94a3b8" : "#6b7280", marginBottom: 20 }}>{mobileSelected.name} is in your network</div>
                <button onClick={() => setMobileSelected(null)} style={{
                  padding: "12px 32px", borderRadius: 24, border: "none",
                  background: "#22C55E", color: "#fff", fontSize: 14, fontWeight: 700,
                  cursor: "pointer", fontFamily: "Sora,sans-serif",
                  WebkitTapHighlightColor: "transparent",
                }}>Done</button>
              </div>
              <style>{`@keyframes mapSlideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
            </>
          ) : (
            <MobileUserSheet
              user={mobileSelected} dark={dark}
              imgUrl={resolveImg(mobileSelected, validUsers.indexOf(mobileSelected))}
              onAccept={u => setConnected(prev => new Set([...prev, u.id]))}
              onSkip={u => setSkipped(prev => new Set([...prev, u.id]))}
              onClose={() => setMobileSelected(null)}
              bottomOffset={BOTTOM_NAV_H}
            />
          )
        )}
      </div>
    </>
  );
}