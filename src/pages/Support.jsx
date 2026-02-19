import React, { useState } from 'react';
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
    const publicKey = "ybf8AyCXChqT6KH3l";

    const templateParams = {
      form_name: name,
      form_email: email,
      form_company: company,
      message: message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        alert("Message sent successfully ✅");
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong ❌");
      })
      .finally(() => {
        setName("");
        setEmail("");
        setCompany("");
        setMessage("");
      });
  };

  return (
    <div className="min-h-screen bg-fuchsia-50 text-black font-sans p-5 md:p-10 relative overflow-hidden">

      <div className="text-center mb-16 relative z-10">
        <h1 className="text-5xl md:text-[64px] font-bold tracking-tighter p-3 leading-tight italic">
          We're Here to
          <span className="bg-gradient-to-r from-[#8B3FDE] via-[#C837AB] to-[#FF6B35] bg-clip-text text-transparent">
            Help
          </span>
        </h1>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-20">

        {/* FORM SECTION */}
        <div className="relative w-full overflow-hidden rounded-2xl border border-gray-300 shadow-2xl">

          <div className="relative z-10 bg-black p-8 md:p-12">
            <h2 className="text-white text-2xl font-semibold mb-8">
              Send us a message
            </h2>

            <form className="space-y-6" onSubmit={sendEmail}>

              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-transparent border-b border-gray-400 py-3 text-white focus:border-purple-400 outline-none placeholder:text-gray-400"
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border-b border-gray-400 py-3 text-white focus:border-purple-400 outline-none placeholder:text-gray-400"
              />

              <input
                type="text"
                placeholder="Company (optional)"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-transparent border-b border-gray-400 py-3 text-white focus:border-purple-400 outline-none placeholder:text-gray-400"
              />

              <textarea
                placeholder="Message or Inquiry"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full bg-transparent border-b border-gray-400 py-3 text-white focus:border-purple-400 outline-none resize-none placeholder:text-gray-400"
              ></textarea>

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
