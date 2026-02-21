import { useState, useRef, useEffect, useCallback } from 'react'
import {
  FiX, FiImage, FiMapPin, FiChevronDown, FiSearch,
  FiRepeat, FiCalendar, FiTrash2, FiEdit3, FiCheck,
  FiAlertTriangle, FiArrowLeft, FiSend, FiZap, FiRefreshCw,
  FiChevronRight, FiCpu,
} from 'react-icons/fi'
import { MdSportsSoccer } from 'react-icons/md'
import { RiHandHeartLine, RiRobot2Line, RiSparklingLine } from 'react-icons/ri'

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { label: 'Sport',          icon: MdSportsSoccer,  color: '#8B3FDE' },
  { label: 'Trading',        icon: FiRepeat,         color: '#C837AB' },
  { label: 'Lost and Found', icon: FiSearch,         color: '#FF6B35' },
  { label: 'Swap Skills',    icon: RiHandHeartLine,  color: '#8B3FDE' },
  { label: 'Events',         icon: FiCalendar,       color: '#C837AB' },
]

// Per-category AI context — what the AI knows about each type
const CATEGORY_AI_CONTEXT = {
  Sport: {
    emoji: '⚽',
    tagline: 'Your sports matchmaker',
    color: '#8B3FDE',
    prompts: [
      'Write a post looking for a football teammate this weekend',
      'I need a tennis partner for Saturday morning at the community courts',
      'Looking for people to join a yoga session in the park',
      'Organizing a basketball 3v3 tournament this Friday evening',
    ],
    systemPrompt: `You are a helpful assistant for a neighborhood community app called QribLik. 
The user is creating a SPORT post to connect with neighbors about sports activities.
Help them write engaging, friendly posts that clearly state:
- What sport/activity
- When (day/time)  
- Where (neighborhood/location)
- Skill level needed
- How many people needed

Keep posts warm, community-focused, and under 150 words. Write in a friendly casual tone.
Return ONLY the post content with a title on the first line, then a blank line, then the description.
Format: TITLE\n\nDESCRIPTION`,
  },
  Trading: {
    emoji: '🔄',
    tagline: 'Your swap negotiator',
    color: '#C837AB',
    prompts: [
      'I want to trade my old laptop for a bicycle',
      'Offering winter clothes in exchange for kitchen appliances',
      'Looking to swap my guitar for photography equipment',
      'Trading homemade pastries for gardening tools',
    ],
    systemPrompt: `You are a helpful assistant for a neighborhood community app called QribLik.
The user is creating a TRADING post to exchange items with neighbors.
Help them write clear, honest trading posts that include:
- What they're offering (condition, details)
- What they want in return
- Any flexibility on the trade
- How to contact/arrange

Keep posts clear, honest, and under 150 words. No price mentions — this is barter only.
Return ONLY the post content with a title on the first line, then a blank line, then the description.
Format: TITLE\n\nDESCRIPTION`,
  },
  'Lost and Found': {
    emoji: '🔍',
    tagline: 'Your search helper',
    color: '#FF6B35',
    prompts: [
      'I lost my black cat near the central market yesterday',
      'Found a set of keys near the park on Avenue Hassan II',
      'Lost my blue backpack on the metro line 2',
      'Found a phone near Café Central — trying to find the owner',
    ],
    systemPrompt: `You are a helpful assistant for a neighborhood community app called QribLik.
The user is creating a LOST AND FOUND post to find lost items or return found ones.
Help them write effective posts that include:
- What was lost/found (specific description, color, size)
- Where exactly (street, landmark, neighborhood)
- When it happened
- How to contact or claim

Be descriptive and specific. Under 120 words. Empathetic tone for lost items.
Return ONLY the post content with a title on the first line, then a blank line, then the description.
Format: TITLE\n\nDESCRIPTION`,
  },
  'Swap Skills': {
    emoji: '🌟',
    tagline: 'Your skill connector',
    color: '#8B3FDE',
    prompts: [
      'I can teach French in exchange for cooking lessons',
      'Offering web design help for photography skills',
      'Want to learn guitar — offering math tutoring in return',
      'Trading coding lessons for Arabic language practice',
    ],
    systemPrompt: `You are a helpful assistant for a neighborhood community app called QribLik.
The user is creating a SWAP SKILLS post to exchange knowledge with neighbors.
Help them write inviting posts that clearly state:
- What skill/knowledge they're offering (experience level)
- What skill they want to learn in return
- Format preference (online/in-person, frequency)
- Who they're looking for

Warm, encouraging tone. Under 150 words. Make it sound genuine and human.
Return ONLY the post content with a title on the first line, then a blank line, then the description.
Format: TITLE\n\nDESCRIPTION`,
  },
  Events: {
    emoji: '🎉',
    tagline: 'Your event promoter',
    color: '#C837AB',
    prompts: [
      'Organizing a neighborhood cleanup this Sunday morning',
      'Monthly book club meeting at my place next Thursday',
      'Street food festival happening this weekend in our district',
      'Free photography workshop for beginners this Saturday',
    ],
    systemPrompt: `You are a helpful assistant for a neighborhood community app called QribLik.
The user is creating an EVENT post to invite neighbors to something.
Help them write exciting event announcements that include:
- Event name and what it is
- Date, time, and duration
- Location (address or landmark)
- Who it's for / any requirements
- What to bring or expect

Energetic, welcoming tone. Under 150 words. Make people want to come!
Return ONLY the post content with a title on the first line, then a blank line, then the description.
Format: TITLE\n\nDESCRIPTION`,
  },
}

