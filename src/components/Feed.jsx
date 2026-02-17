import { useState } from 'react'
import { FiSearch, FiBell, FiPlus, FiMapPin } from 'react-icons/fi'
import PostCard from './PostCards'
import ProfilePage from './ProfilePage'
import CreatePostModal from './Createpostmodal'
import NotificationsPanel from './Notificationspanel'

const currentUser = {
  name: 'Alex Neighbor',
  neighborhood: 'Sunset District',
  avatar: 'https://i.pravatar.cc/150?img=5',
}

const initialPosts = [
  {
    id: 1,
    author: 'Alex Rivera',
    neighborhood: 'Oakwood Heights',
    avatar: 'https://i.pravatar.cc/150?img=11',
    timeAgo: '1 hour ago',
    category: 'SPORT',
    title: 'Looking for a tennis partner',
    description: 'Intermediate player looking for someone to hit some balls at the community courts on Saturday morning.',
    likes: 8, comments: 2,
  },
  {
    id: 2,
    author: 'David Chen',
    neighborhood: 'Park Ridge',
    avatar: 'https://i.pravatar.cc/150?img=33',
    timeAgo: '5 hours ago',
    category: 'TRADING',
    title: 'Trading vintage camera for a tablet',
    description: 'I have a well-maintained 35mm film camera. Looking to swap it for a working tablet for my studies.',
    likes: 8, comments: 2,
  },
  {
    id: 3,
    author: 'Marta Wilson',
    neighborhood: 'Central Square',
    avatar: 'https://i.pravatar.cc/150?img=47',
    timeAgo: '2 hours ago',
    category: 'LOST AND FOUND',
    title: 'Lost: Golden Retriever near Central Park',
    description: "Please help! Our dog 'Buddy' went missing this morning. He has a blue collar and is very friendly.",
    likes: 8, comments: 2,
  },
  {
    id: 4,
    author: 'Emma Wilson',
    neighborhood: 'Glenview',
    avatar: 'https://i.pravatar.cc/150?img=23',
    timeAgo: '3 hours ago',
    category: 'SWAP SKILLS',
    title: 'Swap: Coding lessons for Piano lessons',
    description: "I'm a senior dev who wants to learn piano. I can teach you React, Python, or Go in exchange!",
    likes: 8, comments: 2,
  },
]

export default function MainFeed() {
  const [posts, setPosts] = useState(initialPosts)
  const [view, setView] = useState('feed')
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [editPost, setEditPost] = useState(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifCount, setNotifCount] = useState(3)

  // Create new post or update existing
  function handlePost(post) {
    setPosts(prev => {
      const exists = prev.find(p => p.id === post.id)
      if (exists) return prev.map(p => p.id === post.id ? post : p)
      return [post, ...prev]
    })
  }

  // Delete a post by id
  function handleDelete(id) {
    setPosts(prev => prev.filter(p => p.id !== id))
  }

  function handleBellClick() {
    setShowNotifications(v => !v)
    setNotifCount(0)
  }

  if (view === 'profile') {
    return <ProfilePage onBack={() => setView('feed')} />
  }

  return (
    <div className="flex-1 bg-white min-h-screen flex flex-col">

      {/* NAVBAR */}
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

            <button onClick={() => setView('profile')}
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
      <main className="flex-1 p-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{
              background: 'var(--gradient-qriblik)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Home Feed</h1>
            <p className="text-sm text-gray-400 mt-0.5">{posts.length} posts matching your interest</p>
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

        <div className="h-[2px] rounded-full mb-6" style={{ background: 'var(--gradient-qriblik)', opacity: 0.3 }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={() => { setEditPost(post); setShowCreatePost(true) }}
              onDelete={() => handleDelete(post.id)}
            />
          ))}
        </div>
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
    </div>
  )
}