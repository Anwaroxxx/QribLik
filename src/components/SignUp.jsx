import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import zxcvbn from "zxcvbn";
import logo from "../assets/images/logo/our-logo.webp";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const Check = ({ ok }) => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    {ok
      ? <><circle cx="6.5" cy="6.5" r="6.5" fill="#22C55E" /><path d="M3.5 6.5L5.5 8.5L9 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></>
      : <circle cx="6.5" cy="6.5" r="6" stroke="#CBD5E1" strokeWidth="1" />}
  </svg>
);

const STRENGTH_CFG = [
  { label: "Too weak", color: "bg-red-500", text: "text-red-500" },
  { label: "Weak", color: "bg-orange-500", text: "text-orange-500" },
  { label: "Fair", color: "bg-amber-500", text: "text-amber-500" },
  { label: "Strong", color: "bg-green-500", text: "text-green-500" },
  { label: "Very strong", color: "bg-emerald-500", text: "text-emerald-500" },
];

function inputCls(touched, isValid) {
  const base = "w-full h-[52px] rounded-2xl pl-12 pr-4 text-sm font-['Sora'] outline-none border-[1.5px] bg-white/40 backdrop-blur-sm text-indigo-950 placeholder-indigo-200 transition-all duration-200 focus:ring-4";
  if (!touched) return `${base} border-violet-100 focus:border-violet-500 focus:ring-violet-100`;
  if (isValid) return `${base} border-green-400 bg-green-50/30 focus:border-green-400 focus:ring-green-100`;
  return `${base} border-red-400 bg-red-50/30 focus:border-red-400 focus:ring-red-100`;
}

