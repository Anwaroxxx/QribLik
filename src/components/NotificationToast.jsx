import { useState } from "react";
import { usersImages } from "../constant/images/images-users";
import { useTheme } from "../contexts/ThemeContext";

/**
 * NotificationToast
 *
 * Props:
 *  - notification : { user, category, message } | null
 *  - onDismiss    : () => void
 *  - progress     : number  (0-100)
 */
export default function NotificationToast({ notification, onDismiss, progress }) {
    const { dark } = useTheme();
    const [visible, setVisible] = useState(true);

    if (!notification) return null;

    const handleDismiss = () => {
        setVisible(false);
        setTimeout(() => onDismiss?.(), 300);
    };

    return (
        <div
            className={`fixed bottom-20 right-4 z-50 rounded-2xl shadow-xl p-4 w-72 border
        transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        ${dark
                    ? "bg-[#1a0a2e] border-purple-800/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                    : "bg-white border-slate-100 shadow-[0_8px_32px_rgba(139,63,222,0.10)]"
                }`}
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
                <span
                    className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${dark
                            ? "bg-fuchsia-500/15 text-fuchsia-400 border border-fuchsia-500/25"
                            : "bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-200"
                        }`}
                >
                    {notification.category}
                </span>
                <button
                    onClick={handleDismiss}
                    className={`text-base leading-none transition-colors ${dark
                            ? "text-purple-300/40 hover:text-purple-200"
                            : "text-slate-300 hover:text-slate-500"
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
                    <img
                        src={usersImages[notification.user.avatar]}
                        alt={notification.user.name}
                        className="w-9 h-9 rounded-full object-cover block"
                    />
                </div>
                <div>
                    <p
                        className={`text-sm font-semibold leading-tight ${dark ? "text-purple-50" : "text-slate-800"
                            }`}
                    >
                        {notification.user.name}
                    </p>
                    <p
                        className={`text-xs mt-0.5 ${dark ? "text-purple-300/40" : "text-slate-400"
                            }`}
                    >
                        {notification.user.neighborhood} • {notification.user.city}
                    </p>
                </div>
            </div>

            {/* ── Message ── */}
            <p
                className={`text-sm leading-relaxed mb-4 ${dark ? "text-purple-200/60" : "text-slate-600"
                    }`}
            >
                {notification.message}
            </p>

            {/* ── Actions ── */}
            <div className="flex gap-2">
                <button
                    onClick={handleDismiss}
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-500
            text-white text-xs font-bold hover:opacity-90 transition shadow-sm"
                >
                    Accept
                </button>
                <button
                    onClick={handleDismiss}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${dark
                            ? "bg-white/8 text-purple-300 hover:bg-white/12 border border-white/6"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                >
                    Decline
                </button>
            </div>
        </div>
    );
}