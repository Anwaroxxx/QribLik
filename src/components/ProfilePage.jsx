import { useState, useEffect, useRef } from 'react'
import {
  FiArrowLeft, FiEdit2, FiCheck, FiMapPin, FiStar,
  FiHeart, FiMessageCircle, FiAward, FiUsers, FiGrid,
  FiSearch, FiRepeat, FiCalendar, FiMusic, FiMonitor,
  FiX, FiPlus, FiCamera, FiTrendingUp, FiShield, FiZap,
} from 'react-icons/fi'
import { MdSportsSoccer, MdOutlineFoodBank, MdOutlineNaturePeople, MdChildCare } from 'react-icons/md'
import { RiHandHeartLine } from 'react-icons/ri'


const ALL_CATEGORIES = [
  { label: 'Sport',          icon: MdSportsSoccer,       color: '#8B3FDE' },
  { label: 'Trading',        icon: FiRepeat,              color: '#C837AB' },
  { label: 'Lost and Found', icon: FiSearch,              color: '#FF6B35' },
  { label: 'Swap Skills',    icon: RiHandHeartLine,       color: '#8B3FDE' },
  { label: 'Events',         icon: FiCalendar,            color: '#C837AB' },
]

const BADGE_META = {
  'Newcomer':         { icon: FiZap,    color: '#9ca3af' },
  'Helper':           { icon: FiHeart,  color: '#FF6B35' },
  'Trusted Neighbor': { icon: FiShield, color: '#8B3FDE' },
  'Community Star':   { icon: FiStar,   color: '#C837AB' },
  'Legend':           { icon: FiAward,  color: '#FF6B35' },
}

const initialUser = {
  name: 'Alex Neighbor',
  username: 'alexneighbor_07',
  neighborhood: 'Sunset District',
  city: 'Casablanca',
  avatar: 'https://i.pravatar.cc/150?img=5',
  bio: "Hi! I'm Alex, living in Sunset District. Love connecting with neighbors and helping out 🤝",
  languages: ['English', 'French'],
  favoriteCategories: ['Sport', 'Trading', 'Events'],
  offeredSkills: ['React', 'Python', 'UI Design'],
  wantedSkills: ['Guitar', 'Cooking'],
  verified: true,
  joinedAt: '2024-03-15',
  stats: {
    totalPostsCreated: 34,
    totalComments: 128,
    totalLikesReceived: 310,
    followers: 89,
    following: 64,
    profileViews: 1240,
  },
  helpSystem: {
    helpPoints: 420,
    level: 3,
    badge: 'Trusted Neighbor',
    lostAndFound: { resolved: 7, pointsEarned: 175 },
    swapSkills: { completedSwaps: 5 },
    trading: { successfulTrades: 8, rating: 4.7, reviews: 12 },
  },
}

// ── ANIMATED COUNTER ──────────────────────────────────────────────────────────

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    let current = 0
    const duration = 900
    const steps = 40
    const increment = value / steps
    clearInterval(ref.current)
    ref.current = setInterval(() => {
      current += increment
      if (current >= value) { setDisplay(value); clearInterval(ref.current) }
      else setDisplay(Math.floor(current))
    }, duration / steps)
    return () => clearInterval(ref.current)
  }, [value])
  return <span>{display.toLocaleString()}</span>
}

