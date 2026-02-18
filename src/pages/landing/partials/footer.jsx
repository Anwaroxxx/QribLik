import React from "react";
import { FaTwitter, FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import { Image } from "../../../constant/images/images-activité";


export default function Footer() {
    return (
        <div className="bg-gray-900 text-white padding font-sans">

 
            <div className="px-6 md:px-20 py-16 grid md:grid-cols-4 gap-12 border-t border-white/10">

                <div>
                    <div>
                        <img src={Image.logo} className="h-30" alt="" />

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
