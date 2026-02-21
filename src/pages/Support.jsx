import React, { useState } from "react";
import { Instagram, Linkedin, Mail, MapPin, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import { Image } from "../constant/images/images-activité";
import PixelBlast from "../animations/Pixel";
import { useTheme } from "../contexts/ThemeContext";

function Support() {
  const { dark } = useTheme();
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
    };
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(() => alert("Message sent successfully "))
      .catch((error) => { console.log(error); alert("Something went wrong"); })
      .finally(() => { setName(""); setEmail(""); setCompany(""); setMessage(""); });
  };

  const inputClass = `w-full bg-transparent border-b py-3 outline-none transition-colors placeholder:text-gray-400 ${dark
      ? "border-purple-800/50 text-purple-100 focus:border-fuchsia-500 placeholder:text-purple-300/30"
      : "border-gray-400 text-white focus:border-purple-400"
    }`;

  return (
    <div
      className={`min-h-screen font-sans p-5 md:p-10 relative overflow-hidden transition-colors duration-500 ${dark ? "bg-[#0d0719] text-purple-50" : "bg-fuchsia-50 text-black"
        }`}
    >
      {/* ── Navbar ── */}
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 4000,
          height: 60,
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
          background: dark ? "rgba(13,7,25,0.92)" : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(24px)",
          borderBottom: dark
            ? "1px solid rgba(139,63,222,0.12)"
            : "1px solid rgba(139,92,246,0.1)",
          boxShadow: dark
            ? "0 2px 20px rgba(0,0,0,0.4)"
            : "0 2px 20px rgba(139,92,246,0.07)",
          overflow: "hidden",
          transition: "background 0.4s, border-color 0.4s",
        }}
      >
        {/* Pixel background */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: dark ? 0.05 : 0.08, pointerEvents: "none" }}>
          <PixelBlast
            variant="square" pixelSize={3} color="#d946ef"
            patternScale={2} patternDensity={1} pixelSizeJitter={0}
            enableRipples rippleSpeed={0.5} rippleThickness={0.1}
            rippleIntensityScale={1.2} speed={0.6} edgeFade={0.3} transparent
          />
        </div>

        {/* Logo */}
        <div style={{ position: "relative", zIndex: 1, padding: "0 20px", display: "flex", alignItems: "center" }}>
          <img
            src={Image.logo} alt="Qriblik Logo"
            style={{ width: "100px", height: "auto", cursor: "pointer", transition: "transform 0.3s ease", filter: dark ? "brightness(1.1)" : "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: 100, flex: 1, justifyContent: "center", position: "relative", zIndex: 1 }}>
          {["Home", "About", "Support"].map((label, i) => (
            <Link
              key={label}
              to={["/home", "/about", "/support"][i]}
              style={{
                padding: "6px 14px", borderRadius: 20, textDecoration: "none",
                fontSize: 13, fontWeight: 500,
                color: dark ? "rgba(196,168,255,0.6)" : "#6B7280",
                transition: "all .2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#8B5CF6";
                e.currentTarget.style.background = dark ? "rgba(139,92,246,0.15)" : "rgba(139,92,246,0.08)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = dark ? "rgba(196,168,255,0.6)" : "#6B7280";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* ── Hero Text ── */}
      <div className="text-center mb-16 mt-20 relative z-10">
        <span className={`text-sm tracking-widest uppercase ${dark ? "text-purple-300/40" : "text-gray-400"}`}>
          Our Users
        </span>
        <h1 className="text-5xl md:text-[64px] font-bold tracking-tighter p-3 leading-tight italic">
          We're Here to{" "}
          <span className="bg-gradient-to-r from-[#8B3FDE] via-[#C837AB] to-[#FF6B35] bg-clip-text text-transparent">
            Help
          </span>
        </h1>
        <p className={`text-lg ${dark ? "text-purple-300/50" : "text-gray-500"}`}>
          Questions, ideas, or feedback — let's make progress together.
        </p>
      </div>

      {/* ── Main Grid ── */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-16">

        {/* ── Left — Contact Info ── */}
        <div className="space-y-10 order-2 md:order-1">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <Mail size={20} className="text-purple-400 mt-1 shrink-0" />
              <div>
                <p className={`text-sm mb-1 ${dark ? "text-purple-300/40" : "text-gray-500"}`}>Email</p>
                <a
                  href="mailto:QribLik@gmail.com"
                  className={`text-xl transition-colors hover:text-purple-500 ${dark ? "text-purple-100" : "text-black"}`}
                >
                  QribLik@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin size={20} className="text-purple-400 mt-1 shrink-0" />
              <div>
                <p className={`text-sm mb-1 ${dark ? "text-purple-300/40" : "text-gray-500"}`}>Location</p>
                <p className={`text-xl leading-relaxed ${dark ? "text-purple-100" : "text-black"}`}>
                  45 Constellation Tower,<br />
                  Innovation Street, London, UK
                </p>
              </div>
            </div>

            <div>
              <p className={`text-sm mb-4 ${dark ? "text-purple-300/40" : "text-gray-500"}`}>Social Media</p>
              <div className="flex gap-6">
                <a
                  href="#"
                  className={`flex items-center gap-2 transition-colors font-medium hover:text-purple-500 ${dark ? "text-purple-200/60" : "text-black"}`}
                >
                  <Instagram size={20} /> @constellation.ai
                </a>
                <a
                  href="#"
                  className={`flex items-center gap-2 transition-colors font-medium hover:text-purple-500 ${dark ? "text-purple-200/60" : "text-black"}`}
                >
                  <Linkedin size={20} /> constellation
                </a>
              </div>
            </div>
          </div>

          {/* 24/7 blob */}
          <div className="relative flex justify-center items-center h-48">
            <div
              className={`w-64 h-64 rounded-full mix-blend-multiply filter blur-2xl opacity-25 absolute animate-pulse ${dark ? "bg-gradient-to-br from-purple-800 to-fuchsia-900" : "bg-gradient-to-br from-purple-600 to-blue-900"
                }`}
            />
            <div className="relative z-10 text-center">
              <p className={`text-4xl font-bold tracking-tight ${dark ? "text-purple-400/50" : "text-purple-800/40"}`}>
                24/7
              </p>
              <p className={`text-sm mt-1 ${dark ? "text-purple-300/40" : "text-gray-700"}`}>
                Support disponible
              </p>
            </div>
          </div>
        </div>

        {/* ── Right — Contact Form ── */}
        <div
          className={`order-1 md:order-2 relative w-full overflow-hidden rounded-2xl shadow-2xl border transition-colors duration-300 ${dark
              ? "border-purple-800/30 bg-[#150d27]"
              : "border-gray-300"
            }`}
        >
          {/* Dark overlay for light mode bg image */}
          {!dark && (
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-black/50" />
            </div>
          )}

          {/* Gradient overlay for dark mode */}
          {dark && (
            <div
              className="absolute inset-0 z-0 opacity-30"
              style={{ background: "linear-gradient(135deg,#8B3FDE22,#C837AB11)" }}
            />
          )}

          <div className="relative z-10 bg-white/5 backdrop-blur-md p-8 md:p-12">
            <h2
              className={`text-2xl font-semibold mb-8 ${dark ? "text-purple-50" : "text-white"
                }`}
            >
              Send us a message
            </h2>

            <form className="space-y-6" onSubmit={sendEmail}>
              <input
                type="text" placeholder="Full name"
                value={name} onChange={(e) => setName(e.target.value)} required
                className={inputClass}
              />
              <input
                type="email" placeholder="Email"
                value={email} onChange={(e) => setEmail(e.target.value)} required
                className={inputClass}
              />
              <input
                type="text" placeholder="Company (optional)"
                value={company} onChange={(e) => setCompany(e.target.value)}
                className={inputClass}
              />
              <textarea
                placeholder="Message or Inquiry" rows="4"
                value={message} onChange={(e) => setMessage(e.target.value)} required
                className={`${inputClass} resize-none`}
              />

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