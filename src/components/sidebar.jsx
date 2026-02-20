import { useState } from "react";
import { Link } from "react-router-dom";
import { TbHome } from "react-icons/tb";
import { MdEvent, MdOutlineSportsSoccer, MdSupportAgent } from "react-icons/md";
import { FaMagnifyingGlass,  FaRegUser, FaArrowRightArrowLeft, FaCircleInfo } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import users from "../data/UserData.json";

function Sidebar({ selectedCategory, setSelectedCategory }) {
  const [active, setActive] = useState("Home");
  const [notification, setNotification] = useState(null); 

  const categories = [
    { id: "ALL",          icon: <TbHome />,                  label: "Home Feed"     },
    { id: "SPORT",        icon: <MdOutlineSportsSoccer />,   label: "Sport"         },
    { id: "TRADING",      icon: <FaArrowRightArrowLeft />,   label: "Trading"       },
    { id: "LOST AND FOUND", icon: <FaMagnifyingGlass />,     label: "Lost and Found"},
    { id: "SWAP SKILLS",  icon: <BsStars />,                 label: "Swap Skills"   },
    { id: "EVENTS",       icon: <MdEvent />,                 label: "Events"        },
  ];

  const itemStyle =
    "flex items-center gap-3 px-5 py-2.5 rounded-2xl cursor-pointer transition-all duration-300 text-[15px] relative";
  const activeStyle   = "bg-gradient-to-r from-fuchsia-50 to-rose-50 text-fuchsia-600 shadow-sm";
  const inactiveStyle = "text-slate-500 hover:bg-slate-100";

  const handleClick = (category) => {
    const validUsers = users.filter(
      (u) => u && typeof u.name === "string"
    );
    const categoryUsers = validUsers.filter(
      (u) => u.category?.toLowerCase() === category.toLowerCase()
    );

    // Fall back to any valid user if no category match
    const pool = categoryUsers.length ? categoryUsers : validUsers;
    if (!pool.length) return;

    const randomUser = pool[Math.floor(Math.random() * pool.length)];

    setNotification({
      user: randomUser,
      category,
      message: `New activity in ${category}`,
    });

    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <>
      {/* Sidebar */}
      <section className="w-[280px] h-screen bg-white bottom-20 flex flex-col py-4 pr-6 border-r border-[#e6dfd7] overflow-y-auto">

        {/* LOGO */}
        <div className="px-5 mb-12 flex items-center gap-3.5 group cursor-pointer">
          <div className="w-11 h-11 bg-gradient-to-tr from-fuchsia-600 to-rose-500 rounded-[16px] flex items-center justify-center shadow-lg shadow-fuchsia-200 transition-transform group-hover:rotate-6 duration-300">
            <TbHome className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-2xl tracking-tighter text-slate-900 leading-none">Qriblik</span>
            <span className="text-[10px] font-bold text-fuchsia-500 uppercase tracking-[0.2em] mt-1.5">Community Hub</span>
          </div>
        </div>

        {/* HOME + INFO */}
        <div className="flex flex-col gap-6 px-2">
          <div
            onClick={() => setActive("Home")}
            className={`${itemStyle} ${active === "Home" ? activeStyle : inactiveStyle}`}
          >
            <TbHome /> Home Feed
          </div>
          <Link
            to="/about"
            onClick={() => setActive("About")}
            className={`${itemStyle} ${active === "About" ? activeStyle : inactiveStyle} block no-underline`}
          >
            <FaCircleInfo /> About
          </Link>
          <Link
            to="/support"
            onClick={() => setActive("Support")}
            className={`${itemStyle} ${active === "Support" ? activeStyle : inactiveStyle} block no-underline`}
          >
            <MdSupportAgent /> Support
          </Link>
        </div>

        
       

        {/* SOCIAL */}
        <section className="flex flex-col gap-1.5 mt-6">
          <h3 className="px-5 text-[11px] font-black text-slate-300 uppercase tracking-[0.25em] mb-2 flex items-center">
            <span>Social</span>
            <div className="h-px bg-slate-100 flex-1 ml-4"></div>
          </h3>

          <div className="flex flex-col gap-2 px-2">
            {categories.map((el) => (
              <div
                key={el.id}
                onClick={() => setSelectedCategory(el.id)}
                className={`${itemStyle} ${selectedCategory === el.id ? activeStyle : inactiveStyle}`}
              >
                {el.icon}
                {el.label}
                {selectedCategory === el.id && (
                  <span className="absolute right-5 w-2 h-2 bg-fuchsia-500 rounded-full" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* PROFILE / SETTINGS */}
        <section className="mt-auto flex flex-col gap-1.5 pt-6 px-2">
          <div
            onClick={() => setActive("Profile")}
            className={`${itemStyle} ${active === "Profile" ? activeStyle : inactiveStyle}`}
          >
            <FaRegUser /> My Profile
          </div>
          <div
            onClick={() => setActive("Settings")}
            className={`${itemStyle} ${active === "Settings" ? activeStyle : inactiveStyle}`}
          >
            <IoSettingsOutline /> Settings
          </div>
        </section>
      </section>

      {/* Notification Card */}
      {notification && (
        <div className="fixed bottom-10 right-5 w-96 bg-white shadow-2xl rounded-2xl p-4 flex gap-4 items-center z-50 animate-slide-in">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-fuchsia-500 to-rose-400 flex items-center justify-center text-white font-bold text-xl flex-shrink-0 border-2 border-fuchsia-300">
            {notification.user.name?.charAt(0) ?? "?"}
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <h3 className="font-semibold text-slate-900 text-sm">{notification.user.name}</h3>
            <p className="text-gray-600 text-xs">{notification.message}</p>
            <p className="text-purple-500 text-[10px] uppercase tracking-wider">{notification.category}</p>
            <div className="flex gap-2 mt-2">
              <button
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-1 rounded-lg text-sm transition"
                onClick={() => setNotification(null)}
              >
                Accept
              </button>
              <button
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-1 rounded-lg text-sm transition"
                onClick={() => setNotification(null)}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;