// components/ProfileModal.jsx
import { useState } from "react";
import { FiX, FiMapPin } from "react-icons/fi";

export default function ProfileModal({ post, onClose }) {
  const [isFollowing, setIsFollowing] = useState(false);

  // Close when clicking the backdrop, not the card itself
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-fadeIn">

        {/* Gradient cover strip */}
        <div
          className="h-20 w-full"
          style={{ background: "linear-gradient(135deg, #8B3FDE, #C837AB)" }}
        />

        <div className="px-6 pb-6">
          {/* Avatar overlaps the cover + X button on the right */}
          <div className="flex items-end justify-between -mt-10 mb-4">
            <div className="p-[3px] rounded-full bg-white shadow-md inline-block">
              <img
                src={post.avatar}
                alt={post.author}
                className="w-16 h-16 rounded-full object-cover block"
              />
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Name */}
          <h2 className="text-lg font-bold text-gray-900 leading-tight">{post.author}</h2>

          {/* Neighborhood */}
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5 mb-3">
            <FiMapPin size={11} style={{ color: "#C837AB" }} />
            <span className="uppercase tracking-wide">{post.neighborhood}</span>
          </div>

          {/* Bio — uses post.bio if it exists, otherwise a sensible fallback */}
          <p className="text-sm text-gray-500 leading-relaxed mb-5">
            {post.bio ?? "Active community member sharing local updates and connecting neighbors."}
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setIsFollowing((v) => !v)}
              className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
              style={
                isFollowing
                  ? { background: "#f3f4f6", color: "#374151" }
                  : { background: "linear-gradient(135deg, #8B3FDE, #C837AB)", color: "#fff" }
              }
            >
              {isFollowing ? "Following" : "Follow"}
            </button>

            <button className="flex-1 py-2 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
              Message
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
        .animate-fadeIn { animation: fadeIn 0.18s ease-out both; }
      `}</style>
    </div>
  );
}