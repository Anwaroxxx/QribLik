import { useState, useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import users from "../../../data/UserData.json";

// ── Eagerly import all user images from assets/images/users ───────────────
// Vite's import.meta.glob gives us a map of { "./path": url }
const USER_IMGS = import.meta.glob(
  "../../../assets/images/users/*.{png,jpg,jpeg,webp,PNG,JPG}",
  { eager: true, import: "default" }
);

// Build a lookup: filename-without-ext → resolved URL
// e.g. "1" → "/assets/images/users/1.jpg"
const IMG_MAP = {};
Object.entries(USER_IMGS).forEach(([path, url]) => {
  const name = path.split("/").pop().replace(/\.[^.]+$/, ""); // "1", "sara", etc.
  IMG_MAP[name] = url;
});

// Resolve image for a user — tries id, name, index, falls back to null
function resolveImg(user, index) {
  return (
    IMG_MAP[String(user.id)]    ||
    IMG_MAP[String(index + 1)]  ||
    IMG_MAP[(user.name || "").toLowerCase().replace(/\s+/g, "_")] ||
    IMG_MAP[(user.name || "").toLowerCase().replace(/\s+/g, "-")] ||
    null
  );
}

// ── Tiles ─────────────────────────────────────────────────────────────────
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
  const all = [
    ...(user.offeredSkills || []),
    ...(user.wantedSkills  || []),
    user.bio || "",
  ].join(" ").toLowerCase();

  if (/sport|football|basketball|tennis|gym|fitness|run|swim|yoga|martial|box/.test(all)) return "sport";
  if (/trade|sell|buy|business|market|product|goods|commerce|shop/.test(all))             return "trade";
  if (/event|party|concert|festival|meetup|gathering|organiz/.test(all))                   return "event";
  if (/lost|found|missing|search|looking for|find/.test(all))                              return "lost_found";
  if (/skill|teach|learn|tutor|coach|language|code|design|music|cook|craft/.test(all))    return "swap_skills";
  const cats = ["sport", "trade", "event", "lost_found", "swap_skills"];
  return cats[(user.id ?? 0) % cats.length] || "swap_skills";
}

function getCatColor(cat) {
  return CATEGORIES.find(c => c.id === cat)?.color || "#8B5CF6";
}

