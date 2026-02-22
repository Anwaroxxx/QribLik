import { useState, useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import users from "../../../data/UserData.json";

const USER_IMGS = import.meta.glob("../../../assets/images/users/*", { eager: true, import: "default" });
const GIRL_IMGS = import.meta.glob("../../../assets/images/girl-profile/*", { eager: true, import: "default" });

const IMG_MAP = {};
[USER_IMGS, GIRL_IMGS].forEach(source => {
  Object.entries(source).forEach(([path, url]) => {
    if (!url) return;
    const noExt = path.split("/").pop().replace(/\.[^.]+$/, "");
    const lower = noExt.toLowerCase();
    IMG_MAP[lower] = url;
    IMG_MAP[lower.replace(/-/g, "")] = url;
    IMG_MAP[lower.replace(/-(\d)/g, "$1")] = url;
  });
});

function resolveImg(user) {
  return IMG_MAP[(user.avatar ?? "").toLowerCase()] || null;
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

const EXTRA_GIRLS = [
  { id: 101, name: "Hiba Mansouri", username: "hiba_mansouri", avatar: "girl15", neighborhood: "Maarif", city: "Casablanca", lat: 33.5881, lng: -7.6310, bio: "Nutritionist and wellness coach. Helping people build healthy habits one meal at a time.", verified: true, offeredSkills: ["Nutrition", "Meal Planning", "Wellness Coaching"], wantedSkills: ["Yoga", "Photography"], languages: ["Arabic", "French", "English"], stats: { helpGiven: 31, helpReceived: 12, rating: 4.8, reviewCount: 27 }, helpSystem: { points: 380, level: "Active Helper", badges: ["Wellness Pro"] } },
  { id: 102, name: "Rania Benkirane", username: "rania_benkirane", avatar: "girl16", neighborhood: "Gauthier", city: "Casablanca", lat: 33.5920, lng: -7.6290, bio: "Pianist and music teacher offering private lessons for beginners and intermediate students.", verified: true, offeredSkills: ["Piano", "Music Theory", "Solfège"], wantedSkills: ["Coding", "Marketing"], languages: ["Arabic", "French"], stats: { helpGiven: 22, helpReceived: 9, rating: 4.9, reviewCount: 19 }, helpSystem: { points: 260, level: "Active Helper", badges: ["Melody Maker"] } },
  { id: 103, name: "Dounia Chraibi", username: "dounia_chraibi", avatar: "girl17", neighborhood: "Ain Sebaa", city: "Casablanca", lat: 33.6041, lng: -7.5720, bio: "Graphic designer passionate about branding and visual identity for local businesses.", verified: false, offeredSkills: ["Graphic Design", "Branding", "Logo Design"], wantedSkills: ["Photography", "Video Editing"], languages: ["Arabic", "French", "English"], stats: { helpGiven: 17, helpReceived: 7, rating: 4.7, reviewCount: 14 }, helpSystem: { points: 200, level: "Rising Helper", badges: ["Design Eye"] } },
  { id: 104, name: "Soumia El Fassi", username: "soumia_elfassi", avatar: "girl18", neighborhood: "Bourgogne", city: "Casablanca", lat: 33.5855, lng: -7.6215, bio: "Pilates instructor and physical therapist helping people move better and feel stronger.", verified: true, offeredSkills: ["Pilates", "Physical Therapy", "Stretching"], wantedSkills: ["Cooking", "Spanish"], languages: ["Arabic", "French"], stats: { helpGiven: 38, helpReceived: 14, rating: 4.9, reviewCount: 32 }, helpSystem: { points: 460, level: "Expert Helper", badges: ["Body Balance"] } },
  { id: 105, name: "Kawtar Alami", username: "kawtar_alami", avatar: "girl19", neighborhood: "Racine", city: "Casablanca", lat: 33.5875, lng: -7.6390, bio: "Florist and event decorator. Turning spaces into beautiful experiences with flowers and color.", verified: true, offeredSkills: ["Floral Design", "Event Decoration", "DIY Crafts"], wantedSkills: ["Photography", "Business Planning"], languages: ["Arabic", "French"], stats: { helpGiven: 29, helpReceived: 11, rating: 4.8, reviewCount: 24 }, helpSystem: { points: 345, level: "Active Helper", badges: ["Bloom Artist"] } },
  { id: 106, name: "Nour Tazi", username: "nour_tazi", avatar: "girl11", neighborhood: "Palmier", city: "Casablanca", lat: 33.5838, lng: -7.6510, bio: "Dance instructor teaching contemporary and traditional Moroccan dance styles.", verified: true, offeredSkills: ["Contemporary Dance", "Chaabi Dance", "Choreography"], wantedSkills: ["Music Production", "English"], languages: ["Arabic", "French", "Darija"], stats: { helpGiven: 26, helpReceived: 10, rating: 4.8, reviewCount: 22 }, helpSystem: { points: 310, level: "Active Helper", badges: ["Dance Queen"] } },
  { id: 107, name: "Asmae Berrada", username: "asmae_berrada", avatar: "girl12", neighborhood: "Hay Hassani", city: "Casablanca", lat: 33.5615, lng: -7.6650, bio: "Environmental activist and recycling educator. Teaching communities to live more sustainably.", verified: false, offeredSkills: ["Sustainability Workshops", "Recycling", "Eco Crafts"], wantedSkills: ["Coding", "Marketing"], languages: ["Arabic", "French", "English"], stats: { helpGiven: 19, helpReceived: 8, rating: 4.6, reviewCount: 15 }, helpSystem: { points: 225, level: "Rising Helper", badges: ["Eco Warrior"] } },
  { id: 108, name: "Meryem Rifai", username: "meryem_rifai", avatar: "girl13", neighborhood: "Sidi Belyout", city: "Casablanca", lat: 33.5998, lng: -7.6160, bio: "Pastry chef specializing in Moroccan sweets and French desserts. Sharing recipes and love!", verified: true, offeredSkills: ["Pastry", "Moroccan Sweets", "Cake Design"], wantedSkills: ["Business Management", "Photography"], languages: ["Arabic", "French", "Darija"], stats: { helpGiven: 33, helpReceived: 13, rating: 4.9, reviewCount: 28 }, helpSystem: { points: 395, level: "Active Helper", badges: ["Sugar Artist"] } },
];

function getUserCategory(user) {
  const raw = (user.category ?? "").toLowerCase();
  if (raw.includes("sport")) return "sport";
  if (raw.includes("trad") || raw.includes("swap")) return "trade";
  if (raw.includes("event")) return "event";
  if (raw.includes("lost")) return "lost_found";
  const all = [...(user.offeredSkills || []), ...(user.wantedSkills || []), user.bio || ""].join(" ").toLowerCase();
  if (/sport|football|basketball|tennis|gym|fitness|run|swim|yoga|martial|box|pilates|dance/.test(all)) return "sport";
  if (/trade|sell|buy|business|market|product|goods|commerce|shop/.test(all)) return "trade";
  if (/event|party|concert|festival|meetup|gathering|organiz|decor/.test(all)) return "event";
  if (/lost|found|missing|search|looking for|find/.test(all)) return "lost_found";
  if (/skill|teach|learn|tutor|coach|language|code|design|music|cook|craft|nutrition|wellness/.test(all)) return "swap_skills";
  const cats = ["sport", "trade", "event", "lost_found", "swap_skills"];
  return cats[(user.id ?? 0) % cats.length] || "swap_skills";
}

function getCatColor(cat) {
  return CATEGORIES.find(c => c.id === cat)?.color || "#8B5CF6";
}

function getIntentMessage(user, cat) {
  const offered = user.offeredSkills?.[0] ?? "skills";
  const wanted  = user.wantedSkills?.[0] ?? "something";
  const messages = {
    sport: [
      `Looking for ${2 + (user.id % 3)} players to join my next game! 🏃`,
      `Need a training partner for ${offered}. Let's team up!`,
      `Organizing a ${offered} session this weekend — join me?`,
      `Who wants to train together? I do ${offered} near here.`,
    ],
    trade: [
      `Offering ${offered} in exchange for ${wanted}. Fair deal?`,
      `Trading my ${offered} skills for ${wanted}. Interested?`,
      `Let's swap — my ${offered} for your ${wanted}!`,
      `I can help with ${offered}, looking for ${wanted} in return.`,
    ],
    event: [
      `Hosting a ${offered} event soon — spots available! 🎉`,
      `Organizing a local meetup around ${offered}. Join us!`,
      `Planning something fun with ${offered} — DM to join.`,
      `Event this week: ${offered} workshop. Everyone welcome!`,
    ],
    lost_found: [
      `Found something near ${user.neighborhood} — is it yours? 🔍`,
      `Lost item reported in ${user.neighborhood}. Reach out!`,
      `I found something valuable, trying to return it to the owner.`,
      `Missing something? I may have found it in the area.`,
    ],
    swap_skills: [
      `I teach ${offered}, looking to learn ${wanted}. Swap?`,
      `${offered} for ${wanted} — perfect skill exchange!`,
      `Let's learn from each other: I offer ${offered}.`,
      `Skill swap: my ${offered} ↔ your ${wanted}. Deal?`,
    ],
  };
  const pool = messages[cat] || messages.swap_skills;
  return pool[(user.id ?? 0) % pool.length];
}

const COORD_OVERRIDES = {
  30: { lat: 33.5880, lng: -7.6700 },
  50: { lat: 33.5420, lng: -7.7180 },
  24: { lat: 33.5490, lng: -7.6650 },
  42: { lat: 33.5380, lng: -7.6520 },
  29: { lat: 33.5310, lng: -7.6350 },
  11: { lat: 33.5650, lng: -7.6480 },
  39: { lat: 33.5560, lng: -7.6260 },
};

const baseUsers = users.filter(u => u && typeof u.name === "string" && typeof u.lat === "number" && typeof u.lng === "number");
const fixedUsers = [...baseUsers, ...EXTRA_GIRLS].map(u =>
  COORD_OVERRIDES[u.id] ? { ...u, ...COORD_OVERRIDES[u.id] } : u
);

const ME_POSITION = { lat: 33.5880, lng: -7.6354 };

function makeIcon(user, isActive, category, imgUrl) {
  const c       = getCatColor(category || getUserCategory(user));
  const sz      = isActive ? 56 : 44;
  const uid     = `u${user.id}_${isActive ? 1 : 0}`;
  const r       = sz / 2;
  const initial = (user.name || "?").charAt(0).toUpperCase();

  const pulse = isActive ? `
    <circle cx="${r}" cy="${r}" r="${r + 2}" fill="none" stroke="${c}" stroke-width="2.5" opacity="0.5">
      <animate attributeName="r" values="${r};${r + 18}" dur="1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.55;0" dur="1.5s" repeatCount="indefinite"/>
    </circle>` : "";

  const inner = imgUrl
    ? `<image href="${imgUrl}" x="3" y="3" width="${sz - 6}" height="${sz - 6}" clip-path="url(#cp${uid})" preserveAspectRatio="xMidYMid slice"/>`
    : `<circle cx="${r}" cy="${r}" r="${r - 2}" fill="${c}18"/>
       <text x="${r}" y="${r + sz * 0.13}" text-anchor="middle" font-size="${sz * 0.42}" font-family="Georgia,serif" font-weight="900" fill="${c}">${initial}</text>`;

  const svg = `<svg width="${sz + 20}" height="${sz + 22}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="cp${uid}"><circle cx="${r}" cy="${r}" r="${r - 2.5}"/></clipPath>
    <filter id="sh${uid}" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="${isActive ? 5 : 2}" stdDeviation="${isActive ? 7 : 3}" flood-color="${c}" flood-opacity="${isActive ? 0.55 : 0.3}"/>
    </filter>
  </defs>
  <g transform="translate(10,0)" filter="url(#sh${uid})">
    ${pulse}${inner}
    <circle cx="${r}" cy="${r}" r="${r - 1}" fill="none" stroke="${c}" stroke-width="${isActive ? 3.5 : 2.5}"/>
    <path d="M${r - 8},${sz - 1} Q${r},${sz + 15} ${r + 8},${sz - 1}" fill="${c}" opacity="0.9"/>
    ${user.verified ? `<circle cx="${sz - 4}" cy="7" r="8" fill="${c}" stroke="white" stroke-width="1.5"/><text x="${sz - 4}" y="11.5" text-anchor="middle" font-size="9.5" fill="white" font-weight="bold">✓</text>` : ""}
  </g>
</svg>`;

  return L.divIcon({ html: svg, className: "", iconSize: [sz + 20, sz + 22], iconAnchor: [(sz + 20) / 2, sz + 22], popupAnchor: [0, -(sz + 16)] });
}

function makeYouIcon(dark, imgUrl) {
  const c = "#8B5CF6", sz = 56, r = sz / 2;
  const inner = imgUrl
    ? `<image href="${imgUrl}" x="3" y="3" width="${sz - 6}" height="${sz - 6}" clip-path="url(#cpYou)" preserveAspectRatio="xMidYMid slice"/>`
    : `<text x="${r}" y="${r + 7}" text-anchor="middle" font-size="22" font-family="Arial,sans-serif">📍</text>`;
  const svg = `<svg width="${sz + 20}" height="${sz + 22}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="cpYou"><circle cx="${r}" cy="${r}" r="${r - 2.5}"/></clipPath>
    <filter id="shYou" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="4" stdDeviation="7" flood-color="${c}" flood-opacity="0.6"/>
    </filter>
  </defs>
  <g transform="translate(10,0)" filter="url(#shYou)">
    <circle cx="${r}" cy="${r}" r="${r + 5}" fill="none" stroke="${c}" stroke-width="2" opacity="0.3">
      <animate attributeName="r" values="${r};${r + 22}" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.4;0" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="${r}" cy="${r}" r="${r - 1}" fill="${dark ? "#1e1040" : "#fff"}" stroke="${c}" stroke-width="3.5"/>
    ${inner}
    <circle cx="${r}" cy="${r}" r="${r - 1}" fill="none" stroke="${c}" stroke-width="3.5"/>
    <path d="M${r - 8},${sz - 1} Q${r},${sz + 15} ${r + 8},${sz - 1}" fill="${c}" opacity="0.9"/>
    <circle cx="${sz - 2}" cy="7" r="9" fill="#22C55E" stroke="white" stroke-width="1.5"/>
    <text x="${sz - 2}" y="11.5" text-anchor="middle" font-size="8.5" fill="white" font-weight="bold">YOU</text>
  </g>
</svg>`;
  return L.divIcon({ html: svg, className: "", iconSize: [sz + 20, sz + 22], iconAnchor: [(sz + 20) / 2, sz + 22], popupAnchor: [0, -(sz + 16)] });
}

function FlyTo({ target }) {
  const map = useMap();
  useEffect(() => { if (target) map.flyTo([target.lat, target.lng], 15, { duration: 1.0 }); }, [target]);
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
    <div style={{ position: "absolute", bottom: 20, right: 14, zIndex: 999, display: "flex", flexDirection: "column", gap: 6 }}>
      {[
        { icon: "+", fn: () => map.zoomIn() },
        { icon: "−", fn: () => map.zoomOut() },
        { icon: "⌖", fn: () => map.flyTo([ME_POSITION.lat, ME_POSITION.lng], 14, { duration: 1 }) },
      ].map(({ icon, fn }) => (
        <button key={icon} onClick={fn} style={{ width: 44, height: 44, borderRadius: 13, background: bg, border: `1.5px solid ${bdr}`, backdropFilter: "blur(20px)", color: "#8B5CF6", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: "0 4px 16px rgba(139,92,246,0.14)", WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}>{icon}</button>
      ))}
    </div>
  );
}

function YouPopupCard({ dark, currentUser }) {
  const bg = dark ? "#0e0720" : "#fff", txt = dark ? "#f1f5f9" : "#1a1040", mute = dark ? "#94a3b8" : "#6b7280", c = "#8B5CF6";
  const imgUrl = currentUser ? resolveImg(currentUser) : null;
  return (
    <div style={{ width: 210, fontFamily: "Sora,sans-serif", background: bg, borderRadius: 16, overflow: "hidden" }}>
      <div style={{ height: 4, background: "linear-gradient(90deg,#8B5CF6,#D946EF)" }} />
      <div style={{ padding: "14px 16px 16px", textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", margin: "0 auto 10px", border: `3px solid ${c}`, overflow: "hidden", background: `${c}15`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 20px ${c}44` }}>
          {imgUrl ? <img src={imgUrl} alt="You" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 24 }}>📍</span>}
        </div>
        <div style={{ fontSize: 14, fontWeight: 800, color: txt }}>{currentUser?.name ?? "You"}</div>
        {currentUser?.helpSystem?.level && <div style={{ fontSize: 10, color: c, fontWeight: 700, marginTop: 2 }}>{currentUser.helpSystem.level}</div>}
        <div style={{ fontSize: 11, color: mute, marginTop: 4 }}>📍 Derb Ghallef, Casablanca</div>
        <div style={{ marginTop: 8, fontSize: 10, color: c, background: "rgba(139,92,246,0.1)", borderRadius: 20, padding: "3px 12px", display: "inline-block", fontWeight: 700 }}>Your location</div>
      </div>
    </div>
  );
}

function CompactCard({ user, dark, onConnect, onSkip, imgUrl }) {
  const cat     = getUserCategory(user);
  const c       = getCatColor(cat);
  const catMeta = CATEGORIES.find(x => x.id === cat);
  const bg      = dark ? "#0c0620" : "#ffffff";
  const txt     = dark ? "#f0ebff" : "#160e2e";
  const mute    = dark ? "#7c6fa0" : "#8b7fa8";
  const intent  = getIntentMessage(user, cat);

  return (
    <div style={{ width: 240, fontFamily: "'Sora', sans-serif", background: bg, borderRadius: 18, overflow: "hidden", position: "relative" }}>
      <div style={{ height: 3, background: `linear-gradient(90deg, ${c}, ${c}55)` }} />

      <div style={{ padding: "12px 14px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{ width: 46, height: 46, borderRadius: "50%", border: `2.5px solid ${c}`, overflow: "hidden", background: `${c}15`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 14px ${c}44` }}>
              {imgUrl
                ? <img src={imgUrl} alt={user.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <span style={{ fontSize: 18, fontWeight: 900, color: c, fontFamily: "Georgia,serif" }}>{(user.name || "?").charAt(0)}</span>}
            </div>
            {user.verified && (
              <div style={{ position: "absolute", bottom: -1, right: -1, width: 14, height: 14, borderRadius: "50%", background: c, border: "2px solid " + bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 7, color: "#fff", fontWeight: 900 }}>✓</span>
              </div>
            )}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: txt, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
              <span style={{ fontSize: 9, color: mute }}>📍</span>
              <span style={{ fontSize: 10, color: mute, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.neighborhood}</span>
            </div>
          </div>
          <span style={{ fontSize: 9, fontWeight: 700, background: `${c}18`, color: c, border: `1px solid ${c}30`, padding: "2px 7px", borderRadius: 20, flexShrink: 0 }}>
            {catMeta?.icon} {catMeta?.label}
          </span>
        </div>

        <div style={{ background: dark ? `${c}12` : `${c}09`, border: `1px solid ${c}22`, borderRadius: 10, padding: "8px 10px", marginBottom: 11 }}>
          <p style={{ fontSize: 11.5, color: txt, margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>
            "{intent}"
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 11 }}>
          <div style={{ display: "flex", gap: 3 }}>
            {(user.offeredSkills || []).slice(0, 2).map(s => (
              <span key={s} style={{ fontSize: 9.5, padding: "2px 8px", borderRadius: 20, background: `${c}14`, color: c, border: `1px solid ${c}28`, whiteSpace: "nowrap", overflow: "hidden", maxWidth: 80, textOverflow: "ellipsis" }}>{s}</span>
            ))}
          </div>
          <span style={{ fontSize: 11, color: "#F59E0B", fontWeight: 700 }}>★ {user.stats?.rating ?? "—"}</span>
        </div>

        <div style={{ display: "flex", gap: 7 }}>
          <button
            onClick={() => onSkip?.(user)}
            style={{ flex: 1, padding: "8px 0", borderRadius: 22, cursor: "pointer", background: "transparent", border: `1.5px solid ${dark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)"}`, color: mute, fontSize: 11.5, fontWeight: 700, fontFamily: "Sora,sans-serif", transition: "all 0.18s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; e.currentTarget.style.color = "#EF4444"; e.currentTarget.style.borderColor = "#EF444430"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = mute; e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)"; }}
          >✕ Skip</button>
          <button
            onClick={() => onConnect?.(user)}
            style={{ flex: 1.8, padding: "8px 0", borderRadius: 22, cursor: "pointer", background: `linear-gradient(135deg, ${c}, ${c}bb)`, border: "none", color: "#fff", fontSize: 11.5, fontWeight: 700, fontFamily: "Sora,sans-serif", boxShadow: `0 4px 16px ${c}44`, transition: "transform 0.18s, box-shadow 0.18s", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${c}66`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 16px ${c}44`; }}
          >
            <span>💬</span> Connect
          </button>
        </div>
      </div>
    </div>
  );
}

function MobileUserSheet({ user, dark, onConnect, onSkip, onClose, imgUrl }) {
  const cat     = getUserCategory(user);
  const c       = getCatColor(cat);
  const catMeta = CATEGORIES.find(x => x.id === cat);
  const bg      = dark ? "#0e0720" : "#ffffff";
  const txt     = dark ? "#f1f5f9" : "#1a1040";
  const mute    = dark ? "#94a3b8" : "#6b7280";
  const intent  = getIntentMessage(user, cat);

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 4000, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(3px)" }} />
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 4001, background: bg, borderRadius: "24px 24px 0 0", boxShadow: "0 -8px 48px rgba(139,92,246,0.22)", maxHeight: "70vh", overflowY: "auto", animation: "mapSlideUp 0.28s cubic-bezier(0.32,0.72,0,1) forwards", fontFamily: "Sora,sans-serif", WebkitOverflowScrolling: "touch" }}>
        <div style={{ height: 4, background: `linear-gradient(90deg,${c},${c}88,${c}33)` }} />
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
          <div style={{ width: 40, height: 4, borderRadius: 4, background: dark ? "rgba(255,255,255,0.15)" : "#e2e8f0" }} />
        </div>
        <div style={{ padding: "8px 20px 40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 700, background: `${c}18`, color: c, border: `1px solid ${c}30`, padding: "4px 12px", borderRadius: 20 }}>{catMeta?.icon} {catMeta?.label}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {user.verified && <span style={{ fontSize: 10, background: "#22C55E15", color: "#22C55E", padding: "3px 10px", borderRadius: 20, fontWeight: 700, border: "1px solid #22C55E25" }}>✓ Verified</span>}
              <button onClick={onClose} style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: 22, color: mute, lineHeight: 1, padding: 4, WebkitTapHighlightColor: "transparent" }}>✕</button>
            </div>
          </div>

          <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 12 }}>
            <div style={{ width: 62, height: 62, borderRadius: "50%", flexShrink: 0, border: `3px solid ${c}`, overflow: "hidden", background: `${c}15`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 24px ${c}44` }}>
              {imgUrl ? <img src={imgUrl} alt={user.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 26, fontWeight: 900, color: c, fontFamily: "Georgia,serif" }}>{(user.name || "?").charAt(0)}</span>}
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: txt }}>{user.name}</div>
              <div style={{ fontSize: 12, color: mute, marginTop: 2 }}>📍 {user.neighborhood}</div>
              <div style={{ fontSize: 11, color: "#F59E0B", marginTop: 2, fontWeight: 700 }}>★ {user.stats?.rating} · {user.helpSystem?.level}</div>
            </div>
          </div>

          <div style={{ background: dark ? `${c}12` : `${c}08`, border: `1px solid ${c}22`, borderRadius: 12, padding: "10px 14px", marginBottom: 14 }}>
            <p style={{ fontSize: 13, color: txt, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>"{intent}"</p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
            {(user.offeredSkills || []).slice(0, 3).map(s => (
              <span key={s} style={{ fontSize: 11, padding: "4px 11px", borderRadius: 20, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{s}</span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => { onSkip?.(user); onClose(); }} style={{ flex: 1, padding: "14px 0", borderRadius: 28, cursor: "pointer", background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", border: `1.5px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`, color: mute, fontSize: 14, fontWeight: 700, fontFamily: "Sora,sans-serif", WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}>✕ Skip</button>
            <button onClick={() => { onConnect?.(user); onClose(); }} style={{ flex: 1.8, padding: "14px 0", borderRadius: 28, cursor: "pointer", background: `linear-gradient(135deg,${c},${c}cc)`, border: "none", color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: "Sora,sans-serif", boxShadow: `0 6px 24px ${c}44`, WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}>💬 Connect</button>
          </div>
        </div>
      </div>
      <style>{`@keyframes mapSlideUp { from{transform:translateY(100%);opacity:0} to{transform:translateY(0);opacity:1} }`}</style>
    </>
  );
}

function ChatModal({ user, dark, onClose, messages, setMessages }) {
  const bg      = dark ? "#0c0620" : "#ffffff";
  const bg2     = dark ? "#150d27" : "#f5f3ff";
  const txt     = dark ? "#f0ebff" : "#160e2e";
  const mute    = dark ? "#7c6fa0" : "#8b7fa8";
  const c       = "#8B5CF6";
  const imgUrl  = resolveImg(user);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const convKey = `user_${user.id}`;
  const conv    = messages[convKey] || [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conv]);

  const send = () => {
    if (!input.trim()) return;
    const msg = { text: input.trim(), sender: "me", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), ts: Date.now() };
    setMessages(prev => ({ ...prev, [convKey]: [...(prev[convKey] || []), msg] }));
    setInput("");

    setTimeout(() => {
      const replies = [
        `Sure, sounds great! 😊`,
        `I'd love that! When are you free?`,
        `Perfect! Let's make it happen.`,
        `Awesome, I'll check my schedule and get back to you!`,
        `Yes! That works for me 🙌`,
      ];
      const reply = { text: replies[Math.floor(Math.random() * replies.length)], sender: "them", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), ts: Date.now() + 1 };
      setMessages(prev => ({ ...prev, [convKey]: [...(prev[convKey] || []), reply] }));
    }, 900 + Math.random() * 600);
  };

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 5000, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }} />
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 5001, width: 340, height: 520, borderRadius: 24, background: bg, boxShadow: `0 24px 64px rgba(139,92,246,0.3)`, display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: "Sora,sans-serif", animation: "chatSlideIn 0.3s cubic-bezier(0.32,0.72,0,1) forwards" }}>
        <div style={{ height: 3, background: `linear-gradient(90deg,${c},#D946EF)` }} />

        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px 12px", borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", border: `2px solid ${c}`, overflow: "hidden", background: `${c}15`, flexShrink: 0 }}>
            {imgUrl ? <img src={imgUrl} alt={user.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 900, color: c }}>{user.name.charAt(0)}</div>}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: txt, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name}</div>
            <div style={{ fontSize: 10, color: "#22C55E", fontWeight: 700, marginTop: 1 }}>● Online · {user.neighborhood}</div>
          </div>
          <button onClick={onClose} style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: 18, color: mute, padding: 4, lineHeight: 1, WebkitTapHighlightColor: "transparent" }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 8px", display: "flex", flexDirection: "column", gap: 10, background: bg2 }}>
          {conv.length === 0 && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>👋</div>
              <div style={{ fontSize: 12, color: mute }}>Start the conversation with {user.name.split(" ")[0]}!</div>
            </div>
          )}
          {conv.map((msg, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: msg.sender === "me" ? "flex-end" : "flex-start", maxWidth: "78%", alignSelf: msg.sender === "me" ? "flex-end" : "flex-start" }}>
              <div style={{ padding: "8px 12px", borderRadius: msg.sender === "me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: msg.sender === "me" ? `linear-gradient(135deg,${c},#D946EF)` : bg, color: msg.sender === "me" ? "#fff" : txt, fontSize: 12.5, lineHeight: 1.5, boxShadow: msg.sender === "me" ? `0 4px 14px ${c}44` : "0 2px 8px rgba(0,0,0,0.08)", border: msg.sender === "them" ? `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` : "none" }}>
                {msg.text}
              </div>
              <span style={{ fontSize: 9, color: mute, marginTop: 3 }}>{msg.time}</span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div style={{ padding: "10px 12px 14px", background: bg, display: "flex", gap: 8, alignItems: "center", borderTop: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder={`Message ${user.name.split(" ")[0]}...`}
            style={{ flex: 1, padding: "9px 14px", borderRadius: 22, border: `1.5px solid ${dark ? "rgba(139,92,246,0.2)" : "rgba(139,92,246,0.15)"}`, background: dark ? "rgba(139,92,246,0.08)" : "rgba(139,92,246,0.04)", color: txt, fontSize: 12.5, fontFamily: "Sora,sans-serif", outline: "none" }}
          />
          <button
            onClick={send}
            style={{ width: 36, height: 36, borderRadius: "50%", border: "none", background: `linear-gradient(135deg,${c},#D946EF)`, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, boxShadow: `0 4px 14px ${c}44`, flexShrink: 0, WebkitTapHighlightColor: "transparent" }}
          >→</button>
        </div>
      </div>
      <style>{`@keyframes chatSlideIn { from{transform:translateY(30px) scale(0.95);opacity:0} to{transform:translateY(0) scale(1);opacity:1} }`}</style>
    </>
  );
}

export default function SectionMap({ category = "all", dark = false, isMobile = false, currentUser = null }) {
  const [selected,       setSelected]       = useState(null);
  const [mobileSelected, setMobileSelected] = useState(null);
  const [skipped,        setSkipped]        = useState(new Set());
  const [chatUser,       setChatUser]       = useState(null);
  const [messages,       setMessages]       = useState({});

  const meImgUrl = currentUser ? resolveImg(currentUser) : null;
  const filtered = category === "all"
    ? fixedUsers
    : fixedUsers.filter(u => getUserCategory(u) === category);

  const handleConnect = (user) => {
    setChatUser(user);
    setSelected(null);
    setMobileSelected(null);
    if (!messages[`user_${user.id}`]) {
      setMessages(prev => ({
        ...prev,
        [`user_${user.id}`]: [{ text: `Hi! I'm ${user.name} 👋 ${getIntentMessage(user, getUserCategory(user))}`, sender: "them", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), ts: Date.now() }]
      }));
    }
  };

  const handleSkip = (user) => setSkipped(prev => new Set([...prev, user.id]));

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <style>{`
        .leaflet-popup-content-wrapper { padding: 0 !important; border-radius: 18px !important; overflow: hidden; box-shadow: 0 16px 48px rgba(139,92,246,0.22) !important; }
        .leaflet-popup-content { margin: 0 !important; }
        .leaflet-popup-tip-container { display: none; }
        .leaflet-container { touch-action: manipulation; }
        .leaflet-marker-icon { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; }
      `}</style>

      <MapContainer center={[ME_POSITION.lat, ME_POSITION.lng]} zoom={14} minZoom={12} maxZoom={17} style={{ width: "100%", height: "100%" }} zoomControl={false} scrollWheelZoom dragging touchZoom doubleClickZoom>
        <TileSwitcher dark={dark} />
        <FlyTo target={isMobile ? mobileSelected : selected} />
        <ZoomControls dark={dark} />

        <Marker position={[ME_POSITION.lat, ME_POSITION.lng]} icon={makeYouIcon(dark, meImgUrl)} zIndexOffset={9999}>
          <Popup offset={[0, -58]} closeButton={false}>
            <YouPopupCard dark={dark} currentUser={currentUser} />
          </Popup>
        </Marker>

        {filtered.filter(u => !skipped.has(u.id)).map(user => {
          const cat      = getUserCategory(user);
          const isActive = isMobile ? mobileSelected?.id === user.id : selected?.id === user.id;
          const imgUrl   = resolveImg(user);

          return (
            <Marker
              key={user.id}
              position={[user.lat, user.lng]}
              icon={makeIcon(user, isActive, cat, imgUrl)}
              zIndexOffset={isActive ? 1000 : 0}
              eventHandlers={{ click: () => {
                if (isMobile) setMobileSelected(prev => prev?.id === user.id ? null : user);
                else          setSelected(prev => prev?.id === user.id ? null : user);
              }}}
            >
              {!isMobile && (
                <Popup offset={[0, -52]} closeButton={false}>
                  <CompactCard
                    user={user} dark={dark} imgUrl={imgUrl}
                    onConnect={handleConnect}
                    onSkip={u => { handleSkip(u); setSelected(null); }}
                  />
                </Popup>
              )}
            </Marker>
          );
        })}
      </MapContainer>

      {isMobile && mobileSelected && !skipped.has(mobileSelected.id) && (
        <MobileUserSheet
          user={mobileSelected} dark={dark}
          imgUrl={resolveImg(mobileSelected)}
          onConnect={handleConnect}
          onSkip={handleSkip}
          onClose={() => setMobileSelected(null)}
        />
      )}

      {chatUser && (
        <ChatModal
          user={chatUser} dark={dark}
          messages={messages}
          setMessages={setMessages}
          onClose={() => setChatUser(null)}
        />
      )}
    </div>
  );
}