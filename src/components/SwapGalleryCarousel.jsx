import { useState, useEffect, useRef } from "react";
import {ImagesCommunity} from '../constant/images/images-community';

const labels = ["Running", "Skill Swap", "Trading", "event"];
const emojis = ["🏃", "🔄", "🤝", "📅"];
const images = [
  ImagesCommunity.imgAbout1,
  ImagesCommunity.imgAbout2,
  ImagesCommunity.imgAbout3,
  ImagesCommunity.imgAbout4,
];

const fanConfig = [
  { x: "18%", y: "-4%", rot: 0, scale: 1, z: 50, opacity: 1 },
  { x: "52%", y: "8%", rot: 12, scale: 0.82, z: 30, opacity: 0.85 },
  { x: "-14%", y: "12%", rot: -14, scale: 0.78, z: 20, opacity: 0.7 },
  { x: "20%", y: "18%", rot: 6, scale: 0.68, z: 10, opacity: 0.45 },
];

export default function SwapGalleryCarousel({ dark = false }) {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef(null);

  const advance = (newIndex) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(newIndex);
      setTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      advance((current + 1) % images.length);
    }, 4000);
    return () => clearInterval(timerRef.current);
  }, [current]);

  const getSlotImage = (slot) => images[(current + slot) % images.length];
  const getSlotLabel = (slot) => labels[(current + slot) % labels.length];
  const getSlotEmoji = (slot) => emojis[(current + slot) % emojis.length];

  return (
    <div className="relative h-[540px] flex items-center justify-center my-10 w-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[#8B3FDE]/20 to-[#FF6B35]/10 blur-3xl pointer-events-none" />
      <div className="relative w-[75%] max-w-5xl h-full mx-auto">
        {fanConfig.map((cfg, slot) => {
          const isActive = slot === 0;
          return (
            <div
              key={slot}
              onClick={() => !isActive && advance((current + slot) % images.length)}
              className={`absolute top-[8%]  w-[78%] h-[78%] rounded-3xl overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isActive ? "cursor-default" : "cursor-pointer hover:brightness-110"}`}
              style={{ left: "35%", transform: `translateX(calc(-50% + ${cfg.x})) translateY(${cfg.y}) rotate(${cfg.rot}deg) scale(${cfg.scale})`, zIndex: cfg.z, opacity: cfg.opacity }}
            >
              <img src={getSlotImage(slot)} alt={getSlotLabel(slot)} className={`w-full h-full object-cover block transition-all duration-500 ${transitioning && isActive ? "scale-110 opacity-60" : "scale-100 opacity-100"}`} />

              {isActive && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{getSlotEmoji(0)}</span>
                        <span className="text-white font-bold text-sm tracking-wide">{getSlotLabel(0)}</span>
                      </div>
                      <div className="flex gap-1">
                        {images.map((_, i) => (
                          <button key={i} onClick={(e) => { e.stopPropagation(); advance(i); }} className={`h-1 rounded-full border-0 cursor-pointer p-0 transition-all duration-300 ${i === current ? "w-6 bg-white" : "w-1 bg-white/40 hover:bg-white/70"}`} />
                        ))}
                      </div>
                    </div>
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
    </div>
  );
}
