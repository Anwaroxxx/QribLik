import { useState, useRef, useEffect, useCallback } from 'react'
import {
  FiX, FiImage, FiMapPin, FiChevronDown, FiSearch,
  FiRepeat, FiCalendar, FiTrash2, FiEdit3, FiCheck,
  FiAlertTriangle, FiArrowLeft, FiSend, FiRefreshCw, FiChevronUp,
} from 'react-icons/fi'
import { MdSportsSoccer } from 'react-icons/md'
import { RiHandHeartLine, RiSparklingLine } from 'react-icons/ri'
import { useTheme } from '../contexts/ThemeContext'

const CATEGORIES = [
  { label: 'Sport',          icon: MdSportsSoccer,  color: '#8B3FDE' },
  { label: 'Trading',        icon: FiRepeat,         color: '#C837AB' },
  { label: 'Lost and Found', icon: FiSearch,         color: '#FF6B35' },
  { label: 'Swap Skills',    icon: RiHandHeartLine,  color: '#8B3FDE' },
  { label: 'Events',         icon: FiCalendar,       color: '#C837AB' },
]

const CATEGORY_AI_CONTEXT = {
  Sport: {
    emoji: '⚽', tagline: 'Your sports matchmaker', color: '#8B3FDE',
    prompts: ['Looking for a football teammate this weekend', 'Tennis partner for Saturday morning', 'Join a yoga session in the park', 'Basketball 3v3 tournament this Friday'],
    systemPrompt: `You help write SPORT posts for QribLik neighborhood app. Include sport, when, where, skill level, people needed. Under 150 words. Friendly tone.
STRICT: title < 75 chars, description < 270 chars.
Return ONLY: TITLE\n\nDESCRIPTION`,
  },
  Trading: {
    emoji: '🔄', tagline: 'Your swap negotiator', color: '#C837AB',
    prompts: ['Trade old laptop for bicycle', 'Winter clothes for kitchen appliances', 'Swap guitar for photography gear', 'Pastries for gardening tools'],
    systemPrompt: `You help write TRADING posts for QribLik. Include what offered, what wanted, flexibility. Barter only, no prices. Under 150 words.
STRICT: title < 75 chars, description < 270 chars.
Return ONLY: TITLE\n\nDESCRIPTION`,
  },
  'Lost and Found': {
    emoji: '🔍', tagline: 'Your search helper', color: '#FF6B35',
    prompts: ['Lost black cat near central market', 'Found keys near the park', 'Lost blue backpack on metro', 'Found phone near Café Central'],
    systemPrompt: `You help write LOST AND FOUND posts for QribLik. Include item description, location, when, how to contact. Under 120 words.
STRICT: title < 75 chars, description < 270 chars.
Return ONLY: TITLE\n\nDESCRIPTION`,
  },
  'Swap Skills': {
    emoji: '🌟', tagline: 'Your skill connector', color: '#8B3FDE',
    prompts: ['Teach French for cooking lessons', 'Web design for photography skills', 'Learn guitar, offer math tutoring', 'Coding for Arabic language practice'],
    systemPrompt: `You help write SWAP SKILLS posts for QribLik. Include skill offered, skill wanted, format, who you're looking for. Warm tone. Under 150 words.
STRICT: title < 75 chars, description < 270 chars.
Return ONLY: TITLE\n\nDESCRIPTION`,
  },
  Events: {
    emoji: '🎉', tagline: 'Your event promoter', color: '#C837AB',
    prompts: ['Neighborhood cleanup this Sunday', 'Book club meeting next Thursday', 'Street food festival this weekend', 'Free photography workshop Saturday'],
    systemPrompt: `You help write EVENT posts for QribLik. Include event name, date/time, location, who it's for, what to expect. Energetic tone. Under 150 words.
STRICT: title < 75 chars, description < 270 chars.
Return ONLY: TITLE\n\nDESCRIPTION`,
  },
}

function getCurrentUser() {
  try {
    const s = JSON.parse(localStorage.getItem('qriblikUser') || localStorage.getItem('findmeUser') || '{}')
    return {
      name: s.name || `${s.firstName || ''} ${s.lastName || ''}`.trim() || 'Anonymous',
      neighborhood: s.neighborhood || 'Your Neighborhood',
      avatar: s.avatar || null,
    }
  } catch { return { name: 'Anonymous', neighborhood: 'Your Neighborhood', avatar: null } }
}

