import React, { useState } from "react";
import { BsStars } from "react-icons/bs";
import { FaArrowRightArrowLeft, FaMagnifyingGlass } from "react-icons/fa6";
import { MdEvent, MdOutlineSportsSoccer } from "react-icons/md";
import { TbClearAll, TbHome } from "react-icons/tb";
import PixelBlast from "../../../animations/Pixel";

const DashboardMap = () => {
    const [active, setActive] = useState("All");

    const itemStyle =
    "flex items-center gap-3 px-5 py-2.5 rounded-2xl cursor-pointer transition-all duration-300 text-[15px] relative";

  const activeStyle =
    "bg-gradient-to-r from-fuchsia-50 to-rose-50 text-fuchsia-600 shadow-sm";

  const inactiveStyle =
    "text-slate-500 hover:bg-slate-100";
  return (
    <>
    {/* logo */}
    <div className="w-[280px] h-screen bg-white sticky top-0 flex flex-col py-4 pr-6 border-r border-[#e6dfd7] overflow-y-auto relative">
      <div className="absolute inset-0 z-0 opacity-30">
        <PixelBlast
          variant="square"
          pixelSize={4}
          color="#d946ef"
          patternScale={2}
          patternDensity={1}
          pixelSizeJitter={0}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={false}
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.5}
          edgeFade={0.25}
          transparent
        />
      </div>
      <div className="px-5 mb-12 flex items-center gap-3.5 group cursor-pointer relative z-10">
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
      <section className="flex flex-col gap-8 relative z-10">
        <h3 className="px-5 text-[11px] font-black text-slate-300 uppercase tracking-[0.25em] mb-2 flex items-center">
          <span>Discover</span>
          <div className="h-px bg-slate-100 flex-1 ml-4"></div>
        </h3>

        {[
          { id: "All" , icon : <TbClearAll/> , label: "All"},
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
      
    </div>
    </>
  );
};

export default DashboardMap;

