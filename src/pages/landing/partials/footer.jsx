import React from "react";
import { FaTwitter, FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import { logo } from "../../../constant/images/images";
import { logo } from "../../../constant/images/images-activité/main-logo.webp"


export default function Footer() {
    return (
        <div className="bg-gray-900 text-white font-sans">

            <div className="px-6 md:px-20 py-16 grid md:grid-cols-2 gap-10 items-center">
                <div>

                    <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-purple-300 bg-purple-900/20 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse"></span>
                        <span className="text-xs font-bold uppercase tracking-wide text-white/90">
                            Stay Connected
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight">
                        Join the <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">movement</span>
                    </h2>

                    <p className="text-white/60 text-base md:text-lg leading-relaxed font-light mb-6">
                        Get weekly updates on community events, new features, and local success stories.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-5 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/50 text-sm outline-none transition-all duration-200 focus:border-purple-400 focus:bg-white/8"
                        />
                        <button className="px-7 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold text-sm shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-200">
                            Subscribe
                        </button>
                    </div>
                </div>

                <div className="hidden md:flex justify-center">

                </div>
            </div>


            <div className="px-6 md:px-20 py-16 grid md:grid-cols-4 gap-12 border-t border-white/10">

                <div>
                    <div>
                        <img src={logo} className="h-30" alt="" />

                    </div>

                    <p className="text-white/50 text-base leading-relaxed font-light mb-6 max-w-xs">
                        Building stronger communities, one connection at a time. Your neighborhood, reimagined.
                    </p>

                    <div className="flex gap-2.5">
                        <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/6 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:-translate-y-1.5 hover:scale-105">
                            <FaTwitter className="text-white" />
                        </a>
                        <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/6 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:-translate-y-1.5 hover:scale-105">
                            <FaLinkedinIn className="text-white" />
                        </a>
                        <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/6 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:-translate-y-1.5 hover:scale-105">
                            <FaFacebookF className="text-white" />
                        </a>
                        <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/6 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:-translate-y-1.5 hover:scale-105">
                            <FaInstagram className="text-white" />
                        </a>
                    </div>
                </div>


                <div>
                    <h3 className="font-bold mb-4">Platform</h3>
                    <ul className="space-y-2 text-white/70">
                        <li><a href="#" className="hover:text-white transition-colors">Sport Events</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Lost & Found</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Trade</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Swap</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Skills</a></li>
                    </ul>
                </div>


                <div>
                    <h3 className="font-bold mb-4">Company</h3>
                    <ul className="space-y-2 text-white/70">
                        <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                    </ul>
                </div>


                <div>
                    <h3 className="font-bold mb-4">Help</h3>
                    <ul className="space-y-2 text-white/70">
                        <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