// ── STAT CARD ─────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, color }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-1 cursor-default transition-all duration-200"
      style={{
        backgroundColor: hovered ? `${color}08` : '#f9fafb',
        border: `1.5px solid ${hovered ? `${color}30` : 'transparent'}`,
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? `0 4px 20px ${color}15` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}${hovered ? '25' : '15'}` }}>
          <Icon size={14} style={{ color }} />
        </div>
        <span className="text-xs text-gray-400 font-medium">{label}</span>
      </div>
      <p className="text-2xl font-black text-gray-900">
        <AnimatedNumber value={value} />
      </p>
    </div>
  )
}

// ── SKILL TAG ─────────────────────────────────────────────────────────────────

function SkillTag({ label, color, onRemove, editing }) {
  return (
    <span
      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-150 hover:scale-105"
      style={{ color, borderColor: `${color}40`, backgroundColor: `${color}0d` }}
    >
      {label}
      {editing && (
        <button onClick={() => onRemove(label)} className="hover:opacity-60 transition-opacity ml-0.5">
          <FiX size={11} />
        </button>
      )}
    </span>
  )
}

// ── MAIN ──────────────────────────────────────────────────────────────────────

export default function ProfilePage({ onBack }) {
  const [user, setUser] = useState(initialUser)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(initialUser)
  const [activeTab, setActiveTab] = useState('overview')
  const [newSkill, setNewSkill] = useState({ offered: '', wanted: '' })
  const [hoveredStar, setHoveredStar] = useState(null)

  const levelPercent = Math.min((user.helpSystem.helpPoints % 200) / 200 * 100, 100)
  const badgeMeta = BADGE_META[user.helpSystem.badge] || BADGE_META['Trusted Neighbor']

  function handleSave() { setUser(draft); setEditing(false) }
  function handleCancel() { setDraft(user); setEditing(false) }

  function toggleCategory(label) {
    const has = draft.favoriteCategories.includes(label)
    setDraft(d => ({
      ...d,
      favoriteCategories: has ? d.favoriteCategories.filter(c => c !== label) : [...d.favoriteCategories, label],
    }))
  }

  function addSkill(type) {
    const val = newSkill[type].trim()
    if (!val) return
    const key = type === 'offered' ? 'offeredSkills' : 'wantedSkills'
    if (draft[key].includes(val)) return
    setDraft(d => ({ ...d, [key]: [...d[key], val] }))
    setNewSkill(s => ({ ...s, [type]: '' }))
  }

  function removeSkill(type, label) {
    const key = type === 'offered' ? 'offeredSkills' : 'wantedSkills'
    setDraft(d => ({ ...d, [key]: d[key].filter(s => s !== label) }))
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiGrid },
    { id: 'stats',    label: 'Stats',    icon: FiTrendingUp },
    { id: 'skills',   label: 'Skills',   icon: RiHandHeartLine },
  ]

  const displayUser = editing ? draft : user

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">

      {/* TOP BAR */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between">
        <button onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors group">
          <FiArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-150" />
          Back to Feed
        </button>
        {editing ? (
          <div className="flex items-center gap-2">
            <button onClick={handleCancel}
              className="px-4 py-2 text-sm rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors font-medium">
              Cancel
            </button>
            <button onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl text-white font-semibold hover:opacity-90 active:scale-95 transition-all"
              style={{ background: 'var(--gradient-qriblik)' }}>
              <FiCheck size={15} /> Save changes
            </button>
          </div>
        ) : (
          <button onClick={() => { setDraft(user); setEditing(true) }}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium">
            <FiEdit2 size={14} /> Edit profile
          </button>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 flex flex-col gap-6">

        {/* HERO CARD */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Banner */}
          <div className="relative h-28 w-full" style={{ background: 'var(--gradient-qriblik)' }}>
            {editing && (
              <button className="absolute inset-0 flex items-center justify-center bg-black/20 text-white text-xs font-bold gap-2 hover:bg-black/30 transition-colors">
                <FiCamera size={16} /> Change banner
              </button>
            )}
          </div>

          <div className="px-6 pb-6">
            {/* Avatar */}
            <div className="flex items-end justify-between -mt-12 mb-5">
              <div className="relative group inline-block">
                <div className="p-[3px] rounded-full bg-white shadow-lg inline-block">
                  <div className="p-[2px] rounded-full" style={{ background: 'var(--gradient-qriblik)' }}>
                    <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full object-cover block" />
                  </div>
                </div>
                {editing && (
                  <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <FiCamera size={18} className="text-white" />
                  </div>
                )}
              </div>
              {user.verified && (
                <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full text-white mb-1"
                  style={{ background: 'var(--gradient-qriblik)' }}>
                  <FiShield size={11} /> Verified
                </span>
              )}
            </div>

            {/* Name / Bio */}
            {editing ? (
              <div className="flex flex-col gap-3">
                <input
                  className="text-xl font-black text-gray-900 border-b-2 outline-none pb-1 w-full bg-transparent"
                  style={{ borderColor: '#8B3FDE' }}
                  value={draft.name}
                  onChange={e => setDraft(d => ({ ...d, name: e.target.value }))}
                  placeholder="Full name"
                />
                <textarea
                  className="text-sm text-gray-500 border rounded-xl p-3 outline-none resize-none w-full"
                  style={{ borderColor: '#8B3FDE44' }}
                  rows={2} maxLength={160}
                  value={draft.bio}
                  onChange={e => setDraft(d => ({ ...d, bio: e.target.value }))}
                />
                <p className="text-right text-[10px] text-gray-300 -mt-2">{draft.bio.length}/160</p>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    className="text-sm text-gray-600 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#8B3FDE] transition-colors"
                    value={draft.neighborhood}
                    onChange={e => setDraft(d => ({ ...d, neighborhood: e.target.value }))}
                    placeholder="Neighborhood"
                  />
                  <input
                    className="text-sm text-gray-600 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#8B3FDE] transition-colors"
                    value={draft.city}
                    onChange={e => setDraft(d => ({ ...d, city: e.target.value }))}
                    placeholder="City"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-black text-gray-900">{user.name}</h1>
                  <span className="text-sm text-gray-400">@{user.username}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{user.bio}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-400 flex-wrap">
                  <span className="flex items-center gap-1">
                    <FiMapPin size={11} style={{ color: '#C837AB' }} />
                    {user.neighborhood}, {user.city}
                  </span>
                  <span>Joined {new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
                {/* Follower pills */}
                <div className="flex items-center gap-3 mt-4">
                  {[
                    { label: 'Followers', val: user.stats.followers,          color: '#8B3FDE' },
                    { label: 'Following', val: user.stats.following,           color: '#C837AB' },
                    { label: 'Posts',     val: user.stats.totalPostsCreated,   color: '#FF6B35' },
                  ].map(item => (
                    <button key={item.label}
                      className="flex flex-col items-center px-4 py-2 rounded-2xl transition-all duration-150 hover:scale-105 cursor-pointer"
                      style={{ backgroundColor: `${item.color}0d`, border: `1px solid ${item.color}25` }}>
                      <span className="text-base font-black" style={{ color: item.color }}>{item.val}</span>
                      <span className="text-[10px] text-gray-400 font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-2xl">
          {tabs.map(tab => {
            const active = activeTab === tab.id
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  backgroundColor: active ? 'white' : 'transparent',
                  color: active ? '#8B3FDE' : '#9ca3af',
                  boxShadow: active ? '0 1px 6px rgba(139,63,222,0.12)' : 'none',
                }}>
                <tab.icon size={15} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* ── TAB: OVERVIEW ── */}
        {activeTab === 'overview' && (
          <>
            {/* Badge + Level */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{ background: 'var(--gradient-qriblik)' }}>
                    <badgeMeta.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-black text-gray-900">{user.helpSystem.badge}</p>
                    <p className="text-xs text-gray-400">Level {user.helpSystem.level} • {user.helpSystem.helpPoints} pts</p>
                  </div>
                </div>
                <span className="text-3xl font-black" style={{
                  background: 'var(--gradient-qriblik)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  Lv.{user.helpSystem.level}
                </span>
              </div>
              {/* Progress bar */}
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000 relative overflow-hidden"
                  style={{ width: `${levelPercent}%`, background: 'var(--gradient-qriblik)' }}>
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 mt-1.5">
                <span>{user.helpSystem.helpPoints} pts earned</span>
                <span>{user.helpSystem.helpPoints % 200}/200 to next level</span>
              </div>
              {/* Mini help stats */}
              <div className="grid grid-cols-3 gap-3 mt-5">
                {[
                  { label: 'Cases Resolved', value: user.helpSystem.lostAndFound.resolved,     color: '#FF6B35', icon: FiSearch },
                  { label: 'Skill Swaps',    value: user.helpSystem.swapSkills.completedSwaps, color: '#8B3FDE', icon: RiHandHeartLine },
                  { label: 'Trades Done',    value: user.helpSystem.trading.successfulTrades,  color: '#C837AB', icon: FiRepeat },
                ].map(item => (
                  <div key={item.label}
                    className="text-center rounded-2xl py-3 px-2 transition-all duration-150 hover:scale-105 cursor-default"
                    style={{ backgroundColor: `${item.color}0d`, border: `1px solid ${item.color}20` }}>
                    <item.icon size={16} style={{ color: item.color }} className="mx-auto mb-1" />
                    <p className="text-xl font-black" style={{ color: item.color }}><AnimatedNumber value={item.value} /></p>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-sm font-black text-gray-900 mb-1">
                {editing ? 'Choose your categories' : 'Favorite Categories'}
              </h2>
              {editing && <p className="text-xs text-gray-400 mb-4">Tap to toggle on or off</p>}
              {!editing && <div className="mb-4" />}
              <div className="flex flex-wrap gap-2">
                {ALL_CATEGORIES.map(cat => {
                  const active = displayUser.favoriteCategories.includes(cat.label)
                  return (
                    <button key={cat.label}
                      onClick={() => editing && toggleCategory(cat.label)}
                      disabled={!editing}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold transition-all duration-150"
                      style={{
                        color: active ? cat.color : '#9ca3af',
                        borderColor: active ? `${cat.color}50` : '#e5e7eb',
                        backgroundColor: active ? `${cat.color}0d` : 'transparent',
                        transform: editing ? 'scale(1)' : 'scale(1)',
                        cursor: editing ? 'pointer' : 'default',
                      }}
                      onMouseEnter={e => editing && (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={e => editing && (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      <cat.icon size={14} />
                      {cat.label}
                      {editing && active && <FiCheck size={12} />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Trading Reputation */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-sm font-black text-gray-900 mb-4">Trading Reputation</h2>
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-white shrink-0"
                  style={{ background: 'var(--gradient-qriblik)' }}>
                  <p className="text-xl font-black leading-none">{user.helpSystem.trading.rating}</p>
                  <FiStar size={12} className="mt-0.5" />
                </div>
                <div className="flex-1">
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FiStar key={i} size={20}
                        onMouseEnter={() => setHoveredStar(i + 1)}
                        onMouseLeave={() => setHoveredStar(null)}
                        className="cursor-pointer transition-transform hover:scale-125 duration-100"
                        style={{
                          color: i < (hoveredStar ?? Math.round(user.helpSystem.trading.rating)) ? '#FF6B35' : '#e5e7eb',
                          fill: i < (hoveredStar ?? Math.round(user.helpSystem.trading.rating)) ? '#FF6B35' : 'none',
                          transition: 'color 0.1s, fill 0.1s',
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 font-semibold">{user.helpSystem.trading.reviews} reviews</p>
                  <p className="text-xs text-gray-400 mt-0.5">{user.helpSystem.trading.successfulTrades} successful exchanges</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── TAB: STATS ── */}
        {activeTab === 'stats' && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <StatCard icon={FiGrid}           label="Posts Created"  value={user.stats.totalPostsCreated}  color="#8B3FDE" />
              <StatCard icon={FiHeart}          label="Likes Received" value={user.stats.totalLikesReceived} color="#C837AB" />
              <StatCard icon={FiMessageCircle}  label="Comments"       value={user.stats.totalComments}      color="#FF6B35" />
              <StatCard icon={FiUsers}          label="Profile Views"  value={user.stats.profileViews}       color="#8B3FDE" />
            </div>

            {/* Points breakdown bars */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-sm font-black text-gray-900 mb-5">Points Breakdown</h2>
              {[
                { label: 'Lost & Found Help', pts: user.helpSystem.lostAndFound.pointsEarned,          max: 250, color: '#FF6B35' },
                { label: 'Skill Swaps',       pts: user.helpSystem.swapSkills.completedSwaps * 30,     max: 200, color: '#8B3FDE' },
                { label: 'Trading',           pts: user.helpSystem.trading.successfulTrades * 15,      max: 200, color: '#C837AB' },
              ].map(row => (
                <div key={row.label} className="mb-4 last:mb-0">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-semibold text-gray-600">{row.label}</span>
                    <span className="font-black" style={{ color: row.color }}>{row.pts} pts</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(row.pts / row.max * 100, 100)}%`, backgroundColor: row.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: SKILLS ── */}
        {activeTab === 'skills' && (
          <div className="flex flex-col gap-4">
            {[
              { key: 'offered', label: 'Skills I Offer', color: '#8B3FDE', placeholder: 'e.g. React, Cooking…' },
              { key: 'wanted',  label: 'Skills I Want',  color: '#C837AB', placeholder: 'e.g. Guitar, Spanish…' },
            ].map(section => (
              <div key={section.key} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
                  <RiHandHeartLine size={16} style={{ color: section.color }} />
                  {section.label}
                </h2>
                <div className="flex flex-wrap gap-2 mb-4 min-h-[32px]">
                  {displayUser[section.key === 'offered' ? 'offeredSkills' : 'wantedSkills'].map(skill => (
                    <SkillTag key={skill} label={skill} color={section.color}
                      editing={editing} onRemove={(s) => removeSkill(section.key, s)} />
                  ))}
                  {displayUser[section.key === 'offered' ? 'offeredSkills' : 'wantedSkills'].length === 0 && (
                    <p className="text-xs text-gray-400 italic self-center">No skills added yet</p>
                  )}
                </div>
                {editing && (
                  <div className="flex gap-2">
                    <input
                      className="flex-1 text-sm px-3 py-2 rounded-xl border border-gray-200 outline-none transition-colors"
                      placeholder={section.placeholder}
                      value={newSkill[section.key]}
                      onChange={e => setNewSkill(s => ({ ...s, [section.key]: e.target.value }))}
                      onKeyDown={e => e.key === 'Enter' && addSkill(section.key)}
                      onFocus={e => e.target.style.borderColor = section.color}
                      onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                    />
                    <button onClick={() => addSkill(section.key)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white transition-opacity hover:opacity-80"
                      style={{ backgroundColor: section.color }}>
                      <FiPlus size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Languages */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-sm font-black text-gray-900 mb-4">Languages</h2>
              <div className="flex flex-wrap gap-2">
                {user.languages.map(lang => (
                  <span key={lang}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full border hover:scale-105 transition-transform cursor-default"
                    style={{ color: '#FF6B35', borderColor: '#FF6B3540', backgroundColor: '#FF6B350d' }}>
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}