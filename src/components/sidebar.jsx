import { useState } from "react";
import { TbHome } from "react-icons/tb";
import { LuMedal } from "react-icons/lu";
import { MdOutlineShoppingBag, MdEvent } from "react-icons/md";
import { FaMagnifyingGlass, FaRegMessage, FaRegUser } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function Sidebar() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeComm, setActiveComm] = useState(null);
  const [activeHome, setActiveHome] = useState(false);

  return (
    <div className="w-[20vw] h-[100vh] flex flex-col justify-between">
      {/* Logo + Home */}
      <div className="h-[20%] text-gray-500 w-full px-10 flex flex-col justify-start gap-4">
        {/* logo */}
        <div>
        </div>

        {/* Home */}
        <div
          className={`flex items-center gap-2 rounded-3xl h-8 px-4 cursor-pointer hover:bg-[#e0e7ef] ${
            activeHome ? "bg-[#FDF2F8] text-[#EC4899]" : "bg-white text-gray-500"
          }`}
          onClick={() => setActiveHome(!activeHome)}
        >
          <TbHome />
          <h1>Home Feed</h1>
        </div>
      </div>

      {/* Categories */}
      <div className="h-[60%] text-gray-500 w-full flex flex-col justify-around px-10">
        <div className="flex flex-col gap-5 justify-evenly h-[60%]">
          <h1 className="border-b w-fit">CATEGORIES</h1>

          <div
            className={`flex items-center gap-2 rounded-3xl h-8 px-4 cursor-pointer hover:bg-[#e0e7ef] ${
              activeCategory === 0 ? "bg-[#FDF2F8] text-[#EC4899]" : "bg-white text-gray-500"
            }`}
            onClick={() => setActiveCategory(0)}
          >
            <LuMedal className="text-2xl" />
            <h1>Sport</h1>
          </div>

          <div
            className={`flex items-center gap-2 rounded-3xl h-8 px-4 cursor-pointer hover:bg-[#e0e7ef] ${
              activeCategory === 1 ? "bg-[#FDF2F8] text-[#EC4899]" : "bg-white text-gray-500"
            }`}
            onClick={() => setActiveCategory(1)}
          >
            <MdOutlineShoppingBag className="text-2xl" />
            <h1>Trading</h1>
          </div>

          <div
            className={`flex items-center gap-2 rounded-3xl h-8 px-4 cursor-pointer hover:bg-[#e0e7ef] ${
              activeCategory === 2 ? "bg-[#FDF2F8] text-[#EC4899]" : "bg-white text-gray-500"
            }`}
            onClick={() => setActiveCategory(2)}
          >
            <FaMagnifyingGlass className="text-2xl" />
            <h1>Lost and Found</h1>
          </div>

          <div
            className={`flex items-center gap-2 rounded-3xl h-8 px-4 cursor-pointer hover:bg-[#e0e7ef] ${
              activeCategory === 3 ? "bg-[#FDF2F8] text-[#EC4899]" : "bg-white text-gray-500"
            }`}
            onClick={() => setActiveCategory(3)}
          >
            <BsStars className="text-2xl" />
            <h1>Swap Skills</h1>
          </div>

          <div
            className={`flex items-center gap-2 rounded-3xl h-8 px-4 cursor-pointer hover:bg-[#e0e7ef] ${
              activeCategory === 4 ? "bg-[#FDF2F8] text-[#EC4899]" : "bg-white text-gray-500"
            }`}
            onClick={() => setActiveCategory(4)}
          >
            <MdEvent className="text-2xl" />
            <h1>Events</h1>
          </div>
        </div>

        {/* Communication */}
        <div className="h-[30%] flex flex-col gap-5">
          <h1 className="border-b w-fit">COMMUNICATION</h1>

          <div
            className={`flex items-center gap-2 rounded-3xl h-8 px-4 cursor-pointer hover:bg-[#e0e7ef] ${
              activeComm === 0 ? "bg-[#FDF2F8] text-[#EC4899]" : "bg-white text-gray-500"
            }`}
            onClick={() => setActiveComm(0)}
          >
            <FaRegMessage className="text-2xl" />
            <h1>Inbox</h1>
          </div>
        </div>
      </div>

      {/* Profile */}
      <div className="h-[20%] w-full text-gray-500 border-t p-10 flex flex-col gap-5">
        <div className="flex items-center gap-3 rounded-3xl h-10 px-4 hover:bg-[#e0e7ef] cursor-pointer">
          <FaRegUser className="text-xl" />
          <h1>My Profile</h1>
        </div>
        <div className="flex items-center gap-2 rounded-3xl h-10 px-4 hover:bg-[#e0e7ef] cursor-pointer">
          <IoSettingsOutline className="text-2xl" />
          <h1>Settings</h1>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
