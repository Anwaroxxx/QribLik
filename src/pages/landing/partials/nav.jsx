import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Image } from "../../../constant/images/images-activité";

const Nav = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "About Us", to: "/about", hoverColor: "hover:text-[#8B3FDE]" },
        { label: "Features", to: "/features", hoverColor: "hover:text-[#C837AB]" },
        { label: "Community", to: "/community", hoverColor: "hover:text-[#FF6B35]" },
    ];

    return (
        <nav
            className={`fixed pt-2 pb-2 top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled 
                    ? "bg-white/95 backdrop-blur-lg shadow-sm  border-gray-100" 
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="flex items-center justify-between h-16">
                    
                    <Link to="/" className="flex-shrink-0">
                        <img
                            src={Image.logo}
                            className="h-13 w-auto cursor-pointer hover:scale-105 transition-transform duration-300"
                            alt="Qriblik Logo"
                        />
                    </Link>

                    <ul className="hidden md:flex items-center gap-8 list-none">
                        {navLinks.map(({ label, to, hoverColor }) => (
                            <li key={to}>
                                <Link
                                    to={to}
                                    className={`relative text-sm font-medium transition-colors duration-300 
                                        ${location.pathname === to 
                                            ? "text-[#8B3FDE] font-semibold" 
                                            : "text-gray-600"
                                        } 
                                        ${hoverColor}
                                        after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] 
                                        after:bg-gradient-to-r after:from-[#8B3FDE] after:via-[#C837AB] after:to-[#FF6B35]
                                        after:w-0 hover:after:w-full after:transition-all after:duration-300`}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/SignUp"
                            className="hidden sm:inline-block px-5 py-2 text-sm font-semibold rounded-full 
                                border-2 border-[#8B3FDE] text-[#8B3FDE] 
                                hover:bg-[#8B3FDE] hover:text-white hover:shadow-lg hover:shadow-[#8B3FDE]/30 
                                hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Sign Up
                        </Link>

                        <Link
                            to="/SignIn"
                            className="px-5 py-2 text-sm font-semibold text-white rounded-full 
                                bg-gradient-to-r from-[#8B3FDE] via-[#C837AB] to-[#FF6B35] 
                                shadow-md hover:shadow-xl hover:shadow-[#C837AB]/40 
                                hover:-translate-y-0.5 hover:scale-105 
                                transition-all duration-300"
                        >
                            Log In
                        </Link>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Nav;