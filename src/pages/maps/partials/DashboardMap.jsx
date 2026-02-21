import { useState, useEffect } from "react";
import { BsStars } from "react-icons/bs";
import { FaArrowRightArrowLeft, FaMagnifyingGlass } from "react-icons/fa6";
import { MdEvent, MdOutlineSportsSoccer } from "react-icons/md";
import { TbClearAll } from "react-icons/tb";
import PixelBlast from "../../../animations/Pixel";
import { Image } from "../../../constant/images/images-activité";

const NAV_ITEMS = [
  { id: "all",         icon: <TbClearAll />,            label: "All"          },
  { id: "sport",       icon: <MdOutlineSportsSoccer />, label: "Sport"        },
  { id: "trade",       icon: <FaArrowRightArrowLeft />, label: "Trading"      },
  { id: "lost_found",  icon: <FaMagnifyingGlass />,     label: "Lost & Found" },
  { id: "swap_skills", icon: <BsStars />,               label: "Swap Skills"  },
  { id: "event",       icon: <MdEvent />,               label: "Events"       },
];

const CATEGORIES = [
  { id: "sport",       label: "Sport",        icon: "⚽", color: "#22C55E" },
  { id: "trade",       label: "Trade",        icon: "💼", color: "#F59E0B" },
  { id: "event",       label: "Event",        icon: "🎉", color: "#EC4899" },
  { id: "lost_found",  label: "Lost & Found", icon: "🔍", color: "#06B6D4" },
  { id: "swap_skills", label: "Swap Skills",  icon: "🔄", color: "#F97316" },
];

