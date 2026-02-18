import { useState } from "react";
import { TbHome } from "react-icons/tb";
import { LuMedal } from "react-icons/lu";
import { MdOutlineShoppingBag, MdEvent, MdOutlineSportsSoccer } from "react-icons/md";
import { FaMagnifyingGlass, FaRegMessage, FaRegUser, FaArrowRightArrowLeft  } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { Image } from "../constant/images/images-activité";
import { FaCircleInfo } from "react-icons/fa6";
import { MdSupportAgent } from "react-icons/md";
import { usersImages } from "../constant/images/images-users";
import { Link } from "react-router-dom";



function Sidebar() {
  const [active, setActive] = useState("Home");

  const itemStyle =
    "flex items-center gap-3 px-5 py-2.5 rounded-2xl cursor-pointer transition-all duration-300 text-[15px] relative";

  const activeStyle =
    "bg-gradient-to-r from-fuchsia-50 to-rose-50 text-fuchsia-600 shadow-sm";

  const inactiveStyle =
    "text-slate-500 hover:bg-slate-100";

  return (
<section className="w-[280px] h-screen bg-white sticky top-0 flex flex-col py-10 pr-6 border-r border-[#e6dfd7] overflow-y-auto">

      {/* LOGO */}
      <div className="px-5  mb-12 flex items-center gap-3.5 group cursor-pointer">
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

      <div className="flex flex-col gap-10">

        {/* HOME */}
     
        {/* HOME + INFO */}
<section className="flex flex-col gap-1.5">
  <div
    onClick={() => setActive("Home")}
    className={`${itemStyle} ${
      active === "Home" ? activeStyle : inactiveStyle
    }`}
  >
    <TbHome />
    Home Feed
  </div>
<Link
    to="/about"
    onClick={() => setActive("About")}
    className={`${itemStyle} ${
      active === "About" ? activeStyle : inactiveStyle
    }`}
  >
    <FaCircleInfo />
    About
  </Link>

  <Link
    to="/support"
    onClick={() => setActive("Support")}
    className={`${itemStyle} ${
      active === "Support" ? activeStyle : inactiveStyle
    }`}
  >
    <MdSupportAgent />
    Support
  </Link>



 {/* <Link to="/about" >
    <div
      onClick={() => setActive("About")}
      className={`${itemStyle} ${
        active === "About" ? activeStyle : inactiveStyle
      }`}
    >
      <FaCircleInfo />
      About
    </div>
  </Link>

  <Link to="/support">
    <div
      onClick={() => setActive("Support")}
      className={`${itemStyle} ${
        active === "Support" ? activeStyle : inactiveStyle
      }`}
    >
      <MdSupportAgent />
      Support
    </div>
  </Link> */}
</section>


        {/* DISCOVER */}
        <section className="flex flex-col gap-1.5">
          <h3 className="px-5 text-[11px] font-black text-slate-300 uppercase tracking-[0.25em] mb-2 flex items-center">
            <span>Discover</span>
            <div className="h-px bg-slate-100 flex-1 ml-4"></div>
          </h3>

          {[
            { id: "Sport", icon: <MdOutlineSportsSoccer /> , label: "Sport" },
            { id: "Trading", icon: < FaArrowRightArrowLeft />, label: "Trading" },
            { id: "Lost", icon: <FaMagnifyingGlass />, label: "Lost and Found" },
            { id: "Swap", icon: <BsStars />, label: "Swap Skills" },
            { id: "Events", icon: <MdEvent />, label: "Events" },
          ].map((el) => (
            <div
              key={el.id}
              onClick={() => setActive(el.id)}
              className={`${itemStyle} ${
                active === el.id ? activeStyle : inactiveStyle
              }`}
            >
              {el.icon}
              {el.label}

              {active === el.id && (
                <span className="absolute right-5 w-2 h-2 bg-fuchsia-500 rounded-full"></span>
              )}
            </div>
          ))}
        </section>

        {/* SOCIAL */}
        <section className="flex flex-col gap-1.5">
          <h3 className="px-5 text-[11px] font-black text-slate-300 uppercase tracking-[0.25em] mb-2 flex items-center">
            <span>Social</span>
            <div className="h-px bg-slate-100 flex-1 ml-4"></div>
          </h3>

        
          <div
  onClick={() => setActive("Messages")}
  className={`
    flex items-center justify-between
    px-5 py-3
    rounded-2xl
    cursor-pointer
    transition-all duration-300
    ${
      active === "Messages"
        ? "bg-gradient-to-r from-fuchsia-100 to-rose-100 text-fuchsia-600 shadow-md"
        : "bg-gradient-to-r from-fuchsia-50 to-rose-50 text-fuchsia-600 hover:shadow-md hover:scale-[1.02]"
    }
  `}
>
  <div className="flex items-center gap-3">
    <FaRegMessage className="text-lg" />
    <span className="font-semibold">Messages</span>
  </div>

  {/* Notification  */}
  <span className="bg-fuchsia-600 text-white text-xs px-2 py-0.5 rounded-full">
    3
  </span>
</div>

        </section>
      </div>

      <section className="mt-auto pt-10 flex flex-col gap-1.5">
        <div
          onClick={() => setActive("Profile")}
          className={`${itemStyle} ${
            active === "Profile" ? activeStyle : inactiveStyle
          }`}
        >
          <FaRegUser />
          My Profile
        </div>

        <div
          onClick={() => setActive("Settings")}
          className={`${itemStyle} ${
            active === "Settings" ? activeStyle : inactiveStyle
          }`}
        >
          <IoSettingsOutline />
          Settings
        </div>
      </section>
    </section>
  );
}

export default Sidebar;



















