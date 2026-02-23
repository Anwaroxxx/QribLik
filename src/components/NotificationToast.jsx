import { useState, useEffect, useRef } from "react";
import { usersImages } from "../constant/images/images-users";
import { useTheme } from "../contexts/ThemeContext";

/**
 * NotificationToast
 *
 * Props:
 *  - notification : { user, category, message } | null
 *  - onDismiss    : () => void
 *  - progress     : number  (0–100)
 *  - onConnect    : (user) => void  ← opens Modale3 pre-loaded with this user
 *
 * Anti-spam: renders at most once every MIN_INTERVAL_MS.
 */

const MIN_INTERVAL_MS = 18_000; // at least 18 s between toasts

export default function NotificationToast({ notification, onDismiss, progress, onConnect }) {
  const { dark } = useTheme();
  const [visible, setVisible] = useState(false);
  const [shown,   setShown]   = useState(null);
  const lastShownAt = useRef(0);

  // Gate: only show if enough time has passed since last toast
  useEffect(() => {
    if (!notification) return;
    if (shown && shown.user?.name === notification.user?.name && shown.message === notification.message) return;

    const now     = Date.now();
    const elapsed = now - lastShownAt.current;
    if (elapsed < MIN_INTERVAL_MS) return; // too soon — skip silently

    lastShownAt.current = now;
    setShown(notification);
    setVisible(true);
  }, [notification]);

  // Auto-hide when progress bar empties
  useEffect(() => {
    if (progress <= 0 && visible) {
      setVisible(false);
      setTimeout(() => { setShown(null); onDismiss?.(); }, 300);
    }
  }, [progress]);

  if (!shown) return null;

  function handleDismiss() {
    setVisible(false);
    setTimeout(() => { setShown(null); onDismiss?.(); }, 300);
  }

  /**
   * Connect: dismiss the toast and open Modale3 for the user.
   * We pass the full user object up to the parent (Sidebar) which
   * renders <Modale3 initialUser={user} />.
   */
  function handleConnect() {
    onConnect?.(shown.user);
    // Don't call handleDismiss here — parent will clear notification state
  }

  // Resolve avatar — supports both a direct URL and a key into usersImages map
  function resolveAvatar(user) {
    if (!user) return null;
    if (user.avatar?.startsWith("http") || user.avatar?.startsWith("data:")) {
      return user.avatar;
    }
    return usersImages?.[user.avatar] ?? null;
  }

  const avatar = resolveAvatar(shown.user);

  return (
    <div
      className={`
        fixed bottom-20 right-4 z-[9998] rounded-2xl shadow-xl p-4 w-72 border
        transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
        ${dark
          ? "bg-[#1a0a2e] border-purple-800/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          : "bg-white border-slate-100 shadow-[0_8px_32px_rgba(139,63,222,0.10)]"
        }
      `}
    >
      {/* ── Progress bar ── */}
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-fuchsia-500 to-rose-400 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ── Category pill + close ── */}
      <div className="flex items-center justify-between mb-3 mt-0.5">
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
          dark
            ? "bg-fuchsia-500/15 text-fuchsia-400 border border-fuchsia-500/25"
            : "bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-200"
        }`}>
          {shown.category}
        </span>
        <button
          onClick={handleDismiss}
          className={`text-base leading-none transition-colors ${
            dark ? "text-purple-300/40 hover:text-purple-200" : "text-slate-300 hover:text-slate-500"
          }`}
        >
          ✕
        </button>
      </div>

      {/* ── User row ── */}
      <div className="flex items-center gap-3 mb-2">
        <div
          className="p-[2px] rounded-full flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#8B3FDE,#C837AB,#FF6B35)" }}
        >
          {avatar ? (
            <img
              src={avatar}
              alt={shown.user.name}
              className="w-9 h-9 rounded-full object-cover block"
            />
          ) : (
            // Fallback: silhouette SVG inline
            <div className="w-9 h-9 rounded-full overflow-hidden">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <rect width="100" height="100" fill="#808080"/>
                <circle cx="50" cy="35" r="22" fill="#333"/>
                <ellipse cx="50" cy="95" rx="35" ry="28" fill="#333"/>
              </svg>
            </div>
          )}
        </div>
        <div>
          <p className={`text-sm font-semibold leading-tight ${dark ? "text-purple-50" : "text-slate-800"}`}>
            {shown.user.name}
          </p>
          <p className={`text-xs mt-0.5 ${dark ? "text-purple-300/40" : "text-slate-400"}`}>
            {shown.user.neighborhood} • {shown.user.city}
          </p>
        </div>
      </div>

      {/* ── Message ── */}
      <p className={`text-sm leading-relaxed mb-4 ${dark ? "text-purple-200/60" : "text-slate-600"}`}>
        {shown.message}
      </p>

      {/* ── Actions ── */}
      <div className="flex gap-2">
        {/* Connect → opens message inbox pre-loaded with this neighbor */}
        <button
          onClick={handleConnect}
          className="flex-1 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-500
            text-white text-xs font-bold hover:opacity-90 transition shadow-sm active:scale-95"
        >
          Connect
        </button>
        <button
          onClick={handleDismiss}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
            dark
              ? "bg-white/8 text-purple-300 hover:bg-white/12 border border-white/6"
              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
          }`}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}