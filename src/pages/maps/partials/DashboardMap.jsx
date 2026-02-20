import { BsStars } from "react-icons/bs";
import { FaArrowRightArrowLeft, FaMagnifyingGlass } from "react-icons/fa6";
import { MdEvent, MdOutlineSportsSoccer } from "react-icons/md";
import { TbClearAll, TbHome } from "react-icons/tb";
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

export default function DashboardMap({ category, setCategory, dark }) {
  const bg     = dark ? "#0e0720" : "#ffffff";
  const border = dark ? "rgba(139,92,246,0.2)" : "#e6dfd7";
  const txt    = dark ? "#f1f5f9" : "#0f172a";
  const mute   = dark ? "#94a3b8" : "#94a3b8";

  return (
    <aside style={{
      width: 280,
      height: "100vh",
      background: bg,
      borderRight: `1px solid ${border}`,
      display: "flex",
      flexDirection: "column",
      padding: "16px 0",
      overflowY: "auto",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 3000,
      flexShrink: 0,
      transition: "background .3s",
    }}>

      {/* Pixel background */}
      <div style={{ position:"absolute", inset:0, zIndex:0, opacity:0.15, pointerEvents:"none" }}>
        <PixelBlast
          variant="square" pixelSize={4} color="#d946ef"
          patternScale={2} patternDensity={1} pixelSizeJitter={0}
          enableRipples rippleSpeed={0.4} rippleThickness={0.12}
          rippleIntensityScale={1.5} speed={0.5} edgeFade={0.25} transparent
        />
      </div>

      {/* Logo */}
      <div style={{ 
        position: "relative", 
        zIndex: 1, 
        padding: "0 20px 20px", 
        display: "flex", 
        alignItems: "center",
        justifyContent: "start"
      }}>
        <img 
          src={Image.logo} 
          alt="Qriblik Logo" 
          style={{
            width: "120px",
            height: "auto",
            cursor: "pointer",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        />
      </div>

      {/* Section label */}
      <div style={{ position:"relative", zIndex:1, padding:"0 20px 10px", display:"flex", alignItems:"center", gap:12 }}>
        <span style={{ fontSize:10, fontWeight:800, color:mute, textTransform:"uppercase", letterSpacing:"0.2em", whiteSpace:"nowrap" }}>Social</span>
        <div style={{ flex:1, height:1, background: dark ? "rgba(255,255,255,0.07)" : "#f1f5f9" }} />
      </div>

      {/* Nav items */}
      <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", gap:25, padding:"0 10px",  }}>
        {NAV_ITEMS.map((el) => {
          const isActive = category === el.id;
          return (
            <button
              key={el.id}
              onClick={() => setCategory(el.id)}
              style={{
                display:"flex", alignItems:"center", gap:12,
                padding:"10px 14px", borderRadius:14, cursor:"pointer",
                border:"none", width:"100%", textAlign:"left",
                position:"relative", transition:"all .2s",
                fontSize:14, fontWeight: isActive ? 700 : 500,
                background: isActive
                  ? dark ? "rgba(139,92,246,0.2)" : "linear-gradient(135deg,rgba(232,219,255,0.8),rgba(255,220,230,0.8))"
                  : "transparent",
                color: isActive
                  ? dark ? "#C084FC" : "#9333EA"
                  : dark ? "#94a3b8" : "#64748b",
                boxShadow: isActive ? "0 2px 12px rgba(139,92,246,0.12)" : "none",
                fontFamily:"Sora,sans-serif",
              }}
              onMouseEnter={e => {
                if (!isActive) e.currentTarget.style.background = dark ? "rgba(139,92,246,0.1)" : "rgba(139,92,246,0.06)";
              }}
              onMouseLeave={e => {
                if (!isActive) e.currentTarget.style.background = "transparent";
              }}
            >
              <span style={{ fontSize:17, flexShrink:0 }}>{el.icon}</span>
              {el.label}
              {isActive && (
                <span style={{
                  position:"absolute", right:14, width:7, height:7,
                  borderRadius:"50%", background:"#D946EF",
                  boxShadow:"0 0 8px #D946EF",
                }} />
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}