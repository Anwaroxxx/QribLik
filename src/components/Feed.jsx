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
const currentUser = {
  name: 'Alex Neighbor',
  neighborhood: 'Sunset District',
  avatar: 'https://i.pravatar.cc/150?img=5',
}

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
// RESPONSE / REPLY SYSTEM
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A single reply bubble
 */
function ReplyBubble({ reply, onLike }) {
  return (
    <div className="flex items-start gap-2.5 group">
      <img
        src={reply.avatar || `https://i.pravatar.cc/40?u=${reply.author}`}
        alt={reply.author}
        className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
      />
      <div className="flex-1 min-w-0">
        <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-sm px-3 py-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-gray-800">{reply.author}</span>
            <span className="text-[10px] text-gray-400">{reply.time}</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{reply.text}</p>
        </div>
        <div className="flex items-center gap-3 px-1 mt-1">
          <button
            onClick={() => onLike(reply.id)}
            className={`text-[11px] font-semibold transition-colors duration-150 ${
              reply.liked ? 'text-fuchsia-600' : 'text-gray-400 hover:text-fuchsia-500'
            }`}
          >
            {reply.liked ? '❤️' : '🤍'} {reply.likes > 0 ? reply.likes : ''}
          </button>
          <span className="text-[11px] text-gray-300">•</span>
          <span className="text-[11px] text-gray-400">{reply.time}</span>
        </div>
      </div>
    </div>
  )
}

/**
 * Inline reply composer
 */
