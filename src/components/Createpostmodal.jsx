import { useState, useRef } from 'react'
import {
  FiX, FiImage, FiMapPin, FiChevronDown, FiSearch,
  FiRepeat, FiCalendar, FiMusic, FiMonitor, FiTrash2,
  FiEdit3, FiCheck, FiAlertTriangle, FiArrowLeft, FiSend,
} from 'react-icons/fi'
import { MdSportsSoccer, MdOutlineFoodBank, MdOutlineNaturePeople, MdChildCare } from 'react-icons/md'
import { RiHandHeartLine } from 'react-icons/ri'


const CATEGORIES = [
  { label: 'Sport',          icon: MdSportsSoccer,        color: '#8B3FDE' },
  { label: 'Trading',        icon: FiRepeat,              color: '#C837AB' },
  { label: 'Lost and Found', icon: FiSearch,              color: '#FF6B35' },
  { label: 'Swap Skills',    icon: RiHandHeartLine,       color: '#8B3FDE' },
  { label: 'Events',         icon: FiCalendar,            color: '#C837AB' },
]

const currentUser = {
  name: 'Alex Neighbor',
  neighborhood: 'Sunset District',
  avatar: 'https://i.pravatar.cc/150?img=5',
}


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
        stroke={nearLimit ? '#FF6B35' : color}
        strokeWidth="2.5"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 14 14)"
        style={{ transition: 'stroke-dasharray 0.2s ease, stroke 0.2s ease' }}
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
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{ background: 'rgba(255,107,53,0.1)' }}>
        <FiAlertTriangle size={26} style={{ color: '#FF6B35' }} />
      </div>
      <div>
        <p className="font-black text-gray-900 text-lg">Delete this post?</p>
        <p className="text-sm text-gray-400 mt-1 leading-relaxed">
          This action cannot be undone. Your post will be permanently removed from the feed.
        </p>
      </div>
      <div className="flex gap-3 w-full mt-1">
        <button onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button onClick={onConfirm}
          className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
          style={{ background: 'linear-gradient(135deg, #FF6B35, #C837AB)' }}>
          Yes, delete it
        </button>
      </div>
    </div>
  )
}


export default function CreatePostModal({ onClose, onPost, editPost = null, onDelete = null }) {
  const isEditing = editPost !== null

  const [step, setStep] = useState(isEditing ? 2 : 1)
  const [selectedCategory, setSelectedCategory] = useState(
    isEditing ? CATEGORIES.find(c => c.label.toUpperCase() === editPost?.category) ?? null : null
  )
  const [title, setTitle]             = useState(isEditing ? editPost.title       : '')
  const [description, setDescription] = useState(isEditing ? editPost.description : '')
  const [imagePreview, setImagePreview] = useState(isEditing ? editPost.image ?? null : null)
  const [showDelete, setShowDelete]   = useState(false)
  const [published, setPublished]     = useState(false)
  const fileRef = useRef()

  const canProceed = selectedCategory !== null
  const canSubmit  = title.trim().length > 0 && description.trim().length > 0

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



  if (published) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
        <div className="bg-white rounded-3xl w-full max-w-xs mx-4 p-8 flex flex-col items-center gap-4 text-center"
          style={{ boxShadow: '0 25px 80px rgba(139,63,222,0.25)' }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: 'var(--gradient-qriblik)' }}>
            <FiCheck size={28} className="text-white" strokeWidth={3} />
          </div>
          <div>
            <p className="font-black text-gray-900 text-xl">{isEditing ? 'Post updated!' : 'Post published!'}</p>
            <p className="text-sm text-gray-400 mt-1">Your neighbors can now see it in the feed.</p>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1">
            <div className="h-full rounded-full"
              style={{
                background: 'var(--gradient-qriblik)',
                animation: 'drain 1s linear forwards',
                width: '100%',
              }} />
          </div>
        </div>
        <style>{`@keyframes drain { from { width: 100% } to { width: 0% } }`}</style>
      </div>
    )
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div className="bg-white rounded-3xl w-full max-w-lg mx-4 overflow-hidden"
        style={{ boxShadow: '0 25px 80px rgba(139,63,222,0.2)' }}
        onClick={e => e.stopPropagation()}>

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 pt-6 pb-0">
          <div className="flex items-center gap-2">
            {step === 2 && !isEditing && (
              <button onClick={() => setStep(1)}
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
                {isEditing
                  ? 'Make changes and save'
                  : step === 1 ? 'Step 1 of 2 — Choose a category' : 'Step 2 of 2 — Write your post'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {isEditing && (
              <button onClick={() => setShowDelete(true)}
                className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Delete post">
                <FiTrash2 size={18} />
              </button>
            )}
            <button onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Step progress bar */}
        {!isEditing && (
          <div className="flex gap-1.5 px-6 mt-4">
            {[1, 2].map(s => (
              <div key={s} className="h-1 flex-1 rounded-full transition-all duration-400"
                style={{ background: s <= step ? 'var(--gradient-qriblik)' : '#f3f4f6' }} />
            ))}
          </div>
        )}

        {/* Divider */}
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
                  <button key={cat.label}
                    onClick={() => setSelectedCategory(cat)}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl border text-sm font-semibold text-left transition-all duration-150"
                    style={{
                      borderColor: active ? cat.color : '#f0f0f0',
                      backgroundColor: active ? `${cat.color}0d` : '#fafafa',
                      color: active ? cat.color : '#6b7280',
                      transform: active ? 'scale(1.02)' : 'scale(1)',
                      boxShadow: active ? `0 2px 12px ${cat.color}20` : 'none',
                    }}
                    onMouseEnter={e => {
                      if (!active) {
                        e.currentTarget.style.borderColor = `${cat.color}40`
                        e.currentTarget.style.backgroundColor = `${cat.color}06`
                      }
                    }}
                    onMouseLeave={e => {
                      if (!active) {
                        e.currentTarget.style.borderColor = '#f0f0f0'
                        e.currentTarget.style.backgroundColor = '#fafafa'
                      }
                    }}
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
            <button
              onClick={() => canProceed && setStep(2)}
              disabled={!canProceed}
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
                  <img src={currentUser.avatar} alt={currentUser.name}
                    className="w-9 h-9 rounded-full object-cover block" />
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
                <button
                  onClick={() => !isEditing && setStep(1)}
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

            {/* Title input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Give your post a title..."
                value={title}
                onChange={e => setTitle(e.target.value)}
                maxLength={80}
                className="w-full px-4 py-3 pr-12 rounded-2xl border bg-gray-50 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 font-semibold"
                style={{ borderColor: title.length > 0 ? (selectedCategory?.color + '60') : '#e5e7eb' }}
                onFocus={e => e.target.style.borderColor = selectedCategory?.color || '#8B3FDE'}
                onBlur={e => e.target.style.borderColor = title.length > 0 ? (selectedCategory?.color + '60') : '#e5e7eb'}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <CircleProgress value={title.length} max={80} color={selectedCategory?.color || '#8B3FDE'} />
              </div>
            </div>

            {/* Description textarea */}
            <div className="relative">
              <textarea
                placeholder="What do you want to share with your neighbors?"
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={4}
                maxLength={300}
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
    </div>
  )
}