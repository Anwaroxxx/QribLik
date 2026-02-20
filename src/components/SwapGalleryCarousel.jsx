import { useState, useEffect, useRef, useCallback } from "react";
import {ImagesCommunity} from '../constant/images/images-community';
import { eventsImage } from "../constant/images/images-events";

const SLIDES = [
        {id : 1 , image : ImagesCommunity.imgAbout1 ,  alt : "Community Activity 1" } , 
        {id : 2 , image : ImagesCommunity.imgAbout2 ,  alt : "Community Activity 2" },
        {id : 3 , image : eventsImage.event1 ,  alt : "Community Activity 3" },
        {id : 4 , image : ImagesCommunity.imgAbout4 ,  alt : "Community Activity 4" },
        {id : 5 , image : ImagesCommunity.imgAbout5 ,  alt : "Community Activity 5" }
    
];

const TIMER_DELAY = 5000;

export default function SwapGalleryCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const timerRef = useRef(null);
  const trackRef = useRef(null);
  const dragStartX = useRef(null);

  const resetTimer = useCallback((nextFn) => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(nextFn, TIMER_DELAY);
  }, []);

  const goTo = useCallback(
    (index) => {
      const clamped = (index + SLIDES.length) % SLIDES.length;
      setActiveSlide(clamped);
      setDragOffset(0);
    },
    []
  );

  const next = useCallback(() => goTo(activeSlide + 1), [activeSlide, goTo]);
  const prev = useCallback(() => goTo(activeSlide - 1), [activeSlide, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(next, TIMER_DELAY);
    return () => clearInterval(timerRef.current);
  }, [next]);

  // --- Pointer (mouse + touch) drag logic ---
  const onPointerDown = (e) => {
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX;
    setIsDragging(true);
    clearInterval(timerRef.current);
  };

  const onPointerMove = (e) => {
    if (!isDragging || dragStartX.current === null) return;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    setDragOffset(clientX - dragStartX.current);
  };

  const onPointerUp = (e) => {
    if (!isDragging) return;
    const clientX =
      e.clientX ?? e.changedTouches?.[0]?.clientX ?? dragStartX.current;
    const diff = dragStartX.current - clientX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      const target = diff > 0 ? activeSlide + 1 : activeSlide - 1;
      goTo(target);
    } else {
      setDragOffset(0);
    }

    setIsDragging(false);
    dragStartX.current = null;
    timerRef.current = setInterval(next, TIMER_DELAY);
  };

  const trackStyle = {
    transform: `translateX(calc(-${activeSlide * 100}% + ${dragOffset}px))`,
    transition: isDragging ? "none" : "transform 500ms ease-in-out",
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <section className="bg-gray-100 p-8">
      <div
        className="w-64 sm:w-128 mx-auto relative group select-none"
        style={{ width: "min(812px, 100%)" }}
      >
        {/* Track */}
        <div className="relative overflow-hidden rounded-lg shadow-xl">
          <div
            ref={trackRef}
            className="flex"
            style={trackStyle}
            onMouseDown={onPointerDown}
            onMouseMove={onPointerMove}
            onMouseUp={onPointerUp}
            onMouseLeave={onPointerUp}
            onTouchStart={onPointerDown}
            onTouchMove={onPointerMove}
            onTouchEnd={onPointerUp}
          >
            {SLIDES.map((slide, i) => (
              <div
                key={i}
                className="min-w-full flex items-center justify-center overflow-hidden"
                style={{ height: "clamp(628px, 25vw, 256px)" }}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Prev Button */}
        <button
          onClick={() => { prev(); resetTimer(next); }}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-1 sm:p-2.5 transition-colors z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={() => { next(); resetTimer(next); }}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-1 sm:p-2.5 transition-colors z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Indicators */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors bg-white ${
                i !== activeSlide ? "opacity-50 hover:opacity-75" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}