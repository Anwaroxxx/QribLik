import { useState, useEffect } from 'react'
import { FiSearch, FiBell, FiPlus, FiMapPin  } from 'react-icons/fi'
import PostCard from './PostCards'
import ProfilePage from './ProfilePage'
import CreatePostModal from './Createpostmodal'
import NotificationsPanel from './Notificationspanel'
import OverviewCard from './OverView'
import initialPosts from '../data/posts.json/Posts'

const currentUser = {
  name: 'Alex Neighbor',
  neighborhood: 'Sunset District',
  avatar: 'https://i.pravatar.cc/150?img=5',
}



const CATEGORY_MAP = {
  'ALL': 'Home Feed',
  'SPORT': 'Sport',
  'TRADING': 'Trading',
  'LOST AND FOUND': 'Lost and Found',
  'SWAP SKILLS': 'Swap Skills',
  'EVENTS': 'Events',
  'TECH HELP': 'Tech Help',
}



export default function MainFeed({ activeView, onViewChange, activeCategory }) {
  const [posts, setPosts] = useState(initialPosts)
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [editPost, setEditPost] = useState(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifCount, setNotifCount] = useState(3)
  const [openModal, setOpenModal] = useState(false);
const [active, setActive] = useState("");

  function handlePost(post) {
    setPosts(prev => {
      const exists = prev.find(p => p.id === post.id)
      if (exists) return prev.map(p => p.id === post.id ? post : p)
      return [post, ...prev]
    })
  }

  function handleDelete(id) {
    setPosts(prev => prev.filter(p => p.id !== id))
  }

  function handleBellClick() {
    setShowNotifications(v => !v)
    setNotifCount(0)
  }

  // Filter posts by active category
 const filteredPosts = !activeCategory || activeCategory === "ALL"
  ? posts
  : posts.filter(post => post.category === activeCategory)
  // ── VIEWS ──────────────────────────────────────────────────────────────────

  if (activeView === 'map') {
    return <NeighborMap onBack={() => onViewChange('feed')} />
  }

  if (activeView === 'profile') {
    return <ProfilePage onBack={() => onViewChange('feed')} />
  }

  if (activeView === 'inbox') {
    return (
      <div className="flex-1 bg-white h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'var(--gradient-qriblik)' }}>
            <FiBell size={28} className="text-white" />
          </div>
          <p className="font-black text-gray-900 text-xl">Inbox coming soon!</p>
          <p className="text-sm text-gray-400 mt-1">Messages feature is under development.</p>
        </div>
      </div>
    )
  }

  if (activeView === 'settings') {
    return (
      <div className="flex-1 bg-white h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'var(--gradient-qriblik)' }}>
            <FiPlus size={28} className="text-white" />
          </div>
          <p className="font-black text-gray-900 text-xl">Settings coming soon!</p>
          <p className="text-sm text-gray-400 mt-1">Preferences and account settings.</p>
        </div>
      </div>
    )
  }

  // ── FEED VIEW ──────────────────────────────────────────────────────────────

  return (
    <div className="flex-1 bg-white h-screen flex flex-col overflow-y-auto">

      {/* TOP BAR */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-6 py-3">
        <div className="flex items-center gap-4">
          
          <div className="flex-1 relative">
            <FiSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search neighborhood posts..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#8B3FDE] focus:bg-white focus:shadow-sm" />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button onClick={() => { setEditPost(null); setShowCreatePost(true) }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold transition-all duration-150 hover:opacity-90 active:scale-95"
              style={{ background: 'var(--gradient-qriblik)' }}>
              <FiPlus size={16} strokeWidth={2.5} />
              Post Something
            </button>

            <button onClick={handleBellClick}
              className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors duration-150 text-gray-500 hover:text-gray-800">
              <FiBell size={20} />
              {notifCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
              )}
            </button>

            <button onClick={() => onViewChange('profile')}
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-50 border border-gray-100 transition-all duration-150 hover:border-[#8B3FDE40] active:scale-95">
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
      <main className="flex-1 p-8 w-full ">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{
              background: 'var(--gradient-qriblik)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              {CATEGORY_MAP[activeCategory] || 'Home Feed'}
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {filteredPosts.length} {activeCategory ? 'posts in this category' : 'posts matching your interest'}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Sort by:</span>
            <select className="font-semibold bg-transparent border-none outline-none cursor-pointer" style={{ color: '#8B3FDE' }}>
              <option>Most Recent</option>
              <option>Most Liked</option>
              <option>Most Commented</option>
            </select>
          </div>
        </div>

        <div className="h-[2px]  rounded-full "  style={{ background: 'var(--gradient-qriblik)', opacity: 0.3 }} />

        {filteredPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center"
              style={{ background: 'rgba(139,63,222,0.08)' }}>
              <FiSearch size={28} style={{ color: '#8B3FDE' }} />
            </div>
            <p className="font-black text-gray-900 text-lg">No posts in this category yet</p>
            <p className="text-sm text-gray-400 mt-1">Be the first to post something!</p>
            <button
              onClick={() => { setEditPost(null); setShowCreatePost(true) }}
              className="mt-4 px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: 'var(--gradient-qriblik)' }}>
              Create Post
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-[1fr_30%] gap-4 ">
             <div className="grid  grid-cols-1 gap-5  justify-center items-center ">
            {filteredPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onEdit={() => { setEditPost(post); setShowCreatePost(true) }}
                onDelete={() => handleDelete(post.id)}
              />
            ))}

            
          </div>
          <div>
                <OverviewCard/>
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


{/* ── BUTTON MESSAGES ── */}
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
