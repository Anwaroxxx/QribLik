import { useState } from "react";
import { FaTwitter, FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";

import { Image } from "../constant/images/images-activité";
import Modal from "./Modal";

export default function Footer() {

    const [modalOpen, setModalOpen] = useState(false);

    

    return (
        <div className="bg-gray-900 text-white  font-sans">

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

            <div className="px-6 md:px-20 py-16 grid md:grid-cols-4 gap-12">
                <div>
                    <img src={Image.logo} className="h-12 mb-4" alt="Logo" />
                    <p className="text-white/50 text-base leading-relaxed font-light mb-6 max-w-xs">
                        Building stronger communities, one connection at a time. Your neighborhood, reimagined.
                    </p>
                    <div className="flex gap-2.5">
                        {[
                            { icon: <FaTwitter />, href: "https://twitter.com" },
                            { icon: <FaLinkedinIn />, href: "https://linkedin.com" },
                            { icon: <FaFacebookF />, href: "https://facebook.com" },
                            { icon: <FaInstagram />, href: "https://instagram.com" },
                        ].map((s, i) => (
                            <a key={i} href={s.href} target="_blank" rel="noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:-translate-y-1.5 hover:scale-105">
                                <span className="text-white">{s.icon}</span>
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-bold mb-4">Platform</h3>
                    <ul className="space-y-2 text-white/70">
                        {["Sport Events", "Lost & Found", "Trade", "Swap", "Skills"].map((item) => (
                            <li key={item}>
                                <button  className="hover:text-white transition-colors text-left">
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold mb-4">Company</h3>
                    <ul className="space-y-2 text-white/70">
                        {["About Us", "Blog", "Careers", "Press Kit", "Support"].map((item) => (
                            <li key={item}>
                                <button className="hover:text-white transition-colors text-left">
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold mb-4">Help</h3>
                    <ul className="space-y-2 text-white/70">
                        {["Help Center", "Contact", "Privacy", "Terms of Use"].map((item) => (
                            <li key={item}>
                                <button className="hover:text-white transition-colors text-left">
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

            <div className="border-t border-white/10 px-6 md:px-20 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-white/40 text-sm">© 2025 Qriblik. All rights reserved.</p>
                <div className="h-1 w-32 rounded-full"
                    style={{ background: "linear-gradient(135deg, #8B3FDE 0%, #C837AB 50%, #FF6B35 100%)" }}
                />
            </div>

        </div>
    );
}