const currentUser = {
  name: 'Alex Neighbor',
  neighborhood: 'Sunset District',
  avatar: 'https://i.pravatar.cc/150?img=5',
}

// ─────────────────────────────────────────────────────────────────────────────
// GROQ API CALL
// ─────────────────────────────────────────────────────────────────────────────

async function callGroq(systemPrompt, userMessage, onChunk) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: userMessage  },
      ],
      max_tokens: 300,
      temperature: 0.8,
      stream: true,
    }),
  })

  if (!res.ok) throw new Error(`Groq error: ${res.status}`)

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let fullText = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed === 'data: [DONE]') continue
      if (!trimmed.startsWith('data: ')) continue
      try {
        const json = JSON.parse(trimmed.slice(6))
        const delta = json.choices?.[0]?.delta?.content ?? ''
        if (delta) {
          fullText += delta
          onChunk(fullText)
        }
      } catch {}
    }
  }
  return fullText
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function CircleProgress({ value, max, color }) {
  const pct = Math.min(value / max, 1)
  const r = 10
  const circ = 2 * Math.PI * r
  const dash = circ * pct
  const nearLimit = pct > 0.85
  return (
    <svg width="28" height="28" viewBox="0 0 28 28">
      <circle cx="14" cy="14" r={r} fill="none" stroke="#f3f4f6" strokeWidth="2.5" />
      <circle cx="14" cy="14" r={r} fill="none"
        stroke={nearLimit ? '#FF6B35' : color} strokeWidth="2.5"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform="rotate(-90 14 14)"
        style={{ transition: 'stroke-dasharray .2s ease, stroke .2s ease' }}
      />
      {nearLimit && (
        <text x="14" y="18" textAnchor="middle" fontSize="7.5" fill="#FF6B35" fontWeight="bold">
          {max - value}
        </text>
      )}
    </svg>
  )
}

