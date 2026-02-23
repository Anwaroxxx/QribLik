import { useState, useRef, useEffect } from 'react'
import { FiSearch, FiBell, FiPlus, FiMapPin, FiSend, FiX, FiCornerDownRight, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import PostCard from './PostCards'
import ProfilePage from './ProfilePage'
import CreatePostModal from './Createpostmodal'
import NotificationsPanel from './Notificationspanel'
import OverviewCard from './OverView'
import initialPosts from '../data/posts.json/Posts'
import { LuMessageSquareText } from 'react-icons/lu'
import Modale3 from './Modale3'
import { useTheme } from '../contexts/ThemeContext'
// ── Single source of truth for user data ──────────────────────────────────────
import currentUser from '../utils/userUtils'

const CATEGORY_MAP = {
  'ALL':            'Home Feed',
  'SPORT':          'Sport',
  'TRADING':        'Trading',
  'LOST AND FOUND': 'Lost and Found',
  'SWAP SKILLS':    'Swap Skills',
  'EVENTS':         'Events',
  'TECH HELP':      'Tech Help',
}

// ─────────────────────────────────────────────────────────────────────────────
// REPLY BUBBLE
// ─────────────────────────────────────────────────────────────────────────────
function ReplyBubble({ reply, onLike }) {
  const { dark } = useTheme()
  return (
    <div className="flex items-start gap-2.5 group">
      <img
        src={reply.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(reply.author)}&background=8B3FDE&color=fff&size=40&bold=true`}
        alt={reply.author}
        className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
      />
      <div className="flex-1 min-w-0">
        <div className={`border rounded-2xl rounded-tl-sm px-3 py-2 transition-colors duration-500 ${
          dark ? 'bg-white/5 border-white/8' : 'bg-gray-50 border-gray-100'
        }`}>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-bold ${dark ? 'text-purple-100' : 'text-gray-800'}`}>{reply.author}</span>
            <span className={`text-[10px] ${dark ? 'text-purple-300/40' : 'text-gray-400'}`}>{reply.time}</span>
          </div>
          <p className={`text-sm leading-relaxed ${dark ? 'text-purple-200/70' : 'text-gray-700'}`}>{reply.text}</p>
        </div>
        <div className="flex items-center gap-3 px-1 mt-1">
          <button
            onClick={() => onLike(reply.id)}
            className={`text-[11px] font-semibold transition-colors duration-150 ${
              reply.liked ? 'text-fuchsia-500' : dark ? 'text-purple-300/40 hover:text-fuchsia-400' : 'text-gray-400 hover:text-fuchsia-500'
            }`}
          >
            {reply.liked ? '❤️' : '🤍'} {reply.likes > 0 ? reply.likes : ''}
          </button>
          <span className={`text-[11px] ${dark ? 'text-white/10' : 'text-gray-300'}`}>•</span>
          <span className={`text-[11px] ${dark ? 'text-purple-300/40' : 'text-gray-400'}`}>{reply.time}</span>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// REPLY COMPOSER
// ─────────────────────────────────────────────────────────────────────────────
function ReplyComposer({ postId, parentReplyId = null, onSubmit, onCancel, placeholder = 'Write a reply…' }) {
  const { dark } = useTheme()
  const [text, setText] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => { textareaRef.current?.focus() }, [])

  const handleSubmit = () => {
    if (!text.trim()) return
    onSubmit({ postId, parentReplyId, text: text.trim() })
    setText('')
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit()
    if (e.key === 'Escape' && onCancel) onCancel()
  }

  return (
    <div className="flex items-start gap-2.5 mt-2">
      <img src={currentUser.avatar} alt={currentUser.name} className="w-7 h-7 rounded-full object-cover shrink-0 mt-1" />
      <div className={`flex-1 flex items-end gap-2 border rounded-2xl px-3 py-2 transition-all duration-200 ${
        dark
          ? 'bg-white/5 border-white/10 focus-within:border-fuchsia-500/50 focus-within:shadow-sm focus-within:shadow-fuchsia-900/30'
          : 'bg-white border-gray-200 focus-within:border-fuchsia-400 focus-within:shadow-sm focus-within:shadow-fuchsia-100'
      }`}>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          rows={1}
          style={{ resize: 'none', minHeight: '24px' }}
          className={`flex-1 text-sm outline-none bg-transparent leading-relaxed placeholder-gray-400 ${
            dark ? 'text-purple-100' : 'text-gray-700'
          }`}
          onInput={(e) => {
            e.target.style.height = 'auto'
            e.target.style.height = e.target.scrollHeight + 'px'
          }}
        />
        <div className="flex items-center gap-1.5 shrink-0 pb-0.5">
          {onCancel && (
            <button onClick={onCancel} className={`p-1 rounded-lg transition-colors ${
              dark ? 'text-purple-300/50 hover:text-purple-200 hover:bg-white/8' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}>
              <FiX size={14} />
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={!text.trim()}
            className={`p-1.5 rounded-xl transition-all duration-150 ${
              text.trim()
                ? 'bg-gradient-to-r from-fuchsia-500 to-rose-500 text-white hover:opacity-90 active:scale-95'
                : dark ? 'bg-white/8 text-white/20 cursor-not-allowed' : 'bg-gray-100 text-gray-300 cursor-not-allowed'
            }`}
          >
            <FiSend size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// RESPONSE SECTION
// ─────────────────────────────────────────────────────────────────────────────
function ResponseSection({ post, responses, onAddReply, onLikeReply, isSheet = false, onClose }) {
  const { dark } = useTheme()
  const [replyingTo, setReplyingTo] = useState(null)
  const [collapsed, setCollapsed] = useState(false)
  const postResponses = responses[post.id] || []

  const handleSubmit = ({ postId, parentReplyId, text }) => {
    onAddReply({ postId, parentReplyId, text })
    setReplyingTo(null)
  }

  const content = (
    <div className={`flex flex-col gap-3 ${isSheet ? '' : 'py-3'}`}>
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCollapsed(v => !v)}
          className={`flex items-center gap-1.5 text-sm font-bold ${dark ? 'text-purple-200' : 'text-gray-700'}`}
        >
          {collapsed ? <FiChevronDown size={14} /> : <FiChevronUp size={14} />}
          {postResponses.length} {postResponses.length === 1 ? 'Reply' : 'Replies'}
        </button>
        {isSheet && (
          <button onClick={onClose} className={`p-1.5 rounded-xl transition-colors ${
            dark ? 'hover:bg-white/8 text-purple-300/50 hover:text-purple-200' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'
          }`}>
            <FiX size={16} />
          </button>
        )}
      </div>

      {replyingTo === null && (
        <ReplyComposer postId={post.id} onSubmit={handleSubmit} placeholder="Reply to this post…" />
      )}

      {!collapsed && (
        <div className="flex flex-col gap-3">
          {postResponses.length === 0 && (
            <p className={`text-xs text-center py-3 ${dark ? 'text-purple-300/40' : 'text-gray-400'}`}>
              No replies yet. Be the first to respond!
            </p>
          )}
          {postResponses.map((reply) => (
            <div key={reply.id}>
              <ReplyBubble reply={reply} onLike={(id) => onLikeReply(post.id, id)} />
              {replyingTo !== reply.id && (
                <button
                  onClick={() => setReplyingTo(reply.id)}
                  className={`ml-9 flex items-center gap-1 text-[11px] mt-1 transition-colors ${
                    dark ? 'text-purple-300/40 hover:text-fuchsia-400' : 'text-gray-400 hover:text-fuchsia-500'
                  }`}
                >
                  <FiCornerDownRight size={11} /> Reply
                </button>
              )}
              {replyingTo === reply.id && (
                <div className="ml-9 mt-1">
                  <ReplyComposer
                    postId={post.id}
                    parentReplyId={reply.id}
                    onSubmit={handleSubmit}
                    onCancel={() => setReplyingTo(null)}
                    placeholder={`Reply to ${reply.author}…`}
                  />
                </div>
              )}
              {reply.nested?.length > 0 && (
                <div className="ml-9 mt-2 flex flex-col gap-2">
                  {reply.nested.map((nested) => (
                    <ReplyBubble key={nested.id} reply={nested} onLike={(id) => onLikeReply(post.id, id)} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )

  if (isSheet) {
    return (
      <>
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={onClose} />
        <div className={`fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl shadow-2xl max-h-[75vh] flex flex-col animate-slide-up transition-colors duration-500 ${
          dark ? 'bg-[#1a0a2e]' : 'bg-white'
        }`}>
          <div className="flex justify-center pt-3 pb-1">
            <div className={`w-10 h-1 rounded-full ${dark ? 'bg-white/10' : 'bg-gray-200'}`} />
          </div>
          <div className={`px-5 py-3 border-b ${dark ? 'border-white/8' : 'border-gray-100'}`}>
            <p className={`text-xs font-medium mb-1 ${dark ? 'text-purple-300/50' : 'text-gray-400'}`}>Replying to post by</p>
            <p className={`text-sm font-bold ${dark ? 'text-purple-50' : 'text-gray-800'}`}>{post.author || post.title || 'Post'}</p>
          </div>
          <div className="flex-1 overflow-y-auto px-5 pb-6">{content}</div>
        </div>
      </>
    )
  }

  return (
    <div className={`border-t px-4 pb-4 ${dark ? 'border-white/8' : 'border-gray-100'}`}>
      {content}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// POST CARD WITH RESPONSES
// ─────────────────────────────────────────────────────────────────────────────
function PostCardWithResponses({ post, responses, onAddReply, onLikeReply, onEdit, onDelete }) {
  const { dark } = useTheme()
  const [showSheet, setShowSheet]   = useState(false)
  const [showInline, setShowInline] = useState(false)

  return (
    <div className={`rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 ${
      dark
        ? 'bg-[#1a0a2e] border-white/8 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
        : 'bg-white border-gray-100'
    }`}>
      <PostCard post={post} onEdit={onEdit} onDelete={onDelete} />

      <div className={`flex items-center gap-3 px-4 py-2 border-t transition-colors duration-500 ${
        dark ? 'border-white/8 bg-white/3' : 'border-gray-100 bg-gray-50/50'
      }`}>
        <span className={`text-xs ${dark ? 'text-purple-300/40' : 'text-gray-400'}`}>
          {(responses[post.id] || []).length}{' '}
          {(responses[post.id] || []).length === 1 ? 'reply' : 'replies'}
        </span>
        <button
          onClick={() => setShowSheet(true)}
          className={`ml-auto flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all duration-150 sm:hidden ${
            dark ? 'text-fuchsia-400 hover:bg-fuchsia-900/30' : 'text-fuchsia-600 hover:bg-fuchsia-50'
          }`}
        >
          <LuMessageSquareText size={13} /> Reply
        </button>
        <button
          onClick={() => setShowInline(v => !v)}
          className={`ml-auto hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all duration-150 ${
            dark ? 'text-fuchsia-400 hover:bg-fuchsia-900/30' : 'text-fuchsia-600 hover:bg-fuchsia-50'
          }`}
        >
          <LuMessageSquareText size={13} />
          {showInline ? 'Hide replies' : 'Reply'}
        </button>
      </div>

      {showInline && (
        <ResponseSection post={post} responses={responses} onAddReply={onAddReply} onLikeReply={onLikeReply} isSheet={false} />
      )}
      {showSheet && (
        <ResponseSection post={post} responses={responses} onAddReply={onAddReply} onLikeReply={onLikeReply} isSheet={true} onClose={() => setShowSheet(false)} />
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN FEED
// ─────────────────────────────────────────────────────────────────────────────
export default function MainFeed({ activeView, onViewChange, activeCategory }) {
  const { dark } = useTheme()
  const [posts, setPosts]                         = useState(initialPosts)
  const [showCreatePost, setShowCreatePost]       = useState(false)
  const [editPost, setEditPost]                   = useState(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifCount, setNotifCount]               = useState(3)
  const [openModal, setOpenModal]                 = useState(false)
  const [active, setActive]                       = useState('')
  const [responses, setResponses]                 = useState({})

  const handleAddReply = ({ postId, parentReplyId, text }) => {
    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const newReply = {
      id: `r-${Date.now()}-${Math.random()}`,
      author: currentUser.name,
      avatar: currentUser.avatar,
      text, time: timeStr, likes: 0, liked: false, nested: [],
    }
    setResponses(prev => {
      const postReplies = prev[postId] ? [...prev[postId]] : []
      if (parentReplyId) {
        const updated = postReplies.map(r =>
          r.id === parentReplyId ? { ...r, nested: [...(r.nested || []), newReply] } : r
        )
        return { ...prev, [postId]: updated }
      }
      return { ...prev, [postId]: [...postReplies, newReply] }
    })
  }

  const handleLikeReply = (postId, replyId) => {
    setResponses(prev => {
      const postReplies = (prev[postId] || []).map(r => {
        if (r.id === replyId) return { ...r, liked: !r.liked, likes: r.liked ? r.likes - 1 : r.likes + 1 }
        const nested = (r.nested || []).map(n =>
          n.id === replyId ? { ...n, liked: !n.liked, likes: n.liked ? n.likes - 1 : n.likes + 1 } : n
        )
        return { ...r, nested }
      })
      return { ...prev, [postId]: postReplies }
    })
  }

  function handlePost(post) {
    setPosts(prev => {
      const exists = prev.find(p => p.id === post.id)
      if (exists) return prev.map(p => p.id === post.id ? post : p)
      return [post, ...prev]
    })
  }
  function handleDelete(id) { setPosts(prev => prev.filter(p => p.id !== id)) }
  function handleBellClick() { setShowNotifications(v => !v); setNotifCount(0) }

  const filteredPosts = !activeCategory || activeCategory === 'ALL'
    ? posts
    : posts.filter(post => post.category === activeCategory)

  // ── Special views ──────────────────────────────────────────────────────────
  if (activeView === 'profile') return <ProfilePage onBack={() => onViewChange('feed')} />

  if (activeView === 'inbox') return (
    <div className={`flex-1 flex items-center justify-center transition-colors duration-500 ${dark ? 'bg-[#0f0a1e]' : 'bg-white'}`}>
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'var(--gradient-qriblik)' }}>
          <FiBell size={28} className="text-white" />
        </div>
        <p className={`font-black text-xl ${dark ? 'text-purple-50' : 'text-gray-900'}`}>Inbox coming soon!</p>
        <p className={`text-sm mt-1 ${dark ? 'text-purple-300/50' : 'text-gray-400'}`}>Messages feature is under development.</p>
      </div>
    </div>
  )

  if (activeView === 'settings') return (
    <div className={`flex-1 flex items-center justify-center transition-colors duration-500 ${dark ? 'bg-[#0f0a1e]' : 'bg-white'}`}>
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'var(--gradient-qriblik)' }}>
          <FiPlus size={28} className="text-white" />
        </div>
        <p className={`font-black text-xl ${dark ? 'text-purple-50' : 'text-gray-900'}`}>Settings coming soon!</p>
        <p className={`text-sm mt-1 ${dark ? 'text-purple-300/50' : 'text-gray-400'}`}>Preferences and account settings.</p>
      </div>
    </div>
  )

  // ── Feed view ──────────────────────────────────────────────────────────────
  return (
    <div className={`flex-1 min-h-0 flex flex-col transition-colors duration-500 ${
      dark ? 'bg-[#0f0a1e]' : 'bg-white'
    }`}>

      {/* Mobile: fixed header */}
      <header className={`fixed top-[52px] left-0 right-0 z-40 flex items-center gap-2 px-3 py-2 border-b md:hidden transition-colors duration-500 ${
        dark ? 'bg-[#0d0719]/95 border-white/5 backdrop-blur-md' : 'bg-white/95 border-gray-100 backdrop-blur-sm'
      }`}>
        <div className="flex-1 relative">
          <FiSearch size={14} className={`absolute left-2.5 top-1/2 -translate-y-1/2 ${dark ? 'text-purple-300/40' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Search neighborhood posts…"
            className={`w-full pl-8 pr-3 py-1.5 rounded-xl border text-sm outline-none transition-all duration-200 ${
              dark
                ? 'bg-white/5 border-white/8 text-purple-100 placeholder-purple-300/30 focus:border-fuchsia-500/50'
                : 'bg-gray-50 border-gray-200 text-gray-700 placeholder-gray-400 focus:border-[#8B3FDE]'
            }`}
          />
        </div>
        <button
          onClick={() => { setEditPost(null); setShowCreatePost(true) }}
          className="flex items-center justify-center w-9 h-9 rounded-xl text-white shrink-0 transition-all active:scale-95"
          style={{ background: 'var(--gradient-qriblik)' }}
        >
          <FiPlus size={18} strokeWidth={2.5} />
        </button>
        <button
          onClick={handleBellClick}
          className={`relative p-1.5 rounded-xl shrink-0 ${dark ? 'text-purple-300/60' : 'text-gray-500'}`}
        >
          <FiBell size={18} />
          {notifCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />}
        </button>
        {/* ── Profile avatar — reads from currentUser (synced with signup) ── */}
        <button onClick={() => onViewChange('profile')} className="shrink-0">
          <div className="p-[2px] rounded-full" style={{ background: 'var(--gradient-qriblik)' }}>
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover block bg-purple-200"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=8B3FDE&color=fff&size=60&bold=true`
              }}
            />
          </div>
        </button>
      </header>

      {/* Desktop: sticky header */}
      <header className={`hidden md:flex sticky top-0 z-40 border-b px-6 py-3 items-center gap-4 transition-colors duration-500 ${
        dark ? 'bg-[#0d0719]/95 border-white/5 backdrop-blur-md' : 'bg-white border-gray-100'
      }`}>
        <div className="flex-1 relative">
          <FiSearch size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${dark ? 'text-purple-300/40' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Search neighborhood posts…"
            className={`w-full pl-9 pr-4 py-2 rounded-xl border text-sm outline-none transition-all duration-200 ${
              dark
                ? 'bg-white/5 border-white/8 text-purple-100 placeholder-purple-300/30 focus:border-fuchsia-500/50 focus:bg-white/8'
                : 'bg-gray-50 border-gray-200 text-gray-700 placeholder-gray-400 focus:border-[#8B3FDE] focus:bg-white focus:shadow-sm'
            }`}
          />
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => { setEditPost(null); setShowCreatePost(true) }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold transition-all duration-150 hover:opacity-90 active:scale-95"
            style={{ background: 'var(--gradient-qriblik)' }}
          >
            <FiPlus size={16} strokeWidth={2.5} /> Post Something
          </button>
          <button
            onClick={handleBellClick}
            className={`relative p-2 rounded-xl transition-colors duration-150 ${
              dark ? 'text-purple-300/60 hover:bg-white/8 hover:text-purple-100' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
            }`}
          >
            <FiBell size={20} />
            {notifCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />}
          </button>
          {/* ── Profile button — synced name + avatar ── */}
          <button
            onClick={() => onViewChange('profile')}
            className={`flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl border transition-all duration-150 active:scale-95 ${
              dark ? 'hover:bg-white/5 border-white/8 hover:border-fuchsia-500/30' : 'hover:bg-gray-50 border-gray-100 hover:border-[#8B3FDE40]'
            }`}
          >
            <div className="p-[2px] rounded-full shrink-0" style={{ background: 'var(--gradient-qriblik)' }}>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover block bg-purple-200"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=8B3FDE&color=fff&size=60&bold=true`
                }}
              />
            </div>
            <div className="text-left">
              <p className={`text-xs font-semibold leading-tight ${dark ? 'text-purple-100' : 'text-gray-800'}`}>{currentUser.name}</p>
              <div className="flex items-center gap-1">
                <FiMapPin size={9} style={{ color: '#C837AB' }} />
                <p className={`text-[10px] leading-tight ${dark ? 'text-purple-300/40' : 'text-gray-400'}`}>{currentUser.neighborhood}</p>
              </div>
            </div>
          </button>
        </div>
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-20 md:pb-0 pt-[108px] md:pt-0">
        <main className="p-4 sm:p-6 lg:p-8 w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1
                className="text-xl sm:text-2xl font-bold"
                style={{ background: 'var(--gradient-qriblik)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                {CATEGORY_MAP[activeCategory] || 'Home Feed'}
              </h1>
              <p className={`text-sm mt-0.5 ${dark ? 'text-purple-300/40' : 'text-gray-400'}`}>
                {filteredPosts.length} {activeCategory ? 'posts in this category' : 'posts in your neighborhood'}
              </p>
            </div>
            <div className={`flex items-center gap-2 text-sm ${dark ? 'text-purple-300/50' : 'text-gray-500'}`}>
              <span className="hidden sm:inline">Sort by:</span>
              <select className={`font-semibold bg-transparent border-none outline-none cursor-pointer text-xs sm:text-sm ${dark ? 'text-fuchsia-400' : 'text-[#8B3FDE]'}`}>
                <option>Most Recent</option>
                <option>Most Liked</option>
                <option>Most Commented</option>
              </select>
            </div>
          </div>

          <div className="h-[2px] rounded-full mb-6" style={{ background: 'var(--gradient-qriblik)', opacity: 0.3 }} />

          {filteredPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center" style={{ background: 'rgba(139,63,222,0.08)' }}>
                <FiSearch size={28} style={{ color: '#8B3FDE' }} />
              </div>
              <p className={`font-black text-lg ${dark ? 'text-purple-50' : 'text-gray-900'}`}>No posts in this category yet</p>
              <p className={`text-sm mt-1 ${dark ? 'text-purple-300/50' : 'text-gray-400'}`}>Be the first to post something!</p>
              <button
                onClick={() => { setEditPost(null); setShowCreatePost(true) }}
                className="mt-4 px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-opacity hover:opacity-90"
                style={{ background: 'var(--gradient-qriblik)' }}
              >
                Create Post
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_30%] gap-4">
              <div className="flex flex-col gap-5">
                {filteredPosts.map(post => (
                  <PostCardWithResponses
                    key={post.id}
                    post={post}
                    responses={responses}
                    onAddReply={handleAddReply}
                    onLikeReply={handleLikeReply}
                    onEdit={() => { setEditPost(post); setShowCreatePost(true) }}
                    onDelete={() => handleDelete(post.id)}
                  />
                ))}
              </div>
              <div className="hidden lg:block">
                <div className="sticky top-[72px]">
                  <OverviewCard />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* OVERLAYS */}
      {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
      {showCreatePost && (
        <CreatePostModal
          onClose={() => { setShowCreatePost(false); setEditPost(null) }}
          onPost={handlePost}
          onDelete={handleDelete}
          editPost={editPost}
        />
      )}

      {/* Messages FAB */}
      <div
        onClick={() => { setActive('Messages'); setOpenModal(true) }}
        className={`fixed right-4 md:right-6 z-30 flex items-center cursor-pointer transition-all duration-300 shadow-lg border
          bottom-[80px] md:bottom-6 px-3 md:px-5 py-3 rounded-2xl justify-between ${
          dark
            ? 'bg-gradient-to-r from-fuchsia-900/40 to-rose-900/30 border-fuchsia-700/30 text-fuchsia-400 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
            : active === 'Messages'
              ? 'bg-gradient-to-r from-fuchsia-100 to-rose-100 border-fuchsia-100 text-fuchsia-600 shadow-md'
              : 'bg-gradient-to-r from-fuchsia-50 to-rose-50 border-fuchsia-100 text-fuchsia-600 hover:shadow-md hover:scale-[1.02]'
        }`}
      >
        <div className="relative">
          <LuMessageSquareText className="text-xl md:text-lg" />
          <span className="absolute -top-2 -right-2 w-4 h-4 bg-fuchsia-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center md:hidden">3</span>
        </div>
        <span className="hidden md:inline font-semibold ml-3">Messages</span>
        <span className="hidden md:inline bg-fuchsia-600 text-white text-xs px-2 py-0.5 rounded-full ml-3">3</span>
      </div>

      {openModal && <Modale3 onClose={() => setOpenModal(false)} />}
    </div>
  )
}