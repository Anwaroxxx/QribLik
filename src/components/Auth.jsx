import { useState, useCallback, memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LiquidEther from "../animations/LiquidEther";
import logo from "../assets/images/logo/our-logo.webp";

// ── SVG Icons (no library needed) ────────────────────────────────────────────
const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const IconLock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);
const IconEye = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const IconEyeOff = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
    <line x1="2" y1="2" x2="22" y2="22"/>
  </svg>
);
const IconCheck = () => (
  <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="2,6 5,9 10,3"/>
  </svg>
);
const IconAlert = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const IconGoogle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);
const IconApple = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

// ── Memoized: typing in form inputs NEVER triggers a re-render here ────────────
const AnimatedPanel = memo(function AnimatedPanel() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <LiquidEther
        colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
        mouseForce={20} cursorSize={100} isViscous viscous={30}
        iterationsViscous={32} iterationsPoisson={32} resolution={0.5}
        isBounce={false} autoDemo autoSpeed={0.5} autoIntensity={2.2}
        takeoverDuration={0.25} autoResumeDelay={3000} autoRampDuration={0.6}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
    </div>
  );
});

// ── Overlay branding on the animation panel ───────────────────────────────────
function PanelBranding({ isSignUp, onSwitch }) {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 10,
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      padding: "2.8rem 3rem",
      background: "linear-gradient(160deg,rgba(6,1,20,0.88) 0%,rgba(6,1,20,0.36) 45%,rgba(6,1,20,0.82) 100%)",
    }}>
      {/* Logo */}
      <img src={logo} alt="QribLik" style={{ height: 36, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.93 }} />

      {/* Headline block */}
      <div>
        <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "0.63rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c084fc", margin: "0 0 1rem" }}>
          {isSignUp ? "✦  Start your journey" : "✦  Continue your journey"}
        </p>
        <h2 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "clamp(2.4rem,3.8vw,3.6rem)", fontWeight: 700, fontStyle: "italic", color: "#fff", margin: "0 0 1.2rem", lineHeight: 1.08, textShadow: "0 2px 24px rgba(0,0,0,0.4)", whiteSpace: "pre-line" }}>
          {isSignUp ? "Your neighborhood\nstarts here." : "Good to have\nyou back."}
        </h2>
        <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 400, fontSize: "0.95rem", lineHeight: 1.78, color: "rgba(255,255,255,0.78)", maxWidth: 330, margin: "0 0 2.5rem" }}>
          {isSignUp
            ? "Connect with people just blocks away. Share skills, discover events, and build something real together."
            : "Your neighborhood is alive with activity. Let's see what's happening around you today."}
        </p>
        {/* Stats */}
        <div style={{ display: "flex", gap: "2.5rem", paddingTop: "1.75rem", borderTop: "1px solid rgba(255,255,255,0.14)" }}>
          {[["5K+","Active neighbors"],["48K","Neighborhoods"],["97%","Feel connected"]].map(([val, lbl]) => (
            <div key={lbl}>
              <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontStyle: "italic", fontSize: "1.9rem", fontWeight: 700, color: "#e9d5ff", lineHeight: 1 }}>{val}</div>
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: "0.61rem", fontWeight: 600, color: "rgba(255,255,255,0.44)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 5 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom switch */}
      <div style={{ paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <p style={{ fontFamily: "'Sora',sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.52)", margin: 0 }}>
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button onClick={onSwitch} style={{ background: "none", border: "none", cursor: "pointer", color: "#c084fc", fontWeight: 700, fontSize: "0.875rem", fontFamily: "'Sora',sans-serif", padding: 0, textDecoration: "underline", textDecorationColor: "rgba(192,132,252,0.3)", textUnderlineOffset: 3, transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#e9d5ff"}
            onMouseLeave={e => e.currentTarget.style.color = "#c084fc"}>
            {isSignUp ? "Sign in →" : "Create one free →"}
          </button>
        </p>
      </div>
    </div>
  );
}

// ── Input field with icon + validation ───────────────────────────────────────
function Field({ label, labelRight, IconComp, touched, valid, error, children }) {
  return (
    <div>
      {(label || labelRight) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <label style={{ fontSize: "0.63rem", fontWeight: 700, color: touched ? (valid ? "#10b981" : "#ef4444") : "#94a3b8", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Sora',sans-serif", transition: "color 0.2s" }}>{label}</label>
          {labelRight}
        </div>
      )}
      <div style={{ position: "relative" }}>
        {IconComp && (
          <span style={{ position: "absolute", left: 15, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", zIndex: 1, lineHeight: 0, color: touched ? (valid ? "#10b981" : "#ef4444") : "#94a3b8", transition: "color 0.2s" }}>
            <IconComp />
          </span>
        )}
        {children}
      </div>
      {touched && !valid && error && (
        <p style={{ fontSize: "0.7rem", color: "#ef4444", margin: "5px 0 0", fontFamily: "'Sora',sans-serif", display: "flex", alignItems: "center", gap: 5 }}>
          <IconAlert /> {error}
        </p>
      )}
    </div>
  );
}

function mkInput(touched, valid, hasIcon = true, hasPadRight = false) {
  return {
    width: "100%", height: 50, borderRadius: 11, outline: "none",
    paddingLeft: hasIcon ? 44 : 16, paddingRight: hasPadRight ? 46 : 16,
    fontSize: "0.875rem", fontFamily: "'Sora',sans-serif",
    border: `1.5px solid ${!touched ? "#e2e8f0" : valid ? "#10b981" : "#ef4444"}`,
    background: !touched ? "#f8fafc" : valid ? "rgba(16,185,129,0.04)" : "rgba(239,68,68,0.04)",
    color: "#0f172a", transition: "all 0.2s", boxSizing: "border-box",
  };
}

// ── Google + Apple buttons ────────────────────────────────────────────────────
function SocialButtons() {
  const base = { height: 48, borderRadius: 11, border: "1.5px solid #e2e8f0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: "'Sora',sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "#0f172a", transition: "all 0.18s", boxSizing: "border-box" };
  const hover = e => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = "#c7d2e1"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.07)"; };
  const leave = e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <button style={{ ...base, width: "100%" }} onMouseEnter={hover} onMouseLeave={leave} onClick={() => alert("Google auth coming soon")}>
        <IconGoogle /> Continue with Google
      </button>
      <button style={{ ...base, width: "100%" }} onMouseEnter={hover} onMouseLeave={leave} onClick={() => alert("Apple auth coming soon")}>
        <IconApple /> Continue with Apple
      </button>
    </div>
  );
}

function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "18px 0" }}>
      <div style={{ flex: 1, height: 1, background: "#f1f5f9" }} />
      <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#cbd5e1", fontFamily: "'Sora',sans-serif", letterSpacing: "0.08em" }}>OR</span>
      <div style={{ flex: 1, height: 1, background: "#f1f5f9" }} />
    </div>
  );
}

