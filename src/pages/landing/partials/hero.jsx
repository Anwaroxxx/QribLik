import { useState, useEffect, useRef } from "react";
import { Image } from "../../../constant/images/images-activité";
import { h1 } from "framer-motion/client";
import { Link } from "react-router-dom";

const images = [
    Image.activite3,
    Image.activite7,
    Image.activiteReading,
    Image.activiteTrip,
];

const labels = ["Neighbors", "Skills", "Learning", "Trips"];
const emojis = ["🏘️", "🤝", "📚", "✈️"];

const fanConfig = [
    { x: "18%", y: "-4%", rot: 0, scale: 1, z: 50, opacity: 1 },
    { x: "52%", y: "8%", rot: 12, scale: 0.82, z: 30, opacity: 0.85 },
    { x: "-14%", y: "12%", rot: -14, scale: 0.78, z: 20, opacity: 0.7 },
    { x: "20%", y: "18%", rot: 6, scale: 0.68, z: 10, opacity: 0.45 },
];

export default function HeroSection() {
    const [current, setCurrent] = useState(0);
    const [prev, setPrev] = useState(null);
    const [dir, setDir] = useState(1);
    const [transitioning, setTransitioning] = useState(false);

    const advance = (next) => {
        if (transitioning) return;
        setDir(next > current ? 1 : -1);
        setPrev(current);
        setTransitioning(true);
        setTimeout(() => {
            setCurrent(next);
            setPrev(null);
            setTransitioning(false);
        }, 600);
    };

    useEffect(() => {
        const id = setInterval(() => {
            advance((current + 1) % images.length);
        }, 3200);
        return () => clearInterval(id);
    }, [current, transitioning]);


    const getSlotImage = (slot) => images[(current + slot) % images.length];
    const getSlotLabel = (slot) => labels[(current + slot) % images.length];
    const getSlotEmoji = (slot) => emojis[(current + slot) % images.length];

    return (
        <section className="relative min-h-screen flex items-center overflow-visible font-sans bg-[linear-gradient(160deg,_#ffffff_0%,_#f7f0ff_60%,_#fff5f0_100%)]">

            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_15%_50%,rgba(139,63,222,0.07)_0%,transparent_70%)]" />
            <div className="absolute top-0 right-0 w-[55%] h-full pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_80%_40%,rgba(200,55,171,0.06)_0%,transparent_70%)]" />

            <div className="absolute top-16 right-[5%] grid grid-cols-5 gap-3 pointer-events-none opacity-30">
                {Array.from({ length: 25 }).map((_, i) => (
                    <span key={i} className="w-1 h-1 rounded-full bg-[#8B3FDE]" />
                ))}
            </div>
            <div className="absolute bottom-16 left-[2%] grid grid-cols-4 gap-3 pointer-events-none opacity-20">
                {Array.from({ length: 16 }).map((_, i) => (
                    <span key={i} className="w-1 h-1 rounded-full bg-[#FF6B35]" />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                <div className="flex flex-col">

                    <div className="inline-flex items-center gap-2 bg-white border border-[#ede6ff] rounded-full px-4 py-1.5 mb-8 w-fit shadow-sm shadow-[#8B3FDE]/10">
                        <span className="relative flex w-2 h-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B3FDE] opacity-60" />
                            <span className="relative inline-flex rounded-full w-2 h-2 bg-[#8B3FDE]" />
                        </span>
                        <span className="text-xs font-semibold tracking-wide text-[#8B3FDE]">
                            Connecting 5,000+ Neighbors
                        </span>
                    </div>


                    <h1 className="text-5xl xl:text-[66px] font-black leading-[1.06] tracking-tight text-[#1a1410] mb-6">
                        Help is{" "}
                        <span className="relative inline-block">
                            <span className="bg-gradient-to-r from-[#8B3FDE] via-[#C837AB] to-[#FF6B35] bg-clip-text text-transparent">
                                closer
                            </span>

                            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                                <path
                                    d="M2 8 Q50 2 100 8 Q150 14 198 8"
                                    stroke="url(#sq)"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    fill="none"
                                />
                                <defs>
                                    <linearGradient id="sq" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#8B3FDE" />
                                        <stop offset="0.5" stopColor="#C837AB" />
                                        <stop offset="1" stopColor="#FF6B35" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </span>
                        <br />
                        than you think
                    </h1>

                    <p className="text-[15px] leading-7 text-[#6b5f56] max-w-[340px] mb-10">
                        Join QribLik to connect with people just blocks away. Whether
                        you're offering your skills or need a helping hand, we're building a
                        stronger, kinder neighborhood together.
                    </p>

                    <div className="flex items-center gap-5 mb-12">
                        
                        <Link
                            to="/SignIn"
                            className="group relative inline-flex items-center gap-2 text-white text-sm font-bold px-8 py-4 rounded-4xl cursor-pointer border-0 bg-gradient-to-r from-[#8B3FDE] via-[#C837AB] to-[#FF6B35] shadow-[0_6px_24px_rgba(139,63,222,0.45)] hover:shadow-[0_10px_36px_rgba(139,63,222,0.6)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                        >
                            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform rounded-2xl duration-700 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)]" />
                            Get Started
                            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                        </Link>
                    </div>


                    <div className="flex items-center gap-6">
                        {[
                            { val: "5K+", label: "Neighbors" },
                            { val: "120+", label: "Skills shared" },
                            { val: "4.9★", label: "Rating" },
                        ].map(({ val, label }) => (
                            <div key={label} className="flex flex-col">
                                <span className="text-xl font-black bg-gradient-to-r from-[#8B3FDE] to-[#C837AB] bg-clip-text text-transparent leading-none">
                                    {val}
                                </span>
                                <span className="text-[11px] text-[#9a8f88] font-medium mt-0.5">{label}</span>
                            </div>
                        ))}
                    </div>

                </div>

                <div className="relative h-[540px] flex items-center justify-center">

                    <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[#8B3FDE]/20 to-[#FF6B35]/10 blur-3xl pointer-events-none" />

                    <div className="relative w-full h-full">
                        {fanConfig.map((cfg, slot) => {
                            const isActive = slot === 0;
                            return (
                                <div
                                    key={slot}
                                    onClick={() => !isActive && advance((current + slot) % images.length)}
                                    className={`absolute top-[8%] left-0 w-[58%] h-[78%] rounded-3xl overflow-hidden
                    transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    ${isActive ? "cursor-default" : "cursor-pointer hover:brightness-110"}`}
                                    style={{
                                        transform: `translateX(${cfg.x}) translateY(${cfg.y}) rotate(${cfg.rot}deg) scale(${cfg.scale})`,
                                        zIndex: cfg.z,
                                        opacity: cfg.opacity,
                                    }}
                                >
                                    <img
                                        src={getSlotImage(slot)}
                                        alt={getSlotLabel(slot)}
                                        className={`w-full h-full object-cover block transition-all duration-500 ${transitioning && isActive ? "scale-110 opacity-60" : "scale-100 opacity-100"
                                            }`}
                                    />

                                    {isActive && (
                                        <>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />

                                            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-lg">{getSlotEmoji(0)}</span>
                                                        <span className="text-white font-bold text-sm tracking-wide">
                                                            {getSlotLabel(0)}
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        {images.map((_, i) => (
                                                            <button
                                                                key={i}
                                                                onClick={(e) => { e.stopPropagation(); advance(i); }}
                                                                className={`h-1 rounded-full border-0 cursor-pointer p-0 transition-all duration-300 ${i === current
                                                                    ? "w-6 bg-white"
                                                                    : "w-1 bg-white/40 hover:bg-white/70"
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); advance((current - 1 + images.length) % images.length); }}
                                                        className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white text-xs hover:bg-white/40 transition-all duration-200 cursor-pointer"
                                                    >
                                                        ←
                                                    </button>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); advance((current + 1) % images.length); }}
                                                        className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white text-xs hover:bg-white/40 transition-all duration-200 cursor-pointer"
                                                    >
                                                        →
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Top badge */}
                                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 shadow-sm">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                <span className="text-[10px] font-bold text-[#1a1410]">Live</span>
                                            </div>
                                        </>
                                    )}


                                    {!isActive && (
                                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3 flex items-center gap-1.5">
                                            <span className="text-base">{getSlotEmoji(slot)}</span>
                                            <span className="text-white text-xs font-semibold">{getSlotLabel(slot)}</span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="absolute bottom-[5%] right-0 z-50 bg-white rounded-2xl px-4 py-3 shadow-xl shadow-[#8B3FDE]/10 border border-[#f0e8ff] flex items-center gap-3">
                        <div className="flex -space-x-2">
                            {["bg-gradient-to-br from-[#8B3FDE] to-[#C837AB]", "bg-gradient-to-br from-[#C837AB] to-[#FF6B35]", "bg-gradient-to-br from-[#FF6B35] to-[#8B3FDE]"].map((g, i) => (
                                <span key={i} className={`w-7 h-7 rounded-full ${g} border-2 border-white flex items-center justify-center text-white text-[9px] font-bold`}>
                                    {["A", "B", "C"][i]}
                                </span>
                            ))}
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-[#1a1410] leading-none">+120 neighbors</p>
                            <p className="text-[10px] text-[#9a8f88] mt-0.5">active right now</p>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
                    </div>
                </div>
            </div>
        </section>
    );
}