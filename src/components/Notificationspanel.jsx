import { useEffect, useRef } from "react";
import { FiX, FiBell, FiCheck } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    category: "SPORT",
    message: "Match dyal football ghadi ybda f 5 pm",
    user: { name: "Youssef Benali", neighborhood: "Maarif", time: "2m ago" },
    avatar: "https://i.pravatar.cc/40?img=12",
    read: false,
  },
  {
    id: 2,
    category: "LOST AND FOUND",
    message: "Found keys near cafe central — are these yours?",
    user: { name: "Sara Idrissi", neighborhood: "Gauthier", time: "15m ago" },
    avatar: "https://i.pravatar.cc/40?img=47",
    read: false,
  },
  {
    id: 3,
    category: "SWAP SKILLS",
    message: "Swap painting lessons for French tutoring — interested!",
    user: { name: "Karim Tazi", neighborhood: "Anfa", time: "1h ago" },
    avatar: "https://i.pravatar.cc/40?img=33",
    read: false,
  },
  {
    id: 4,
    category: "EVENTS",
    message: "Workshop on photography this weekend — join us!",
    user: { name: "Nadia Chraibi", neighborhood: "Racine", time: "3h ago" },
    avatar: "https://i.pravatar.cc/40?img=9",
    read: true,
  },
  {
    id: 5,
    category: "TRADING",
    message: "Trading a laptop for a gaming console — DM me!",
    user: { name: "Omar Filali", neighborhood: "Hay Hassani", time: "5h ago" },
    avatar: "https://i.pravatar.cc/40?img=22",
    read: true,
  },
];

const categoryColors = {
  SPORT: { bg: "rgba(139,63,222,0.12)", color: "#8B3FDE" },
  TRADING: { bg: "rgba(200,55,171,0.12)", color: "#C837AB" },
  "LOST AND FOUND": { bg: "rgba(255,107,53,0.12)", color: "#FF6B35" },
  "SWAP SKILLS": { bg: "rgba(139,63,222,0.12)", color: "#8B3FDE" },
  EVENTS: { bg: "rgba(200,55,171,0.12)", color: "#C837AB" },
};

export default function NotificationsPanel({ onClose }) {
  const { dark } = useTheme();
  const panelRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <>
      {/* Backdrop — subtle on mobile */}
      <div
        className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px] md:bg-transparent md:backdrop-blur-none"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`fixed z-50 flex flex-col
          right-4 top-[64px] w-[340px] max-h-[520px]
          rounded-2xl border shadow-2xl overflow-hidden
          animate-[slideDown_.2s_ease-out]
          transition-colors duration-300
          ${dark
            ? "bg-[#1a0a2e] border-white/8 shadow-[0_16px_48px_rgba(0,0,0,0.6)]"
            : "bg-white border-gray-100 shadow-[0_16px_48px_rgba(139,63,222,0.12)]"
          }`}
      >
        {/* ── Header ── */}
        <div
          className={`flex items-center justify-between px-5 py-4 border-b shrink-0 ${dark ? "border-white/6" : "border-gray-100"
            }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#8B3FDE,#C837AB)" }}
            >
              <FiBell size={15} className="text-white" />
            </div>
            <div>
              <h3
                className={`text-sm font-bold leading-tight ${dark ? "text-purple-50" : "text-gray-900"
                  }`}
              >
                Notifications
              </h3>
              {unreadCount > 0 && (
                <p
                  className={`text-[10px] ${dark ? "text-purple-300/50" : "text-gray-400"
                    }`}
                >
                  {unreadCount} unread
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Mark all read */}
            <button
              className={`p-1.5 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-colors ${dark
                  ? "text-purple-300/50 hover:text-fuchsia-400 hover:bg-white/5"
                  : "text-gray-400 hover:text-fuchsia-500 hover:bg-fuchsia-50"
                }`}
            >
              <FiCheck size={12} />
              <span className="hidden sm:inline">Mark all read</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg transition-colors ${dark
                  ? "text-purple-300/40 hover:text-purple-200 hover:bg-white/8"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                }`}
            >
              <FiX size={15} />
            </button>
          </div>
        </div>

        {/* ── Notification List ── */}
        <div className="flex-1 overflow-y-auto">
          {MOCK_NOTIFICATIONS.map((notif, i) => {
            const cat = categoryColors[notif.category] || categoryColors["SPORT"];
            return (
              <div key={notif.id}>
                <div
                  className={`flex items-start gap-3 px-5 py-4 cursor-pointer transition-colors duration-150 ${!notif.read
                      ? dark
                        ? "bg-fuchsia-900/10 hover:bg-fuchsia-900/20"
                        : "bg-fuchsia-50/50 hover:bg-fuchsia-50"
                      : dark
                        ? "hover:bg-white/4"
                        : "hover:bg-gray-50"
                    }`}
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div
                      className="p-[2px] rounded-full"
                      style={{
                        background: "linear-gradient(135deg,#8B3FDE,#C837AB,#FF6B35)",
                      }}
                    >
                      <img
                        src={notif.avatar}
                        alt={notif.user.name}
                        className="w-9 h-9 rounded-full object-cover block"
                      />
                    </div>
                    {/* Unread dot */}
                    {!notif.read && (
                      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-fuchsia-500 rounded-full ring-2 ring-[#1a0a2e]" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {/* Category pill */}
                      <span
                        className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                        style={{ background: cat.bg, color: cat.color }}
                      >
                        {notif.category}
                      </span>
                      <span
                        className={`text-[10px] ml-auto shrink-0 ${dark ? "text-purple-300/30" : "text-gray-400"
                          }`}
                      >
                        {notif.user.time}
                      </span>
                    </div>

                    <p
                      className={`text-xs font-semibold mb-0.5 ${dark ? "text-purple-50" : "text-gray-800"
                        }`}
                    >
                      {notif.user.name}
                      <span
                        className={`font-normal ml-1 ${dark ? "text-purple-300/40" : "text-gray-400"
                          }`}
                      >
                        · {notif.user.neighborhood}
                      </span>
                    </p>
                    <p
                      className={`text-xs leading-relaxed line-clamp-2 ${dark ? "text-purple-200/60" : "text-gray-500"
                        }`}
                    >
                      {notif.message}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                {i < MOCK_NOTIFICATIONS.length - 1 && (
                  <div
                    className={`mx-5 h-[1px] ${dark ? "bg-white/4" : "bg-gray-100"
                      }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* ── Footer ── */}
        <div
          className={`px-5 py-3 border-t shrink-0 ${dark ? "border-white/6" : "border-gray-100"
            }`}
        >
          <button
            className={`w-full text-xs font-bold py-2 rounded-xl transition-colors ${dark
                ? "text-fuchsia-400 hover:bg-fuchsia-900/20"
                : "text-fuchsia-600 hover:bg-fuchsia-50"
              }`}
          >
            View all notifications
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </>
  );
}