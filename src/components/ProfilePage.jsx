import { useState, useEffect, useRef } from 'react'
import {
  FiArrowLeft, FiEdit2, FiCheck, FiMapPin, FiStar,
  FiHeart, FiMessageCircle, FiAward, FiUsers, FiGrid,
  FiSearch, FiRepeat, FiCalendar,
  FiX, FiPlus, FiCamera, FiTrendingUp, FiShield, FiZap, FiGift
} from 'react-icons/fi'
import { MdSportsSoccer } from 'react-icons/md'
import { RiHandHeartLine } from 'react-icons/ri'
import { FaCoins, FaSpotify, FaAmazon, FaPaypal } from "react-icons/fa";
import { SiNetflix } from "react-icons/si";
import { useTheme } from "../contexts/ThemeContext";


const ALL_CATEGORIES = [
  { label: 'Sport', icon: MdSportsSoccer, color: '#8B3FDE' },
  { label: 'Trading', icon: FiRepeat, color: '#C837AB' },
  { label: 'Lost and Found', icon: FiSearch, color: '#FF6B35' },
  { label: 'Swap Skills', icon: RiHandHeartLine, color: '#8B3FDE' },
  { label: 'Events', icon: FiCalendar, color: '#C837AB' },
]

const REDEEM_OPTIONS = [
  { id: 'spotify_1', label: 'Spotify Premium', period: '1 month', cost: 200, icon: FaSpotify, color: '#1DB954', bg: '#1DB95415' },
  { id: 'netflix_1', label: 'Netflix', period: '1 month', cost: 350, icon: SiNetflix, color: '#E50914', bg: '#E5091415' },
  { id: 'amazon_5', label: 'Amazon Gift Card', period: '$5', cost: 150, icon: FaAmazon, color: '#FF9900', bg: '#FF990015' },
  { id: 'paypal_5', label: 'PayPal Cash', period: '$5', cost: 180, icon: FaPaypal, color: '#003087', bg: '#00308715' },
]

const BADGE_META = {
  'Newcomer': { icon: FiZap, color: '#9ca3af' },
  'Helper': { icon: FiHeart, color: '#FF6B35' },
  'Trusted Neighbor': { icon: FiShield, color: '#8B3FDE' },
  'Community Star': { icon: FiStar, color: '#C837AB' },
  'Legend': { icon: FiAward, color: '#FF6B35' },
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
  stats: { totalPostsCreated: 34, totalComments: 128, totalLikesReceived: 310, followers: 89, following: 64, profileViews: 1240 },
  helpSystem: {
    helpPoints: 420, level: 3, badge: 'Trusted Neighbor',
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
    const steps = 40
    const increment = value / steps
    clearInterval(ref.current)
    ref.current = setInterval(() => {
      current += increment
      if (current >= value) { setDisplay(value); clearInterval(ref.current) }
      else setDisplay(Math.floor(current))
    }, 900 / steps)
    return () => clearInterval(ref.current)
  }, [value])
  return <span>{display.toLocaleString()}</span>
}

// ── STAT CARD ─────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, color }) {
  const { dark } = useTheme()
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-1 cursor-default transition-all duration-200"
      style={{
        backgroundColor: hovered ? `${color}08` : (dark ? '#1a0a2e' : '#f9fafb'),
        border: `1.5px solid ${hovered ? `${color}30` : (dark ? 'rgba(255,255,255,0.05)' : 'transparent')}`,
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
        <span className={`text-xs font-medium ${dark ? 'text-purple-300/50' : 'text-gray-400'}`}>{label}</span>
      </div>
      <p className={`text-2xl font-black ${dark ? 'text-purple-50' : 'text-gray-900'}`}>
        <AnimatedNumber value={value} />
      </p>
    </div>
  )
}

// ── SKILL TAG ─────────────────────────────────────────────────────────────────
function SkillTag({ label, color, onRemove, editing }) {
  return (
    <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-150 hover:scale-105"
      style={{ color, borderColor: `${color}40`, backgroundColor: `${color}0d` }}>
      {label}
      {editing && (
        <button onClick={() => onRemove(label)} className="hover:opacity-60 transition-opacity ml-0.5">
          <FiX size={11} />
        </button>
      )}
    </span>
  )
}