async function callGroq(systemPrompt, userMessage, onChunk) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userMessage }],
      max_tokens: 300, temperature: 0.8, stream: true,
    }),
  })
  if (!res.ok) throw new Error(`Groq error: ${res.status}`)
  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = '', fullText = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''
    for (const line of lines) {
      const t = line.trim()
      if (!t || t === 'data: [DONE]' || !t.startsWith('data: ')) continue
      try {
        const delta = JSON.parse(t.slice(6)).choices?.[0]?.delta?.content ?? ''
        if (delta) { fullText += delta; onChunk(fullText) }
      } catch {}
    }
  }
  return fullText
}

function CircleProgress({ value, max, color, dark }) {
  const pct  = Math.min(value / max, 1)
  const r    = 10, circ = 2 * Math.PI * r
  const nearLimit = pct > 0.85
  return (
    <svg width="28" height="28" viewBox="0 0 28 28">
      <circle cx="14" cy="14" r={r} fill="none" stroke={dark ? 'rgba(255,255,255,0.08)' : '#f3f4f6'} strokeWidth="2.5" />
      <circle cx="14" cy="14" r={r} fill="none"
        stroke={nearLimit ? '#FF6B35' : color} strokeWidth="2.5"
        strokeDasharray={`${circ * pct} ${circ}`} strokeLinecap="round"
        transform="rotate(-90 14 14)"
        style={{ transition: 'stroke-dasharray .2s ease, stroke .2s ease' }} />
      {nearLimit && <text x="14" y="18" textAnchor="middle" fontSize="7.5" fill="#FF6B35" fontWeight="bold">{max - value}</text>}
    </svg>
  )
}