export default function DashboardMap({ category, setCategory, dark, isMobile }) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const bg     = dark ? "#0e0720" : "#ffffff";
  const border = dark ? "rgba(139,92,246,0.2)" : "#e6dfd7";
  const mute   = dark ? "#94a3b8" : "#94a3b8";
  const activeItem = NAV_ITEMS.find(n => n.id === category);

  // ── MOBILE: just the filter sheet (no top bar — navbar handles that) ────
  if (isMobile) {
    return (
      <>
        <style>{`
          @keyframes dashSlideUp {
            from { transform: translateY(100%); opacity: 0; }
            to   { transform: translateY(0);    opacity: 1; }
          }
        `}</style>

        {/* Bottom filter sheet — opens when triggered from navbar hamburger */}
        {sheetOpen && (
          <>
            <div onClick={() => setSheetOpen(false)} style={{
              position: "fixed", inset: 0, zIndex: 3500,
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(4px)",
            }} />
            <div style={{
              position: "fixed", bottom: 0, left: 0, right: 0,
              zIndex: 3600, background: bg,
              borderRadius: "24px 24px 0 0",
              boxShadow: "0 -8px 40px rgba(139,92,246,0.2)",
              maxHeight: "75vh", overflowY: "auto",
              animation: "dashSlideUp 0.28s cubic-bezier(0.32,0.72,0,1) forwards",
            }}>
              <div style={{ display:"flex", justifyContent:"center", padding:"14px 0 8px" }}>
                <div style={{ width:40, height:4, borderRadius:4, background: dark ? "rgba(255,255,255,0.15)" : "#e2e8f0" }} />
              </div>
              <div style={{ padding:"0 20px 14px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <span style={{ fontSize:15, fontWeight:800, color: dark?"#f1f5f9":"#1a1040", fontFamily:"Sora,sans-serif" }}>
                  Filter by Category
                </span>
                <button onClick={() => setSheetOpen(false)} style={{
                  border:"none", background:"transparent", cursor:"pointer",
                  fontSize:22, color:mute, lineHeight:1, padding:4,
                  WebkitTapHighlightColor:"transparent",
                }}>✕</button>
              </div>
              <div style={{ padding:"0 12px 40px", display:"flex", flexDirection:"column", gap:8 }}>
                {NAV_ITEMS.map((el) => {
                  const isActive = category === el.id;
                  return (
                    <button key={el.id}
                      onClick={() => { setCategory(el.id); setSheetOpen(false); }}
                      style={{
                        display:"flex", alignItems:"center", gap:14,
                        padding:"15px 18px", borderRadius:16,
                        border: isActive ? "none" : `1.5px solid ${dark?"rgba(255,255,255,0.07)":"#f0edf7"}`,
                        width:"100%", textAlign:"left", cursor:"pointer",
                        background: isActive
                          ? dark ? "rgba(139,92,246,0.25)" : "linear-gradient(135deg,rgba(232,219,255,0.95),rgba(255,220,230,0.95))"
                          : dark ? "rgba(255,255,255,0.03)" : "#fafafa",
                        color: isActive ? (dark?"#C084FC":"#9333EA") : (dark?"#94a3b8":"#64748b"),
                        fontSize:15, fontWeight: isActive ? 800 : 500,
                        fontFamily:"Sora,sans-serif",
                        boxShadow: isActive ? "0 4px 16px rgba(139,92,246,0.15)" : "none",
                        WebkitTapHighlightColor:"transparent",
                        touchAction:"manipulation",
                      }}
                    >
                      <span style={{ fontSize:20 }}>{el.icon}</span>
                      {el.label}
                      {isActive && (
                        <span style={{ marginLeft:"auto", width:8, height:8, borderRadius:"50%", background:"#D946EF", boxShadow:"0 0 10px #D946EF", flexShrink:0 }} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  // ── DESKTOP sidebar ──────────────────────────────────────────────────────
  // NOTE: No position:fixed here — the parent (MapPage) handles positioning.
  // This component just fills whatever space it's given.
  return (
    <aside style={{
      width: "100%",
      height: "100%",
      background: bg,
      borderRight: `1px solid ${border}`,
      display: "flex",
      flexDirection: "column",
      padding: "16px 0",
      overflowY: "auto",
      transition: "background .3s",
      // Slight top padding to account for the navbar above
      paddingTop: 20,
    }}>
      {/* Pixel background decoration */}
      <div style={{ position:"absolute", inset:0, zIndex:0, opacity:0.12, pointerEvents:"none" }}>
        <PixelBlast
          variant="square" pixelSize={4} color="#d946ef"
          patternScale={2} patternDensity={1} pixelSizeJitter={0}
          enableRipples rippleSpeed={0.4} rippleThickness={0.12}
          rippleIntensityScale={1.5} speed={0.5} edgeFade={0.25} transparent
        />
      </div>

      {/* Logo */}
      <div style={{ position:"relative", zIndex:1, padding:"0 20px 20px", display:"flex", alignItems:"center" }}>
        <img
          src={Image.logo}
          alt="Qriblik Logo"
          style={{ width:"120px", height:"auto", cursor:"pointer", transition:"transform 0.3s ease" }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        />
      </div>

      {/* Section label */}
      <div style={{ position:"relative", zIndex:1, padding:"0 20px 10px", display:"flex", alignItems:"center", gap:12 }}>
        <span style={{ fontSize:10, fontWeight:800, color:mute, textTransform:"uppercase", letterSpacing:"0.2em", whiteSpace:"nowrap" }}>Social</span>
        <div style={{ flex:1, height:1, background: dark?"rgba(255,255,255,0.07)":"#f1f5f9" }} />
      </div>

      {/* Category nav items */}
      <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", gap:4, padding:"0 10px" }}>
        {NAV_ITEMS.map((el) => {
          const isActive = category === el.id;
          return (
            <button key={el.id} onClick={() => setCategory(el.id)} style={{
              display:"flex", alignItems:"center", gap:12,
              padding:"12px 14px", borderRadius:14, cursor:"pointer",
              border:"none", width:"100%", textAlign:"left",
              position:"relative", transition:"all .2s",
              fontSize:14, fontWeight: isActive ? 700 : 500,
              background: isActive
                ? dark ? "rgba(139,92,246,0.2)" : "linear-gradient(135deg,rgba(232,219,255,0.8),rgba(255,220,230,0.8))"
                : "transparent",
              color: isActive ? (dark?"#C084FC":"#9333EA") : (dark?"#94a3b8":"#64748b"),
              boxShadow: isActive ? "0 2px 12px rgba(139,92,246,0.12)" : "none",
              fontFamily:"Sora,sans-serif",
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = dark?"rgba(139,92,246,0.1)":"rgba(139,92,246,0.06)"; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ fontSize:17, flexShrink:0 }}>{el.icon}</span>
              {el.label}
              {isActive && (
                <span style={{
                  position:"absolute", right:14,
                  width:7, height:7, borderRadius:"50%",
                  background:"#D946EF",
                  boxShadow:"0 0 8px #D946EF",
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Category legend */}
      <div style={{
        position:"relative", zIndex:1,
        margin:"20px 12px 0",
        padding:"14px",
        borderRadius:14,
        background: dark?"rgba(139,92,246,0.08)":"rgba(139,92,246,0.05)",
        border:`1px solid ${dark?"rgba(139,92,246,0.18)":"rgba(139,92,246,0.12)"}`,
      }}>
        <p style={{ margin:"0 0 10px", fontSize:9, color:mute, textTransform:"uppercase", letterSpacing:"1px", fontWeight:700 }}>
          Categories
        </p>
        {CATEGORIES.map(cat => (
          <div
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            style={{
              display:"flex", alignItems:"center", gap:8, marginBottom:8,
              cursor: "pointer",
              padding: "4px 6px", borderRadius: 8,
              transition: "background 0.15s",
              background: category === cat.id ? `${cat.color}14` : "transparent",
            }}
            onMouseEnter={e => e.currentTarget.style.background = `${cat.color}14`}
            onMouseLeave={e => e.currentTarget.style.background = category === cat.id ? `${cat.color}14` : "transparent"}
          >
            <div style={{
              width:8, height:8, borderRadius:"50%",
              background: cat.color,
              boxShadow: `0 0 6px ${cat.color}`,
              flexShrink: 0,
            }} />
            <span style={{
              fontSize:11, color: dark?"#CBD5E1":"#64748b",
              fontFamily:"Sora,sans-serif",
              fontWeight: category===cat.id ? 700 : 400,
            }}>
              {cat.icon} {cat.label}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}