// ── SVG marker with profile image ────────────────────────────────────────
function makeIcon(user, isActive, category, imgUrl) {
  const c   = getCatColor(category || getUserCategory(user));
  const sz  = isActive ? 56 : 44;
  const uid = `u${user.id}_${isActive ? 1 : 0}`;
  const r   = sz / 2;
  const initial = (user.name || "?").charAt(0).toUpperCase();

  const pulse = isActive ? `
    <circle cx="${r}" cy="${r}" r="${r + 2}" fill="none" stroke="${c}" stroke-width="2.5" opacity="0.5">
      <animate attributeName="r" values="${r};${r + 18}" dur="1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.55;0" dur="1.5s" repeatCount="indefinite"/>
    </circle>` : "";

  // Inner content: photo if available, initial otherwise
  const inner = imgUrl
    ? `<image href="${imgUrl}" x="3" y="3" width="${sz - 6}" height="${sz - 6}" clip-path="url(#cp${uid})" preserveAspectRatio="xMidYMid slice"/>`
    : `<circle cx="${r}" cy="${r}" r="${r - 2}" fill="${c}18"/>
       <text x="${r}" y="${r + sz * 0.13}" text-anchor="middle" font-size="${sz * 0.42}" font-family="Georgia,serif" font-weight="900" fill="${c}">${initial}</text>`;

  const svg = `<svg width="${sz + 20}" height="${sz + 22}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="cp${uid}"><circle cx="${r}" cy="${r}" r="${r - 2.5}"/></clipPath>
    <filter id="sh${uid}" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="${isActive ? 5 : 2}" stdDeviation="${isActive ? 7 : 3}"
        flood-color="${c}" flood-opacity="${isActive ? 0.55 : 0.3}"/>
    </filter>
  </defs>
  <g transform="translate(10,0)" filter="url(#sh${uid})">
    ${pulse}
    <!-- Photo / initial circle -->
    ${inner}
    <!-- Color ring -->
    <circle cx="${r}" cy="${r}" r="${r - 1}" fill="none"
      stroke="${c}" stroke-width="${isActive ? 3.5 : 2.5}"/>
    <!-- Pin tail -->
    <path d="M${r - 8},${sz - 1} Q${r},${sz + 15} ${r + 8},${sz - 1}" fill="${c}" opacity="0.9"/>
    <!-- Verified badge -->
    ${user.verified
      ? `<circle cx="${sz - 4}" cy="7" r="8" fill="${c}" stroke="white" stroke-width="1.5"/>
         <text x="${sz - 4}" y="11.5" text-anchor="middle" font-size="9.5" fill="white" font-weight="bold">✓</text>`
      : ""}
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

// ── Map helpers ───────────────────────────────────────────────────────────
function FlyTo({ target }) {
  const map = useMap();
  useEffect(() => {
    if (target) map.flyTo([target.lat, target.lng], 15, { duration: 1.0 });
  }, [target]);
  return null;
}

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

function ZoomControls({ dark }) {
  const map = useMap();
  const bg  = dark ? "rgba(14,7,32,0.92)" : "rgba(255,255,255,0.92)";
  const bdr = dark ? "rgba(139,92,246,0.3)" : "rgba(139,92,246,0.18)";
  return (
    <div style={{ position:"absolute", bottom:32, left:16, zIndex:999, display:"flex", flexDirection:"column", gap:6 }}>
      {[
        { icon:"+", fn:() => map.zoomIn()  },
        { icon:"−", fn:() => map.zoomOut() },
        { icon:"⌖", fn:() => map.flyTo([33.585,-7.635],13,{duration:1}) },
      ].map(({ icon, fn }) => (
        <button key={icon} onClick={fn} style={{
          width:38, height:38, borderRadius:11,
          background:bg, border:`1.5px solid ${bdr}`,
          backdropFilter:"blur(20px)", color:"#8B5CF6",
          cursor:"pointer", display:"flex", alignItems:"center",
          justifyContent:"center", fontSize:20,
          boxShadow:"0 4px 16px rgba(139,92,246,0.14)",
          transition:"all .18s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background="rgba(139,92,246,0.15)"; e.currentTarget.style.transform="scale(1.1)"; }}
        onMouseLeave={e => { e.currentTarget.style.background=bg; e.currentTarget.style.transform="scale(1)"; }}>
          {icon}
        </button>
      ))}
    </div>
  );
}

// ── Popup card ────────────────────────────────────────────────────────────
function PopupCard({ user, dark, onAccept, onSkip, imgUrl }) {
  const cat     = getUserCategory(user);
  const c       = getCatColor(cat);
  const catMeta = CATEGORIES.find(x => x.id === cat);
  const bg      = dark ? "#0e0720" : "#ffffff";
  const txt     = dark ? "#f1f5f9" : "#1a1040";
  const mute    = dark ? "#94a3b8" : "#6b7280";

  return (
    <div style={{ width:258, fontFamily:"Sora,sans-serif", background:bg, borderRadius:20, overflow:"hidden" }}>
      <div style={{ height:5, background:`linear-gradient(90deg,${c},${c}88,${c}33)` }} />
      <div style={{ padding:"14px 16px 16px" }}>

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <span style={{ fontSize:10, fontWeight:700, background:`${c}18`, color:c, border:`1px solid ${c}30`, padding:"3px 10px", borderRadius:20 }}>
            {catMeta?.icon} {catMeta?.label}
          </span>
          {user.verified && (
            <span style={{ fontSize:9.5, background:"#22C55E15", color:"#22C55E", padding:"2px 8px", borderRadius:20, fontWeight:700, border:"1px solid #22C55E25" }}>✓ Verified</span>
          )}
        </div>

        {/* Profile */}
        <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:12 }}>
          <div style={{
            width:54, height:54, borderRadius:"50%", flexShrink:0,
            border:`3px solid ${c}`, overflow:"hidden",
            background:`${c}15`,
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:`0 0 20px ${c}44`,
          }}>
            {imgUrl
              ? <img src={imgUrl} alt={user.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              : <span style={{ fontSize:22, fontWeight:900, color:c, fontFamily:"Georgia,serif" }}>{(user.name||"?").charAt(0)}</span>
            }
          </div>
          <div style={{ minWidth:0 }}>
            <div style={{ fontSize:14, fontWeight:800, color:txt, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user.name}</div>
            <div style={{ fontSize:11, color:mute, marginTop:2 }}>📍 {user.neighborhood}</div>
            <div style={{ fontSize:10.5, color:c, fontWeight:700, marginTop:2 }}>{user.helpSystem?.level}</div>
          </div>
        </div>

        {/* Bio */}
        <p style={{ fontSize:11.5, color:mute, lineHeight:1.65, margin:"0 0 12px",
          display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
          {user.bio}
        </p>

        {/* Stats */}
        <div style={{ display:"flex", gap:6, marginBottom:12 }}>
          {[
            { v:`★ ${user.stats?.rating??"—"}`, l:"Rating", cl:"#F59E0B" },
            { v:user.stats?.helpGiven??0,        l:"Helped", cl:"#22C55E" },
            { v:user.helpSystem?.points??0,       l:"Points", cl:c },
          ].map(({ v, l, cl }) => (
            <div key={l} style={{ flex:1, textAlign:"center", padding:"6px 2px",
              background: dark?"rgba(255,255,255,0.04)":`${c}08`,
              borderRadius:10, border:`1px solid ${dark?"rgba(139,92,246,0.14)":"rgba(139,92,246,0.09)"}` }}>
              <div style={{ fontSize:13, fontWeight:800, color:cl }}>{v}</div>
              <div style={{ fontSize:9, color:mute, marginTop:1 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Skills */}
        {[
          { label:"Offering",    list:user.offeredSkills||[], bg:`${c}14`, color:c, border:`1px solid ${c}28` },
          { label:"Looking for", list:user.wantedSkills||[],  bg:"rgba(217,70,239,0.09)", color:"#D946EF", border:"1px solid rgba(217,70,239,0.22)" },
        ].map(({ label, list, bg:sb, color:sc, border:sbo }) => (
          <div key={label} style={{ marginBottom:10 }}>
            <p style={{ fontSize:9, color:mute, textTransform:"uppercase", letterSpacing:"0.7px", margin:"0 0 5px", fontWeight:700 }}>{label}</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
              {list.slice(0,3).map(s => (
                <span key={s} style={{ fontSize:10, padding:"3px 9px", borderRadius:20, background:sb, color:sc, border:sbo }}>{s}</span>
              ))}
            </div>
          </div>
        ))}

        {/* Buttons */}
        <div style={{ display:"flex", gap:8, marginTop:4 }}>
          <button onClick={() => onSkip?.(user)} style={{
            flex:1, padding:"10px 0", borderRadius:24, cursor:"pointer",
            background: dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)",
            border:`1.5px solid ${dark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"}`,
            color:mute, fontSize:12, fontWeight:700, fontFamily:"Sora,sans-serif", transition:"all .2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background="rgba(239,68,68,0.1)"; e.currentTarget.style.color="#EF4444"; }}
          onMouseLeave={e => { e.currentTarget.style.background= dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)"; e.currentTarget.style.color=mute; }}>
            ✕ Skip
          </button>
          <button onClick={() => onAccept?.(user)} style={{
            flex:1.6, padding:"10px 0", borderRadius:24, cursor:"pointer",
            background:`linear-gradient(135deg,${c},${c}cc)`,
            border:"none", color:"#fff", fontSize:12, fontWeight:700,
            fontFamily:"Sora,sans-serif", boxShadow:`0 6px 20px ${c}44`, transition:"all .2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 10px 28px ${c}66`; }}
          onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=`0 6px 20px ${c}44`; }}>
            ✓ Connect
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Valid users ───────────────────────────────────────────────────────────
const validUsers = users.filter(u =>
  u && typeof u.name === "string" &&
  typeof u.lat === "number" &&
  typeof u.lng === "number"
);

// ══════════════════════════════════════════════════════════════════════════
export default function SectionMap({ category = "all", dark = false }) {
  const [selected,  setSelected]  = useState(null);
  const [connected, setConnected] = useState(new Set());
  const [skipped,   setSkipped]   = useState(new Set());

  const filtered = category === "all"
    ? validUsers
    : validUsers.filter(u => getUserCategory(u) === category);

  return (
    <div style={{ width:"100%", height:"100%", position:"relative" }}>
      <MapContainer
        center={[33.585, -7.635]} zoom={13} minZoom={11} maxZoom={17}
        style={{ width:"100%", height:"100%" }}
        zoomControl={false} scrollWheelZoom
      >
        <TileSwitcher dark={dark} />
        <FlyTo target={selected} />
        <ZoomControls dark={dark} />

        {/* Legend */}
        {/* Removed - now in dashboard sidebar */}

        {/* Markers */}
        {filtered.filter(u => !skipped.has(u.id)).map((user, index) => {
          const cat         = getUserCategory(user);
          const isActive    = selected?.id === user.id;
          const isConnected = connected.has(user.id);
          const imgUrl      = resolveImg(user, index);

          return (
            <Marker
              key={user.id}
              position={[user.lat, user.lng]}
              icon={makeIcon(user, isActive, cat, imgUrl)}
              zIndexOffset={isActive ? 1000 : isConnected ? 500 : 0}
              eventHandlers={{ click: () => setSelected(p => p?.id === user.id ? null : user) }}
            >
              <Popup offset={[0, -52]} closeButton={false} className="qriblik-popup">
                {isConnected ? (
                  <div style={{ padding:"18px 22px", background: dark?"#0e0720":"#fff", borderRadius:16, textAlign:"center", fontFamily:"Sora,sans-serif" }}>
                    <div style={{ fontSize:30, marginBottom:6 }}>🎉</div>
                    <div style={{ fontSize:13, fontWeight:800, color:"#22C55E", marginBottom:4 }}>Connected!</div>
                    <div style={{ fontSize:11, color: dark?"#94a3b8":"#6b7280" }}>{user.name} is in your network</div>
                  </div>
                ) : (
                  <PopupCard
                    user={user} dark={dark} imgUrl={imgUrl}
                    onAccept={(u) => { setConnected(prev => new Set([...prev, u.id])); setSelected(null); }}
                    onSkip={(u)   => { setSkipped(prev => new Set([...prev, u.id]));   setSelected(null); }}
                  />
                )}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}