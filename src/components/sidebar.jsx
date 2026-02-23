import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbHome } from "react-icons/tb";
import { MdEvent, MdOutlineSportsSoccer, MdSupportAgent } from "react-icons/md";
import { FaMagnifyingGlass, FaArrowRightArrowLeft, FaCircleInfo } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { IoMapOutline } from "react-icons/io5";
import users from "../data/UserData.json";
import { useTheme } from "../contexts/ThemeContext";
import NotificationToast from "./NotificationToast";
import Modale3 from "./Modale3";
import currentUser from "../utils/userUtils";
// ── Your real logo ────────────────────────────────────────────────────────────
import logo from "../assets/images/logo/our-logo.webp";

/* ─── Dark / Light Toggle ─────────────────────────────────────────────────── */
function DarkModeToggle() {
  const { dark, toggleDark } = useTheme();
  return (
    <button
      onClick={toggleDark}
      aria-label="Toggle dark mode"
      className="relative w-11 h-6 rounded-full transition-all duration-300 focus:outline-none"
      style={{
        background: dark ? "linear-gradient(135deg,#8B3FDE,#C837AB)" : "rgba(0,0,0,0.12)",
        boxShadow: dark ? "0 0 12px rgba(200,55,171,0.45)" : "none",
      }}
    >
      <span
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center text-[10px] transition-all duration-300"
        style={{ left: dark ? "calc(100% - 1.35rem)" : "0.125rem" }}
      >
        {dark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}

/* ─── Sign-out confirm modal ─────────────────────────────────────────────── */
function SignOutModal({ onConfirm, onCancel }) {
  const { dark } = useTheme();
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xs rounded-3xl p-7 shadow-2xl border"
        style={{
          background: dark ? "linear-gradient(160deg,#1a0a2e,#150d27)" : "white",
          borderColor: dark ? "rgba(139,63,222,0.25)" : "rgba(0,0,0,0.06)",
        }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ background: "linear-gradient(135deg,#8B3FDE,#C837AB)" }}
        >
          <FiLogOut size={22} className="text-white" />
        </div>
        <h2 className={`text-lg font-black text-center mb-1 ${dark ? "text-white" : "text-gray-900"}`}>
          Sign out?
        </h2>
        <p className={`text-sm text-center mb-6 ${dark ? "text-purple-300/50" : "text-gray-400"}`}>
          You'll return to the landing page.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className={`flex-1 py-3 rounded-2xl text-sm font-semibold border transition-colors ${
              dark ? "border-white/10 text-purple-300 hover:bg-white/5" : "border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-2xl text-sm font-black text-white hover:opacity-90 active:scale-95 transition-all"
            style={{ background: "linear-gradient(135deg,#8B3FDE,#C837AB)" }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Nav Item ───────────────────────────────────────────────────────────── */
function NavItem({ icon, label, isActive, onClick }) {
  const { dark } = useTheme();
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 text-left"
      style={{
        background: isActive
          ? dark
            ? "linear-gradient(135deg,rgba(139,63,222,0.22),rgba(200,55,171,0.14))"
            : "linear-gradient(135deg,rgba(139,63,222,0.10),rgba(200,55,171,0.06))"
          : hovered
          ? dark ? "rgba(255,255,255,0.045)" : "rgba(0,0,0,0.035)"
          : "transparent",
        color: isActive ? "#c026d3" : dark ? "rgba(196,172,255,0.6)" : "rgba(60,30,80,0.55)",
        boxShadow: isActive && dark
          ? "inset 0 0 0 1px rgba(200,55,171,0.18), 0 2px 14px rgba(139,63,222,0.12)"
          : isActive ? "inset 0 0 0 1px rgba(139,63,222,0.15)" : "none",
      }}
    >
      {isActive && (
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
          style={{ background: "linear-gradient(180deg,#8B3FDE,#C837AB)" }}
        />
      )}
      <span
        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
        style={{
          background: isActive
            ? "linear-gradient(135deg,#8B3FDE22,#C837AB18)"
            : hovered ? (dark ? "rgba(255,255,255,0.07)" : "rgba(139,63,222,0.07)") : "transparent",
          color: isActive ? "#c026d3" : "inherit",
        }}
      >
        <span className="text-base leading-none">{icon}</span>
      </span>
      <span className="flex-1 truncate">{label}</span>
    </button>
  );
}

/* ─── Map Card ───────────────────────────────────────────────────────────── */
function MapCard({ onClick }) {
  const { dark } = useTheme();
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-left transition-all duration-200"
      style={{
        background: hovered
          ? dark ? "linear-gradient(135deg,rgba(139,63,222,0.18),rgba(255,107,53,0.12))" : "linear-gradient(135deg,rgba(139,63,222,0.09),rgba(255,107,53,0.06))"
          : dark ? "rgba(255,255,255,0.03)" : "rgba(139,63,222,0.04)",
        border: `1px solid ${hovered
          ? dark ? "rgba(139,63,222,0.35)" : "rgba(139,63,222,0.2)"
          : dark ? "rgba(255,255,255,0.06)" : "rgba(139,63,222,0.1)"}`,
        color: dark ? "rgba(196,172,255,0.7)" : "rgba(80,40,120,0.7)",
        transform: hovered ? "translateX(2px)" : "none",
      }}
    >
      <span
        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: hovered ? "linear-gradient(135deg,#8B3FDE,#FF6B35)" : dark ? "rgba(139,63,222,0.15)" : "rgba(139,63,222,0.10)",
          color: hovered ? "white" : "#8B3FDE",
          transition: "all 0.2s",
        }}
      >
        <IoMapOutline size={15} />
      </span>
      <span className="flex-1">Explore Map</span>
      <span
        className="text-[9px] font-black px-1.5 py-0.5 rounded-full"
        style={{ background: dark ? "rgba(255,107,53,0.15)" : "rgba(255,107,53,0.1)", color: "#FF6B35", border: "1px solid rgba(255,107,53,0.25)" }}
      >
        NEW
      </span>
    </button>
  );
}

