import { Link } from "react-router-dom";
import { FaTwitter, FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import { Image } from "../../../constant/images/images-activité";

export default function Footer() {
    return (
        <div className="bg-gray-900 text-white font-sans">
            <div className="px-6 md:px-20 py-16 grid md:grid-cols-4 gap-12 border-t border-white/10">

                <div>
                    <div>
                        <img src={Image.logo} className="h-30" alt="Logo" />
                    </div>

                    <p className="text-white/50 text-base leading-relaxed font-light mb-6 max-w-xs">
                        Building stronger communities, one connection at a time. Your neighborhood, reimagined.
                    </p>

                    <div className="flex gap-2.5">
                        <Link href="https://twitter.com" className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/6 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:-translate-y-1.5 hover:scale-105">
                            <FaTwitter className="text-white" />
                        </Link>

                        <Link href="https://linkedin.com" className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/6 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:-translate-y-1.5 hover:scale-105">
                            <FaLinkedinIn className="text-white" />
                        </Link>

                        <Link href="https://facebook.com" className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/6 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:-translate-y-1.5 hover:scale-105">
                            <FaFacebookF className="text-white" />
                        </Link>

                        <Link href="https://instagram.com" className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/6 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:-translate-y-1.5 hover:scale-105">
                            <FaInstagram className="text-white" />
                        </Link>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold mb-4">Platform</h3>
                    <ul className="space-y-2 text-white/70">
                        <li><Link href="/events" className="hover:text-white transition-colors">Sport Events</Link></li>
                        <li><Link href="/lost-found" className="hover:text-white transition-colors">Lost & Found</Link></li>
                        <li><Link href="/trade" className="hover:text-white transition-colors">Trade</Link></li>
                        <li><Link href="/swap" className="hover:text-white transition-colors">Swap</Link></li>
                        <li><Link href="/skills" className="hover:text-white transition-colors">Skills</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold mb-4">Company</h3>
                    <ul className="space-y-2 text-white/70">
                        <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                        <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                        <li><Link href="/press" className="hover:text-white transition-colors">Press Kit</Link></li>
                        <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold mb-4">Help</h3>
                    <ul className="space-y-2 text-white/70">
                        <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                        <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
                    </ul>
                </div>

            </div>
        </div>
    );
}

