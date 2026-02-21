import { useState } from "react";
import { Link } from "react-router-dom";
import { TbHome } from "react-icons/tb";
import { LuMedal } from "react-icons/lu";
import { MdOutlineShoppingBag, MdEvent, MdOutlineSportsSoccer, MdSupportAgent } from "react-icons/md";
import { FaMagnifyingGlass, FaRegMessage, FaRegUser, FaArrowRightArrowLeft, FaCircleInfo } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import Modale3 from "./Modale3";
function Sidebar() {
  const [openModal, setOpenModal] = useState(false);
  const [active, setActive] = useState("Home");
  const [activeHome, setActiveHome] = useState(false);

  const itemStyle =
    "flex items-center gap-3 px-5 py-2.5 rounded-2xl cursor-pointer transition-all duration-300 text-[15px] relative";

  const activeStyle =
    "bg-gradient-to-r from-fuchsia-50 to-rose-50 text-fuchsia-600 shadow-sm";

  const inactiveStyle =
    "text-slate-500 hover:bg-slate-100";

  return (
    <section className="w-[280px] h-screen bg-white sticky top-0 flex flex-col py-4 pr-6 border-r border-[#e6dfd7] overflow-y-auto">

      {/* LOGO */}
      <div className="px-5 mb-12 flex items-center gap-3.5 group cursor-pointer">
        <div className="w-11 h-11 bg-gradient-to-tr from-fuchsia-600 to-rose-500 rounded-[16px] flex items-center justify-center shadow-lg shadow-fuchsia-200 transition-transform group-hover:rotate-6 duration-300">
          <TbHome className="text-white w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-2xl tracking-tighter text-slate-900 leading-none">
            Qriblik
          </span>
          <span className="text-[10px] font-bold text-fuchsia-500 uppercase tracking-[0.2em] mt-1.5">
            Community Hub
          </span>
        </div>
      </div>

      {/* HOME + INFO */}
      <div className="flex flex-col gap-6 px-2">

        {/* Home */}
        <div
          onClick={() => setActive("Home")}
          className={`${itemStyle} ${active === "Home" ? activeStyle : inactiveStyle}`}
        >
          <TbHome />
          Home Feed
        </div>

        {/* About */}
        <Link
          to="/about"
          onClick={() => setActive("About")}
          className={`${itemStyle} ${active === "About" ? activeStyle : inactiveStyle} block no-underline`}
        >
          <FaCircleInfo />
          About
        </Link>
        {/* <Modale3 /> */}

        {/* Support */}
        <Link
          to="/support"
          onClick={() => setActive("Support")}
          className={`${itemStyle} ${active === "Support" ? activeStyle : inactiveStyle} block no-underline`}
        >
          <MdSupportAgent />
          Support
        </Link>

      </div>

      {/* DISCOVER */}
      <section className="flex flex-col gap-1.5 mt-6">
        <h3 className="px-5 text-[11px] font-black text-slate-300 uppercase tracking-[0.25em] mb-2 flex items-center">
          <span>Discover</span>
          <div className="h-px bg-slate-100 flex-1 ml-4"></div>
        </h3>

        {[
          { id: "Sport", icon: <MdOutlineSportsSoccer />, label: "Sport" },
          { id: "Trading", icon: <FaArrowRightArrowLeft />, label: "Trading" },
          { id: "Lost", icon: <FaMagnifyingGlass />, label: "Lost and Found" },
          { id: "Swap", icon: <BsStars />, label: "Swap Skills" },
          { id: "Events", icon: <MdEvent />, label: "Events" },
        ].map((el) => (
          <div
            key={el.id}
            onClick={() => setActive(el.id)}
            className={`${itemStyle} ${active === el.id ? activeStyle : inactiveStyle}`}
          >
            {el.icon}
            {el.label}
            {active === el.id && (
              <span className="absolute right-5 w-2 h-2 bg-fuchsia-500 rounded-full"></span>
            )}
          </div>
        ))}
      </section>

      {/* SOCIAL / Messages */}
      <section className="flex flex-col gap-1.5 mt-6">
        <h3 className="px-5 text-[11px] font-black text-slate-300 uppercase tracking-[0.25em] mb-2 flex items-center">
          <span>Social</span>
          <div className="h-px bg-slate-100 flex-1 ml-4"></div>
        </h3>

        <div
          onClick={() => {
            setActive("Messages");
            setOpenModal(true);
          }}

          className={`flex items-center justify-between px-5 py-3 rounded-2xl cursor-pointer transition-all duration-300
            ${active === "Messages"
              ? "bg-gradient-to-r from-fuchsia-100 to-rose-100 text-fuchsia-600 shadow-md"
              : "bg-gradient-to-r from-fuchsia-50 to-rose-50 text-fuchsia-600 hover:shadow-md hover:scale-[1.02]"
            }`}
        >
          <div className="flex items-center gap-3">
            <FaRegMessage className="text-lg" />
            <span
              className="font-semibold">Messages</span>

          </div>
          <span className="bg-fuchsia-600 text-white text-xs px-2 py-0.5 rounded-full">3</span>
        </div>
      </section>

      {/* PROFILE / SETTINGS */}
      <section className="mt-auto flex flex-col gap-1.5 pt-6 px-2">
        <div
          onClick={() => setActive("Profile")}
          className={`${itemStyle} ${active === "Profile" ? activeStyle : inactiveStyle}`}
        >
          <FaRegUser />
          My Profile
        </div>

        <div
          onClick={() => setActive("Settings")}
          className={`${itemStyle} ${active === "Settings" ? activeStyle : inactiveStyle}`}
        >
          <IoSettingsOutline />
          Settings
        </div>
      </section>
{openModal && (
  <Modale3 onClose={() => setOpenModal(false)} />
)}

    </section>
  );
}

export default Sidebar;