function ReplyComposer({ postId, parentReplyId = null, onSubmit, onCancel, placeholder = "Write a reply…" }) {
  const [text, setText] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

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
      <img
        src={currentUser.avatar}
        alt={currentUser.name}
        className="w-7 h-7 rounded-full object-cover shrink-0 mt-1"
      />
      <div className="flex-1 flex items-end gap-2 bg-white border border-gray-200 rounded-2xl px-3 py-2 focus-within:border-fuchsia-400 focus-within:shadow-sm focus-within:shadow-fuchsia-100 transition-all duration-200">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          rows={1}
          style={{ resize: 'none', minHeight: '24px' }}
          className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent leading-relaxed"
          onInput={(e) => {
            e.target.style.height = 'auto'
            e.target.style.height = e.target.scrollHeight + 'px'
          }}
        />
        <div className="flex items-center gap-1.5 shrink-0 pb-0.5">
          {onCancel && (
            <button
              onClick={onCancel}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <FiX size={14} />
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={!text.trim()}
            className={`p-1.5 rounded-xl transition-all duration-150 ${
              text.trim()
                ? 'bg-gradient-to-r from-fuchsia-500 to-rose-500 text-white hover:opacity-90 active:scale-95'
                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
            }`}
          >
            <FiSend size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * The full response / reply section for a post
 * Works inline on large screens, slides up as a sheet on mobile/tablet
 */
function ResponseSection({ post, responses, onAddReply, onLikeReply, isSheet = false, onClose }) {
  const [replyingTo, setReplyingTo] = useState(null) // null = top-level, id = threaded
  const [collapsed, setCollapsed] = useState(false)
  const postResponses = responses[post.id] || []

  const handleSubmit = ({ postId, parentReplyId, text }) => {
    onAddReply({ postId, parentReplyId, text })
    setReplyingTo(null)
  }

  const content = (
    <div className={`flex flex-col gap-3 ${isSheet ? '' : 'py-3'}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCollapsed(v => !v)}
          className="flex items-center gap-1.5 text-sm font-bold text-gray-700"
        >
          {collapsed ? <FiChevronDown size={14} /> : <FiChevronUp size={14} />}
          {postResponses.length} {postResponses.length === 1 ? 'Reply' : 'Replies'}
        </button>
        {isSheet && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX size={16} />
          </button>
        )}
      </div>

      {/* Top-level composer */}
      {replyingTo === null && (
        <ReplyComposer
          postId={post.id}
          onSubmit={handleSubmit}
          placeholder={`Reply to this post…`}
        />
      )}

      {/* Replies list */}
      {!collapsed && (
        <div className="flex flex-col gap-3">
          {postResponses.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-3">
              No replies yet. Be the first to respond!
            </p>
          )}
          {postResponses.map((reply) => (
            <div key={reply.id}>
              <ReplyBubble reply={reply} onLike={(id) => onLikeReply(post.id, id)} />

              {/* Reply-to-reply button */}
              {replyingTo !== reply.id && (
                <button
                  onClick={() => setReplyingTo(reply.id)}
                  className="ml-9 flex items-center gap-1 text-[11px] text-gray-400 hover:text-fuchsia-500 mt-1 transition-colors"
                >
                  <FiCornerDownRight size={11} />
                  Reply
                </button>
              )}

              {/* Nested reply composer */}
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

              {/* Nested replies */}
              {reply.nested && reply.nested.length > 0 && (
                <div className="ml-9 mt-2 flex flex-col gap-2">
                  {reply.nested.map((nested) => (
                    <ReplyBubble
                      key={nested.id}
                      reply={nested}
                      onLike={(id) => onLikeReply(post.id, id)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )

  // Mobile/tablet: bottom sheet
  if (isSheet) {
    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={onClose}
        />
        {/* Sheet */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[75vh] flex flex-col animate-slide-up">
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 bg-gray-200 rounded-full" />
          </div>
          {/* Post snippet */}
          <div className="px-5 py-3 border-b border-gray-100">
            <p className="text-xs text-gray-400 font-medium mb-1">Replying to post by</p>
            <p className="text-sm font-bold text-gray-800">{post.author || post.title || 'Post'}</p>
          </div>
          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-5 pb-6">
            {content}
          </div>
        </div>
      </>
    )
  }

  // Desktop: inline below post
  return (
    <div className="border-t border-gray-100 px-4 pb-4">
      {content}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ENHANCED POST CARD WRAPPER  (adds the Reply button + response section)
// ─────────────────────────────────────────────────────────────────────────────

function PostCardWithResponses({ post, responses, onAddReply, onLikeReply, onEdit, onDelete }) {
  const [showSheet, setShowSheet]     = useState(false)   // mobile sheet
  const [showInline, setShowInline]   = useState(false)   // desktop inline

  return (
    <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden bg-white hover:shadow-md transition-shadow duration-200">
      {/* Existing PostCard — remove its outer border/shadow if it has one */}
      <PostCard
        post={post}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      {/* Reply trigger bar */}
      <div className="flex items-center gap-3 px-4 py-2 border-t border-gray-100 bg-gray-50/50">
        <span className="text-xs text-gray-400">
          {(responses[post.id] || []).length} {(responses[post.id] || []).length === 1 ? 'reply' : 'replies'}
        </span>

        {/* On mobile/tablet: opens a bottom sheet */}
        <button
          onClick={() => setShowSheet(true)}
          className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-fuchsia-600 hover:text-fuchsia-700 px-3 py-1.5 rounded-xl hover:bg-fuchsia-50 transition-all duration-150 sm:hidden"
        >
          <LuMessageSquareText size={13} />
          Reply
        </button>

        {/* On desktop (lg+): toggles inline */}
        <button
          onClick={() => setShowInline(v => !v)}
          className="ml-auto hidden sm:flex items-center gap-1.5 text-xs font-semibold text-fuchsia-600 hover:text-fuchsia-700 px-3 py-1.5 rounded-xl hover:bg-fuchsia-50 transition-all duration-150"
        >
          <LuMessageSquareText size={13} />
          {showInline ? 'Hide replies' : 'Reply'}
        </button>
      </div>

      {/* Desktop inline section */}
      {showInline && (
        <ResponseSection
          post={post}
          responses={responses}
          onAddReply={onAddReply}
          onLikeReply={onLikeReply}
          isSheet={false}
        />
      )}

      {/* Mobile/tablet bottom sheet */}
      {showSheet && (
        <ResponseSection
          post={post}
          responses={responses}
          onAddReply={onAddReply}
          onLikeReply={onLikeReply}
          isSheet={true}
          onClose={() => setShowSheet(false)}
        />
      )}
    </div>
  )
}


// ─────────────────────────────────────────────────────────────────────────────
// MAIN FEED
// ─────────────────────────────────────────────────────────────────────────────

export default function MainFeed({ activeView, onViewChange, activeCategory }) {
  const [posts, setPosts]                     = useState(initialPosts)
  const [showCreatePost, setShowCreatePost]   = useState(false)
  const [editPost, setEditPost]               = useState(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifCount, setNotifCount]           = useState(3)
  const [openModal, setOpenModal]             = useState(false)
  const [active, setActive]                   = useState('')

  // ── Response state ─────────────────────────────────────────────────────────
  // Shape: { [postId]: [ { id, author, avatar, text, time, likes, liked, nested: [] } ] }
  const [responses, setResponses] = useState({})

  const handleAddReply = ({ postId, parentReplyId, text }) => {
    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const newReply = {
      id:     `r-${Date.now()}-${Math.random()}`,
      author: currentUser.name,
      avatar: currentUser.avatar,
      text,
      time:   timeStr,
      likes:  0,
      liked:  false,
      nested: [],
    }

    setResponses(prev => {
      const postReplies = prev[postId] ? [...prev[postId]] : []

      if (parentReplyId) {
        // Nested reply
        const updated = postReplies.map(r =>
          r.id === parentReplyId
            ? { ...r, nested: [...(r.nested || []), newReply] }
            : r
        )
        return { ...prev, [postId]: updated }
      } else {
        // Top-level reply
        return { ...prev, [postId]: [...postReplies, newReply] }
      }
    })
  }

  const handleLikeReply = (postId, replyId) => {
    setResponses(prev => {
      const postReplies = (prev[postId] || []).map(r => {
        if (r.id === replyId) {
          return { ...r, liked: !r.liked, likes: r.liked ? r.likes - 1 : r.likes + 1 }
        }
        // check nested
        const nested = (r.nested || []).map(n =>
          n.id === replyId
            ? { ...n, liked: !n.liked, likes: n.liked ? n.likes - 1 : n.likes + 1 }
            : n
        )
        return { ...r, nested }
      })
      return { ...prev, [postId]: postReplies }
    })
  }

  // ── Post CRUD ──────────────────────────────────────────────────────────────
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
    <div className="flex-1 bg-white h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'var(--gradient-qriblik)' }}>
          <FiBell size={28} className="text-white" />
        </div>
        <p className="font-black text-gray-900 text-xl">Inbox coming soon!</p>
        <p className="text-sm text-gray-400 mt-1">Messages feature is under development.</p>
      </div>
    </div>
  )

  if (activeView === 'settings') return (
    <div className="flex-1 bg-white h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'var(--gradient-qriblik)' }}>
          <FiPlus size={28} className="text-white" />
        </div>
        <p className="font-black text-gray-900 text-xl">Settings coming soon!</p>
        <p className="text-sm text-gray-400 mt-1">Preferences and account settings.</p>
      </div>
    </div>
  )

  // ── Feed view ──────────────────────────────────────────────────────────────
  return (
    <div className="flex-1 bg-white h-screen flex flex-col overflow-y-auto pb-20 md:pb-0 pt-[60px] md:pt-0">

      {/* TOP BAR */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3 sm:gap-4">

          {/* Search */}
          <div className="flex-1 relative">
            <FiSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search neighborhood posts…"
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#8B3FDE] focus:bg-white focus:shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Post button — icon only on small screens */}
            <button
              onClick={() => { setEditPost(null); setShowCreatePost(true) }}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-white text-sm font-semibold transition-all duration-150 hover:opacity-90 active:scale-95"
              style={{ background: 'var(--gradient-qriblik)' }}
            >
              <FiPlus size={16} strokeWidth={2.5} />
              <span className="hidden sm:inline">Post Something</span>
            </button>

            {/* Bell */}
            <button
              onClick={handleBellClick}
              className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors duration-150 text-gray-500 hover:text-gray-800"
            >
              <FiBell size={20} />
              {notifCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
              )}
            </button>

            {/* User */}
            <button
              onClick={() => onViewChange('profile')}
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-50 border border-gray-100 transition-all duration-150 hover:border-[#8B3FDE40] active:scale-95"
            >
              <div className="p-[2px] rounded-full shrink-0" style={{ background: 'var(--gradient-qriblik)' }}>
                <img src={currentUser.avatar} alt={currentUser.name} className="w-7 h-7 rounded-full object-cover block" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-semibold text-gray-800 leading-tight">{currentUser.name}</p>
                <div className="flex items-center gap-1">
                  <FiMapPin size={9} style={{ color: '#C837AB' }} />
                  <p className="text-[10px] text-gray-400 leading-tight">{currentUser.neighborhood}</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* FEED */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1
              className="text-xl sm:text-2xl font-bold"
              style={{
                background: 'var(--gradient-qriblik)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}
            >
              {CATEGORY_MAP[activeCategory] || 'Home Feed'}
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {filteredPosts.length} {activeCategory ? 'posts in this category' : 'posts in your neighborhood'}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="hidden sm:inline">Sort by:</span>
            <select className="font-semibold bg-transparent border-none outline-none cursor-pointer text-xs sm:text-sm" style={{ color: '#8B3FDE' }}>
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
            <p className="font-black text-gray-900 text-lg">No posts in this category yet</p>
            <p className="text-sm text-gray-400 mt-1">Be the first to post something!</p>
            <button
              onClick={() => { setEditPost(null); setShowCreatePost(true) }}
              className="mt-4 px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: 'var(--gradient-qriblik)' }}
            >
              Create Post
            </button>
          </div>
        ) : (
          // Responsive grid:
          // - Mobile (< md): single column, full width
          // - Tablet (md): two columns
          // - Desktop (lg+): posts + sidebar card [1fr 30%]
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_30%] gap-4">

            {/* Posts column */}
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

            {/* Sidebar card — hidden on mobile, sticky on lg+ */}
            <div className="hidden lg:block">
              <div className="sticky top-[72px]">
                <OverviewCard />
              </div>
            </div>
          </div>
        )}
      </main>

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

      {/* Messages FAB — hidden on mobile (clashes with bottom nav) */}
   <div
  onClick={() => {
    setActive("Messages");
    setOpenModal(true);
  }}
  className={`fixed bottom-6 right-6 flex items-center justify-between px-5 py-3 rounded-2xl cursor-pointer transition-all duration-300
    ${active === "Messages"
      ? "bg-gradient-to-r from-fuchsia-100 to-rose-100 text-fuchsia-600 shadow-md"
      : "bg-gradient-to-r from-fuchsia-50 to-rose-50 text-fuchsia-600 hover:shadow-md hover:scale-[1.02]"
    }`}
>
  <div className="flex items-center gap-3">
    <LuMessageSquareText className="text-lg" />
    <span className="font-semibold">Messages</span>
  </div>
  <span className="bg-fuchsia-600 text-white text-xs px-2 py-0.5 rounded-full">3</span>
</div>

{openModal && <Modale3 onClose={() => setOpenModal(false)} />}

    </div>
    
  )
}