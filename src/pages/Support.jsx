import { Instagram, Linkedin } from 'lucide-react'; // Khassk t-installi lucide-react

function Support() {
    return (
        <div className="min-h-screen bg-[#050515] text-white font-sans p-8 md:p-16 relative overflow-hidden">
            {/* Background Gradient Effect */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full"></div>

            {/* Header Section */}
            <div className="text-center mb-16 relative z-10">
                <div className="flex justify-center items-center gap-2 mb-4">
                    {/* <div className="w-3 h-3 bg-yellow-400 rotate-45"></div> */}
                    <span className="text-gray-400 text-sm tracking-widest uppercase">Our Users</span>
                </div>
                <h1 className="text-5xl md:text-[64px] font-bold tracking-tighter leading-tight text-white italic">
                    We're Here to Help
                </h1>
                <p className="text-gray-400 text-lg">
                    Questions, ideas, or feedback—let's make progress together.
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-2  items-center">

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
                    {/* <div className="relative flex justify-center">
                        <div className="w-80 h-80 bg-gradient-to-br from-purple-600 to-blue-900 rounded-full mix-blend-screen filter blur-xl opacity-30 absolute animate-pulse"></div>
                        
                    </div> */}
                </div>

                {/* Right Side: Contact Form (Glassmorphism) */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 order-1 md:order-2">

                    <form className="space-y-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Full name"
                                className="w-full bg-transparent border-b border-gray-700 py-3 focus:border-purple-500 outline-none transition-colors"
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-transparent border-b border-gray-700 py-3 focus:border-purple-500 outline-none transition-colors"
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Company"
                                className="w-full bg-transparent border-b border-gray-700 py-3 focus:border-purple-500 outline-none transition-colors"
                            />
                        </div>
                        <div className="relative">
                            <textarea
                                placeholder="Message or Inquiry"
                                rows="4"
                                className="w-full bg-transparent border-b border-gray-700 py-3 focus:border-purple-500 outline-none transition-colors resize-none"
                            ></textarea>
                        </div>
                        <button className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-all mt-4">
                            Submit
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Support;