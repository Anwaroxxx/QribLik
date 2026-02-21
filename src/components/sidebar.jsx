import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { TbHome } from "react-icons/tb";
import { MdEvent, MdOutlineSportsSoccer, MdSupportAgent } from "react-icons/md";
import {
  FaMagnifyingGlass,
  FaRegUser,
  FaArrowRightArrowLeft,
  FaCircleInfo,
} from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import { FiMap } from "react-icons/fi";
import MapsButton from "./buttonMap";
import users from "../data/UserData.json";
import { usersImages } from "../constant/images/images-users";
import { useTheme } from "../contexts/ThemeContext";

// ── Dark Mode Toggle ────────────────────────────────────────────────────────
function DarkModeToggle() {
  const { dark, toggleDark } = useTheme();
  return (
    <button
      onClick={toggleDark}
      aria-label="Toggle dark mode"
      className={`relative w-12 h-7 rounded-full border-0 cursor-pointer p-0 transition-all duration-300 ${dark
          ? "shadow-[0_0_12px_rgba(139,63,222,0.5)]"
          : "shadow-[0_1px_4px_rgba(0,0,0,0.15)]"
        }`}
      style={{
        background: dark
          ? "linear-gradient(135deg, #8B3FDE, #C837AB)"
          : "#e2e8f0",
      }}
    >
      <span
        className={`absolute top-1 w-5 h-5 rounded-full bg-white flex items-center justify-center text-[11px] transition-all duration-300 ${dark ? "left-[calc(100%-1.4rem)]" : "left-1"
          }`}
      >
        {dark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}

function Sidebar({ selectedCategory, setSelectedCategory }) {
  const { dark } = useTheme();
  const [active, setActive] = useState("Home");
  const [notification, setNotification] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [progress, setProgress] = useState(0);

  const queueRef = useRef([]);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  // ── STYLES ────────────────────────────────────────────────────────────────
  const itemStyle = `flex items-center gap-3 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 text-[15px] relative`;

  const activeStyle = dark
    ? "bg-gradient-to-r from-purple-900/60 to-fuchsia-900/40 text-fuchsia-400 shadow-sm"
    : "bg-gradient-to-r from-fuchsia-50 to-rose-50 text-fuchsia-600 shadow-sm";

  const inactiveStyle = dark
    ? "text-purple-300/60 hover:bg-white/5"
    : "text-slate-500 hover:bg-slate-100";

  // ── CATEGORIES ────────────────────────────────────────────────────────────
  const categories = [
    { id: "SPORT", icon: <MdOutlineSportsSoccer />, label: "Sport", notificationKey: "Sport" },
    { id: "TRADING", icon: <FaArrowRightArrowLeft />, label: "Trading", notificationKey: "Trading" },
    { id: "LOST AND FOUND", icon: <FaMagnifyingGlass />, label: "Lost and Found", notificationKey: "Lost" },
    { id: "SWAP SKILLS", icon: <BsStars />, label: "Swap Skills", notificationKey: "Swap" },
    { id: "EVENTS", icon: <MdEvent />, label: "Events", notificationKey: "Events" },
  ];

  const categoryMessages = {
    Sport: ["Wach tbghi nmchiw njriw had sbah?", "Match dyal football ghadi ybda f 5 pm", "Yoga session gheda f parc"],
    Trading: ["3andi sneakers jdad, bgha ndir trading m3a chi jacket", "Je cherche quelqu'un pour trader un vélo contre une trottinette", "Trading a laptop for a gaming console"],
    Lost: ["Found keys near cafe central", "Found black cat near sidi maarouf", "Lost backpack f metro line 2"],
    Swap: ["Chkoun li bgha ybdl skills m3aya?", "Swap painting lessons for French tutoring", "Gheda trading skill swap session"],
    Events: ["Concert f centre ville tonight", "Meetup dyal devs f 7 pm", "Workshop on photography this weekend"],
  };

  const defaultUser = {
    name: "Anonymous",
    avatar: "user1",
    neighborhood: "Unknown",
    city: "Unknown",
    category: "General",
  };

  // ── NOTIFICATION LOGIC ────────────────────────────────────────────────────
  const showNextNotification = () => {
    if (queueRef.current.length === 0) return;
    const next = queueRef.current.shift();
    setNotification(next);
    setAnimate(true);
    setProgress(0);

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(intervalRef.current); return 100; }
        return prev + 100 / (6000 / 50);
      });
    }, 50);

    timeoutRef.current = setTimeout(() => {
      setAnimate(false);
      setTimeout(() => {
        setNotification(null);
        setTimeout(() => showNextNotification(), 500);
      }, 300);
    }, 6000);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.id);
    setActive(category.id);
    if (!category.notificationKey) return;

    const key = category.notificationKey;
    const catUsers = users.filter((u) => u.category?.toLowerCase() === key.toLowerCase());
    const messages = categoryMessages[key] || ["New activity"];

    queueRef.current = messages.map((msg) => {
      const user = catUsers.length
        ? catUsers[Math.floor(Math.random() * catUsers.length)]
        : defaultUser;
      return { user, category: key, message: msg };
    });

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => showNextNotification(), 2000);
  };

  // ── MOBILE BOTTOM NAV ─────────────────────────────────────────────────────
  const MobileBottomNav = () => (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 border-t flex items-center md:hidden shadow-lg transition-colors duration-500 ${dark
          ? "bg-[#0f0a1e] border-white/8"
          : "bg-white border-slate-100"
        }`}
    >
      {categories.map((el) => (
        <button
          key={el.id}
          onClick={() => handleCategoryClick(el)}
          className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-all duration-200 text-[10px] font-semibold ${selectedCategory === el.id
              ? "text-fuchsia-500"
              : dark
                ? "text-purple-300/40 hover:text-purple-300/70"
                : "text-slate-400 hover:text-slate-600"
            }`}
        >
          {el.icon}
          {el.label.split(" ")[0]}
          {selectedCategory === el.id && (
            <span className="w-1 h-1 rounded-full bg-fuchsia-500 mt-0.5" />
          )}
        </button>
      ))}
      <div className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[10px] font-semibold ${dark ? "text-purple-300/40" : "text-slate-400"}`}>
        <FiMap className="text-lg" />
        Map
      </div>
    </div>
  );

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <aside
        className={`hidden md:flex flex-col justify-between w-64 h-screen fixed left-0 top-0 border-r py-6 px-3 overflow-y-auto z-40 transition-colors duration-500 ${dark
            ? "bg-[#0d0719] border-white/5"
            : "bg-white border-slate-100"
          }`}
      >
        {/* Logo */}
        <div>
          <div className="px-5 mb-6">
            <h1 className="text-xl font-bold text-fuchsia-500">QribLik</h1>
            <p className={`text-xs ${dark ? "text-purple-300/40" : "text-slate-400"}`}>
              Community Hub
            </p>
          </div>

          {/* Static nav links */}
          <nav className="flex flex-col gap-1 mb-4">
            <div
              onClick={() => { setActive("Home"); setSelectedCategory("ALL"); }}
              className={`${itemStyle} ${active === "Home" ? activeStyle : inactiveStyle}`}
            >
              <TbHome className="text-lg" /> Home Feed
            </div>
            <Link
              to="/about"
              onClick={() => setActive("About")}
              className={`${itemStyle} ${active === "About" ? activeStyle : inactiveStyle} no-underline`}
            >
              <FaCircleInfo className="text-lg" /> About
            </Link>
            <Link
              to="/support"
              onClick={() => setActive("Support")}
              className={`${itemStyle} ${active === "Support" ? activeStyle : inactiveStyle} no-underline`}
            >
              <MdSupportAgent className="text-lg" /> Support
            </Link>
          </nav>

          {/* Social categories */}
          <p className={`px-5 text-xs font-semibold uppercase tracking-wider mb-2 ${dark ? "text-purple-300/30" : "text-slate-400"}`}>
            Social
          </p>
          <nav className="flex flex-col gap-1">
            {categories.map((el) => (
              <div
                key={el.id}
                onClick={() => handleCategoryClick(el)}
                className={`${itemStyle} ${selectedCategory === el.id ? activeStyle : inactiveStyle}`}
              >
                {el.icon}
                {el.label}
                {selectedCategory === el.id && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-fuchsia-400" />
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom — Profile + Toggle + Map */}
        <div className="flex flex-col gap-1">
          <div
            onClick={() => setActive("Profile")}
            className={`${itemStyle} ${active === "Profile" ? activeStyle : inactiveStyle}`}
          >
            <FaRegUser className="text-lg" /> My Profile
          </div>

          {/* Dark Mode Toggle row — replaces Settings */}
          <div className={`flex items-center justify-between px-5 py-4 rounded-2xl ${dark ? "bg-white/3" : "bg-slate-50"}`}>
            <span className={`text-[15px] font-medium ${dark ? "text-purple-300/60" : "text-slate-500"}`}>
              {dark ? "Dark Mode" : "Light Mode"}
            </span>
            <DarkModeToggle />
          </div>

          <MapsButton />
        </div>
      </aside>

      {/* ── MOBILE TOP HEADER ── */}
      <header
        className={`md:hidden fixed top-0 left-0 right-0 z-50 border-b px-4 py-3 flex items-center justify-between transition-colors duration-500 ${dark
            ? "bg-[#0d0719] border-white/5"
            : "bg-white border-slate-100"
          }`}
      >
        <h1 className="text-lg font-bold text-fuchsia-500">Qriblik</h1>
        <DarkModeToggle />
      </header>

      {/* ── MOBILE BOTTOM NAV ── */}
      <MobileBottomNav />

      {/* ── NOTIFICATION TOAST ── */}
      {notification && (
        <div
          className={`fixed bottom-20 right-4 z-50 rounded-2xl shadow-xl p-4 w-72 border transition-all duration-300 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            } ${dark
              ? "bg-[#1a0a2e] border-purple-800/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              : "bg-white border-slate-100"
            }`}
        >
          {/* Progress bar */}
          <div
            className="absolute top-0 left-0 h-1 bg-fuchsia-400 rounded-t-2xl transition-all"
            style={{ width: `${progress}%` }}
          />

          <div className="flex items-center gap-3 mb-2">
            <img
              src={usersImages[notification.user.avatar]}
              alt={notification.user.name}
              className="w-9 h-9 rounded-full object-cover"
            />
            <div>
              <p className={`text-sm font-semibold ${dark ? "text-purple-50" : "text-slate-800"}`}>
                {notification.user.name}
              </p>
              <p className={`text-xs ${dark ? "text-purple-300/50" : "text-slate-400"}`}>
                {notification.user.neighborhood} • {notification.user.city}
              </p>
            </div>
          </div>

          <p className={`text-sm mb-3 ${dark ? "text-purple-200/60" : "text-slate-600"}`}>
            {notification.message}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setNotification(null)}
              className="flex-1 py-1.5 rounded-xl bg-fuchsia-500 text-white text-xs font-semibold hover:bg-fuchsia-600 transition"
            >
              Accept
            </button>
            <button
              onClick={() => setNotification(null)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition ${dark
                  ? "bg-white/8 text-purple-300 hover:bg-white/12"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;