export default function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);      // preview URL (blob)
  const [avatarFile, setAvatarFile] = useState(null); // raw File for submit

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (avatar) URL.revokeObjectURL(avatar); // cleanup old blob
    setAvatar(URL.createObjectURL(file));
    setAvatarFile(file);
  };

  const removeAvatar = () => {
    if (avatar) URL.revokeObjectURL(avatar);
    setAvatar(null);
    setAvatarFile(null);
  };


  const strength = password ? zxcvbn(password) : { score: 0 };
  const strengthPct = password ? (strength.score / 4) * 100 : 0;
  const strengthCfg = STRENGTH_CFG[strength.score];

  const rules = {
    length: password.length >= 8,
    number: /\d/.test(password),
    symbol: /[^a-zA-Z0-9]/.test(password),
  };

  const valid = {
    firstName: firstName.trim().length >= 2,
    lastName: lastName.trim().length >= 2,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    password: rules.length && rules.number && rules.symbol,
  };

  const blur = (k) => setTouched(t => ({ ...t, [k]: true }));
  const allValid = Object.values(valid).every(Boolean);

  const handleSubmit = async () => {
    setTouched({ firstName: true, lastName: true, email: true, password: true });
    if (!allValid) return;
    setLoading(true);

    let avatarBase64 = "https://i.pravatar.cc/150?img=5";

    if (avatarFile) {
      avatarBase64 = await new Promise((res) => {
        const reader = new FileReader();
        reader.onloadend = () => res(reader.result);
        reader.readAsDataURL(avatarFile);
      });
    }

    await new Promise(r => setTimeout(r, 900));
    localStorage.setItem("qriblikUser", JSON.stringify({
      name: `${firstName.trim()} ${lastName.trim()}`,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password,
      avatar: avatarBase64,
    }));
    setLoading(false);
    navigate("/signin");
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#faf8ff] via-[#f3f0ff] to-[#fdf4ff] font-['Sora'] relative overflow-hidden px-4 py-8">

      {/* Animated orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[8%] left-[4%] w-[420px] h-[420px] rounded-full bg-violet-400/10 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[5%] right-[5%] w-[380px] h-[380px] rounded-full bg-fuchsia-400/10 blur-3xl animate-[pulse_11s_ease-in-out_infinite_1s]" />
        <div className="absolute top-[50%] right-[25%] w-[260px] h-[260px] rounded-full bg-orange-300/10 blur-3xl animate-[pulse_14s_ease-in-out_infinite_2s]" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-[460px] bg-white/70 backdrop-blur-2xl rounded-[28px] border border-violet-100 shadow-[0_24px_80px_rgba(139,92,246,0.13)] px-9 py-10 animate-[fadeInUp_.6s_ease_both]"
        style={{ animation: "fadeInUp .55s cubic-bezier(.22,1,.36,1) both" }}>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap');
          @keyframes fadeInUp { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
          @keyframes shimmer  { 0%,100%{background-position:0% 50%;} 50%{background-position:100% 50%;} }
          @keyframes spin     { to{transform:rotate(360deg);} }
          .grad-btn { background:linear-gradient(135deg,#8B5CF6,#D946EF,#F97316); background-size:200% 200%; animation:shimmer 4s ease infinite; }
        `}</style>

        {/* Logo + title */}
        <div className="flex flex-col items-center mb-7">
          <img
            src={logo}
            alt="QribLik"
            className="h-10 w-auto mb-4 object-contain"
          />
          <h1 className="font-['DM_Serif_Display'] text-[28px] leading-tight bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent mb-1">
            Create your account
          </h1>
          <p className="text-sm text-slate-400">Join the QribLik community today</p>


        </div>

        {/* Social buttons */}
        <div className="flex gap-2.5 mb-5">
          <button className="flex-1 flex items-center justify-center gap-2.5 h-[50px] rounded-2xl border-[1.5px] border-violet-100 bg-white/70 backdrop-blur-sm text-slate-700 text-[13.5px] font-semibold hover:bg-violet-50 hover:-translate-y-px hover:shadow-md transition-all duration-200">
            <GoogleIcon /> Continue with Google
          </button>
          <button className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl border-[1.5px] border-violet-100 bg-white/70 backdrop-blur-sm text-slate-700 hover:bg-violet-50 hover:-translate-y-px hover:shadow-md transition-all duration-200">
            <AppleIcon />
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-violet-100" />
          <span className="text-xs text-indigo-200 font-semibold">or</span>
          <div className="flex-1 h-px bg-violet-100" />
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-4">









          {/* Name row */}
          <div className="flex gap-3">
            {[
              { key: "firstName", label: "FIRST NAME", val: firstName, set: setFirstName, ph: "Youssef" },
              { key: "lastName", label: "LAST NAME", val: lastName, set: setLastName, ph: "Anwar" },
            ].map(({ key, label, val, set, ph }) => (
              <div key={key} className="flex-1">
                <label className="block text-[11px] font-bold text-slate-400 mb-1.5 tracking-wider">{label}</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-[14px] text-base pointer-events-none">👤</span>
                  <input
                    className={inputCls(touched[key], valid[key])}
                    placeholder={ph}
                    value={val}
                    onChange={e => set(e.target.value)}
                    onBlur={() => blur(key)}
                  />
                </div>
                {touched[key] && !valid[key] && (
                  <p className="text-[11px] text-red-400 mt-1">At least 2 characters</p>
                )}
              </div>
            ))}
          </div>

          {/* Email */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1.5 tracking-wider">EMAIL ADDRESS</label>
            <div className="relative">
              <span className="absolute left-3.5 top-[14px] text-base pointer-events-none">✉️</span>
              <input
                className={inputCls(touched.email, valid.email)}
                type="email" placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={() => blur("email")}
              />
            </div>
            {touched.email && !valid.email && (
              <p className="text-[11px] text-red-400 mt-1">Enter a valid email address</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1.5 tracking-wider">PASSWORD</label>
            <div className="relative">
              <span className="absolute left-3.5 top-[14px] text-base pointer-events-none">🔒</span>
              <input
                className={inputCls(touched.password, valid.password)}
                type={showPw ? "text" : "password"}
                placeholder="Min 8 chars, 1 number, 1 symbol"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onBlur={() => blur("password")}
                style={{ paddingRight: 44 }}
              />
              <button
                onClick={() => setShowPw(s => !s)}
                className="absolute right-3.5 top-[14px] text-base text-slate-300 hover:text-slate-500 transition-colors"
              >{showPw ? "🙈" : "👁️"}</button>
            </div>

            {/* Strength bar */}
            {password.length > 0 && (
              <div className="mt-3">
                <div className="flex justify-between mb-1.5">
                  <span className="text-[11px] text-slate-400">Password strength</span>
                  <span className={`text-[11px] font-bold ${strengthCfg.text}`}>{strengthCfg.label}</span>
                </div>
                <div className="w-full h-1 rounded-full bg-violet-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${strengthCfg.color}`}
                    style={{ width: `${strengthPct}%` }}
                  />
                </div>
                {/* Checklist */}
                <div className="flex flex-col gap-1 mt-2.5">
                  {[
                    { label: "At least 8 characters", ok: rules.length },
                    { label: "Contains a number", ok: rules.number },
                    { label: "Contains a symbol", ok: rules.symbol },
                  ].map(({ label, ok }) => (
                    <div key={label} className={`flex items-center gap-1.5 text-[11.5px] transition-colors ${ok ? "text-green-500" : "text-slate-400"}`}>
                      <Check ok={ok} />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="grad-btn mt-6 w-full h-[54px] rounded-2xl text-white font-bold text-[15px] tracking-wide shadow-[0_8px_32px_rgba(139,92,246,0.4)] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(139,92,246,0.5)] active:translate-y-0 transition-all duration-200 disabled:opacity-80"
        >
          {loading
            ? <span className="flex items-center justify-center gap-2.5">
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full" style={{ animation: "spin .7s linear infinite" }} />
              Creating account...
            </span>
            : "Create Account →"
          }
        </button>

        {/* Terms */}
        <p className="text-[11.5px] text-slate-400 text-center mt-3.5 leading-relaxed">
          By signing up you agree to our{" "}
          <span className="text-violet-600 font-semibold cursor-pointer hover:underline">Terms</span>
          {" "}&amp;{" "}
          <span className="text-violet-600 font-semibold cursor-pointer hover:underline">Privacy Policy</span>
        </p>

        {/* Sign in */}
        <p className="text-center text-[13.5px] text-slate-500 mt-5">
          Already have an account?{" "}
          <Link to="/signin" className="text-violet-600 font-bold hover:underline">Sign in →</Link>
        </p>
      </div>
    </div>
  );
}