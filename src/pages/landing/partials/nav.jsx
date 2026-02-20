import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Image } from "../../../constant/images/images-activité";
import { useTheme } from "../../../contexts/ThemeContext";

function DarkModeToggle() {
    const { dark, toggleDark } = useTheme();
    return (
        <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            style={{
                position: "relative",
                width: "3.2rem",
                height: "1.8rem",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                padding: 0,
                background: dark ? "linear-gradient(135deg, #8B3FDE, #C837AB)" : "#e2e8f0",
                transition: "background 0.35s ease",
                boxShadow: dark ? "0 0 12px rgba(139,63,222,0.5)" : "0 1px 4px rgba(0,0,0,0.15)",
            }}
        >
            <span
                style={{
                    position: "absolute",
                    top: "0.25rem",
                    left: dark ? "calc(100% - 1.55rem)" : "0.25rem",
                    width: "1.3rem",
                    height: "1.3rem",
                    borderRadius: "50%",
                    background: "#fff",
                    transition: "left 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.65rem",
                }}
            >
                {dark ? "🌙" : "☀️"}
            </span>
        </button>
    );
}

const Nav = () => {
    const { dark } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed pt-2 pb-2 top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
                ? dark
                    ? "bg-[#0f0a1e]/95 backdrop-blur-lg shadow-sm"
                    : "bg-white/95 backdrop-blur-lg shadow-sm border-gray-100"
                : "bg-transparent"
        }`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="flex items-center justify-between h-16">

                    <Link to="/" className="flex-shrink-0">
                        <img
                            src={Image.logo}
                            className="h-13 w-auto cursor-pointer hover:scale-105 transition-transform duration-300"
                            alt="Qriblik Logo"
                        />
                    </Link>

                    <div className="flex p-4 items-center gap-3">
                        <Link
                            to="/SignUp"
                            className={`hidden sm:inline-block px-5 py-2 text-sm font-semibold rounded-full border-2 border-[#8B3FDE] hover:bg-[#8B3FDE] hover:text-white hover:shadow-lg hover:shadow-[#8B3FDE]/30 hover:-translate-y-0.5 transition-all duration-300 ${dark ? "text-[#c084fc]" : "text-[#8B3FDE]"}`}
                        >
                            Sign Up
                        </Link>
                        <Link
                            to="/SignIn"
                            className="px-5 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#8B3FDE] via-[#C837AB] to-[#FF6B35] shadow-md hover:shadow-xl hover:shadow-[#C837AB]/40 hover:-translate-y-0.5 hover:scale-105 transition-all duration-300"
                        >
                            Log In
                        </Link>
                    </div>
                    <DarkModeToggle />
                </div>
            </div>
        </nav>
    );
};

export default Nav;