// ── CIRCULAR PROGRESS ─────────────────────────────────────────────────────────
function CircularProgress({ current, max, color, size = 80, strokeWidth = 7 }) {
  const { dark } = useTheme()
  const radius = (size - strokeWidth * 2) / 2
  const circumference = 2 * Math.PI * radius
  const pct = Math.min(current / max, 1)
  const [animated, setAnimated] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setAnimated(pct), 80)
    return () => clearTimeout(t)
  }, [pct])
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none"
        stroke={dark ? 'rgba(255,255,255,0.08)' : '#f3f4f6'} strokeWidth={strokeWidth} />
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round" strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - animated)}
        style={{ transition: 'stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1)' }} />
    </svg>
  )
}

// ── REWARD CARD ───────────────────────────────────────────────────────────────
function RewardCard({ reward, user, claimed, onClaim }) {
  const { dark } = useTheme()
  const { current, max } = reward.getProgress(user)
  const complete = current >= max
  const pct = Math.round((current / max) * 100)
  const dimColor = dark ? 'rgba(167,139,250,0.3)' : '#9ca3af'
  return (
    <div className="rounded-3xl border shadow-sm p-5 flex items-center gap-5 transition-all duration-200"
      style={{
        backgroundColor: dark ? '#1a0a2e' : 'white',
        borderColor: complete && !claimed ? `${reward.color}40` : (dark ? 'rgba(255,255,255,0.06)' : '#f3f4f6'),
      }}>
      <div className="relative shrink-0 flex items-center justify-center" style={{ width: 80, height: 80 }}>
        <CircularProgress current={current} max={max} color={reward.color} size={80} />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          <reward.icon size={16} style={{ color: claimed ? dimColor : reward.color }} />
          <span className="text-[11px] font-black" style={{ color: claimed ? dimColor : reward.color }}>
            {claimed ? '✓' : `${pct}%`}
          </span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className={`font-black text-sm ${dark ? 'text-purple-50' : 'text-gray-900'}`}>{reward.label}</p>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${reward.color}15`, color: reward.color }}>
            +{reward.xpReward} XP
          </span>
        </div>
        <p className={`text-xs mb-3 ${dark ? 'text-purple-300/50' : 'text-gray-400'}`}>{reward.description}</p>
        <div className={`h-1.5 rounded-full overflow-hidden ${dark ? 'bg-white/8' : 'bg-gray-100'}`}>
          <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: claimed ? dimColor : reward.color, transition: 'width 0.9s' }} />
        </div>
        <p className={`text-[10px] mt-1 ${dark ? 'text-purple-300/40' : 'text-gray-400'}`}>{current}/{max} completed</p>
      </div>
      <div className="shrink-0">
        {claimed ? (
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${dark ? 'bg-white/8' : 'bg-gray-100'}`}>
            <FiCheck size={15} style={{ color: dimColor }} />
          </div>
        ) : complete ? (
          <button onClick={() => onClaim(reward)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-xs font-black hover:opacity-90 active:scale-95 transition-all"
            style={{ background: `linear-gradient(135deg, ${reward.color}, ${reward.color}cc)` }}>
            <FaCoins size={11} /> Claim
          </button>
        ) : (
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${reward.color}10` }}>
            <FiZap size={14} style={{ color: `${reward.color}60` }} />
          </div>
        )}
      </div>
    </div>
  )
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function ProfilePage({ onBack }) {
  const { dark } = useTheme()
  const [user, setUser] = useState(initialUser)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(initialUser)
  const [activeTab, setActiveTab] = useState('overview')
  const [newSkill, setNewSkill] = useState({ offered: '', wanted: '' })
  const [hoveredStar, setHoveredStar] = useState(null)
  const [xp, setXp] = useState(0)
  const [claimedRewards, setClaimedRewards] = useState(new Set())
  const [redeemedIds, setRedeemedIds] = useState(new Set())
  const [showRedeemModal, setShowRedeemModal] = useState(false)

  const levelPercent = Math.min((user.helpSystem.helpPoints % 200) / 200 * 100, 100)
  const badgeMeta = BADGE_META[user.helpSystem.badge] || BADGE_META['Trusted Neighbor']

  // card / section bg shorthand
  const card = dark ? 'bg-[#150d27] border-white/6' : 'bg-white border-gray-100'

  function handleSave() { setUser(draft); setEditing(false) }
  function handleCancel() { setDraft(user); setEditing(false) }
  function toggleCategory(label) {
    const has = draft.favoriteCategories.includes(label)
    setDraft(d => ({ ...d, favoriteCategories: has ? d.favoriteCategories.filter(c => c !== label) : [...d.favoriteCategories, label] }))
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
  function handleClaim(reward) {
    if (claimedRewards.has(reward.id)) return
    setClaimedRewards(prev => new Set([...prev, reward.id]))
    setXp(prev => prev + reward.xpReward)
  }
  function handleRedeem(option) {
    setXp(prev => prev - option.cost)
    setRedeemedIds(prev => new Set([...prev, option.id]))
  }

  const REWARD_DEFINITIONS = [
    { id: 'trades', label: 'First Trades', description: 'Complete 5 trades', xpReward: 100, icon: FiRepeat, color: '#C837AB', getProgress: u => ({ current: Math.min(u.helpSystem.trading.successfulTrades, 5), max: 5 }) },
    { id: 'helper', label: 'Helper Badge', description: 'Resolve 5 lost & found', xpReward: 150, icon: FiSearch, color: '#FF6B35', getProgress: u => ({ current: Math.min(u.helpSystem.lostAndFound.resolved, 5), max: 5 }) },
    { id: 'swaps', label: 'Skill Sharer', description: 'Complete 3 skill swaps', xpReward: 120, icon: RiHandHeartLine, color: '#8B3FDE', getProgress: u => ({ current: Math.min(u.helpSystem.swapSkills.completedSwaps, 3), max: 3 }) },
    { id: 'social', label: 'Social Butterfly', description: 'Reach 80 followers', xpReward: 80, icon: FiUsers, color: '#C837AB', getProgress: u => ({ current: Math.min(u.stats.followers, 80), max: 80 }) },
    { id: 'comments', label: 'Community Voice', description: 'Leave 100 comments', xpReward: 90, icon: FiMessageCircle, color: '#8B3FDE', getProgress: u => ({ current: Math.min(u.stats.totalComments, 100), max: 100 }) },
    { id: 'posts', label: 'Content Creator', description: 'Create 30 posts', xpReward: 110, icon: FiGrid, color: '#FF6B35', getProgress: u => ({ current: Math.min(u.stats.totalPostsCreated, 30), max: 30 }) },
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiGrid },
    { id: 'stats', label: 'Stats', icon: FiTrendingUp },
    { id: 'skills', label: 'Skills', icon: RiHandHeartLine },
    { id: 'reword', label: 'Reward', icon: FaCoins },
  ]

  const displayUser = editing ? draft : user

  // ── REDEEM MODAL ─────────────────────────────────────────────────────────────
  function RedeemModal({ xp, onClose, onRedeem, redeemedIds }) {
    const { dark } = useTheme()
    const [confirming, setConfirming] = useState(null)
    const [success, setSuccess] = useState(null)

    function handleConfirm(option) { if (xp >= option.cost) setConfirming(option) }
    function handleFinalRedeem() {
      onRedeem(confirming); setSuccess(confirming); setConfirming(null)
      setTimeout(() => setSuccess(null), 3000)
    }

    return (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
        onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
          style={{
            maxHeight: '85vh',
            backgroundColor: dark ? '#1a0a2e' : 'white',
            border: dark ? '1px solid rgba(139,63,222,0.2)' : 'none',
          }}>
          {/* Header */}
          <div className={`px-6 pt-6 pb-4 flex items-center justify-between border-b ${dark ? 'border-white/8' : 'border-gray-100'}`}>
            <div>
              <h2 className={`text-base font-black flex items-center gap-2 ${dark ? 'text-purple-50' : 'text-gray-900'}`}>
                <FiGift size={16} style={{ color: '#C837AB' }} /> Spend your XP
              </h2>
              <p className={`text-xs mt-0.5 ${dark ? 'text-purple-300/50' : 'text-gray-400'}`}>
                You have <span className="font-black" style={{ color: '#C837AB' }}>{xp} XP</span> available
              </p>
            </div>
            <button onClick={onClose}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${dark ? 'bg-white/8 hover:bg-white/12 text-purple-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'}`}>
              <FiX size={15} />
            </button>
          </div>

          {success && (
            <div className="mx-4 mt-4 px-4 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2"
              style={{ backgroundColor: '#1DB95415', color: '#1DB954', border: '1px solid #1DB95430' }}>
              <FiCheck size={15} />
              <span><strong>{success.label} ({success.period})</strong> code sent to your email!</span>
            </div>
          )}

          {confirming && (
            <div className="mx-4 mt-4 p-4 rounded-2xl border-2 flex flex-col gap-3"
              style={{ borderColor: `${confirming.color}40`, backgroundColor: dark ? `${confirming.color}12` : `${confirming.color}08` }}>
              <div className="flex items-center gap-3">
                <confirming.icon size={24} style={{ color: confirming.color }} />
                <div>
                  <p className={`font-black text-sm ${dark ? 'text-purple-50' : 'text-gray-900'}`}>{confirming.label} — {confirming.period}</p>
                  <p className={`text-xs ${dark ? 'text-purple-300/50' : 'text-gray-500'}`}>
                    Deducts <strong style={{ color: confirming.color }}>{confirming.cost} XP</strong> from your balance
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setConfirming(null)}
                  className={`flex-1 py-2 rounded-xl border text-sm font-semibold transition-colors ${dark ? 'border-white/10 text-purple-300 hover:bg-white/5' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                  Cancel
                </button>
                <button onClick={handleFinalRedeem}
                  className="flex-1 py-2 rounded-xl text-white text-sm font-black hover:opacity-90 active:scale-95 transition-all"
                  style={{ backgroundColor: confirming.color }}>
                  Confirm Redeem
                </button>
              </div>
            </div>
          )}

          <div className="overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ maxHeight: '55vh' }}>
            {REDEEM_OPTIONS.map(option => {
              const canAfford = xp >= option.cost
              const alreadyRedeemed = redeemedIds.has(option.id)
              return (
                <div key={option.id}
                  className="flex items-center gap-4 p-4 rounded-2xl border transition-all duration-150"
                  style={{
                    borderColor: alreadyRedeemed ? (dark ? 'rgba(255,255,255,0.05)' : '#e5e7eb') : canAfford ? `${option.color}30` : (dark ? 'rgba(255,255,255,0.04)' : '#f3f4f6'),
                    backgroundColor: alreadyRedeemed ? (dark ? 'rgba(255,255,255,0.02)' : '#f9fafb') : (dark ? `${option.color}10` : option.bg),
                    opacity: alreadyRedeemed ? 0.55 : 1,
                  }}>
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${option.color}20` }}>
                    <option.icon size={22} style={{ color: option.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-black text-sm ${dark ? 'text-purple-50' : 'text-gray-900'}`}>{option.label}</p>
                    <p className={`text-xs ${dark ? 'text-purple-300/50' : 'text-gray-400'}`}>{option.period}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <FaCoins size={10} style={{ color: option.color }} />
                      <span className="text-xs font-black" style={{ color: option.color }}>{option.cost} XP</span>
                      {!canAfford && !alreadyRedeemed && (
                        <span className={`text-[10px] ${dark ? 'text-purple-300/40' : 'text-gray-400'}`}>· need {option.cost - xp} more</span>
                      )}
                    </div>
                  </div>
                  {alreadyRedeemed ? (
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${dark ? 'bg-white/8' : 'bg-gray-100'}`}>
                      <FiCheck size={13} className={dark ? 'text-purple-300/40' : 'text-gray-400'} />
                    </div>
                  ) : (
                    <button onClick={() => handleConfirm(option)} disabled={!canAfford}
                      className="px-3 py-1.5 rounded-xl text-xs font-black transition-all active:scale-95"
                      style={{
                        backgroundColor: canAfford ? option.color : (dark ? 'rgba(255,255,255,0.06)' : '#f3f4f6'),
                        color: canAfford ? 'white' : (dark ? 'rgba(167,139,250,0.35)' : '#9ca3af'),
                        cursor: canAfford ? 'pointer' : 'not-allowed',
                      }}>
                      Redeem
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // ── RENDER ────────────────────────────────────────────────────────────────────
  return (
    <div className={`flex-1 min-h-screen overflow-y-auto transition-colors duration-500 ${dark ? 'bg-[#0f0a1e]' : 'bg-gray-50'}`}>

      {showRedeemModal && (
        <RedeemModal xp={xp} onClose={() => setShowRedeemModal(false)} onRedeem={handleRedeem} redeemedIds={redeemedIds} />
      )}

      {/* TOP BAR */}
      <div className={`sticky top-0 z-40 border-b px-6 py-3 flex items-center justify-between transition-colors duration-500 ${dark ? 'bg-[#0d0719] border-white/5' : 'bg-white border-gray-100'}`}>
        <button onClick={onBack}
          className={`flex items-center gap-2 text-sm font-semibold transition-colors group ${dark ? 'text-purple-300/60 hover:text-purple-200' : 'text-gray-500 hover:text-gray-800'}`}>
          <FiArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-150" />
          Back to Feed
        </button>

        <div className="flex items-center gap-2 px-4 h-10 rounded-2xl border font-black text-sm"
          style={{
            borderColor: xp > 0 ? '#C837AB40' : (dark ? 'rgba(255,255,255,0.08)' : '#e5e7eb'),
            color: xp > 0 ? '#C837AB' : (dark ? 'rgba(167,139,250,0.4)' : '#9ca3af'),
            backgroundColor: xp > 0 ? '#C837AB08' : (dark ? 'rgba(255,255,255,0.03)' : '#f9fafb'),
          }}>
          <FaCoins size={13} /> {xp} XP
        </div>

        {editing ? (
          <div className="flex items-center gap-2">
            <button onClick={handleCancel}
              className={`px-4 py-2 text-sm rounded-xl border font-medium transition-colors ${dark ? 'border-white/10 text-purple-300 hover:bg-white/5' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
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
            className={`flex items-center gap-2 px-4 py-2 text-sm rounded-xl border font-medium transition-colors ${dark ? 'border-white/10 text-purple-300 hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            <FiEdit2 size={14} /> Edit profile
          </button>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 pt-20 flex flex-col gap-6">

        {/* HERO CARD */}
        <div className={`rounded-3xl border shadow-sm overflow-hidden transition-colors duration-500 ${card}`}>
          <div className="relative h-28 w-full" style={{ background: 'var(--gradient-qriblik)' }}>
            {editing && (
              <button className="absolute inset-0 flex items-center justify-center bg-black/20 text-white text-xs font-bold gap-2 hover:bg-black/30 transition-colors">
                <FiCamera size={16} /> Change banner
              </button>
            )}
          </div>

          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-12 mb-5">
              <div className="relative group inline-block">
                <div className={`p-[3px] rounded-full shadow-lg inline-block ${dark ? 'bg-[#150d27]' : 'bg-white'}`}>
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

            {editing ? (
              <div className="flex flex-col gap-3">
                <input
                  className={`text-xl font-black border-b-2 outline-none pb-1 w-full bg-transparent ${dark ? 'text-purple-50 placeholder-purple-300/30' : 'text-gray-900'}`}
                  style={{ borderColor: '#8B3FDE' }}
                  value={draft.name}
                  onChange={e => setDraft(d => ({ ...d, name: e.target.value }))}
                  placeholder="Full name"
                />
                <textarea
                  className={`text-sm border rounded-xl p-3 outline-none resize-none w-full ${dark ? 'bg-white/5 text-purple-200 placeholder-purple-300/30' : 'bg-white text-gray-500'}`}
                  style={{ borderColor: dark ? 'rgba(139,63,222,0.3)' : '#8B3FDE44' }}
                  rows={2} maxLength={160}
                  value={draft.bio}
                  onChange={e => setDraft(d => ({ ...d, bio: e.target.value }))}
                />
                <p className={`text-right text-[10px] -mt-2 ${dark ? 'text-purple-300/30' : 'text-gray-300'}`}>{draft.bio.length}/160</p>
                <div className="grid grid-cols-2 gap-3">
                  {['neighborhood', 'city'].map(field => (
                    <input key={field}
                      className={`text-sm border rounded-xl px-3 py-2 outline-none transition-colors ${dark ? 'bg-white/5 text-purple-200 border-white/10 placeholder-purple-300/30' : 'text-gray-600 border-gray-200'}`}
                      value={draft[field]}
                      onChange={e => setDraft(d => ({ ...d, [field]: e.target.value }))}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      onFocus={e => e.target.style.borderColor = '#8B3FDE'}
                      onBlur={e => e.target.style.borderColor = dark ? 'rgba(255,255,255,0.1)' : '#e5e7eb'}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className={`text-xl font-black ${dark ? 'text-purple-50' : 'text-gray-900'}`}>{user.name}</h1>
                  <span className={`text-sm ${dark ? 'text-purple-300/50' : 'text-gray-400'}`}>@{user.username}</span>
                </div>
                <p className={`text-sm mt-1.5 leading-relaxed ${dark ? 'text-purple-200/60' : 'text-gray-500'}`}>{user.bio}</p>
                <div className={`flex items-center gap-4 mt-3 text-xs flex-wrap ${dark ? 'text-purple-300/40' : 'text-gray-400'}`}>
                  <span className="flex items-center gap-1">
                    <FiMapPin size={11} style={{ color: '#C837AB' }} />
                    {user.neighborhood}, {user.city}
                  </span>
                  <span>Joined {new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  {[
                    { label: 'Followers', val: user.stats.followers, color: '#8B3FDE' },
                    { label: 'Following', val: user.stats.following, color: '#C837AB' },
                    { label: 'Posts', val: user.stats.totalPostsCreated, color: '#FF6B35' },
                  ].map(item => (
                    <button key={item.label}
                      className="flex flex-col items-center px-4 py-2 rounded-2xl transition-all duration-150 hover:scale-105 cursor-pointer"
                      style={{ backgroundColor: `${item.color}0d`, border: `1px solid ${item.color}25` }}>
                      <span className="text-base font-black" style={{ color: item.color }}>{item.val}</span>
                      <span className={`text-[10px] font-medium ${dark ? 'text-purple-300/40' : 'text-gray-400'}`}>{item.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* TABS */}
        <div className={`flex gap-1 p-1 rounded-2xl ${dark ? 'bg-white/5' : 'bg-gray-100'}`}>
          {tabs.map(tab => {
            const active = activeTab === tab.id
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  backgroundColor: active ? (dark ? '#1a0a2e' : 'white') : 'transparent',
                  color: active ? '#8B3FDE' : (dark ? 'rgba(167,139,250,0.4)' : '#9ca3af'),
                  boxShadow: active ? `0 1px 6px rgba(139,63,222,${dark ? '0.25' : '0.12'})` : 'none',
                }}>
                <tab.icon size={15} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* ── TAB: REWARD ── */}
        {activeTab === 'reword' && (
          <div className="flex flex-col gap-4">
            <div className={`rounded-3xl border shadow-sm p-5 flex items-center justify-between transition-colors duration-500 ${card}`}>
              <div>
                <h2 className={`text-sm font-black ${dark ? 'text-purple-50' : 'text-gray-900'}`}>Your XP Balance</h2>
                <p className={`text-xs mt-0.5 ${dark ? 'text-purple-300/50' : 'text-gray-400'}`}>{claimedRewards.size} of {REWARD_DEFINITIONS.length} rewards claimed</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl text-white font-black" style={{ background: 'var(--gradient-qriblik)' }}>
                <FaCoins size={14} /> {xp} XP
              </div>
            </div>

            <button onClick={() => setShowRedeemModal(true)} disabled={xp === 0}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-black transition-all active:scale-[0.98]"
              style={{
                background: xp > 0 ? 'var(--gradient-qriblik)' : undefined,
                backgroundColor: xp === 0 ? (dark ? 'rgba(255,255,255,0.05)' : '#f3f4f6') : undefined,
                color: xp > 0 ? 'white' : (dark ? 'rgba(167,139,250,0.3)' : '#9ca3af'),
                cursor: xp === 0 ? 'not-allowed' : 'pointer',
              }}>
              <FiGift size={15} />
              {xp === 0 ? 'Earn XP to unlock rewards' : `Spend ${xp} XP on rewards`}
            </button>

            <div className="flex flex-col gap-3">
              {REWARD_DEFINITIONS.map(reward => (
                <RewardCard key={reward.id} reward={reward} user={user} claimed={claimedRewards.has(reward.id)} onClaim={handleClaim} />
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: OVERVIEW ── */}
        {activeTab === 'overview' && (
          <>
            {/* Badge + Level */}
            <div className={`rounded-3xl border shadow-sm p-6 transition-colors duration-500 ${card}`}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: 'var(--gradient-qriblik)' }}>
                    <badgeMeta.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <p className={`font-black ${dark ? 'text-purple-50' : 'text-gray-900'}`}>{user.helpSystem.badge}</p>
                    <p className={`text-xs ${dark ? 'text-purple-300/50' : 'text-gray-400'}`}>Level {user.helpSystem.level} • {user.helpSystem.helpPoints} pts</p>
                  </div>
                </div>
                <span className="text-3xl font-black" style={{ background: 'var(--gradient-qriblik)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Lv.{user.helpSystem.level}
                </span>
              </div>

              <div className={`h-3 rounded-full overflow-hidden ${dark ? 'bg-white/8' : 'bg-gray-100'}`}>
                <div className="h-full rounded-full transition-all duration-1000 relative overflow-hidden"
                  style={{ width: `${levelPercent}%`, background: 'var(--gradient-qriblik)' }}>
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>
              <div className={`flex justify-between text-[10px] mt-1.5 ${dark ? 'text-purple-300/40' : 'text-gray-400'}`}>
                <span>{user.helpSystem.helpPoints} pts earned</span>
                <span>{user.helpSystem.helpPoints % 200}/200 to next level</span>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-5">
                {[
                  { label: 'Cases Resolved', value: user.helpSystem.lostAndFound.resolved, color: '#FF6B35', icon: FiSearch },
                  { label: 'Skill Swaps', value: user.helpSystem.swapSkills.completedSwaps, color: '#8B3FDE', icon: RiHandHeartLine },
                  { label: 'Trades Done', value: user.helpSystem.trading.successfulTrades, color: '#C837AB', icon: FiRepeat },
                ].map(item => (
                  <div key={item.label}
                    className="text-center rounded-2xl py-3 px-2 transition-all duration-150 hover:scale-105 cursor-default"
                    style={{ backgroundColor: `${item.color}0d`, border: `1px solid ${item.color}20` }}>
                    <item.icon size={16} style={{ color: item.color }} className="mx-auto mb-1" />
                    <p className="text-xl font-black" style={{ color: item.color }}><AnimatedNumber value={item.value} /></p>
                    <p className={`text-[10px] mt-0.5 leading-tight ${dark ? 'text-purple-300/40' : 'text-gray-400'}`}>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className={`rounded-3xl border shadow-sm p-6 transition-colors duration-500 ${card}`}>
              <h2 className={`text-sm font-black mb-1 ${dark ? 'text-purple-50' : 'text-gray-900'}`}>
                {editing ? 'Choose your categories' : 'Favorite Categories'}
              </h2>
              {editing && <p className={`text-xs mb-4 ${dark ? 'text-purple-300/40' : 'text-gray-400'}`}>Tap to toggle on or off</p>}
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
                        color: active ? cat.color : (dark ? 'rgba(167,139,250,0.35)' : '#9ca3af'),
                        borderColor: active ? `${cat.color}50` : (dark ? 'rgba(255,255,255,0.08)' : '#e5e7eb'),
                        backgroundColor: active ? `${cat.color}0d` : 'transparent',
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
            <div className={`rounded-3xl border shadow-sm p-6 transition-colors duration-500 ${card}`}>
              <h2 className={`text-sm font-black mb-4 ${dark ? 'text-purple-50' : 'text-gray-900'}`}>Trading Reputation</h2>
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
                          color: i < (hoveredStar ?? Math.round(user.helpSystem.trading.rating)) ? '#FF6B35' : (dark ? 'rgba(255,255,255,0.1)' : '#e5e7eb'),
                          fill: i < (hoveredStar ?? Math.round(user.helpSystem.trading.rating)) ? '#FF6B35' : 'none',
                          transition: 'color 0.1s, fill 0.1s',
                        }}
                      />
                    ))}
                  </div>
                  <p className={`text-sm font-semibold ${dark ? 'text-purple-100' : 'text-gray-700'}`}>{user.helpSystem.trading.reviews} reviews</p>
                  <p className={`text-xs mt-0.5 ${dark ? 'text-purple-300/40' : 'text-gray-400'}`}>{user.helpSystem.trading.successfulTrades} successful exchanges</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── TAB: STATS ── */}
        {activeTab === 'stats' && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <StatCard icon={FiGrid} label="Posts Created" value={user.stats.totalPostsCreated} color="#8B3FDE" />
              <StatCard icon={FiHeart} label="Likes Received" value={user.stats.totalLikesReceived} color="#C837AB" />
              <StatCard icon={FiMessageCircle} label="Comments" value={user.stats.totalComments} color="#FF6B35" />
              <StatCard icon={FiUsers} label="Profile Views" value={user.stats.profileViews} color="#8B3FDE" />
            </div>

            <div className={`rounded-3xl border shadow-sm p-6 transition-colors duration-500 ${card}`}>
              <h2 className={`text-sm font-black mb-5 ${dark ? 'text-purple-50' : 'text-gray-900'}`}>Points Breakdown</h2>
              {[
                { label: 'Lost & Found Help', pts: user.helpSystem.lostAndFound.pointsEarned, max: 250, color: '#FF6B35' },
                { label: 'Skill Swaps', pts: user.helpSystem.swapSkills.completedSwaps * 30, max: 200, color: '#8B3FDE' },
                { label: 'Trading', pts: user.helpSystem.trading.successfulTrades * 15, max: 200, color: '#C837AB' },
              ].map(row => (
                <div key={row.label} className="mb-4 last:mb-0">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className={`font-semibold ${dark ? 'text-purple-200/60' : 'text-gray-600'}`}>{row.label}</span>
                    <span className="font-black" style={{ color: row.color }}>{row.pts} pts</span>
                  </div>
                  <div className={`h-2.5 rounded-full overflow-hidden ${dark ? 'bg-white/8' : 'bg-gray-100'}`}>
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
              { key: 'wanted', label: 'Skills I Want', color: '#C837AB', placeholder: 'e.g. Guitar, Spanish…' },
            ].map(section => (
              <div key={section.key} className={`rounded-3xl border shadow-sm p-6 transition-colors duration-500 ${card}`}>
                <h2 className={`text-sm font-black mb-4 flex items-center gap-2 ${dark ? 'text-purple-50' : 'text-gray-900'}`}>
                  <RiHandHeartLine size={16} style={{ color: section.color }} />
                  {section.label}
                </h2>
                <div className="flex flex-wrap gap-2 mb-4 min-h-[32px]">
                  {displayUser[section.key === 'offered' ? 'offeredSkills' : 'wantedSkills'].map(skill => (
                    <SkillTag key={skill} label={skill} color={section.color} editing={editing} onRemove={(s) => removeSkill(section.key, s)} />
                  ))}
                  {displayUser[section.key === 'offered' ? 'offeredSkills' : 'wantedSkills'].length === 0 && (
                    <p className={`text-xs italic self-center ${dark ? 'text-purple-300/30' : 'text-gray-400'}`}>No skills added yet</p>
                  )}
                </div>
                {editing && (
                  <div className="flex gap-2">
                    <input
                      className={`flex-1 text-sm px-3 py-2 rounded-xl border outline-none transition-colors ${dark ? 'bg-white/5 text-purple-200 border-white/10 placeholder-purple-300/30' : 'border-gray-200 text-gray-700'}`}
                      placeholder={section.placeholder}
                      value={newSkill[section.key]}
                      onChange={e => setNewSkill(s => ({ ...s, [section.key]: e.target.value }))}
                      onKeyDown={e => e.key === 'Enter' && addSkill(section.key)}
                      onFocus={e => e.target.style.borderColor = section.color}
                      onBlur={e => e.target.style.borderColor = dark ? 'rgba(255,255,255,0.1)' : '#e5e7eb'}
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
            <div className={`rounded-3xl border shadow-sm p-6 transition-colors duration-500 ${card}`}>
              <h2 className={`text-sm font-black mb-4 ${dark ? 'text-purple-50' : 'text-gray-900'}`}>Languages</h2>
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