function ConfirmDelete({ onConfirm, onCancel }) {
  return (
    <div className="flex flex-col items-center gap-4 py-4 px-2 text-center">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,107,53,0.1)' }}>
        <FiAlertTriangle size={26} style={{ color: '#FF6B35' }} />
      </div>
      <div>
        <p className="font-black text-gray-900 text-lg">Delete this post?</p>
        <p className="text-sm text-gray-400 mt-1 leading-relaxed">
          This action cannot be undone.
        </p>
      </div>
      <div className="flex gap-3 w-full mt-1">
        <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
          style={{ background: 'linear-gradient(135deg, #FF6B35, #C837AB)' }}>
          Yes, delete it
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// AI ASSISTANT PANEL
// ─────────────────────────────────────────────────────────────────────────────

function AIAssistant({ category, onApply, currentTitle, currentDesc }) {
  const [mode, setMode]           = useState('idle')    // idle | thinking | streaming | done | error
  const [streamText, setStream]   = useState('')
  const [customInput, setCustom]  = useState('')
  const [activePrompt, setActive] = useState(null)
  const abortRef                  = useRef(false)
  const ctx = CATEGORY_AI_CONTEXT[category?.label] ?? null

  // Reset when category changes
  useEffect(() => {
    setMode('idle'); setStream(''); setCustom(''); setActive(null)
  }, [category?.label])

  const run = useCallback(async (userMsg, promptIndex = null) => {
    if (!ctx) return
    abortRef.current = false
    setActive(promptIndex)
    setMode('thinking')
    setStream('')

    // small delay so the "thinking" state is visible
    await new Promise(r => setTimeout(r, 400))
    if (abortRef.current) return

    setMode('streaming')
    try {
      await callGroq(ctx.systemPrompt, userMsg, (chunk) => {
        if (!abortRef.current) setStream(chunk)
      })
      setMode('done')
    } catch {
      setMode('error')
    }
  }, [ctx])

  const cancel = () => { abortRef.current = true; setMode('idle'); setStream('') }

  // Parse streamed text into title + description
  const parsed = (() => {
    const parts = streamText.split(/\n\n+/)
    if (parts.length >= 2) return { title: parts[0].trim(), desc: parts.slice(1).join('\n\n').trim() }
    return { title: streamText.trim(), desc: '' }
  })()

  if (!ctx) return null

  const accentColor = ctx.color
  const isLoading   = mode === 'thinking' || mode === 'streaming'

  return (
    <div style={{
      background: 'linear-gradient(160deg, #0f0a1e 0%, #1a0f2e 50%, #0d0820 100%)',
      borderLeft: '1px solid rgba(139,63,222,0.2)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: -60, right: -60,
        width: 180, height: 180, borderRadius: '50%',
        background: `radial-gradient(circle, ${accentColor}30 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -40, left: -40,
        width: 140, height: 140, borderRadius: '50%',
        background: 'radial-gradient(circle, #C837AB20 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid rgba(255,255,255,0.07)', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: `linear-gradient(135deg, ${accentColor}, #C837AB)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 12px ${accentColor}60`,
          }}>
            <RiSparklingLine size={14} color="#fff" />
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 800, color: '#f1f0ff', letterSpacing: '0.3px', lineHeight: 1 }}>
              AI Assistant
            </p>
            <p style={{ fontSize: 10, color: accentColor, fontWeight: 600, lineHeight: 1.4 }}>{ctx.tagline}</p>
          </div>
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, position: 'relative', zIndex: 1 }}>

        {/* Quick prompts */}
        <div>
          <p style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>
            Quick ideas
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {ctx.prompts.map((p, i) => (
              <button key={i} onClick={() => !isLoading && run(p, i)}
                disabled={isLoading}
                style={{
                  textAlign: 'left', background: activePrompt === i
                    ? `linear-gradient(135deg, ${accentColor}25, #C837AB15)`
                    : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${activePrompt === i ? accentColor + '60' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 10, padding: '7px 10px',
                  color: activePrompt === i ? '#fff' : 'rgba(255,255,255,0.6)',
                  fontSize: 11, cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all .18s',
                  display: 'flex', alignItems: 'center', gap: 6,
                  opacity: isLoading && activePrompt !== i ? 0.4 : 1,
                }}
                onMouseEnter={e => { if (!isLoading) { e.currentTarget.style.background = `${accentColor}15`; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = `${accentColor}50` }}}
                onMouseLeave={e => { if (activePrompt !== i) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}}
              >
                <span style={{ fontSize: 13, flexShrink: 0 }}>{ctx.emoji}</span>
                <span style={{ lineHeight: 1.35 }}>{p}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom prompt */}
        <div>
          <p style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>
            Describe your post
          </p>
          <div style={{
            display: 'flex', gap: 6, alignItems: 'flex-end',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12, padding: '8px 10px',
            transition: 'border-color .2s',
          }}
            onFocus={() => {}}
          >
            <textarea
              value={customInput}
              onChange={e => setCustom(e.target.value)}
              placeholder="Tell me what you need…"
              rows={2}
              disabled={isLoading}
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                color: '#f1f0ff', fontSize: 11, resize: 'none',
                placeholder: 'rgba(255,255,255,0.25)',
                lineHeight: 1.5,
                fontFamily: 'inherit',
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  if (customInput.trim() && !isLoading) run(customInput.trim(), 'custom')
                }
              }}
            />
            <button
              onClick={() => customInput.trim() && !isLoading && run(customInput.trim(), 'custom')}
              disabled={!customInput.trim() || isLoading}
              style={{
                width: 28, height: 28, borderRadius: 8, border: 'none',
                background: customInput.trim() && !isLoading
                  ? `linear-gradient(135deg, ${accentColor}, #C837AB)`
                  : 'rgba(255,255,255,0.08)',
                color: customInput.trim() && !isLoading ? '#fff' : 'rgba(255,255,255,0.25)',
                cursor: customInput.trim() && !isLoading ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'all .2s',
                boxShadow: customInput.trim() && !isLoading ? `0 0 12px ${accentColor}50` : 'none',
              }}
            >
              <FiSend size={12} />
            </button>
          </div>
        </div>

        {/* Output area */}
        {(isLoading || mode === 'done' || mode === 'error') && (
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${mode === 'error' ? 'rgba(255,107,53,0.3)' : 'rgba(139,63,222,0.25)'}`,
            borderRadius: 12, padding: '10px 12px',
          }}>

            {/* Thinking state */}
            {mode === 'thinking' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ display: 'flex', gap: 3 }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: accentColor,
                      animation: `aiPulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Thinking…</span>
              </div>
            )}

            {/* Streaming / done state */}
            {(mode === 'streaming' || mode === 'done') && streamText && (
              <>
                {/* Title preview */}
                {parsed.title && (
                  <div style={{ marginBottom: parsed.desc ? 8 : 0 }}>
                    <p style={{ fontSize: 9, fontWeight: 700, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 3 }}>Title</p>
                    <p style={{ fontSize: 12, fontWeight: 700, color: '#f1f0ff', lineHeight: 1.4 }}>
                      {parsed.title}
                      {mode === 'streaming' && !parsed.desc && <span style={{ animation: 'blink 1s infinite', color: accentColor }}>|</span>}
                    </p>
                  </div>
                )}

                {/* Description preview */}
                {parsed.desc && (
                  <div>
                    <p style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 3 }}>Description</p>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                      {parsed.desc}
                      {mode === 'streaming' && <span style={{ animation: 'blink 1s infinite', color: accentColor }}>|</span>}
                    </p>
                  </div>
                )}

                {/* Apply / Regenerate buttons */}
                {mode === 'done' && (
                  <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                    <button
                      onClick={() => onApply(parsed.title, parsed.desc || parsed.title)}
                      style={{
                        flex: 1, padding: '8px 0', borderRadius: 9, border: 'none',
                        background: `linear-gradient(135deg, ${accentColor}, #C837AB)`,
                        color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                        boxShadow: `0 4px 14px ${accentColor}50`,
                        transition: 'opacity .15s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                      <FiCheck size={12} strokeWidth={3} /> Apply to post
                    </button>
                    <button
                      onClick={() => activePrompt === 'custom' ? run(customInput.trim(), 'custom') : run(ctx.prompts[activePrompt], activePrompt)}
                      style={{
                        width: 34, borderRadius: 9, border: '1px solid rgba(255,255,255,0.12)',
                        background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all .15s',
                      }}
                      title="Regenerate"
                      onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                    >
                      <FiRefreshCw size={13} />
                    </button>
                  </div>
                )}

                {/* Cancel while streaming */}
                {mode === 'streaming' && (
                  <button onClick={cancel} style={{
                    marginTop: 8, width: '100%', padding: '6px 0', borderRadius: 9,
                    border: '1px solid rgba(255,107,53,0.3)', background: 'rgba(255,107,53,0.08)',
                    color: '#FF6B35', fontSize: 11, fontWeight: 600, cursor: 'pointer',
                  }}>
                    Stop
                  </button>
                )}
              </>
            )}

            {/* Error state */}
            {mode === 'error' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '4px 0' }}>
                <p style={{ fontSize: 11, color: '#FF6B35', textAlign: 'center' }}>Something went wrong. Check your API key.</p>
                <button onClick={() => { setMode('idle'); setStream('') }}
                  style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                  Dismiss
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes aiPulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.4); opacity: 1; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN MODAL
// ─────────────────────────────────────────────────────────────────────────────

