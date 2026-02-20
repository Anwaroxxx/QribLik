import { useState } from "react";
import { FaTwitter, FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import { Image } from "../../../constant/images/images-activité"                                                                                                                                                                                                                                                                                                            ;
import Modal from "../../../components/Modal";
import { useTheme } from "../../../contexts/ThemeContext";

const QRIBLIK_GRADIENT = "linear-gradient(135deg, #8B3FDE 0%, #C837AB 50%, #FF6B35 100%)";
const QRIBLIK_SHADOW = "0 8px 24px rgba(139,63,222,0.55)";
const QRIBLIK_GLOW = "rgba(200,55,171,0.35)";

const socialConfig = [
    { icon: <FaTwitter />,    href: "https://twitter.com",   gradient: QRIBLIK_GRADIENT, shadow: QRIBLIK_SHADOW, glow: QRIBLIK_GLOW },
    { icon: <FaLinkedinIn />, href: "https://linkedin.com",  gradient: QRIBLIK_GRADIENT, shadow: QRIBLIK_SHADOW, glow: QRIBLIK_GLOW },
    { icon: <FaFacebookF />,  href: "https://facebook.com",  gradient: QRIBLIK_GRADIENT, shadow: QRIBLIK_SHADOW, glow: QRIBLIK_GLOW },
    { icon: <FaInstagram />,  href: "https://instagram.com", gradient: QRIBLIK_GRADIENT, shadow: QRIBLIK_SHADOW, glow: QRIBLIK_GLOW },
];

const linkColors = [
    { color: "#a78bfa", glow: "rgba(167,139,250,0.6)" },   // violet
    { color: "#f472b6", glow: "rgba(244,114,182,0.6)" },   // pink
    { color: "#fb923c", glow: "rgba(251,146,60,0.6)" },    // orange
    { color: "#34d399", glow: "rgba(52,211,153,0.6)" },    // emerald
    { color: "#60a5fa", glow: "rgba(96,165,250,0.6)" },    // blue
];

function SocialButton({ icon, href, gradient, shadow, glow, dark }) {
    const [hovered, setHovered] = useState(false);
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                width: "2.5rem",
                height: "2.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "0.6rem",
                border: hovered ? "1px solid transparent" : dark ? "1px solid rgba(139,63,222,0.3)" : "1px solid rgba(255,255,255,0.1)",
                background: hovered ? gradient : dark ? "rgba(139,63,222,0.1)" : "rgba(255,255,255,0.05)",
                boxShadow: hovered ? shadow : "none",
                transform: hovered ? "translateY(-5px) scale(1.15)" : "translateY(0) scale(1)",
                transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                position: "relative",
                cursor: "pointer",
                textDecoration: "none",
            }}
        >
            {/* Glow ring */}
            {hovered && (
                <span
                    style={{
                        position: "absolute",
                        inset: "-3px",
                        borderRadius: "0.8rem",
                        background: glow,
                        filter: "blur(8px)",
                        zIndex: -1,
                        opacity: 0.7,
                    }}
                />
            )}
            <span
                style={{
                    color: "white",
                    fontSize: "0.95rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {icon}
            </span>
        </a>
    );
}

function ColorLink({ children, onClick, colorIndex, dark }) {
    const [hovered, setHovered] = useState(false);
    const { color, glow } = linkColors[colorIndex % linkColors.length];

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="text-left transition-all duration-300"
            style={{
                color: hovered ? color : dark ? "rgba(196,168,240,0.6)" : "rgba(255,255,255,0.7)",
                textShadow: hovered ? `0 0 12px ${glow}` : "none",
                transform: hovered ? "translateX(6px)" : "translateX(0)",
                transition: "color 0.25s ease, text-shadow 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                fontSize: "inherit",
                position: "relative",
            }}
        >
            {/* Arrow indicator */}
            <span
                style={{
                    opacity: hovered ? 1 : 0,
                    transform: hovered ? "translateX(0)" : "translateX(-6px)",
                    transition: "opacity 0.2s ease, transform 0.25s ease",
                    color: color,
                    fontSize: "0.65rem",
                }}
            >
                ▶
            </span>
            {children}
        </button>
    );
}

export default function Footer() {
    const { dark } = useTheme();
    const [modalOpen, setModalOpen] = useState(false);
    const handleItemClick = () => setModalOpen(true);

    return (
        <div
            className="font-sans transition-colors duration-500"
            style={{ background: dark ? "#07030f" : "#111827", color: "white" }}
        >
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

            <div className="px-6 md:px-20 py-16 grid md:grid-cols-4 gap-12">
                {/* Brand */}
                <div>
                    <img src={Image.logo} className="h-12 mb-4" alt="Logo" />
                    <p className="text-white/50 text-base leading-relaxed font-light mb-6 max-w-xs">
                        Building stronger communities, one connection at a time. Your neighborhood, reimagined.
                    </p>
                    <div className="flex gap-2.5" style={{ position: "relative" }}>
                        {socialConfig.map((s, i) => (
                            <SocialButton key={i} {...s} dark={dark} />
                        ))}
                    </div>
                </div>


                {[
                    { title: "Platform", items: ["Sport Events", "Lost & Found", "Trade", "Swap", "Skills"] },
                    { title: "Company", items: ["About Us", "Blog", "Careers", "Press Kit", "Support"] },
                    { title: "Help", items: ["Help Center", "Contact", "Privacy", "Terms of Use"] },
                ].map(({ title, items }) => (
                    <div key={title}>
                        <h3
                            className="font-bold mb-4 transition-colors duration-500"
                            style={{ color: dark ? "#c084fc" : "white" }}
                        >
                            {title}
                        </h3>
                        <ul className="space-y-2.5">
                            {items.map((item, idx) => (
                                <li key={item}>
                                    <ColorLink onClick={handleItemClick} colorIndex={idx} dark={dark}>
                                        {item}
                                    </ColorLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>


            <div
                className="px-6 md:px-20 py-6 flex flex-col md:flex-row items-center justify-between gap-4"
                style={{
                    borderTop: dark
                        ? "1px solid rgba(139,63,222,0.2)"
                        : "1px solid rgba(255,255,255,0.1)",
                }}
            >
                <p className="text-white/40 text-sm">© 2025 Qriblik. All rights reserved.</p>
                <div
                    className="h-1 w-32 rounded-full"
                    style={{
                        background:
                            "linear-gradient(135deg, #8B3FDE 0%, #C837AB 50%, #FF6B35 100%)",
                    }}
                />
            </div>
        </div>
    );
}