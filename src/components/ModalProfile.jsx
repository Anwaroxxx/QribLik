

import { useState } from "react";
import { X, Heart, MessageCircle, Bookmark, MoreHorizontal, UserPlus, UserCheck, Grid3X3, MapPin, Link2 } from "lucide-react";

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const POSTS = [
  {
    id: 1,
    user: {
      id: "u1",
      name: "Camille Fontaine",
      username: "@camille.ftn",
      avatar: "https://i.pravatar.cc/150?img=47",
      bio: "Visual designer & photographer. Capturing light, texture, and quiet moments. 🎞️",
      location: "Paris, France",
      website: "camilleftn.co",
      followers: 14800,
      following: 342,
      posts: 218,
    },
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    caption: "Morning light over the Alps — nothing compares to this silence. 🏔️",
    likes: 1243,
    comments: 58,
    time: "2h ago",
  },
  {
    id: 2,
    user: {
      id: "u2",
      name: "Ryo Nakamura",
      username: "@ryo.dev",
      avatar: "https://i.pravatar.cc/150?img=12",
      bio: "Full-stack engineer. Building things that matter. Coffee-powered ☕",
      location: "Tokyo, Japan",
      website: "ryodev.io",
      followers: 6200,
      following: 198,
      posts: 87,
    },
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    caption: "Shipping a new open-source project this week. Weeks of work, finally ready. 🚀",
    likes: 892,
    comments: 34,
    time: "5h ago",
  },
  {
    id: 3,
    user: {
      id: "u3",
      name: "Layla Hassan",
      username: "@layla.creates",
      avatar: "https://i.pravatar.cc/150?img=32",
      bio: "Art director & illustrator. Obsessed with color theory and brutalist design.",
      location: "Dubai, UAE",
      website: "laylacreates.com",
      followers: 31500,
      following: 560,
      posts: 403,
    },
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    caption: "New palette exploration — earthy tones are having a major moment. 🎨",
    likes: 4107,
    comments: 149,
    time: "1d ago",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n;

// ─── ProfileModal ─────────────────────────────────────────────────────────────

function ProfileModal({ user, onClose }) {
  const [followed, setFollowed] = useState(false);

  if (!user) return null;

  return (
    <>
      <style>{`
        @keyframes overlayIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalUp {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        .overlay-in  { animation: overlayIn 0.2s ease forwards; }
        .modal-up    { animation: modalUp 0.28s cubic-bezier(0.22,1,0.36,1) forwards; }
      `}</style>

      {/* Overlay */}
      <div
        className="overlay-in fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      >
        {/* Modal card */}
        <div
          className="modal-up relative w-full sm:max-w-sm bg-[#0f0f17] sm:rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 32px 80px rgba(0,0,0,0.7)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-xl text-white/30 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={16} strokeWidth={2.5} />
          </button>

          {/* Cover banner */}
          <div
            className="h-28 w-full"
            style={{
              background: `linear-gradient(135deg,
                hsl(${(user.id.charCodeAt(1) * 37) % 360},55%,22%) 0%,
                hsl(${(user.id.charCodeAt(1) * 37 + 80) % 360},45%,14%) 100%)`,
            }}
          />

          {/* Avatar */}
          <div className="px-5 pb-5">
            <div className="flex items-end justify-between -mt-10 mb-4">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-2xl object-cover"
                  style={{ border: "3px solid #0f0f17", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
                />
                <span
                  className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400"
                  style={{ boxShadow: "0 0 0 2px #0f0f17" }}
                />
              </div>

              {/* Follow button */}
              <button
                onClick={() => setFollowed((f) => !f)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95"
                style={{
                  background: followed ? "rgba(255,255,255,0.07)" : "rgba(99,102,241,1)",
                  color: followed ? "rgba(255,255,255,0.6)" : "#fff",
                  border: followed ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
                }}
              >
                {followed ? <UserCheck size={14} /> : <UserPlus size={14} />}
                {followed ? "Following" : "Follow"}
              </button>
            </div>

            {/* Name + username */}
            <p className="text-white font-bold text-lg leading-tight">{user.name}</p>
            <p className="text-white/35 text-sm mt-0.5">{user.username}</p>

            {/* Bio */}
            <p className="text-white/60 text-sm mt-3 leading-relaxed">{user.bio}</p>

            {/* Location / website */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
              {user.location && (
                <span className="flex items-center gap-1 text-xs text-white/30">
                  <MapPin size={11} /> {user.location}
                </span>
              )}
              {user.website && (
                <span className="flex items-center gap-1 text-xs text-indigo-400/80">
                  <Link2 size={11} /> {user.website}
                </span>
              )}
            </div>

            {/* Stats */}
            <div
              className="flex items-center justify-between mt-5 py-4 px-2 rounded-xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              {[
                { label: "Posts",     value: fmt(user.posts) },
                { label: "Followers", value: fmt(user.followers) },
                { label: "Following", value: fmt(user.following) },
              ].map(({ label, value }, i, arr) => (
                <div key={label} className="flex-1 text-center" style={i < arr.length - 1 ? { borderRight: "1px solid rgba(255,255,255,0.06)" } : {}}>
                  <p className="text-white font-bold text-base">{value}</p>
                  <p className="text-white/30 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Posts grid preview */}
            <div className="mt-4">
              <div className="flex items-center gap-1.5 text-white/30 text-xs font-medium mb-2.5">
                <Grid3X3 size={12} /> Recent Posts
              </div>
              <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden">
                {[40, 43, 46].map((seed, i) => (
                  <div key={i} className="aspect-square overflow-hidden">
                    <img
                      src={`https://picsum.photos/seed/${user.id}${seed}/200/200`}
                      alt=""
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Post ─────────────────────────────────────────────────────────────────────

function Post({ post, onOpenProfile }) {
  const [liked,   setLiked]   = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked((l) => !l);
    setLikeCount((c) => liked ? c - 1 : c + 1);
  };

  return (
    <article
      className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "#0f0f17",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
      }}
      onClick={() => onOpenProfile(post.user)}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30 hover:ring-indigo-500/70 transition-all"
            />
            <span
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400"
              style={{ border: "2px solid #0f0f17" }}
            />
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-tight hover:text-indigo-400 transition-colors">
              {post.user.name}
            </p>
            <p className="text-white/30 text-xs">{post.user.username} · {post.time}</p>
          </div>
        </div>
        <button
          className="w-8 h-8 flex items-center justify-center rounded-lg text-white/20 hover:text-white/60 hover:bg-white/05 transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Image */}
      {post.image && (
        <div className="relative overflow-hidden">
          <img
            src={post.image}
            alt="post"
            className="w-full object-cover max-h-72 group-hover:scale-[1.02] transition-transform duration-500"
          />
          {/* Hover hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
               style={{ background: "rgba(0,0,0,0.25)" }}>
            <span className="text-white text-xs font-medium bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
              View profile
            </span>
          </div>
        </div>
      )}

      {/* Caption */}
      <div className="px-4 pt-3">
        <p className="text-white/70 text-sm leading-relaxed">
          <span className="text-white font-semibold">{post.user.username} </span>
          {post.caption}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-3 mt-1">
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-1.5 text-white/40 hover:text-white/80 transition-all active:scale-90"
            onClick={handleLike}
          >
            <Heart
              size={18}
              strokeWidth={2}
              fill={liked ? "#f43f5e" : "none"}
              className="transition-colors"
              style={{ color: liked ? "#f43f5e" : undefined }}
            />
            <span className="text-xs font-medium" style={{ color: liked ? "#f43f5e" : undefined }}>
              {fmt(likeCount)}
            </span>
          </button>

          <button
            className="flex items-center gap-1.5 text-white/40 hover:text-indigo-400 transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <MessageCircle size={18} strokeWidth={2} />
            <span className="text-xs font-medium">{fmt(post.comments)}</span>
          </button>
        </div>

        <button
          className="text-white/30 hover:text-amber-400 transition-colors active:scale-90"
          onClick={(e) => { e.stopPropagation(); setSaved((s) => !s); }}
        >
          <Bookmark
            size={18}
            strokeWidth={2}
            fill={saved ? "#fbbf24" : "none"}
            style={{ color: saved ? "#fbbf24" : undefined }}
          />
        </button>
      </div>
    </article>
  );
}

// ─── App / Feed ───────────────────────────────────────────────────────────────

export default function ModalProfile () {
  const [activeUser, setActiveUser] = useState(null);

  return (
    <div
      className="min-h-screen py-10 px-4"
      style={{ background: "linear-gradient(160deg,#080810 0%,#0c0c18 60%,#080812 100%)" }}
    >
      {/* Header */}
      <div className="max-w-sm mx-auto mb-8 text-center">
        <h1 className="text-white font-bold text-2xl tracking-tight">Feed</h1>
        <p className="text-white/25 text-sm mt-1">Click any post to view profile</p>
      </div>

      {/* Posts */}
      <div className="max-w-sm mx-auto flex flex-col gap-5">
        {POSTS.map((post) => (
          <Post key={post.id} post={post} onOpenProfile={setActiveUser} />
        ))}
      </div>

      {/* Profile Modal */}
      {activeUser && (
        <ProfileModal user={activeUser} onClose={() => setActiveUser(null)} />
      )}
    </div>
  );
}