export default function CreatePostModal({ onClose, onPost, editPost = null, onDelete = null }) {
  const isEditing = editPost !== null

  const [step,              setStep]            = useState(isEditing ? 2 : 1)
  const [selectedCategory,  setSelectedCategory] = useState(
    isEditing ? CATEGORIES.find(c => c.label.toUpperCase() === editPost?.category) ?? null : null
  )
  const [title,         setTitle]         = useState(isEditing ? editPost.title       : '')
  const [description,   setDescription]   = useState(isEditing ? editPost.description : '')
  const [imagePreview,  setImagePreview]  = useState(isEditing ? editPost.image ?? null : null)
  const [showDelete,    setShowDelete]    = useState(false)
  const [published,     setPublished]     = useState(false)
  const [aiOpen,        setAiOpen]        = useState(false)   // AI panel toggle
  const fileRef = useRef()

  const canProceed = selectedCategory !== null
  const canSubmit  = title.trim().length > 0 && description.trim().length > 0

  // Open AI panel automatically when reaching step 2
  useEffect(() => {
    if (step === 2 && !isEditing) setAiOpen(true)
  }, [step])

  function handleImageUpload(e) {
    const file = e.target.files[0]
    if (!file) return
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
        author: currentUser.name,
        neighborhood: currentUser.neighborhood,
        avatar: currentUser.avatar,
        timeAgo: 'Just now',
        category: selectedCategory.label.toUpperCase(),
        title: title.trim(),
        description: description.trim(),
        image: imagePreview || null,
        likes: isEditing ? editPost.likes : 0,
        comments: isEditing ? editPost.comments : 0,
      })
      onClose()
    }, 1000)
  }

  function handleDelete() {
    if (onDelete && editPost) { onDelete(editPost.id); onClose() }
  }

  // Called by AI panel — fills the form fields
  function handleAIApply(aiTitle, aiDesc) {
    setTitle(aiTitle.slice(0, 80))
    setDescription(aiDesc.slice(0, 300))
  }

  // ── Success screen ────────────────────────────────────────────────────────
  if (published) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
        <div className="bg-white rounded-3xl w-full max-w-xs mx-4 p-8 flex flex-col items-center gap-4 text-center"
          style={{ boxShadow: '0 25px 80px rgba(139,63,222,0.25)' }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'var(--gradient-qriblik)' }}>
            <FiCheck size={28} className="text-white" strokeWidth={3} />
          </div>
          <div>
            <p className="font-black text-gray-900 text-xl">{isEditing ? 'Post updated!' : 'Post published!'}</p>
            <p className="text-sm text-gray-400 mt-1">Your neighbors can now see it.</p>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1">
            <div className="h-full rounded-full" style={{ background: 'var(--gradient-qriblik)', animation: 'drain 1s linear forwards', width: '100%' }} />
          </div>
        </div>
        <style>{`@keyframes drain { from { width: 100% } to { width: 0% } }`}</style>
      </div>
    )
  }

  // ── Determine modal width based on AI panel state ─────────────────────────
  // On step 2 with AI open: wide two-column layout
  // Otherwise: standard single column
  const wideMode = step === 2 && aiOpen && !showDelete

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>

      <div
        style={{
          display: 'flex',
          background: '#fff',
          borderRadius: 28,
          width: '100%',
          maxWidth: wideMode ? 860 : 480,
          margin: '0 16px',
          overflow: 'hidden',
          boxShadow: '0 25px 80px rgba(139,63,222,0.2)',
          transition: 'max-width 0.35s cubic-bezier(0.4,0,0.2,1)',
          maxHeight: '92vh',
        }}
        onClick={e => e.stopPropagation()}
      >

        {/* ── LEFT: Post form ─────────────────────────────────────────────── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto' }}>

          {/* HEADER */}
          <div className="flex items-center justify-between px-6 pt-6 pb-0">
            <div className="flex items-center gap-2">
              {step === 2 && !isEditing && (
                <button onClick={() => { setStep(1); setAiOpen(false) }}
                  className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                  <FiArrowLeft size={17} />
                </button>
              )}
              <div>
                <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  {isEditing && <FiEdit3 size={17} style={{ color: '#8B3FDE' }} />}
                  {isEditing ? 'Edit Post' : 'Post Something'}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {isEditing ? 'Make changes and save'
                    : step === 1 ? 'Step 1 of 2 — Choose a category' : 'Step 2 of 2 — Write your post'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* AI toggle button — only on step 2 */}
              {step === 2 && (
                <button
                  onClick={() => setAiOpen(v => !v)}
                  title={aiOpen ? 'Close AI assistant' : 'Open AI assistant'}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    padding: '5px 10px', borderRadius: 12, border: 'none',
                    background: aiOpen
                      ? 'linear-gradient(135deg, #8B3FDE, #C837AB)'
                      : 'rgba(139,63,222,0.08)',
                    color: aiOpen ? '#fff' : '#8B3FDE',
                    fontSize: 11, fontWeight: 700, cursor: 'pointer',
                    transition: 'all .2s',
                    boxShadow: aiOpen ? '0 0 16px rgba(139,63,222,0.4)' : 'none',
                  }}
                >
                  <RiSparklingLine size={14} />
                  {aiOpen ? 'AI On' : 'AI Help'}
                </button>
              )}
              {isEditing && (
                <button onClick={() => setShowDelete(true)}
                  className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                  <FiTrash2 size={18} />
                </button>
              )}
              <button onClick={onClose}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                <FiX size={20} />
              </button>
            </div>
          </div>

          {/* Step progress */}
          {!isEditing && (
            <div className="flex gap-1.5 px-6 mt-4">
              {[1, 2].map(s => (
                <div key={s} className="h-1 flex-1 rounded-full transition-all duration-400"
                  style={{ background: s <= step ? 'var(--gradient-qriblik)' : '#f3f4f6' }} />
              ))}
            </div>
          )}

          <div className="h-[1.5px] mx-6 rounded-full mt-4 mb-1"
            style={{ background: 'var(--gradient-qriblik)', opacity: 0.15 }} />

          {/* DELETE CONFIRM */}
          {showDelete && (
            <div className="px-6 pb-6 pt-4">
              <ConfirmDelete onConfirm={handleDelete} onCancel={() => setShowDelete(false)} />
            </div>
          )}

          {/* STEP 1 — Category picker */}
          {!showDelete && step === 1 && (
            <div className="px-6 pb-6 pt-5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                What is your post about?
              </p>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map(cat => {
                  const active = selectedCategory?.label === cat.label
                  return (
                    <button key={cat.label} onClick={() => setSelectedCategory(cat)}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl border text-sm font-semibold text-left transition-all duration-150"
                      style={{
                        borderColor: active ? cat.color : '#f0f0f0',
                        backgroundColor: active ? `${cat.color}0d` : '#fafafa',
                        color: active ? cat.color : '#6b7280',
                        transform: active ? 'scale(1.02)' : 'scale(1)',
                        boxShadow: active ? `0 2px 12px ${cat.color}20` : 'none',
                      }}
                      onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = `${cat.color}40`; e.currentTarget.style.backgroundColor = `${cat.color}06` }}}
                      onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.backgroundColor = '#fafafa' }}}
                    >
                      <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${cat.color}15` }}>
                        <cat.icon size={18} style={{ color: cat.color }} />
                      </span>
                      <span className="leading-tight">{cat.label}</span>
                      {active && <FiCheck size={14} className="ml-auto shrink-0" style={{ color: cat.color }} />}
                    </button>
                  )
                })}
              </div>
              <button onClick={() => canProceed && setStep(2)} disabled={!canProceed}
                className="w-full mt-4 py-3 rounded-2xl text-sm font-bold text-white transition-all duration-150 active:scale-[0.98]"
                style={{
                  background: canProceed ? 'var(--gradient-qriblik)' : '#e5e7eb',
                  color: canProceed ? 'white' : '#9ca3af',
                  cursor: canProceed ? 'pointer' : 'not-allowed',
                }}>
                Continue →
              </button>
            </div>
          )}

          {/* STEP 2 — Write post */}
          {!showDelete && step === 2 && (
            <div className="px-6 pb-6 pt-4 flex flex-col gap-4">

              {/* Author + category pill */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-[2px] rounded-full" style={{ background: 'var(--gradient-qriblik)' }}>
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-9 h-9 rounded-full object-cover block" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{currentUser.name}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <FiMapPin size={10} style={{ color: '#C837AB' }} />
                      <span>{currentUser.neighborhood}</span>
                    </div>
                  </div>
                </div>
                {selectedCategory && (
                  <button onClick={() => !isEditing && setStep(1)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all hover:scale-105"
                    style={{
                      color: selectedCategory.color,
                      borderColor: `${selectedCategory.color}40`,
                      backgroundColor: `${selectedCategory.color}0d`,
                      cursor: isEditing ? 'default' : 'pointer',
                    }}>
                    <selectedCategory.icon size={12} />
                    {selectedCategory.label}
                    {!isEditing && <FiChevronDown size={11} className="ml-0.5" />}
                  </button>
                )}
              </div>

              {/* Title */}
              <div className="relative">
                <input type="text" placeholder="Give your post a title..."
                  value={title} onChange={e => setTitle(e.target.value)} maxLength={80}
                  className="w-full px-4 py-3 pr-12 rounded-2xl border bg-gray-50 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 font-semibold"
                  style={{ borderColor: title.length > 0 ? (selectedCategory?.color + '60') : '#e5e7eb' }}
                  onFocus={e => e.target.style.borderColor = selectedCategory?.color || '#8B3FDE'}
                  onBlur={e => e.target.style.borderColor = title.length > 0 ? (selectedCategory?.color + '60') : '#e5e7eb'}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <CircleProgress value={title.length} max={80} color={selectedCategory?.color || '#8B3FDE'} />
                </div>
              </div>

              {/* Description */}
              <div className="relative">
                <textarea placeholder="What do you want to share with your neighbors?"
                  value={description} onChange={e => setDescription(e.target.value)}
                  rows={4} maxLength={300}
                  className="w-full px-4 py-3 pb-8 rounded-2xl border bg-gray-50 text-sm text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 resize-none leading-relaxed"
                  style={{ borderColor: description.length > 0 ? (selectedCategory?.color + '60') : '#e5e7eb' }}
                  onFocus={e => e.target.style.borderColor = selectedCategory?.color || '#8B3FDE'}
                  onBlur={e => e.target.style.borderColor = description.length > 0 ? (selectedCategory?.color + '60') : '#e5e7eb'}
                />
                <div className="absolute right-3 bottom-3">
                  <CircleProgress value={description.length} max={300} color={selectedCategory?.color || '#8B3FDE'} />
                </div>
              </div>

              {/* Image preview */}
              {imagePreview && (
                <div className="relative rounded-2xl overflow-hidden border border-gray-100">
                  <img src={imagePreview} alt="Preview" className="w-full h-44 object-cover" />
                  <button onClick={() => setImagePreview(null)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                    <FiX size={14} />
                  </button>
                  <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              )}

              {/* Actions row */}
              <div className="flex items-center justify-between pt-1 border-t border-gray-50">
                <button onClick={() => fileRef.current.click()}
                  className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-xl transition-all hover:bg-gray-50"
                  style={{ color: imagePreview ? (selectedCategory?.color || '#8B3FDE') : '#9ca3af' }}>
                  <FiImage size={16} />
                  <span className="text-xs font-medium">{imagePreview ? 'Change photo' : 'Add photo'}</span>
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />

                <button onClick={handleSubmit} disabled={!canSubmit}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-150 active:scale-95"
                  style={{
                    background: canSubmit ? 'var(--gradient-qriblik)' : '#e5e7eb',
                    color: canSubmit ? 'white' : '#9ca3af',
                    cursor: canSubmit ? 'pointer' : 'not-allowed',
                  }}>
                  {isEditing
                    ? <><FiCheck size={15} strokeWidth={2.5} /> Save changes</>
                    : <><FiSend size={14} /> Publish</>}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT: AI Assistant panel ─────────────────────────────────── */}
        {step === 2 && aiOpen && !showDelete && (
          <div style={{
            width: 280,
            flexShrink: 0,
            borderLeft: '1px solid rgba(139,63,222,0.12)',
            animation: 'slideInRight 0.3s cubic-bezier(0.4,0,0.2,1)',
            overflow: 'hidden',
          }}>
            <AIAssistant
              category={selectedCategory}
              onApply={handleAIApply}
              currentTitle={title}
              currentDesc={description}
            />
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}