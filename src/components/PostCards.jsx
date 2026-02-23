// components/PostCard.jsx
import { useState } from "react";
import {
  FiHeart, FiMessageCircle, FiShare2, FiClock,
  FiMapPin, FiMoreHorizontal, FiEdit3, FiTrash2,
} from "react-icons/fi";
import ProfileModal from "./ProfileModal";
import { useTheme } from "../contexts/ThemeContext"; // ← FIX: import dark mode

const categoryStyles = {
  SPORT:            { bg: "rgba(139,63,222,0.08)", color: "#8B3FDE", border: "rgba(139,63,222,0.25)" },
  TRADING:          { bg: "rgba(200,55,171,0.08)", color: "#C837AB", border: "rgba(200,55,171,0.25)" },
  "LOST AND FOUND": { bg: "rgba(255,107,53,0.08)", color: "#FF6B35", border: "rgba(255,107,53,0.25)" },
  "SWAP SKILLS":    { bg: "rgba(139,63,222,0.08)", color: "#8B3FDE", border: "rgba(139,63,222,0.25)" },
  EVENTS:           { bg: "rgba(200,55,171,0.08)", color: "#C837AB", border: "rgba(200,55,171,0.25)" },
  FOOD:             { bg: "rgba(255,107,53,0.08)", color: "#FF6B35", border: "rgba(255,107,53,0.25)" },
  MUSIC:            { bg: "rgba(200,55,171,0.08)", color: "#C837AB", border: "rgba(200,55,171,0.25)" },
  GARDENING:        { bg: "rgba(139,63,222,0.08)", color: "#8B3FDE", border: "rgba(139,63,222,0.25)" },
  "TECH HELP":      { bg: "rgba(255,107,53,0.08)", color: "#FF6B35", border: "rgba(255,107,53,0.25)" },
  CHILDCARE:        { bg: "rgba(139,63,222,0.08)", color: "#8B3FDE", border: "rgba(139,63,222,0.25)" },
};
const defaultBadge = { bg: "rgba(139,63,222,0.08)", color: "#8B3FDE", border: "rgba(139,63,222,0.25)" };

const ME = "Alex Neighbor";

export default function PostCard({ post, onEdit, onDelete }) {
  const { dark } = useTheme(); // ← THE FIX — was missing before

  const { author, neighborhood, avatar, timeAgo, category, title, description, likes, comments, image } = post;
  const badge   = categoryStyles[category] || defaultBadge;
  const isMyPost = author === ME;

  const [liked,       setLiked]       = useState(false);
  const [likeCount,   setLikeCount]   = useState(likes);
  const [showMenu,    setShowMenu]     = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  function handleLike() {
    setLiked(v => !v);
    setLikeCount(v => liked ? v - 1 : v + 1);
  }

  return (
    <>
      {/* ── DARK MODE FIX: replaced hardcoded bg-white with conditional ── */}
      <div className={`w-full rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col gap-4 relative ${
        dark
          ? "bg-[#1a0a2e] border-white/8 hover:shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
          : "bg-white border-gray-100"
      }`}>

        {/* Top Row */}
        <div className="flex items-center justify-between">
          {/* Clickable author */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setShowProfile(true)}>
            <div className="p-[2px] rounded-full" style={{ background: "var(--gradient-qriblik)" }}>
              <img src={avatar} alt={author}
                className="w-9 h-9 rounded-full object-cover block group-hover:opacity-90 transition-opacity" />
            </div>
            <div>
              <p className={`font-semibold text-sm group-hover:text-[#8B3FDE] transition-colors ${
                dark ? "text-purple-100" : "text-gray-800"
              }`}>{author}</p>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <FiMapPin size={11} style={{ color: "#C837AB" }} />
                <span className="uppercase tracking-wide">{neighborhood}</span>
              </div>
            </div>
          </div>

          {/* Time + menu */}
          <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
            <div className={`flex items-center gap-1 text-xs ${dark ? "text-purple-300/40" : "text-gray-400"}`}>
              <FiClock size={12} />
              <span className="uppercase tracking-wide">{timeAgo}</span>
            </div>
            {isMyPost && (
              <div className="relative">
                <button onClick={() => setShowMenu(v => !v)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    dark ? "text-purple-300/40 hover:text-purple-100 hover:bg-white/8" : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                  }`}>
                  <FiMoreHorizontal size={16} />
                </button>
                {showMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                    <div className={`absolute right-0 top-8 z-20 rounded-2xl shadow-xl border overflow-hidden w-40 ${
                      dark ? "bg-[#1a0a2e] border-white/10" : "bg-white border-gray-100"
                    }`} style={{ boxShadow: "0 8px 30px rgba(139,63,222,0.15)" }}>
                      <button onClick={() => { setShowMenu(false); onEdit?.(); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-colors text-left ${
                          dark ? "text-purple-100 hover:bg-white/8" : "text-gray-700 hover:bg-gray-50"
                        }`}>
                        <FiEdit3 size={15} style={{ color: "#8B3FDE" }} /> Edit post
                      </button>
                      <div className={`h-[1px] mx-3 ${dark ? "bg-white/8" : "bg-gray-100"}`} />
                      <button onClick={() => { setShowMenu(false); onDelete?.(); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50/10 transition-colors text-left">
                        <FiTrash2 size={15} /> Delete post
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Badge */}
        <div>
          <span className="text-xs font-bold px-3 py-1 rounded-full tracking-widest border"
            style={{ backgroundColor: badge.bg, color: badge.color, borderColor: badge.border }}>
            {category}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2">
          <h3 className={`text-lg font-bold leading-snug hover:text-[#8B3FDE] transition-colors duration-200 cursor-pointer ${
            dark ? "text-purple-50" : "text-gray-900"
          }`}>{title}</h3>
          <p className={`text-sm leading-relaxed ${dark ? "text-purple-200/60" : "text-gray-500"}`}>{description}</p>
        </div>

        {/* Image */}
        {image && (
          <div className="h-48 rounded-xl overflow-hidden border border-white/5">
            <img src={image} alt="Post" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Actions */}
        <div className={`flex items-center justify-between pt-3 border-t ${dark ? "border-white/8" : "border-gray-100"}`}>
          <div className="flex items-center gap-5">
            <button onClick={handleLike}
              className="flex items-center gap-1.5 text-sm transition-all duration-150 active:scale-110"
              style={{ color: liked ? "#C837AB" : dark ? "rgba(255,255,255,0.3)" : "#9ca3af" }}>
              <FiHeart size={16} fill={liked ? "#C837AB" : "none"} />
              <span>{likeCount}</span>
            </button>
            <button className={`flex items-center gap-1.5 text-sm hover:text-[#8B3FDE] transition-colors duration-150 ${
              dark ? "text-purple-300/40" : "text-gray-400"
            }`}>
              <FiMessageCircle size={16} />
              <span>{comments}</span>
            </button>
          </div>
          <button className={`hover:text-[#FF6B35] transition-colors duration-150 ${dark ? "text-purple-300/40" : "text-gray-400"}`}>
            <FiShare2 size={16} />
          </button>
        </div>
      </div>

      {showProfile && <ProfileModal post={post} onClose={() => setShowProfile(false)} />}
    </>
  );
}