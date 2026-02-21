import React ,{ useState } from 'react';
import { Instagram, Linkedin, Mail, MapPin, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
function Support() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [message, setMessage] = useState("");

    const sendEmail = (e) => {
        e.preventDefault();

        const serviceId = "service_e657q7g";
        const templateId = "template_62dx7cv";
        const publicKey = "zo4JjjzJbqU2m5Itv";

        const templateParams = {
            form_name: name,
            form_email: email,
            form_company: company,
            message: message,
        }

        emailjs
            .send(serviceId, templateId, templateParams, publicKey)
            .then(() => {
                alert("Message sent successfully ");
            })
            .catch((error) => {
                console.log(error);
                alert("Something went wrong");
            })
            .finally(() => {
                setName("");
                setEmail("");
                setCompany("");
                setMessage("");
            })
    }

    return (
        <div className="min-h-screen bg-fuchsia-50 text-black font-sans p-5 md:p-10 relative overflow-hidden">

            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-400/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="text-center mb-16 relative z-10">
                <span className="text-gray-400 text-sm tracking-widest uppercase">Our Users</span>

                <h1 className="text-5xl md:text-[64px] font-bold tracking-tighter p-3 leading-tight italic tracking-wide">
                    We're  Here to {" "}
                     <span className="bg-gradient-to-r  from-[#8B3FDE] via-[#C837AB] to-[#FF6B35] bg-clip-text text-transparent">
                                Help
                            </span>
                </h1>
                <p className="text-gray-500 text-lg">
                    Questions, ideas, or feedback — let's make progress together.
                </p>
                
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-42">

                <div className="space-y-10 order-2 md:order-1">

                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <Mail size={20} className="text-purple-400 mt-1 shrink-0" />
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Email</p>
                                <a href="mailto:QribLik@gmail.com" className="text-xl hover:text-purple-500 transition-colors">
                                    QribLik@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <MapPin size={20} className="text-purple-400 mt-1 shrink-0" />
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Location</p>
                                <p className="text-xl leading-relaxed">
                                    45 Constellation Tower,<br />
                                    Innovation Street, London, UK
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm mb-4">Social Media</p>
                            <div className="flex gap-6">
                                <a href="#" className="flex items-center gap-2 hover:text-purple-500 transition-colors font-medium">
                                    <Instagram size={20} /> @constellation.ai
                                </a>
                                <a href="#" className="flex items-center gap-2 hover:text-purple-500 transition-colors font-medium">
                                    <Linkedin size={20} /> constellation
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex justify-center items-center h-48">
                        <div className="w-64 h-64 bg-gradient-to-br from-purple-600 to-blue-900 rounded-full mix-blend-multiply filter blur-2xl opacity-25 absolute animate-pulse"></div>
                        <div className="relative z-10 text-center">
                            <p className="text-4xl font-bold text-purple-800/40 tracking-tight">24/7</p>
                            <p className="text-gray-700 text-sm mt-1">Support disponible</p>
                        </div>
                    </div>
                </div>

              
                <div className="order-1 md:order-2 relative w-full overflow-hidden rounded-2xl border border-gray-300 shadow-2xl">

                    {/* Background Image avec Overlay */}
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center"
                        // style={{
                        //     backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop')",
                        // }}
                    >
                        <div className="absolute inset-0 bg-black/50"></div>
                    </div>

                    {/* Form Content */}
                    <div className="relative z-10 bg-white/5 backdrop-blur-md p-8 md:p-12">
                        <h2 className="text-white text-2xl font-semibold mb-8">Send us a message</h2>

                        <form className="space-y-6" onSubmit={sendEmail}>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Full name"
                                    value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                    className="w-full bg-transparent border-b border-gray-400 py-3 text-white focus:border-purple-400 outline-none transition-colors placeholder:text-gray-400"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                    className="w-full bg-transparent border-b border-gray-400 py-3 text-white focus:border-purple-400 outline-none transition-colors placeholder:text-gray-400"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Company (optional)"
                                     value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    className="w-full bg-transparent border-b border-gray-400 py-3 text-white focus:border-purple-400 outline-none transition-colors placeholder:text-gray-400"
                                />
                            </div>
                            <div>
                                <textarea
                                    placeholder="Message or Inquiry"
                                    rows="4"
                                    value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required

                                    className="w-full bg-transparent border-b border-gray-400 py-3 text-white focus:border-purple-400 outline-none transition-colors resize-none placeholder:text-gray-400"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold py-4 rounded-lg hover:opacity-90 active:scale-95 transition-all mt-4"
                            >
                                <Send size={18} />
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