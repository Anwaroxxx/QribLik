import React from 'react';
import { Instagram, Linkedin } from 'lucide-react'; // Khassk t-installi lucide-react

function Support() {
    return (
        <div className="min-h-screen bg-fuchsia-50 text-black font-sans  md:p-5 relative overflow-hidden">
            {/* Background Gradient Effect */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full"></div>

            {/* Header Section */}
            <div className="text-center mb-16 relative z-10">
                <div className="flex justify-center items-center gap-2 ">
                    {/* <div className="w-3 h-3 bg-yellow-400 rotate-45"></div> */}
                    <span className="text-gray-400 text-sm tracking-widest uppercase">Our Users</span>
                </div>
                <h1 className="text-5xl md:text-[64px] font-bold tracking-tighter p-3 leading-tight text italic">
                    We're Here to Help
                </h1>
                <p className="text-gray-400 text-lg">
                    Questions, ideas, or feedback—let's make progress together.
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid md:grid-cols-2  items-center gap-x-80">
            
                {/* Left Side: Contact Info & Abstract Image */}
                <div className="space-y-12 order-2 md:order-1">
                    <div className="space-y-8">
                        <div>
                            <p className="text-gray-500 text-sm mb-1">Email</p>
                            <p className="text-xl hover:text-purple-400 transition-colors cursor-pointer">QribLik@gmail.com</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm mb-1">Location</p>
                            <p className="text-xl">45 Constellation Tower,<br />Innovation Street, London, UK</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm mb-4">Social Media</p>
                            <div className="flex gap-6">
                                <a href="#" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                                    <Instagram size={20} /> @constellation.ai
                                </a>
                                <a href="#" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                                    <Linkedin size={20} /> constellation
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Abstract 3D Image Placeholder */}
                    <div className="relative flex justify-center">
                        <div className="w-80 h-80 bg-gradient-to-br from-purple-600 to-blue-900 rounded-full mix-blend-screen filter blur-xl opacity-30 absolute animate-pulse"></div>

                    </div>
                </div>

                {/* Right Side: Contact Form (Glassmorphism) */}
                

                    {/* Container dyal l-form m3a Background Image */}
                    <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border-2 border-gray-400 shadow-2xl">

                        {/* L-image li f-l-khalfiya dyal l-form */}
                        <div
                            className="absolute inset-0 z-0 bg-cover bg-center"
                            style={{
                                backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop')", // tqder tbdal had l-url b-tswira dyalk
                            }}
                        >
                            {/* Overlay bach t-ghmeq tswira chwiya w t-ban l-ketba */}
                            <div className="absolute inset-0 bg-black/40"></div>
                        </div>

                        {/* L-content dyal l-form (Transparent & Blur) */}
                        <div className="relative z-10 bg-white/5 backdrop-blur-md p-8 md:p-12">
                            <form className="space-y-6">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Full name"
                                        className="w-full bg-transparent border-b border-gray-400 py-3 text-white focus:border-purple-500 outline-none transition-colors placeholder:text-gray-300"
                                    />
                                </div>

                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full bg-transparent border-b border-gray-400 py-3 text-white focus:border-purple-500 outline-none transition-colors placeholder:text-gray-300"
                                    />
                                </div>

                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Company"
                                        className="w-full bg-transparent border-b border-gray-400 py-3 text-white focus:border-purple-500 outline-none transition-colors placeholder:text-gray-300"
                                    />
                                </div>

                                <div className="relative">
                                    <textarea
                                        placeholder="Message or Inquiry"
                                        rows="4"
                                        className="w-full bg-transparent border-b border-gray-400 py-3 text-white focus:border-purple-500 outline-none transition-colors resize-none placeholder:text-gray-300"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold py-4 rounded-lg hover:opacity-90 transition-all mt-4"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>

                

            </div>
        </div>
    );
}

export default Support;