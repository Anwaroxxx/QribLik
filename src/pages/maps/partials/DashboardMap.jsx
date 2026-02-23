import { BsStars } from "react-icons/bs";
import { FaArrowRightArrowLeft, FaMagnifyingGlass } from "react-icons/fa6";
import { MdEvent, MdOutlineSportsSoccer, MdMap } from "react-icons/md";
import { TbClearAll } from "react-icons/tb";
import PixelBlast from "../../../animations/Pixel";
import logo from "../../../assets/images/logo/our-logo.webp";

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

/**
 * DashboardMap (sidebar / mobile drawer)
 *
 * Props:
 *  - category    : string
 *  - setCategory : fn
 *  - dark        : bool
 *  - isMobile    : bool
 *  - onNavigate  : (page: string) => void   ← NEW: call with "map" to navigate
 *  - onClose     : () => void               ← NEW: close the mobile drawer after nav
 */
export default function DashboardMap({ category, setCategory, dark, isMobile, onNavigate, onClose }) {
  const bg     = dark ? "#0e0720" : "#ffffff";
  const border = dark ? "rgba(139,92,246,0.2)" : "#e6dfd7";
  const mute   = dark ? "#94a3b8" : "#94a3b8";

  function handleNavItem(id) {
    setCategory(id);
    // On mobile, close the drawer after selecting a filter
    if (isMobile && onClose) onClose();
  }

  function handleCategoryClick(id) {
    setCategory(id);
    if (isMobile && onClose) onClose();
  }

  function handleMapClick() {
    if (onNavigate) onNavigate("map");
    if (isMobile && onClose) onClose();
  }

  return (
    <aside style={{
      width: "100%",
      height: "100%",
      background: bg,
      borderRight: `1px solid ${border}`,
      display: "flex",
      flexDirection: "column",
      padding: "16px 0 24px",
      overflowY: "auto",
      transition: "background .3s",
      position: "relative",
    }}>

      {/* Pixel background decoration */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.12, pointerEvents: "none" }}>
        <PixelBlast
          variant="square" pixelSize={4} color="#d946ef"
          patternScale={2} patternDensity={1} pixelSizeJitter={0}
          enableRipples rippleSpeed={0.4} rippleThickness={0.12}
          rippleIntensityScale={1.5} speed={0.5} edgeFade={0.25} transparent
        />
      </div>

      {/* Logo */}
      <div style={{ position: "relative", zIndex: 1, padding: "0 20px 20px" }}>
        <img
          src={logo}
          alt="QribLik"
          style={{
            width: 110, height: "auto", display: "block",
            cursor: "pointer", transition: "transform 0.3s ease",
            filter: dark ? "brightness(0) invert(1)" : "none",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        />
      </div>

      {/* Section label */}
      <div style={{ position: "relative", zIndex: 1, padding: "0 20px 10px", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 10, fontWeight: 800, color: mute, textTransform: "uppercase", letterSpacing: "0.2em", whiteSpace: "nowrap" }}>Social</span>
        <div style={{ flex: 1, height: 1, background: dark ? "rgba(255,255,255,0.07)" : "#f1f5f9" }} />
      </div>

      {/* Nav items */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 4, padding: "0 10px" }}>
        {NAV_ITEMS.map((el) => {
          const isActive = category === el.id;
          return (
            <button
              key={el.id}
              onClick={() => handleNavItem(el.id)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "12px 14px", borderRadius: 14,
                cursor: "pointer", border: "none", width: "100%", textAlign: "left",
                position: "relative", transition: "all .2s",
                fontSize: 14, fontWeight: isActive ? 700 : 500,
                background: isActive
                  ? dark ? "rgba(139,92,246,0.2)" : "linear-gradient(135deg,rgba(232,219,255,0.8),rgba(255,220,230,0.8))"
                  : "transparent",
                color: isActive ? (dark ? "#C084FC" : "#9333EA") : (dark ? "#94a3b8" : "#64748b"),
                boxShadow: isActive ? "0 2px 12px rgba(139,92,246,0.12)" : "none",
                fontFamily: "Sora,sans-serif",
                WebkitTapHighlightColor: "transparent",
                touchAction: "manipulation",
                // Make tap target bigger on mobile
                minHeight: isMobile ? 52 : "auto",
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = dark ? "rgba(139,92,246,0.1)" : "rgba(139,92,246,0.06)"; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ fontSize: 17, flexShrink: 0 }}>{el.icon}</span>
              {el.label}
              {isActive && (
                <span style={{
                  position: "absolute", right: 14,
                  width: 7, height: 7, borderRadius: "50%",
                  background: "#D946EF", boxShadow: "0 0 8px #D946EF",
                }} />
              )}
            </button>
          );
        })}

        {/* ── MAP BUTTON — always visible, navigates to map page ── */}
        <button
          onClick={handleMapClick}
          style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "12px 14px", borderRadius: 14,
            cursor: "pointer", border: "none", width: "100%", textAlign: "left",
            transition: "all .2s",
            fontSize: 14, fontWeight: 500,
            background: "transparent",
            color: dark ? "#94a3b8" : "#64748b",
            fontFamily: "Sora,sans-serif",
            WebkitTapHighlightColor: "transparent",
            touchAction: "manipulation",
            minHeight: isMobile ? 52 : "auto",
            marginTop: 4,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = dark ? "rgba(139,92,246,0.1)" : "rgba(139,92,246,0.06)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
        >
          <span style={{ fontSize: 17, flexShrink: 0 }}><MdMap /></span>
          Neighborhood Map
        </button>
      </div>

      {/* Category legend */}
      <div style={{
        position: "relative", zIndex: 1,
        margin: "20px 12px 0",
        padding: "14px",
        borderRadius: 14,
        background: dark ? "rgba(139,92,246,0.08)" : "rgba(139,92,246,0.05)",
        border: `1px solid ${dark ? "rgba(139,92,246,0.18)" : "rgba(139,92,246,0.12)"}`,
      }}>
        <p style={{ margin: "0 0 10px", fontSize: 9, color: mute, textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700 }}>
          Categories
        </p>
        {CATEGORIES.map(cat => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            style={{
              display: "flex", alignItems: "center", gap: 8, marginBottom: 8,
              cursor: "pointer", padding: isMobile ? "8px 6px" : "4px 6px", borderRadius: 8,
              transition: "background 0.15s",
              background: category === cat.id ? `${cat.color}14` : "transparent",
              // Bigger tap target on mobile
              minHeight: isMobile ? 40 : "auto",
            }}
            onMouseEnter={e => e.currentTarget.style.background = `${cat.color}14`}
            onMouseLeave={e => e.currentTarget.style.background = category === cat.id ? `${cat.color}14` : "transparent"}
          >
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: cat.color, boxShadow: `0 0 6px ${cat.color}`, flexShrink: 0,
            }} />
            <span style={{
              fontSize: 11, color: dark ? "#CBD5E1" : "#64748b",
              fontFamily: "Sora,sans-serif",
              fontWeight: category === cat.id ? 700 : 400,
            }}>
              {cat.icon} {cat.label}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}