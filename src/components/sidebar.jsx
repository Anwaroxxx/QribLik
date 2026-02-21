import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { TbHome } from "react-icons/tb";
import { MdEvent, MdOutlineSportsSoccer, MdSupportAgent } from "react-icons/md";
import { FaMagnifyingGlass, FaRegMessage, FaRegUser, FaArrowRightArrowLeft, FaCircleInfo } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import users from "../data/UserData.json";
import { usersImages } from "../constant/images/images-users";

function Sidebar() {
  const [active, setActive] = useState("Home");
  const [notification, setNotification] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [progress, setProgress] = useState(0);

  const queueRef = useRef([]); 
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const itemStyle = "flex items-center gap-3 px-5 py-2.5 rounded-2xl cursor-pointer transition-all duration-300 text-[15px] relative";
  const activeStyle = "bg-gradient-to-r from-fuchsia-50 to-rose-50 text-fuchsia-600 shadow-sm";
  const inactiveStyle = "text-slate-500 hover:bg-slate-100";

  const discoverItems = [
    { id: "Sport", icon: <MdOutlineSportsSoccer />, label: "Sport" },
    { id: "Trading", icon: <FaArrowRightArrowLeft />, label: "Trading" },
    { id: "Lost", icon: <FaMagnifyingGlass />, label: "Lost and Found" },
    { id: "Swap", icon: <BsStars />, label: "Swap Skills" },
    { id: "Events", icon: <MdEvent />, label: "Events" },
  ];

  const categoryMessages = {
    Sport: ["Wach tbghi nmchiw njriw had sbah?", "Match dyal football ghadi ybda f 5 pm tbghi tl3ab ?", "Yoga session gheda f parc"],
    Trading: ["3andi sneakers jdad, ila bghiti ndir m3ak trading m3a chi jacket", "Je cherche quelqu’un pour faire du trading d’un vélo contre une trottinette électrique", "I'm looking for someone interested in trading a laptop for a gaming console"],
    Lost: ["Found keys near cafe central", "Found cat black near sidi maarouf ", "Lost backpack f metro line 2"],
    Swap: ["Chkoun li bgha ybdl skills m3aya?", "Swap painting lessons for French tutoring", "Gheda trading skill swap session"],
    Events: ["Concert f centre ville tonight", "Meetup dyal devs f 7 pm", "Workshop on photography this weekend"]
  };

  const defaultUser = { name: "Anonymous", avatar: "user1", neighborhood: "Unknown", city: "Unknown", category: "General" };

  const handleClickCategory = (category) => {
    setActive(category);
    const catUsers = users.filter(u => u.category?.toLowerCase() === category.toLowerCase());
    const messages = categoryMessages[category] || ["New activity"];

    
    queueRef.current = messages.map(msg => {
      const user = catUsers.length ? catUsers[Math.floor(Math.random() * catUsers.length)] : defaultUser;
      return { user, category, message: msg };
    });

   if (timeoutRef.current) clearTimeout(timeoutRef.current);

timeoutRef.current = setTimeout(() => {
  showNextNotification();
}, 2000);
  };

  const showNextNotification = () => {
    if (queueRef.current.length === 0) return;

    const next = queueRef.current.shift();
    setNotification(next);
    setAnimate(true);
    setProgress(0);

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
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
    }, 5000); 

  }, 300);

}, 6000);
  };

  return (
    <>
      <section className="w-[280px] h-screen bg-white flex flex-col py-4 pr-6 border-r border-[#e6dfd7] overflow-y-auto">
        {/* Logo */}
        <div className="px-5 mb-12 flex items-center gap-3.5">
          <div className="w-11 h-11 bg-gradient-to-tr from-fuchsia-600 to-rose-500 rounded-[16px] flex items-center justify-center">
            <TbHome className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-2xl text-slate-900">Qriblik</span>
            <span className="text-[10px] font-bold text-fuchsia-500 uppercase tracking-[0.2em]">Community Hub</span>
          </div>
        </div>

        {/* Main Links */}
        <div className="flex flex-col gap-6 px-2">
          <div onClick={() => setActive("Home")} className={`${itemStyle} ${active === "Home" ? activeStyle : inactiveStyle}`}>
            <TbHome /> Home Feed
          </div>

          <Link to="/about" onClick={() => setActive("About")} className={`${itemStyle} ${active === "About" ? activeStyle : inactiveStyle}`}>
            <FaCircleInfo /> About
          </Link>

          <Link to="/support" onClick={() => setActive("Support")} className={`${itemStyle} ${active === "Support" ? activeStyle : inactiveStyle}`}>
            <MdSupportAgent /> Support
          </Link>
        </div>

        {/* Discover */}
        <section className="flex flex-col gap-1.5 mt-6">
          <h3 className="px-5 text-[11px] font-black text-slate-300 uppercase tracking-[0.25em] mb-2">Discover</h3>
          {discoverItems.map(el => (
            <div
              key={el.id}
              onClick={() => handleClickCategory(el.id)}
              className={`${itemStyle} ${active === el.id ? activeStyle : inactiveStyle}`}
            >
              {el.icon}
              {el.label}
              {active === el.id && <span className="absolute right-5 w-2 h-2 bg-fuchsia-500 rounded-full"></span>}
            </div>
          ))}
        </section>

        {/* Social */}
        <section className="mt-6 px-2">
          <div onClick={() => setActive("Messages")} className="flex items-center justify-between px-5 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 text-fuchsia-600">
            <div className="flex items-center gap-3">
              <FaRegMessage />
              <span className="font-semibold">Messages</span>
            </div>
            <span className="bg-fuchsia-600 text-white text-xs px-2 py-0.5 rounded-full">3</span>
          </div>
        </section>

        {/* Profile */}
        <section className="mt-auto flex flex-col gap-1.5 pt-6 px-2">
          <div onClick={() => setActive("Profile")} className={`${itemStyle} ${active === "Profile" ? activeStyle : inactiveStyle}`}>
            <FaRegUser /> My Profile
          </div>

          <div onClick={() => setActive("Settings")} className={`${itemStyle} ${active === "Settings" ? activeStyle : inactiveStyle}`}>
            <IoSettingsOutline /> Settings
          </div>
        </section>
      </section>

      {/* Notification */}
      {notification && (
        <div className={`fixed bottom-10 right-5 w-96 bg-white shadow-2xl rounded-2xl p-4 flex gap-4 items-center z-50 transform transition-all duration-500 ${animate ? "translate-x-0 scale-100 opacity-100" : "translate-x-10 scale-90 opacity-0"}`}>
          <img src={usersImages[notification.user.avatar]} alt={notification.user.name} className="w-14 h-14 rounded-full object-cover border-2 border-fuchsia-500" />
          <div className="flex-1">
            <h3 className="font-semibold text-sm">{notification.user.name}</h3>
            <p className="text-xs text-gray-500">{notification.user.neighborhood} • {notification.user.city}</p>
            <p className="text-xs text-purple-500 mt-1">{notification.message}</p>
            <div className="w-full h-1 bg-gray-200 rounded-full mt-2">
              <div className="h-1 bg-fuchsia-500 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex gap-2 mt-2">
              <Link to={"/"}>
                     <button className="flex-1 bg-green-500 text-white py-1 rounded-lg text-sm" onClick={() => setNotification(null)}>Accept</button>
              </Link>
              <button className="flex-1 bg-gray-200 py-1 rounded-lg text-sm" onClick={() => setNotification(null)}>Decline</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;