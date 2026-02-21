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
import { IoSettingsOutline } from "react-icons/io5";
import users from "../data/UserData.json";
import { usersImages } from "../constant/images/images-users";
import { FiMap } from "react-icons/fi";
import MapsButton from "./buttonMap";

function Sidebar({ selectedCategory, setSelectedCategory }) {
  const [active, setActive] = useState("Home");
  const [notification, setNotification] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [progress, setProgress] = useState(0);

  const queueRef = useRef([]);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  // ── STYLES ────────────────────────────────────────────────────────────────
  const itemStyle =
    "flex items-center gap-3 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 text-[15px] relative";
  const activeStyle =
    "bg-gradient-to-r from-fuchsia-50 to-rose-50 text-fuchsia-600 shadow-sm";
  const inactiveStyle = "text-slate-500 hover:bg-slate-100";

  // ── SINGLE MERGED LIST ────────────────────────────────────────────────────
  // One array does both jobs:
  //   • sets the selected category in the feed  (setSelectedCategory)
  //   • triggers notifications                  (notificationKey)
  const categories = [
    { id: "SPORT",          icon: <MdOutlineSportsSoccer />, label: "Sport",          notificationKey: "Sport"  },
    { id: "TRADING",        icon: <FaArrowRightArrowLeft />, label: "Trading",        notificationKey: "Trading"},
    { id: "LOST AND FOUND", icon: <FaMagnifyingGlass />,     label: "Lost and Found", notificationKey: "Lost"   },
    { id: "SWAP SKILLS",    icon: <BsStars />,               label: "Swap Skills",    notificationKey: "Swap"   },
    { id: "EVENTS",         icon: <MdEvent />,               label: "Events",         notificationKey: "Events" },
  ];

  // ── NOTIFICATION MESSAGES ─────────────────────────────────────────────────
  const categoryMessages = {
    Sport:   ["Wach tbghi nmchiw njriw had sbah?", "Match dyal football ghadi ybda f 5 pm", "Yoga session gheda f parc"],
    Trading: ["3andi sneakers jdad, bgha ndir trading m3a chi jacket", "Je cherche quelqu'un pour trader un vélo contre une trottinette", "Trading a laptop for a gaming console"],
    Lost:    ["Found keys near cafe central", "Found black cat near sidi maarouf", "Lost backpack f metro line 2"],
    Swap:    ["Chkoun li bgha ybdl skills m3aya?", "Swap painting lessons for French tutoring", "Gheda trading skill swap session"],
    Events:  ["Concert f centre ville tonight", "Meetup dyal devs f 7 pm", "Workshop on photography this weekend"],
  };

  const defaultUser = {
    name: "Anonymous",
    avatar: "user1",
    neighborhood: "Unknown",
    city: "Unknown",
    category: "General",
  };

  // ── NOTIFICATION QUEUE LOGIC ──────────────────────────────────────────────
  const showNextNotification = () => {
    if (queueRef.current.length === 0) return;

    const next = queueRef.current.shift();
    setNotification(next);
    setAnimate(true);
    setProgress(0);

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          return 100;
        }
        return prev + 100 / (6000 / 50);
      });
    }, 50);

    timeoutRef.current = setTimeout(() => {
      setAnimate(false);
      setTimeout(() => {
        setNotification(null);
        setTimeout(() => {
          showNextNotification();
        }, 500);
      }, 300);
    }, 6000);
  };

  // ── UNIFIED CLICK HANDLER ─────────────────────────────────────────────────
  // Runs when the user clicks ANY category item.
  // Does TWO things at once: filters the feed AND queues notifications.
  const handleCategoryClick = (category) => {
    // 1. Highlight this item and filter the feed
    setSelectedCategory(category.id);
    setActive(category.id);

    // 2. Queue notifications — skip if "ALL / Home Feed" (notificationKey is null)
    if (!category.notificationKey) return;

    const key = category.notificationKey;
    const catUsers = users.filter(
      (u) => u.category?.toLowerCase() === key.toLowerCase()
    );
    const messages = categoryMessages[key] || ["New activity"];

    queueRef.current = messages.map((msg) => {
      const user = catUsers.length
        ? catUsers[Math.floor(Math.random() * catUsers.length)]
        : defaultUser;
      return { user, category: key, message: msg };
    });

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      showNextNotification();
    }, 2000);
  };

  // ── MOBILE BOTTOM NAV ─────────────────────────────────────────────────────
  const MobileBottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 flex items-center md:hidden shadow-lg">
      {categories.map((el) => (
        <button
          key={el.id}
          onClick={() => handleCategoryClick(el)}
          className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-all duration-200 text-[10px] font-semibold ${
            selectedCategory === el.id
              ? "text-fuchsia-600"
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
      {/* Maps slot */}
      <div className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[10px] font-semibold text-slate-400">
        <FiMap className="text-lg" />
        Map
      </div>
    </div>
  );

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="hidden md:flex flex-col justify-between w-64 h-screen fixed left-0 top-0 bg-white border-r border-slate-100 py-6 px-3 overflow-y-auto z-40">

        {/* Logo */}
        <div className="px-5 mb-6">
          <h1 className="text-xl font-bold text-fuchsia-600">QribLik</h1>
          <p className="text-xs text-slate-400">Community Hub</p>
        </div>

        {/* Static links */}
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

        {/* ── ONE LIST — category filter + notifications ── */}
        <p className="px-5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Social
        </p>
        <nav className="flex flex-col gap-1">
          {categories.map((el) => (
            <div
              key={el.id}
              onClick={() => handleCategoryClick(el)}
              className={`${itemStyle} ${
                selectedCategory === el.id ? activeStyle : inactiveStyle
              }`}
            >
              {el.icon}
              {el.label}
              {selectedCategory === el.id && (
                <span className="ml-auto w-2 h-2 rounded-full bg-fuchsia-400" />
              )}
            </div>
          ))}
        </nav>

        {/* Profile & Settings */}
        <div className="flex flex-col gap-1">
          <div
            onClick={() => setActive("Profile")}
            className={`${itemStyle} ${active === "Profile" ? activeStyle : inactiveStyle}`}
          >
            <FaRegUser className="text-lg" /> My Profile
          </div>
          <div
            onClick={() => setActive("Settings")}
            className={`${itemStyle} ${active === "Settings" ? activeStyle : inactiveStyle}`}
          >
            <IoSettingsOutline className="text-lg" /> Settings
          </div>
          <MapsButton />
        </div>
      </aside>

      {/* ── MOBILE TOP LOGO HEADER ── */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 px-4 py-3">
        <h1 className="text-lg font-bold text-fuchsia-600">Qriblik Community Hub</h1>
      </header>

      {/* ── MOBILE BOTTOM NAV ── */}
      <MobileBottomNav />

      {/* ── NOTIFICATION TOAST ── */}
      {notification && (
        <div
          className={`fixed bottom-20 right-4 z-50 bg-white rounded-2xl shadow-xl p-4 w-72 border border-slate-100 transition-all duration-300 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
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
              <p className="text-sm font-semibold text-slate-800">
                {notification.user.name}
              </p>
              <p className="text-xs text-slate-400">
                {notification.user.neighborhood} • {notification.user.city}
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-600 mb-3">{notification.message}</p>

          <div className="flex gap-2">
            <button
              onClick={() => setNotification(null)}
              className="flex-1 py-1.5 rounded-xl bg-fuchsia-500 text-white text-xs font-semibold hover:bg-fuchsia-600 transition"
            >
              Accept
            </button>
            <button
              onClick={() => setNotification(null)}
              className="flex-1 py-1.5 rounded-xl bg-slate-100 text-slate-500 text-xs font-semibold hover:bg-slate-200 transition"
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