// ── Sign In ───────────────────────────────────────────────────────────────────
function SignInForm({ onSwitch }) {
  const navigate = useNavigate();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [touched, setTouched]   = useState({});
  const [shake, setShake]       = useState(false);

  const valid = { email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), password: password.length >= 1 };
  const blur = k => setTouched(t => ({ ...t, [k]: true }));
  const triggerShake = () => { setShake(true); setTimeout(() => setShake(false), 500); };

  const handleLogin = async () => {
    setTouched({ email: true, password: true });
    if (!valid.email || !valid.password) { triggerShake(); return; }
    setLoading(true); setError("");
    await new Promise(r => setTimeout(r, 900));
    const stored = JSON.parse(localStorage.getItem("qriblikUser") || "null");
    if (!stored) { setError("No account found. Please sign up first."); setLoading(false); triggerShake(); return; }
    if (email === stored.email && password === stored.password) { navigate("/home"); }
    else { setError("Wrong email or password."); setLoading(false); triggerShake(); }
  };

  return (
    <div style={{ animation: shake ? "shake 0.45s ease" : undefined }}>
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "0.63rem", letterSpacing: "0.26em", textTransform: "uppercase", color: "#8B3FDE", marginBottom: "0.6rem" }}>Welcome back</p>
        <h1 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "clamp(1.75rem,2.5vw,2.25rem)", fontWeight: 700, fontStyle: "italic", color: "#0f172a", margin: 0, lineHeight: 1.1 }}>Sign in to QribLik</h1>
      </div>

      <SocialButtons />
      <Divider />

      {error && (
        <div style={{ background: "#fff1f2", border: "1px solid #fecdd3", borderRadius: 10, padding: "11px 15px", marginBottom: 16, color: "#e11d48", fontSize: "0.82rem", fontFamily: "'Sora',sans-serif", fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>
          <IconAlert /> {error}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Field label="Email address" IconComp={IconMail} touched={touched.email} valid={valid.email} error="Enter a valid email address">
          <input type="email" placeholder="you@example.com" value={email}
            onChange={e => { setEmail(e.target.value); setError(""); }}
            onBlur={() => blur("email")} onKeyDown={e => e.key === "Enter" && handleLogin()}
            style={mkInput(touched.email, valid.email)} />
        </Field>

        <Field label="Password"
          labelRight={<button onClick={() => alert("Coming soon")} style={{ background: "none", border: "none", cursor: "pointer", color: "#8B3FDE", fontWeight: 700, fontSize: "0.63rem", fontFamily: "'Sora',sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", padding: 0 }}>Forgot?</button>}
          IconComp={IconLock} touched={touched.password} valid={valid.password} error="Password is required">
          <input type={showPw ? "text" : "password"} placeholder="Your password" value={password}
            onChange={e => { setPassword(e.target.value); setError(""); }}
            onBlur={() => blur("password")} onKeyDown={e => e.key === "Enter" && handleLogin()}
            style={mkInput(touched.password, valid.password, true, true)} />
          <button onClick={() => setShowPw(s => !s)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 0, lineHeight: 0, transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#475569"}
            onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}>
            {showPw ? <IconEyeOff /> : <IconEye />}
          </button>
        </Field>
      </div>

      <button onClick={handleLogin} disabled={loading} className="grad-btn"
        style={{ marginTop: 22, width: "100%", height: 52, borderRadius: 12, border: "none", background: "linear-gradient(135deg,#7c3aed 0%,#c026d3 55%,#f97316 100%)", backgroundSize: "200% 200%", color: "white", fontSize: "0.9rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Sora',sans-serif", boxShadow: "0 6px 24px rgba(124,58,237,0.35)", opacity: loading ? 0.8 : 1 }}>
        {loading ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}><span className="spinner" />Signing in...</span> : "Sign In →"}
      </button>

      <p style={{ textAlign: "center", marginTop: "1.5rem", fontFamily: "'Sora',sans-serif", fontSize: "0.85rem", color: "#64748b" }}>
        Don't have an account?{" "}
        <button onClick={onSwitch} style={{ background: "none", border: "none", cursor: "pointer", color: "#8B3FDE", fontWeight: 700, fontSize: "0.85rem", fontFamily: "'Sora',sans-serif", padding: 0 }}>Create one free →</button>
      </p>
    </div>
  );
}

// ── Sign Up ───────────────────────────────────────────────────────────────────
function SignUpForm({ onSwitch }) {
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [showPw,    setShowPw]    = useState(false);
  const [touched,   setTouched]   = useState({});
  const [loading,   setLoading]   = useState(false);

  const valid = {
    firstName: firstName.trim().length >= 2,
    lastName:  lastName.trim().length >= 2,
    email:     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    password:  password.length >= 8 && /\d/.test(password) && /[^a-zA-Z0-9]/.test(password),
  };
  const blur = k => setTouched(t => ({ ...t, [k]: true }));
  const score = [password.length >= 8, /\d/.test(password), /[^a-zA-Z0-9]/.test(password), password.length >= 12].filter(Boolean).length;
  const scoreColor = ["#ef4444","#fb923c","#facc15","#22c55e"][score - 1] || "#e2e8f0";
  const scoreLabel = ["Weak","Fair","Good","Strong"][score - 1] || "";

  const handleSubmit = async () => {
    setTouched({ firstName: true, lastName: true, email: true, password: true });
    if (!Object.values(valid).every(Boolean)) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    localStorage.setItem("qriblikUser", JSON.stringify({ name: `${firstName.trim()} ${lastName.trim()}`, firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim(), password }));
    setLoading(false);
    onSwitch();
  };

  return (
    <div>
      <div style={{ marginBottom: "1.75rem" }}>
        <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "0.63rem", letterSpacing: "0.26em", textTransform: "uppercase", color: "#8B3FDE", marginBottom: "0.6rem" }}>Join the community</p>
        <h1 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "clamp(1.75rem,2.5vw,2.25rem)", fontWeight: 700, fontStyle: "italic", color: "#0f172a", margin: 0, lineHeight: 1.1 }}>Create your account</h1>
      </div>

      <SocialButtons />
      <Divider />

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", gap: 12 }}>
          {[
            { key: "firstName", label: "First name", val: firstName, set: setFirstName, ph: "" },
            { key: "lastName",  label: "Last name",  val: lastName,  set: setLastName,  ph: "" },
          ].map(({ key, label, val, set, ph }) => (
            <div key={key} style={{ flex: 1 }}>
              <Field label={label} IconComp={IconUser} touched={touched[key]} valid={valid[key]} error="Min 2 chars">
                <input placeholder={ph} value={val} onChange={e => set(e.target.value)} onBlur={() => blur(key)} style={mkInput(touched[key], valid[key])} />
              </Field>
            </div>
          ))}
        </div>

        <Field label="Email address" IconComp={IconMail} touched={touched.email} valid={valid.email} error="Enter a valid email address">
          <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} onBlur={() => blur("email")} style={mkInput(touched.email, valid.email)} />
        </Field>

        <div>
          <Field label="Password" IconComp={IconLock} touched={touched.password} valid={valid.password} error="8+ chars, 1 number and 1 symbol">
            <input type={showPw ? "text" : "password"} placeholder="Create a strong password" value={password} onChange={e => setPassword(e.target.value)} onBlur={() => blur("password")} style={mkInput(touched.password, valid.password, true, true)} />
            <button onClick={() => setShowPw(s => !s)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 0, lineHeight: 0, transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#475569"}
              onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}>
              {showPw ? <IconEyeOff /> : <IconEye />}
            </button>
          </Field>

          {password.length > 0 && (
            <div style={{ marginTop: 10 }}>
              <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
                {[0,1,2,3].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: i < score ? scoreColor : "#e2e8f0", transition: "background 0.3s" }} />)}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 14 }}>
                  {[{label:"8+ chars",ok:password.length>=8},{label:"Number",ok:/\d/.test(password)},{label:"Symbol",ok:/[^a-zA-Z0-9]/.test(password)}].map(({ label, ok }) => (
                    <span key={label} style={{ fontSize: "0.68rem", fontFamily: "'Sora',sans-serif", color: ok ? "#10b981" : "#94a3b8", display: "flex", alignItems: "center", gap: 5, transition: "color 0.2s" }}>
                      <span style={{ width: 13, height: 13, borderRadius: "50%", background: ok ? "#10b981" : "transparent", border: ok ? "none" : "1.5px solid #cbd5e1", display: "inline-flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", flexShrink: 0 }}>
                        {ok && <IconCheck />}
                      </span>
                      {label}
                    </span>
                  ))}
                </div>
                {scoreLabel && <span style={{ fontSize: "0.63rem", fontWeight: 700, color: scoreColor, fontFamily: "'Sora',sans-serif", letterSpacing: "0.12em", textTransform: "uppercase" }}>{scoreLabel}</span>}
              </div>
            </div>
          )}
        </div>
      </div>

      <button onClick={handleSubmit} disabled={loading} className="grad-btn"
        style={{ marginTop: 20, width: "100%", height: 52, borderRadius: 12, border: "none", background: "linear-gradient(135deg,#7c3aed 0%,#c026d3 55%,#f97316 100%)", backgroundSize: "200% 200%", color: "white", fontSize: "0.9rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Sora',sans-serif", boxShadow: "0 6px 24px rgba(124,58,237,0.35)", opacity: loading ? 0.8 : 1 }}>
        {loading ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}><span className="spinner" />Creating account...</span> : "Create Account →"}
      </button>

      <p style={{ fontSize: "0.7rem", color: "#94a3b8", textAlign: "center", marginTop: 10, fontFamily: "'Sora',sans-serif" }}>
        By signing up you agree to our <span style={{ color: "#8B3FDE", cursor: "pointer" }}>Terms</span> &amp; <span style={{ color: "#8B3FDE", cursor: "pointer" }}>Privacy Policy</span>
      </p>

      <p style={{ textAlign: "center", marginTop: "1.2rem", fontFamily: "'Sora',sans-serif", fontSize: "0.85rem", color: "#64748b" }}>
        Already have an account?{" "}
        <button onClick={onSwitch} style={{ background: "none", border: "none", cursor: "pointer", color: "#8B3FDE", fontWeight: 700, fontSize: "0.85rem", fontFamily: "'Sora',sans-serif", padding: 0 }}>Sign in →</button>
      </p>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function Auth() {
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(location.pathname.toLowerCase() === "/signup");
  const [animSide, setAnimSide] = useState("left");
  const [switching, setSwitching] = useState(false);

  const handleSwitch = useCallback(() => {
    if (switching) return;
    setSwitching(true);
    setTimeout(() => { setIsSignUp(s => !s); setAnimSide(s => s === "left" ? "right" : "left"); }, 400);
    setTimeout(() => setSwitching(false), 800);
  }, [switching]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes shake   { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
        @keyframes shimmer { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .grad-btn { background-size:200% 200% !important; animation:shimmer 3.5s ease infinite !important; transition:transform 0.18s,box-shadow 0.18s !important; }
        .grad-btn:hover:not(:disabled) { transform:translateY(-2px) !important; box-shadow:0 12px 32px rgba(124,58,237,0.5) !important; }
        .spinner { display:inline-block; width:17px; height:17px; border:2.5px solid rgba(255,255,255,0.28); border-top-color:white; border-radius:50%; animation:spin 0.7s linear infinite; flex-shrink:0; }
        .anim-panel { transition: left 0.82s cubic-bezier(0.86,0,0.07,1); will-change:left; }
        .form-enter { animation: fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both; }
        input:focus { border-color:#8B3FDE !important; box-shadow:0 0 0 3px rgba(139,63,222,0.1) !important; background:#fff !important; }
        @media (max-width:768px) { .anim-panel{display:none!important;} .form-side{width:100%!important;left:0!important;} }
      `}</style>

      <div style={{ minHeight: "100vh", width: "100vw", position: "relative", overflow: "hidden", background: "#0f0a1e" }}>

        {/* Left form slot */}
        <div className="form-side" style={{ position: "absolute", left: 0, top: 0, width: "50%", height: "100%", background: "#fff", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", overflowY: "auto" }}>
          {animSide === "right" && (
            <div key={isSignUp ? "su-l" : "si-l"} className="form-enter" style={{ width: "100%", maxWidth: 420, padding: "2.5rem 3.5rem" }}>
              {isSignUp ? <SignUpForm onSwitch={handleSwitch} /> : <SignInForm onSwitch={handleSwitch} />}
            </div>
          )}
        </div>

        {/* Right form slot */}
        <div className="form-side" style={{ position: "absolute", left: "50%", top: 0, width: "50%", height: "100%", background: "#fff", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", overflowY: "auto" }}>
          {animSide === "left" && (
            <div key={isSignUp ? "su-r" : "si-r"} className="form-enter" style={{ width: "100%", maxWidth: 420, padding: "2.5rem 3.5rem" }}>
              {isSignUp ? <SignUpForm onSwitch={handleSwitch} /> : <SignInForm onSwitch={handleSwitch} />}
            </div>
          )}
        </div>

        {/* Animation panel — slides left/right, memo keeps it alive through typing */}
        <div className="anim-panel" style={{ position: "absolute", left: animSide === "left" ? "0%" : "50%", top: 0, width: "50%", height: "100%", zIndex: 3 }}>
          <AnimatedPanel />
          <PanelBranding isSignUp={isSignUp} onSwitch={handleSwitch} />
        </div>

      </div>
    </>
  );
}