import { useState, useEffect } from "react";
import { Image } from "../constant/images/images-activité";
import { useTheme } from "../contexts/ThemeContext";


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
    "w-[30%] h-[32%] bottom-[16%] right-[4%] z-10 shadow-md opacity-40",
];

export default function Sidecarou() {
    const { dark } = useTheme();
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
        <section
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-500"
            style={{
                background: dark
                    ? "linear-gradient(160deg, #0f0a1e 0%, #1a0a2e 100%)"
                    : "linear-gradient(160deg, #f7f0ff 0%, #fff5f0 100%)",
            }}
        >
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: dark
                        ? "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(139,63,222,0.12) 0%, transparent 70%)"
                        : "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(139,63,222,0.07) 0%, transparent 70%)",
                }}
            />


            <div className="relative z-10 mb-10 flex flex-col items-center gap-1 text-center px-8">
                <img src={Image.logo} className="h-13 w-auto cursor-pointer hover:scale-105 transition-transform duration-300" alt="Logo" />

                <div className="flex items-center gap-2 mt-1">
                    <div
                        className="h-px w-6 rounded-full"
                        style={{
                            background: dark
                                ? "rgba(196,168,240,0.25)"
                                : "rgba(139,63,222,0.2)",
                        }}
                    />
                    <p
                        className="text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors duration-500"
                        style={{ color: dark ? "rgba(196,168,240,0.5)" : "#b8a0c8" }}
                    >
                        Always Near, Always Here
                    </p>
                    <div
                        className="h-px w-6 rounded-full"
                        style={{
                            background: dark
                                ? "rgba(196,168,240,0.25)"
                                : "rgba(139,63,222,0.2)",
                        }}
                    />
                </div>
            </div>

            {/* Carousel */}
            <div className="relative z-10 w-full max-w-xs mx-auto px-8">
                <div className="relative h-[360px]">
                    {cardClasses.map((cls, slot) => {
                        const imgIndex = (current + slot) % images.length;
                        return (
                            <div
                                key={slot}
                                className={`absolute rounded-2xl overflow-hidden transition-all duration-500 ${cls}`}
                            >
                                <img
                                    src={images[imgIndex]}
                                    alt={`slide ${imgIndex + 1}`}
                                    className={`w-full h-full object-cover block transition-opacity duration-[400ms] ${
                                        animating ? "opacity-0" : "opacity-100"
                                    }`}
                                />
                                {slot === 0 && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                )}
                            </div>
                        );
                    })}

                    {/* Dot indicators */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className="rounded-full border-0 cursor-pointer p-0 transition-all duration-300"
                                style={{
                                    height: "6px",
                                    width: i === current ? "20px" : "6px",
                                    background: i === current
                                        ? "linear-gradient(135deg, #8B3FDE, #C837AB)"
                                        : dark ? "rgba(196,168,240,0.25)" : "#d4c9c0",
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom slogan — large, elegant, faded */}
            <div className="relative z-10 mt-20 px-10 text-center">
                <p
                    className="text-xs font-medium tracking-[0.25em] uppercase transition-colors duration-500"
                    style={{ color: dark ? "rgba(196,168,240,0.2)" : "rgba(139,63,222,0.18)" }}
                >
                    Always Near — Always Here
                </p>
            </div>
        </section>
    );
}