// ── AI PANEL ──────────────────────────────────────────────────────────────────
function AIPanel({ category, onApply, onClose }) {
  const [mode,        setMode]   = useState('idle')
  const [streamText,  setStream] = useState('')
  const [customInput, setCustom] = useState('')
  const [activeIdx,   setActive] = useState(null)
  const abortRef = useRef(false)
  const ctx = CATEGORY_AI_CONTEXT[category?.label] ?? null

  useEffect(() => { setMode('idle'); setStream(''); setCustom(''); setActive(null) }, [category?.label])

  const run = useCallback(async (userMsg, idx) => {
    if (!ctx) return
    abortRef.current = false
    setActive(idx); setMode('thinking'); setStream('')
    await new Promise(r => setTimeout(r, 350))
    if (abortRef.current) return
    setMode('streaming')
    try { await callGroq(ctx.systemPrompt, userMsg, c => { if (!abortRef.current) setStream(c) }); setMode('done') }
    catch { setMode('error') }
  }, [ctx])

  const cancel = () => { abortRef.current = true; setMode('idle'); setStream('') }

  const parsed = (() => {
    const parts = streamText.split(/\n\n+/)
    return parts.length >= 2 ? { title: parts[0].trim(), desc: parts.slice(1).join('\n\n').trim() } : { title: streamText.trim(), desc: '' }
  })()

  if (!ctx) return null

  const ac = ctx.color
  const isLoading = mode === 'thinking' || mode === 'streaming'

  return (
    <div style={{ background: 'linear-gradient(160deg,#0f0a1e 0%,#1a0f2e 50%,#0d0820 100%)', display:'flex', flexDirection:'column', height:'100%', position:'relative', overflow:'hidden' }}>
      {/* Glows */}
      <div style={{ position:'absolute', top:-50, right:-50, width:160, height:160, borderRadius:'50%', background:`radial-gradient(circle,${ac}35 0%,transparent 70%)`, pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:-30, left:-30, width:120, height:120, borderRadius:'50%', background:'radial-gradient(circle,#C837AB25 0%,transparent 70%)', pointerEvents:'none' }} />

      {/* Header */}
      <div style={{ padding:'14px 14px 12px', borderBottom:'1px solid rgba(255,255,255,0.07)', display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative', zIndex:1 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:28, height:28, borderRadius:8, background:`linear-gradient(135deg,${ac},#C837AB)`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 0 12px ${ac}60` }}>
            <RiSparklingLine size={14} color="#fff" />
          </div>
          <div>
            <p style={{ fontSize:12, fontWeight:800, color:'#f1f0ff', lineHeight:1 }}>AI Assistant</p>
            <p style={{ fontSize:10, color:ac, fontWeight:600, lineHeight:1.4 }}>{ctx.tagline}</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} style={{ background:'rgba(255,255,255,0.08)', border:'none', borderRadius:8, width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'rgba(255,255,255,0.5)' }}>
            <FiX size={13} />
          </button>
        )}
      </div>

      {/* Body */}
      <div style={{ flex:1, overflowY:'auto', padding:'10px 12px', display:'flex', flexDirection:'column', gap:8, position:'relative', zIndex:1 }}>
        {/* Quick prompts */}
        <p style={{ fontSize:9, fontWeight:700, color:'rgba(255,255,255,0.3)', textTransform:'uppercase', letterSpacing:'1px', margin:'0 0 2px' }}>Quick ideas</p>
        {ctx.prompts.map((p, i) => (
          <button key={i} onClick={() => !isLoading && run(p, i)} disabled={isLoading}
            style={{
              textAlign:'left', background: activeIdx===i ? `${ac}25` : 'rgba(255,255,255,0.04)',
              border:`1px solid ${activeIdx===i ? ac+'60' : 'rgba(255,255,255,0.08)'}`,
              borderRadius:10, padding:'7px 10px',
              color: activeIdx===i ? '#fff' : 'rgba(255,255,255,0.6)',
              fontSize:11, cursor: isLoading ? 'not-allowed' : 'pointer',
              display:'flex', alignItems:'center', gap:6,
              opacity: isLoading && activeIdx!==i ? 0.4 : 1, transition:'all .15s',
            }}>
            <span style={{ fontSize:13, flexShrink:0 }}>{ctx.emoji}</span>
            <span style={{ lineHeight:1.35 }}>{p}</span>
          </button>
        ))}

        {/* Custom input */}
        <p style={{ fontSize:9, fontWeight:700, color:'rgba(255,255,255,0.3)', textTransform:'uppercase', letterSpacing:'1px', marginTop:4, marginBottom:2 }}>Or describe your post</p>
        <div style={{ display:'flex', gap:6, alignItems:'flex-end', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, padding:'8px 10px' }}>
          <textarea value={customInput} onChange={e => setCustom(e.target.value)} placeholder="Tell me what you need…" rows={2} disabled={isLoading}
            style={{ flex:1, background:'transparent', border:'none', outline:'none', color:'#f1f0ff', fontSize:11, resize:'none', lineHeight:1.5, fontFamily:'inherit' }}
            onKeyDown={e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); if (customInput.trim()&&!isLoading) run(customInput.trim(),'custom') } }}
          />
          <button onClick={() => customInput.trim()&&!isLoading&&run(customInput.trim(),'custom')} disabled={!customInput.trim()||isLoading}
            style={{ width:28, height:28, borderRadius:8, border:'none', background: customInput.trim()&&!isLoading ? `linear-gradient(135deg,${ac},#C837AB)` : 'rgba(255,255,255,0.08)', color: customInput.trim()&&!isLoading ? '#fff' : 'rgba(255,255,255,0.25)', cursor: customInput.trim()&&!isLoading ? 'pointer' : 'not-allowed', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all .2s' }}>
            <FiSend size={12} />
          </button>
        </div>

        {/* Output */}
        {(isLoading || mode==='done' || mode==='error') && (
          <div style={{ background:'rgba(255,255,255,0.03)', border:`1px solid ${mode==='error' ? 'rgba(255,107,53,0.3)' : 'rgba(139,63,222,0.25)'}`, borderRadius:12, padding:'10px 12px' }}>
            {mode==='thinking' && (
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ display:'flex', gap:3 }}>
                  {[0,1,2].map(i => <div key={i} style={{ width:5, height:5, borderRadius:'50%', background:ac, animation:`aiPulse 1.2s ease-in-out ${i*0.2}s infinite` }} />)}
                </div>
                <span style={{ fontSize:11, color:'rgba(255,255,255,0.4)' }}>Thinking…</span>
              </div>
            )}
            {(mode==='streaming'||mode==='done') && streamText && (
              <>
                {parsed.title && <div style={{ marginBottom: parsed.desc?8:0 }}>
                  <p style={{ fontSize:9, fontWeight:700, color:ac, textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:3 }}>Title</p>
                  <p style={{ fontSize:12, fontWeight:700, color:'#f1f0ff', lineHeight:1.4 }}>{parsed.title}{mode==='streaming'&&!parsed.desc&&<span style={{ animation:'blink 1s infinite', color:ac }}>|</span>}</p>
                </div>}
                {parsed.desc && <div>
                  <p style={{ fontSize:9, fontWeight:700, color:'rgba(255,255,255,0.35)', textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:3 }}>Description</p>
                  <p style={{ fontSize:11, color:'rgba(255,255,255,0.7)', lineHeight:1.6 }}>{parsed.desc}{mode==='streaming'&&<span style={{ animation:'blink 1s infinite', color:ac }}>|</span>}</p>
                </div>}
                {mode==='done' && (
                  <div style={{ display:'flex', gap:6, marginTop:10 }}>
                    <button onClick={() => onApply(parsed.title, parsed.desc||parsed.title)}
                      style={{ flex:1, padding:'8px 0', borderRadius:9, border:'none', background:`linear-gradient(135deg,${ac},#C837AB)`, color:'#fff', fontSize:11, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:5, boxShadow:`0 4px 14px ${ac}50` }}>
                      <FiCheck size={12} strokeWidth={3} /> Apply to post
                    </button>
                    <button onClick={() => activeIdx==='custom' ? run(customInput.trim(),'custom') : run(ctx.prompts[activeIdx],activeIdx)}
                      style={{ width:34, borderRadius:9, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.05)', color:'rgba(255,255,255,0.5)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}
                      title="Regenerate"><FiRefreshCw size={13} /></button>
                  </div>
                )}
                {mode==='streaming' && <button onClick={cancel} style={{ marginTop:8, width:'100%', padding:'6px 0', borderRadius:9, border:'1px solid rgba(255,107,53,0.3)', background:'rgba(255,107,53,0.08)', color:'#FF6B35', fontSize:11, fontWeight:600, cursor:'pointer' }}>Stop</button>}
              </>
            )}
            {mode==='error' && (
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                <p style={{ fontSize:11, color:'#FF6B35' }}>Something went wrong.</p>
                <button onClick={() => { setMode('idle'); setStream('') }} style={{ fontSize:11, color:'rgba(255,255,255,0.4)', background:'none', border:'none', cursor:'pointer', textDecoration:'underline' }}>Dismiss</button>
              </div>
            )}
          </div>
        )}
      </div>
      <style>{`@keyframes aiPulse{0%,100%{transform:scale(1);opacity:.4}50%{transform:scale(1.4);opacity:1}} @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  )
}

// ── CONFIRM DELETE ─────────────────────────────────────────────────────────────
function ConfirmDelete({ onConfirm, onCancel, dark }) {
  return (
    <div className="flex flex-col items-center gap-4 py-4 px-2 text-center">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background:'rgba(255,107,53,0.1)' }}>
        <FiAlertTriangle size={26} style={{ color:'#FF6B35' }} />
      </div>
      <div>
        <p className={`font-black text-lg ${dark?'text-white':'text-gray-900'}`}>Delete this post?</p>
        <p className={`text-sm mt-1 ${dark?'text-purple-300/50':'text-gray-400'}`}>This action cannot be undone.</p>
      </div>
      <div className="flex gap-3 w-full">
        <button onClick={onCancel} className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-colors ${dark?'border-white/10 text-purple-200 hover:bg-white/5':'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>Cancel</button>
        <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity" style={{ background:'linear-gradient(135deg,#FF6B35,#C837AB)' }}>Yes, delete it</button>
      </div>
    </div>
  )
}

// ── MAIN MODAL ─────────────────────────────────────────────────────────────────
export default function CreatePostModal({ onClose, onPost, editPost = null, onDelete = null }) {
  const { dark } = useTheme()
  const isEditing = editPost !== null
  const currentUser = getCurrentUser()

  const [step,             setStep]             = useState(isEditing ? 2 : 1)
  const [selectedCategory, setSelectedCategory] = useState(
    isEditing ? CATEGORIES.find(c => c.label.toUpperCase() === editPost?.category) ?? null : null
  )
  const [title,        setTitle]        = useState(isEditing ? editPost.title : '')
  const [description,  setDescription]  = useState(isEditing ? editPost.description : '')
  const [imagePreview, setImagePreview] = useState(isEditing ? editPost.image ?? null : null)
  const [showDelete,   setShowDelete]   = useState(false)
  const [published,    setPublished]    = useState(false)
  const [aiOpen,       setAiOpen]       = useState(false)
  // Mobile: AI shows as bottom sheet overlay
  const [aiSheet,      setAiSheet]      = useState(false)
  const fileRef = useRef()

  const canProceed = selectedCategory !== null
  const canSubmit  = title.trim().length > 0 && description.trim().length > 0

  useEffect(() => { if (step === 2 && !isEditing) setAiOpen(true) }, [step])

  function handleImageUpload(e) {
    const file = e.target.files[0]; if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setImagePreview(ev.target.result)
    reader.readAsDataURL(file)
  }

  function handleSubmit() {
    if (!canSubmit) return
    setPublished(true)
    setTimeout(() => {
      onPost({
        id: isEditing ? editPost.id : Date.now(),
        author: currentUser.name, neighborhood: currentUser.neighborhood,
        avatar: currentUser.avatar || null, timeAgo: 'Just now',
        category: selectedCategory.label.toUpperCase(),
        title: title.trim(), description: description.trim(),
        image: imagePreview || null,
        likes: isEditing ? editPost.likes : 0,
        comments: isEditing ? editPost.comments : 0,
      })
      onClose()
    }, 1000)
  }

  function handleDelete() { if (onDelete && editPost) { onDelete(editPost.id); onClose() } }

  function truncateAtWord(str, max) {
    if (!str) return ''
    const clean = str.trim()
    if (clean.length <= max) return clean
    const cut = clean.slice(0, max)
    const lastSentence = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '))
    if (lastSentence > max * 0.55) return clean.slice(0, lastSentence + 1).trimEnd()
    const lastSpace = cut.lastIndexOf(' ')
    return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()
  }

  function handleAIApply(aiTitle, aiDesc) {
    setTitle(truncateAtWord(aiTitle, 80))
    setDescription(truncateAtWord(aiDesc, 300))
    setAiSheet(false)
  }

  // ── Published success screen ────────────────────────────────────────────────
  if (published) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor:'rgba(0,0,0,0.4)', backdropFilter:'blur(4px)' }}>
      <div className={`rounded-3xl w-full max-w-xs p-8 flex flex-col items-center gap-4 text-center ${dark?'bg-[#0f0a1e]':'bg-white'}`}
        style={{ boxShadow:'0 25px 80px rgba(139,63,222,0.25)' }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background:'var(--gradient-qriblik)' }}>
          <FiCheck size={28} className="text-white" strokeWidth={3} />
        </div>
        <div>
          <p className={`font-black text-xl ${dark?'text-white':'text-gray-900'}`}>{isEditing ? 'Post updated!' : 'Post published!'}</p>
          <p className={`text-sm mt-1 ${dark?'text-purple-300/50':'text-gray-400'}`}>Your neighbors can now see it.</p>
        </div>
        <div className={`w-full h-1.5 rounded-full overflow-hidden ${dark?'bg-white/10':'bg-gray-100'}`}>
          <div className="h-full rounded-full" style={{ background:'var(--gradient-qriblik)', animation:'drain 1s linear forwards', width:'100%' }} />
        </div>
      </div>
      <style>{`@keyframes drain{from{width:100%}to{width:0%}}`}</style>
    </div>
  )

  // Is AI panel visible on desktop side
  const desktopWide = step === 2 && aiOpen && !showDelete

  return (
    <>
      {/* ── BACKDROP ── */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        style={{ backgroundColor:'rgba(0,0,0,0.5)', backdropFilter:'blur(4px)' }}
        onClick={onClose}>

        {/* ── MODAL CONTAINER ── */}
        <div
          onClick={e => e.stopPropagation()}
          style={{
            display: 'flex',
            background: dark ? '#0f0a1e' : '#fff',
            // Mobile: full width, slides up from bottom, rounded top
            // Desktop: centered, max width expands with AI panel
            width: '100%',
            maxWidth: desktopWide ? 860 : 480,
            margin: '0',
            overflow: 'hidden',
            boxShadow: dark
              ? '0 25px 80px rgba(139,63,222,0.35), 0 0 0 1px rgba(139,63,222,0.2)'
              : '0 25px 80px rgba(139,63,222,0.2)',
            transition: 'max-width 0.3s cubic-bezier(0.4,0,0.2,1)',
            maxHeight: '95vh',
            // Mobile: rounded top corners only
            borderRadius: '24px 24px 0 0',
          }}
          className="sm:rounded-[28px] sm:mx-4"
        >
          {/* ── LEFT / MAIN FORM ── */}
          <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0, overflowY:'auto' }}>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-0">
              <div className="flex items-center gap-2">
                {step === 2 && !isEditing && (
                  <button onClick={() => { setStep(1); setAiOpen(false) }}
                    className={`p-1.5 rounded-xl transition-colors ${dark?'text-purple-300/50 hover:bg-white/8 hover:text-white':'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}>
                    <FiArrowLeft size={17} />
                  </button>
                )}
                <div>
                  <h2 className={`text-lg sm:text-xl font-black flex items-center gap-2 ${dark?'text-white':'text-gray-900'}`}>
                    {isEditing && <FiEdit3 size={17} style={{ color:'#8B3FDE' }} />}
                    {isEditing ? 'Edit Post' : 'Post Something'}
                  </h2>
                  <p className="text-xs mt-0.5" style={{ color: dark ? 'rgba(255,255,255,0.35)' : '#9ca3af' }}>
                    {isEditing ? 'Make changes and save' : step===1 ? 'Step 1 — Choose a category' : 'Step 2 — Write your post'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {step === 2 && (
                  <>
                    {/* Desktop: toggle AI side panel */}
                    <button onClick={() => setAiOpen(v => !v)}
                      className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-none text-xs font-bold cursor-pointer transition-all"
                      style={{ background: aiOpen ? 'linear-gradient(135deg,#8B3FDE,#C837AB)' : 'rgba(139,63,222,0.08)', color: aiOpen ? '#fff' : '#8B3FDE', boxShadow: aiOpen ? '0 0 16px rgba(139,63,222,0.35)' : 'none' }}>
                      <RiSparklingLine size={13} />
                      {aiOpen ? 'AI On' : 'AI Help'}
                    </button>
                    {/* Mobile: open AI bottom sheet */}
                    <button onClick={() => setAiSheet(true)}
                      className="sm:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-none text-xs font-bold cursor-pointer"
                      style={{ background: 'linear-gradient(135deg,#8B3FDE,#C837AB)', color: '#fff' }}>
                      <RiSparklingLine size={13} /> AI
                    </button>
                  </>
                )}
                {isEditing && (
                  <button onClick={() => setShowDelete(true)} className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50/10 transition-colors">
                    <FiTrash2 size={17} />
                  </button>
                )}
                <button onClick={onClose} className={`p-2 rounded-xl transition-colors ${dark?'text-purple-300/50 hover:bg-white/8 hover:text-white':'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}>
                  <FiX size={19} />
                </button>
              </div>
            </div>

            {/* Progress bar */}
            {!isEditing && (
              <div className="flex gap-1.5 px-5 mt-4">
                {[1,2].map(s => (
                  <div key={s} className="h-1 flex-1 rounded-full transition-all duration-300"
                    style={{ background: s<=step ? 'var(--gradient-qriblik)' : dark ? 'rgba(255,255,255,0.08)' : '#f3f4f6' }} />
                ))}
              </div>
            )}

            <div className="h-px mx-5 mt-4 mb-1 rounded-full"
              style={{ background: dark ? 'rgba(139,63,222,0.3)' : 'var(--gradient-qriblik)', opacity: dark?1:0.15 }} />

            {/* Delete confirm */}
            {showDelete && (
              <div className="px-5 pb-6 pt-4">
                <ConfirmDelete onConfirm={handleDelete} onCancel={() => setShowDelete(false)} dark={dark} />
              </div>
            )}

            {/* ── STEP 1: Category ── */}
            {!showDelete && step === 1 && (
              <div className="px-5 pb-6 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: dark?'rgba(255,255,255,0.3)':'#9ca3af' }}>
                  What is your post about?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map(cat => {
                    const active  = selectedCategory?.label === cat.label
                    const idleBg  = dark ? 'rgba(255,255,255,0.04)' : '#fafafa'
                    const idleBdr = dark ? 'rgba(255,255,255,0.08)' : '#f0f0f0'
                    return (
                      <button key={cat.label} onClick={() => setSelectedCategory(cat)}
                        className="flex items-center gap-3 px-3 py-3 rounded-2xl border text-sm font-semibold text-left transition-all duration-150"
                        style={{
                          borderColor: active ? cat.color : idleBdr,
                          backgroundColor: active ? `${cat.color}18` : idleBg,
                          color: active ? cat.color : dark?'#94a3b8':'#6b7280',
                          transform: active ? 'scale(1.02)' : 'scale(1)',
                          boxShadow: active ? `0 2px 12px ${cat.color}30` : 'none',
                        }}>
                        <span className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor:`${cat.color}15` }}>
                          <cat.icon size={16} style={{ color:cat.color }} />
                        </span>
                        <span className="leading-tight text-xs sm:text-sm">{cat.label}</span>
                        {active && <FiCheck size={13} className="ml-auto shrink-0" style={{ color:cat.color }} />}
                      </button>
                    )
                  })}
                </div>
                <button onClick={() => canProceed && setStep(2)} disabled={!canProceed}
                  className="w-full mt-4 py-3 rounded-2xl text-sm font-bold text-white transition-all active:scale-[0.98]"
                  style={{ background: canProceed ? 'var(--gradient-qriblik)' : dark?'rgba(255,255,255,0.08)':'#e5e7eb', color: canProceed?'white':dark?'rgba(255,255,255,0.3)':'#9ca3af', cursor: canProceed?'pointer':'not-allowed' }}>
                  Continue →
                </button>
              </div>
            )}

            {/* ── STEP 2: Write post ── */}
            {!showDelete && step === 2 && (
              <div className="px-5 pb-5 pt-4 flex flex-col gap-4">

                {/* Author row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-[2px] rounded-full" style={{ background:'var(--gradient-qriblik)' }}>
                      {currentUser.avatar
                        ? <img src={currentUser.avatar} alt={currentUser.name} className="w-9 h-9 rounded-full object-cover block" />
                        : <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background:'linear-gradient(135deg,#8B5CF6,#D946EF,#F97316)', fontSize:15, fontWeight:900, color:'#fff' }}>
                            {currentUser.name.charAt(0).toUpperCase()}
                          </div>
                      }
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${dark?'text-white':'text-gray-800'}`}>{currentUser.name}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <FiMapPin size={10} style={{ color:'#C837AB' }} />
                        <span>{currentUser.neighborhood}</span>
                      </div>
                    </div>
                  </div>
                  {selectedCategory && (
                    <button onClick={() => !isEditing && setStep(1)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold hover:scale-105 transition-transform"
                      style={{ color:selectedCategory.color, borderColor:`${selectedCategory.color}40`, backgroundColor:`${selectedCategory.color}0d`, cursor:isEditing?'default':'pointer' }}>
                      <selectedCategory.icon size={11} />
                      <span className="hidden sm:inline">{selectedCategory.label}</span>
                      {!isEditing && <FiChevronDown size={10} />}
                    </button>
                  )}
                </div>

                {/* Title input */}
                <div className="relative">
                  <input type="text" placeholder="Give your post a title..."
                    value={title} onChange={e => setTitle(e.target.value)} maxLength={80}
                    className={`w-full px-4 py-3 pr-12 rounded-2xl border text-sm placeholder-gray-400 outline-none transition-all font-semibold ${dark?'bg-white/5 text-white':'bg-gray-50 text-gray-800'}`}
                    style={{ borderColor: title.length>0 ? (selectedCategory?.color+'60') : dark?'rgba(255,255,255,0.1)':'#e5e7eb' }}
                    onFocus={e => e.target.style.borderColor = selectedCategory?.color||'#8B3FDE'}
                    onBlur={e => e.target.style.borderColor = title.length>0 ? (selectedCategory?.color+'60') : dark?'rgba(255,255,255,0.1)':'#e5e7eb'}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <CircleProgress value={title.length} max={80} color={selectedCategory?.color||'#8B3FDE'} dark={dark} />
                  </div>
                </div>

                {/* Description input */}
                <div className="relative">
                  <textarea placeholder="What do you want to share with your neighbors?"
                    value={description} onChange={e => setDescription(e.target.value)}
                    rows={4} maxLength={300}
                    className={`w-full px-4 py-3 pb-8 rounded-2xl border text-sm placeholder-gray-400 outline-none transition-all resize-none leading-relaxed ${dark?'bg-white/5 text-white':'bg-gray-50 text-gray-700'}`}
                    style={{ borderColor: description.length>0 ? (selectedCategory?.color+'60') : dark?'rgba(255,255,255,0.1)':'#e5e7eb' }}
                    onFocus={e => e.target.style.borderColor = selectedCategory?.color||'#8B3FDE'}
                    onBlur={e => e.target.style.borderColor = description.length>0 ? (selectedCategory?.color+'60') : dark?'rgba(255,255,255,0.1)':'#e5e7eb'}
                  />
                  <div className="absolute right-3 bottom-3">
                    <CircleProgress value={description.length} max={300} color={selectedCategory?.color||'#8B3FDE'} dark={dark} />
                  </div>
                </div>

                {/* Image preview */}
                {imagePreview && (
                  <div className="relative rounded-2xl overflow-hidden">
                    <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover" />
                    <button onClick={() => setImagePreview(null)} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                      <FiX size={14} />
                    </button>
                  </div>
                )}

                {/* Bottom actions */}
                <div className={`flex items-center justify-between pt-1 border-t ${dark?'border-white/6':'border-gray-100'}`}>
                  <button onClick={() => fileRef.current.click()}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all hover:bg-gray-50/10"
                    style={{ color: imagePreview ? (selectedCategory?.color||'#8B3FDE') : '#9ca3af' }}>
                    <FiImage size={16} />
                    <span className="text-xs font-medium hidden sm:inline">{imagePreview ? 'Change photo' : 'Add photo'}</span>
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />

                  <button onClick={handleSubmit} disabled={!canSubmit}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95"
                    style={{ background: canSubmit?'var(--gradient-qriblik)':dark?'rgba(255,255,255,0.08)':'#e5e7eb', color: canSubmit?'white':dark?'rgba(255,255,255,0.3)':'#9ca3af', cursor: canSubmit?'pointer':'not-allowed' }}>
                    {isEditing ? <><FiCheck size={14} /> Save</> : <><FiSend size={14} /> Publish</>}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── DESKTOP: AI Side Panel ── */}
          {step===2 && aiOpen && !showDelete && (
            <div className="hidden sm:block" style={{ width:270, flexShrink:0, borderLeft:'1px solid rgba(139,63,222,0.12)', animation:'slideInRight 0.3s cubic-bezier(0.4,0,0.2,1)' }}>
              <AIPanel category={selectedCategory} onApply={handleAIApply} />
            </div>
          )}
        </div>
      </div>

      {/* ── MOBILE: AI Bottom Sheet ── */}
      {aiSheet && (
        <>
          <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm sm:hidden" onClick={() => setAiSheet(false)} />
          <div className="fixed bottom-0 left-0 right-0 z-[61] sm:hidden rounded-t-3xl overflow-hidden"
            style={{ height:'70vh', animation:'slideUp 0.3s cubic-bezier(0.4,0,0.2,1)' }}>
            <AIPanel category={selectedCategory} onApply={handleAIApply} onClose={() => setAiSheet(false)} />
          </div>
        </>
      )}

      <style>{`
        @keyframes slideInRight { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideUp       { from{transform:translateY(100%)} to{transform:translateY(0)} }
      `}</style>
    </>
  )
}