/* ─── Section Label ──────────────────────────────────────────────────────── */
function SectionLabel({ label }) {
  const { dark } = useTheme();
  return (
    <div className="flex items-center gap-2 px-4 pt-2 pb-1">
      <span
        className="text-[10px] font-black uppercase tracking-[0.18em]"
        style={{ color: dark ? "rgba(167,139,250,0.35)" : "rgba(139,63,222,0.4)" }}
      >
        {label}
      </span>
      <div
        className="flex-1 h-px"
        style={{ background: dark ? "linear-gradient(90deg,rgba(139,63,222,0.2),transparent)" : "linear-gradient(90deg,rgba(139,63,222,0.12),transparent)" }}
      />
    </div>
  );
}

/* ─── Main Sidebar ───────────────────────────────────────────────────────── */
function Sidebar({ selectedCategory, setSelectedCategory, onViewChange }) {
  const { dark }  = useTheme();
  const navigate  = useNavigate();
  const [active,       setActive]       = useState("Home");
  const [notification, setNotification] = useState(null);
  const [animate,      setAnimate]      = useState(false);
  const [progress,     setProgress]     = useState(0);
  const [connectUser,  setConnectUser]  = useState(null);
  const [showSignOut,  setShowSignOut]  = useState(false);

  const queueRef    = useRef([]);
  const intervalRef = useRef(null);
  const timeoutRef  = useRef(null);

  const categories = [
    { id: "SPORT",          icon: <MdOutlineSportsSoccer />, label: "Sport",          notificationKey: "Sport"   },
    { id: "TRADING",        icon: <FaArrowRightArrowLeft />, label: "Trading",        notificationKey: "Trading" },
    { id: "LOST AND FOUND", icon: <FaMagnifyingGlass />,     label: "Lost and Found", notificationKey: "Lost"    },
    { id: "SWAP SKILLS",    icon: <BsStars />,               label: "Swap Skills",    notificationKey: "Swap"    },
    { id: "EVENTS",         icon: <MdEvent />,               label: "Events",         notificationKey: "Events"  },
  ];

  const categoryMessages = {
    Sport:   ["Wach tbghi nmchiw njriw had sbah?", "Match dyal football ghadi ybda f 5 pm", "Yoga session gheda f parc"],
    Trading: ["3andi sneakers jdad, bgha ndir trading m3a chi jacket", "Je cherche quelqu'un pour trader un vélo contre une trottinette", "Trading a laptop for a gaming console"],
    Lost:    ["Found keys near cafe central", "Found black cat near sidi maarouf", "Lost backpack f metro line 2"],
    Swap:    ["Chkoun li bgha ybdl skills m3aya?", "Swap painting lessons for French tutoring", "Gheda trading skill swap session"],
    Events:  ["Concert f centre ville tonight", "Meetup dyal devs f 7 pm", "Workshop on photography this weekend"],
  };

  const showNextNotification = () => {
    if (!queueRef.current.length) return;
    const next = queueRef.current.shift();
    setNotification(next); setAnimate(true); setProgress(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setProgress(p => { if (p >= 100) { clearInterval(intervalRef.current); return 100; } return p + 100 / (6000 / 50); });
    }, 50);
    timeoutRef.current = setTimeout(() => {
      setAnimate(false);
      setTimeout(() => { setNotification(null); setTimeout(showNextNotification, 500); }, 300);
    }, 6000);
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat.id); setActive(cat.id);
    if (!cat.notificationKey) return;
    const key      = cat.notificationKey;
    const catUsers = users.filter(u => u.category?.toLowerCase() === key.toLowerCase());
    const msgs     = categoryMessages[key] || ["New activity"];
    queueRef.current = msgs.map(msg => ({
      user: catUsers.length ? catUsers[Math.floor(Math.random() * catUsers.length)] : { name: "Anonymous", avatar: "", neighborhood: "Unknown", city: "Unknown" },
      category: key, message: msg,
    }));
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(showNextNotification, 2000);
  };

  const handleConnect = (user) => {
    setNotification(null); setAnimate(false); setProgress(0);
    clearInterval(intervalRef.current); clearTimeout(timeoutRef.current);
    setConnectUser(user);
  };

  // ── Profile: NEVER navigate to a URL route — always use onViewChange ───────
  // This prevents the 404. ProfilePage lives inside the feed view system,
  // not as a separate route.
  const handleProfileClick = () => {
    setActive("Profile");
    if (typeof onViewChange === "function") {
      onViewChange("profile");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("qriblikUser");
    localStorage.removeItem("findmeUser");
    navigate("/");
  };

  /* ── Mobile bottom nav ─────────────────────────────────────────────────── */
  const MobileBottomNav = () => (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t flex items-center md:hidden shadow-lg"
      style={{
        background: dark ? "rgba(13,7,25,0.96)" : "rgba(255,255,255,0.96)",
        borderColor: dark ? "rgba(139,63,222,0.12)" : "rgba(139,63,222,0.08)",
        backdropFilter: "blur(12px)",
      }}
    >
      {categories.map(el => (
        <button key={el.id} onClick={() => handleCategoryClick(el)}
          className="flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-all duration-200 text-[10px] font-semibold relative"
          style={{ color: selectedCategory === el.id ? "#c026d3" : dark ? "rgba(167,139,250,0.4)" : "rgba(100,50,150,0.5)" }}
        >
          {selectedCategory === el.id && (
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-b-full"
              style={{ background: "linear-gradient(90deg,#8B3FDE,#C837AB)" }} />
          )}
          <span className="text-base">{el.icon}</span>
          {el.label.split(" ")[0]}
        </button>
      ))}
      {/* Map in mobile nav */}
      <button
        onClick={() => navigate("/map")}
        className="flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 text-[10px] font-semibold"
        style={{ color: dark ? "rgba(167,139,250,0.4)" : "rgba(100,50,150,0.5)" }}
      >
        <IoMapOutline className="text-lg" />
        Map
      </button>
    </div>
  );

  const sidebarBg = dark
    ? "linear-gradient(180deg,#0d0719 0%,#0f0822 60%,#0d0719 100%)"
    : "linear-gradient(180deg,#ffffff 0%,#faf8ff 100%)";

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <aside
        className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 z-40 border-r overflow-hidden"
        style={{
          background: sidebarBg,
          borderColor: dark ? "rgba(139,63,222,0.12)" : "rgba(139,63,222,0.08)",
        }}
      >
        {/* Ambient glow blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-10 w-52 h-52 rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(circle,#8B3FDE,transparent)" }} />
          <div className="absolute bottom-40 -right-10 w-40 h-40 rounded-full opacity-[0.05]"
            style={{ background: "radial-gradient(circle,#C837AB,transparent)" }} />
        </div>

        {/* ── LOGO — your real image ── */}
        <div className="px-5 pt-6 pb-4 shrink-0">
          <img
            src={logo}
            alt="QribLik"
            className="h-10 w-auto object-contain"
            style={{ maxWidth: "140px" }}
          />
        </div>

        {/* Thin gradient divider */}
        <div className="mx-4 mb-2 h-px shrink-0"
          style={{ background: dark ? "linear-gradient(90deg,rgba(139,63,222,0.25),rgba(200,55,171,0.15),transparent)" : "linear-gradient(90deg,rgba(139,63,222,0.12),transparent)" }} />

        {/* ── SCROLLABLE NAV ── */}
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden px-3 flex flex-col gap-0.5 pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {/* Core */}
          <NavItem
            icon={<TbHome />} label="Home Feed"
            isActive={active === "Home"}
            onClick={() => { setActive("Home"); setSelectedCategory?.("ALL"); onViewChange?.("feed"); }}
          />
          <Link to="/about" className="no-underline" onClick={() => setActive("About")}>
            <NavItem icon={<FaCircleInfo />} label="About" isActive={active === "About"} onClick={() => {}} />
          </Link>
          <Link to="/support" className="no-underline" onClick={() => setActive("Support")}>
            <NavItem icon={<MdSupportAgent />} label="Support" isActive={active === "Support"} onClick={() => {}} />
          </Link>

          <div className="h-2" />
          <SectionLabel label="Social" />

          {/* Categories */}
          {categories.map(cat => (
            <NavItem
              key={cat.id}
              icon={cat.icon}
              label={cat.label}
              isActive={selectedCategory === cat.id}
              onClick={() => handleCategoryClick(cat)}
            />
          ))}

          {/* Map inside Social */}
          <div className="mt-1">
            <MapCard onClick={() => navigate("/map")} />
          </div>

          <div className="h-2" />
          <SectionLabel label="Account" />

          {/* Profile row — clicking uses onViewChange, never navigate() */}
          <button
            onClick={handleProfileClick}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-200"
            style={{
              background: active === "Profile"
                ? dark ? "linear-gradient(135deg,rgba(139,63,222,0.22),rgba(200,55,171,0.14))" : "linear-gradient(135deg,rgba(139,63,222,0.10),rgba(200,55,171,0.06))"
                : "transparent",
              border: active === "Profile"
                ? dark ? "1px solid rgba(200,55,171,0.18)" : "1px solid rgba(139,63,222,0.15)"
                : "1px solid transparent",
            }}
          >
            <div
              className="w-8 h-8 rounded-xl overflow-hidden shrink-0"
              style={{
                boxShadow: active === "Profile"
                  ? "0 0 0 2px #C837AB"
                  : dark ? "0 0 0 1px rgba(255,255,255,0.1)" : "0 0 0 1px rgba(139,63,222,0.15)",
              }}
            >
              <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate"
                style={{ color: active === "Profile" ? "#c026d3" : dark ? "rgba(196,172,255,0.7)" : "rgba(60,30,80,0.7)" }}>
                {currentUser.name}
              </p>
              <p className="text-[10px]"
                style={{ color: dark ? "rgba(167,139,250,0.35)" : "rgba(139,63,222,0.4)" }}>
                View profile
              </p>
            </div>
          </button>
        </div>

        {/* ── BOTTOM STRIP ── */}
        <div className="shrink-0 px-3 pb-5 flex flex-col gap-1">
          <div className="mx-1 mb-2 h-px"
            style={{ background: dark ? "rgba(139,63,222,0.12)" : "rgba(139,63,222,0.08)" }} />

          {/* Dark mode */}
          <div
            className="flex items-center justify-between px-4 py-3 rounded-2xl"
            style={{
              background: dark ? "rgba(255,255,255,0.03)" : "rgba(139,63,222,0.04)",
              border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(139,63,222,0.08)",
            }}
          >
            <span className="text-sm font-medium" style={{ color: dark ? "rgba(196,172,255,0.55)" : "rgba(80,40,120,0.55)" }}>
              {dark ? "Dark Mode" : "Light Mode"}
            </span>
            <DarkModeToggle />
          </div>

          {/* Sign Out */}
          <button
            onClick={() => setShowSignOut(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200"
            style={{ color: dark ? "rgba(252,100,100,0.55)" : "rgba(200,50,50,0.55)" }}
            onMouseEnter={e => { e.currentTarget.style.background = dark ? "rgba(252,100,100,0.08)" : "rgba(252,100,100,0.06)"; e.currentTarget.style.color = "#ef4444"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = dark ? "rgba(252,100,100,0.55)" : "rgba(200,50,50,0.55)"; }}
          >
            <span className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: dark ? "rgba(252,100,100,0.08)" : "rgba(252,100,100,0.06)" }}>
              <FiLogOut size={14} />
            </span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── MOBILE TOP HEADER ── */}
      <header
        className="md:hidden fixed top-0 left-0 right-0 z-50 border-b px-4 py-2.5 flex items-center justify-between"
        style={{
          background: dark ? "rgba(13,7,25,0.96)" : "rgba(255,255,255,0.96)",
          borderColor: dark ? "rgba(139,63,222,0.12)" : "rgba(139,63,222,0.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Real logo in mobile header too */}
        <img src={logo} alt="QribLik" className="h-8 w-auto object-contain" />
        <div className="flex items-center gap-2">
          {/* Mobile profile avatar — tapping opens profile view */}
          <button
            onClick={handleProfileClick}
            className="w-8 h-8 rounded-xl overflow-hidden"
            style={{ boxShadow: "0 0 0 2px rgba(139,63,222,0.3)" }}
          >
            <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
          </button>
          <DarkModeToggle />
          <button
            onClick={() => setShowSignOut(true)}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
            style={{ background: dark ? "rgba(252,100,100,0.08)" : "rgba(252,100,100,0.06)", color: "rgba(239,68,68,0.7)" }}
          >
            <FiLogOut size={14} />
          </button>
        </div>
      </header>

      <MobileBottomNav />

      <NotificationToast
        notification={notification} animate={animate} progress={progress}
        onDismiss={() => setNotification(null)} onConnect={handleConnect}
      />

      {connectUser && <Modale3 onClose={() => setConnectUser(null)} initialUser={connectUser} />}
      {showSignOut  && <SignOutModal onConfirm={handleSignOut} onCancel={() => setShowSignOut(false)} />}
    </>
  );
}

export default Sidebar;