import { useState, useEffect } from "react";

import { Image } from "../constant/images/images-activité";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

const images = [
    Image.activite3,
    Image.activite4,
    Image.activiteReading,
    Image.activiteTrip,
];

const cardClasses = [
    "w-[72%] h-[85%] top-0 right-0 z-40 shadow-2xl",
    "w-[48%] h-[55%] bottom-0 left-0 z-30 shadow-xl",
    "w-[36%] h-[38%] top-[28%] left-[4%] z-20 shadow-lg",
    "w-[30%] h-[32%] bottom-[16%] right-[4%] z-10 shadow-md opacity-50",
];

export default function Sidecarou() {
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimating(true);
            setTimeout(() => {
                setCurrent((prev) => (prev + 1) % images.length);
                setAnimating(false);
            }, 400);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden font-sans bg-[linear-gradient(160deg,_#ffffff_0%,_#f7f0ff_50%,_#fff5f0_100%)]">

            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_20%_50%,rgba(139,63,222,0.08)_0%,transparent_70%)]" />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-12 py-20 grid grid-cols-1  gap-20 items-center">



                <div className="relative  h-[480px]">

                    <div className="relative w-full h-full">
                        {cardClasses.map((cls, slot) => {
                            const imgIndex = (current + slot) % images.length;
                            return (
                                <div
                                    key={slot}
                                    className={`absolute rounded-2xl overflow-hidden transition-all duration-500 ${cls}`}
                                >
                                    <img
                                        src={images[imgIndex]}
                                        alt={`Community ${imgIndex + 1}`}
                                        className={`w-full h-full object-cover block transition-opacity duration-[400ms] ${animating ? "opacity-0" : "opacity-100"
                                            }`}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`h-1.5 rounded-full border-0 cursor-pointer p-0 transition-all duration-300 ${i === current
                                    ? "w-5 bg-gradient-to-r from-[#8B3FDE] via-[#C837AB] to-[#FF6B35]"
                                    : "w-1.5 bg-[#d4c9c0]"
                                    }`}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}