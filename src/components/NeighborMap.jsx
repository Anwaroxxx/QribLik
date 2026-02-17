import { useEffect, useRef, useState } from 'react'
import {
  FiX, FiMapPin, FiPhone, FiMail, FiUsers,
  FiRepeat, FiSearch, FiCalendar, FiMusic,
  FiMonitor, FiNavigation, FiFilter,
} from 'react-icons/fi'
import { MdSportsSoccer, MdOutlineFoodBank, MdOutlineNaturePeople, MdChildCare } from 'react-icons/md'
import { RiHandHeartLine } from 'react-icons/ri'


const CATEGORIES = [
  { label: 'Sport',          icon: MdSportsSoccer,        color: '#8B3FDE' },
  { label: 'Trading',        icon: FiRepeat,              color: '#C837AB' },
  { label: 'Lost and Found', icon: FiSearch,              color: '#FF6B35' },
  { label: 'Swap Skills',    icon: RiHandHeartLine,       color: '#8B3FDE' },
  { label: 'Events',         icon: FiCalendar,            color: '#C837AB' },
  { label: 'Food',           icon: MdOutlineFoodBank,     color: '#FF6B35' },
  { label: 'Gardening',      icon: MdOutlineNaturePeople, color: '#8B3FDE' },
  { label: 'Music',          icon: FiMusic,               color: '#C837AB' },
  { label: 'Tech Help',      icon: FiMonitor,             color: '#FF6B35' },
  { label: 'Childcare',      icon: MdChildCare,           color: '#8B3FDE' },
]


const NEIGHBORS = [
  { id: 'u01', name: 'Anwar El Mansouri', email: 'anwar.elmansouri@gmail.com', phone: '+212 677 866 959', avatar: 'https://i.pravatar.cc/150?img=3',  neighborhood: 'North End',       categories: ['Sport', 'Trading', 'Events'],              lat: 33.615, lng: -7.632 },
  { id: 'u02', name: 'Sofia Tazi',        email: 'sofia.tazi@gmail.com',       phone: '+212 661 234 567', avatar: 'https://i.pravatar.cc/150?img=47', neighborhood: 'Sunset District', categories: ['Music', 'Events', 'Food'],                 lat: 33.592, lng: -7.618 },
  { id: 'u03', name: 'Karim Berrada',     email: 'karim.berrada@gmail.com',    phone: '+212 655 987 321', avatar: 'https://i.pravatar.cc/150?img=12', neighborhood: 'Park Ridge',      categories: ['Sport', 'Tech Help', 'Swap Skills'],      lat: 33.608, lng: -7.652 },
  { id: 'u04', name: 'Leila Moussaoui',   email: 'leila.moussaoui@gmail.com',  phone: '+212 669 111 222', avatar: 'https://i.pravatar.cc/150?img=44', neighborhood: 'Central Square',  categories: ['Gardening', 'Food', 'Childcare'],         lat: 33.628, lng: -7.601 },
  { id: 'u05', name: 'Omar Chakir',       email: 'omar.chakir@gmail.com',      phone: '+212 672 444 888', avatar: 'https://i.pravatar.cc/150?img=15', neighborhood: 'Eastside',        categories: ['Trading', 'Sport', 'Lost and Found'],     lat: 33.581, lng: -7.641 },
  { id: 'u06', name: 'Yasmine Filali',    email: 'yasmine.filali@gmail.com',   phone: '+212 660 777 333', avatar: 'https://i.pravatar.cc/150?img=49', neighborhood: 'Westgate',        categories: ['Sport', 'Events', 'Swap Skills'],         lat: 33.644, lng: -7.668 },
  { id: 'u07', name: 'Bilal Lahlou',      email: 'bilal.lahlou@gmail.com',     phone: '+212 676 555 999', avatar: 'https://i.pravatar.cc/150?img=8',  neighborhood: 'Harbor View',     categories: ['Music', 'Tech Help', 'Sport'],            lat: 33.598, lng: -7.589 },
  { id: 'u08', name: 'Nadia Senhaji',     email: 'nadia.senhaji@gmail.com',    phone: '+212 663 222 777', avatar: 'https://i.pravatar.cc/150?img=36', neighborhood: 'Old Town',        categories: ['Childcare', 'Gardening', 'Food'],         lat: 33.619, lng: -7.676 },
  { id: 'u09', name: 'Hamza Ziani',       email: 'hamza.ziani@gmail.com',      phone: '+212 658 888 444', avatar: 'https://i.pravatar.cc/150?img=18', neighborhood: 'Maplewood',       categories: ['Sport', 'Trading'],                       lat: 33.572, lng: -7.622 },
  { id: 'u10', name: 'Rania Kadiri',      email: 'rania.kadiri@gmail.com',     phone: '+212 671 333 666', avatar: 'https://i.pravatar.cc/150?img=41', neighborhood: 'Riverside',       categories: ['Swap Skills', 'Music', 'Events'],         lat: 33.634, lng: -7.593 },
  { id: 'u11', name: 'Mehdi Naciri',      email: 'mehdi.naciri@gmail.com',     phone: '+212 665 444 111', avatar: 'https://i.pravatar.cc/150?img=22', neighborhood: 'Cedar Hill',      categories: ['Sport', 'Food', 'Lost and Found'],        lat: 33.607, lng: -7.609 },
  { id: 'u12', name: 'Zineb Fassi',       email: 'zineb.fassi@gmail.com',      phone: '+212 668 666 222', avatar: 'https://i.pravatar.cc/150?img=29', neighborhood: 'Lakefront',       categories: ['Gardening', 'Childcare', 'Sport'],        lat: 33.587, lng: -7.660 },
]

const ME = { lat: 33.608, lng: -7.632, name: 'Alex Neighbor', neighborhood: 'Sunset District' }


function getActionLabel(category) {
  const map = {
    'Sport':          'Let\'s play! 🏃',
    'Trading':        'Let\'s trade! 🔄',
    'Lost and Found': 'I can help 🔍',
    'Swap Skills':    'Swap skills! 🤝',
    'Events':         'I\'m in! 📅',
    'Food':           'Let\'s eat! 🍽️',
    'Gardening':      'Let\'s garden! 🌿',
    'Music':          'Jam together! 🎵',
    'Tech Help':      'I\'ll help! 💻',
    'Childcare':      'Count me in! 👶',
  }
  return map[category] || 'Connect!'
}


function NeighborCard({ neighbor, activeCategory, onClose, onAccept, onSkip }) {
  const cat = CATEGORIES.find(c => c.label === activeCategory)
  const color = cat?.color || '#8B3FDE'

  return (
    <div className="absolute bottom-6 left-1/2 z-[1000] w-80"
      style={{ transform: 'translateX(-50%)' }}>
      <div className="bg-white rounded-3xl overflow-hidden"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>

        {/* Gradient banner */}
        <div className="h-16 w-full relative" style={{ background: 'var(--gradient-qriblik)' }}>
          <button onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors">
            <FiX size={14} />
          </button>
        </div>

        {/* Avatar overlapping banner */}
        <div className="px-5 pb-5">
          <div className="-mt-10 mb-3 flex items-end justify-between">
            <div className="p-[3px] rounded-full bg-white shadow-md inline-block">
              <div className="p-[2px] rounded-full" style={{ background: 'var(--gradient-qriblik)' }}>
                <img src={neighbor.avatar} alt={neighbor.name}
                  className="w-16 h-16 rounded-full object-cover block" />
              </div>
            </div>
            {/* Distance badge */}
            <span className="text-xs font-bold px-2.5 py-1 rounded-full mb-1"
              style={{ backgroundColor: `${color}15`, color }}>
              📍 {(Math.random() * 1.5 + 0.2).toFixed(1)} km away
            </span>
          </div>

          <h3 className="font-black text-gray-900 text-base">{neighbor.name}</h3>
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5 mb-3">
            <FiMapPin size={10} style={{ color: '#C837AB' }} />
            {neighbor.neighborhood}
          </div>

          {/* Interests */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {neighbor.categories.map(c => {
              const catData = CATEGORIES.find(x => x.label === c)
              return (
                <span key={c}
                  className="text-[10px] font-bold px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: `${catData?.color || '#8B3FDE'}12`,
                    color: catData?.color || '#8B3FDE',
                  }}>
                  {c}
                </span>
              )
            })}
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-2 mb-4 bg-gray-50 rounded-2xl p-3">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <FiMail size={13} style={{ color }} />
              <span className="truncate">{neighbor.email}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <FiPhone size={13} style={{ color }} />
              <span>{neighbor.phone}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button onClick={onSkip}
              className="flex-1 py-2.5 rounded-2xl text-sm font-semibold text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors">
              Skip
            </button>
            <button onClick={onAccept}
              className="flex-[2] py-2.5 rounded-2xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: 'var(--gradient-qriblik)' }}>
              {getActionLabel(activeCategory)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function NeighborMap({ onBack }) {
  const mapRef     = useRef(null)   // DOM element
  const leafletRef = useRef(null)   // Leaflet map instance
  const markersRef = useRef([])     // All neighbor markers

  const [activeCategory, setActiveCategory]     = useState('Sport')
  const [selectedNeighbor, setSelectedNeighbor] = useState(null)
  const [acceptedIds, setAcceptedIds]           = useState([])
  const [skippedIds, setSkippedIds]             = useState([])
  const [leafletReady, setLeafletReady]         = useState(false)

  // ── LOAD LEAFLET CSS + JS ──────────────────────────────────────────────────

  useEffect(() => {
    // Inject Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }

    // Inject Leaflet JS
    if (window.L) { setLeafletReady(true); return }
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = () => setLeafletReady(true)
    document.head.appendChild(script)
  }, [])

  // ── INIT MAP ───────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!leafletReady || !mapRef.current || leafletRef.current) return
    const L = window.L

    const map = L.map(mapRef.current, {
      center: [ME.lat, ME.lng],
      zoom: 13,
      zoomControl: false,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    // Custom zoom control bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map)

    leafletRef.current = map
  }, [leafletReady])

  // ── UPDATE MARKERS WHEN CATEGORY CHANGES ───────────────────────────────────

  useEffect(() => {
    if (!leafletReady || !leafletRef.current) return
    const L   = window.L
    const map = leafletRef.current

    // Clear old markers
    markersRef.current.forEach(m => map.removeLayer(m))
    markersRef.current = []

    // ── MY POSITION MARKER ──────────────────────────────────────────────────
    const meIcon = L.divIcon({
      className: '',
      html: `
        <div style="
          width:48px; height:48px; position:relative;
          display:flex; align-items:center; justify-content:center;
        ">
          <div style="
            position:absolute; width:48px; height:48px; border-radius:50%;
            background:linear-gradient(135deg,#8B3FDE,#C837AB,#FF6B35);
            opacity:0.25; animation:pulse 2s infinite;
          "></div>
          <div style="
            width:34px; height:34px; border-radius:50%; overflow:hidden;
            border:3px solid white;
            box-shadow:0 4px 16px rgba(139,63,222,0.5);
            background:linear-gradient(135deg,#8B3FDE,#C837AB,#FF6B35);
            display:flex; align-items:center; justify-content:center;
            font-size:14px; font-weight:900; color:white;
          ">ME</div>
        </div>
      `,
      iconSize: [48, 48],
      iconAnchor: [24, 24],
    })

    const meMarker = L.marker([ME.lat, ME.lng], { icon: meIcon }).addTo(map)
    meMarker.bindPopup(`<b style="color:#8B3FDE">📍 You are here</b><br><small>${ME.neighborhood}</small>`)
    markersRef.current.push(meMarker)

    // ── NEIGHBOR MARKERS ────────────────────────────────────────────────────
    const catData = CATEGORIES.find(c => c.label === activeCategory)
    const color   = catData?.color || '#8B3FDE'

    const filtered = NEIGHBORS.filter(n =>
      n.categories.includes(activeCategory) &&
      !skippedIds.includes(n.id)
    )

    filtered.forEach(neighbor => {
      const isAccepted = acceptedIds.includes(neighbor.id)

      const neighborIcon = L.divIcon({
        className: '',
        html: `
          <div style="
            width:44px; height:44px; position:relative; cursor:pointer;
            display:flex; align-items:center; justify-content:center;
          ">
            ${isAccepted ? `
              <div style="
                position:absolute; width:44px; height:44px; border-radius:50%;
                background:${color}; opacity:0.2;
                animation:pulse 2s infinite;
              "></div>
            ` : ''}
            <div style="
              width:36px; height:36px; border-radius:50%; overflow:hidden;
              border:3px solid ${isAccepted ? color : 'white'};
              box-shadow:0 3px 12px rgba(0,0,0,0.2);
              position:relative;
            ">
              <img
                src="${neighbor.avatar}"
                style="width:100%;height:100%;object-fit:cover;"
                onerror="this.style.display='none'"
              />
            </div>
            <div style="
              position:absolute; bottom:-2px; right:-2px;
              width:14px; height:14px; border-radius:50%;
              background:${color}; border:2px solid white;
              display:flex; align-items:center; justify-content:center;
            ">
              ${isAccepted ? '✓' : ''}
            </div>
          </div>
        `,
        iconSize: [44, 44],
        iconAnchor: [22, 22],
      })

      const marker = L.marker([neighbor.lat, neighbor.lng], { icon: neighborIcon }).addTo(map)
      marker.on('click', () => setSelectedNeighbor(neighbor))
      markersRef.current.push(marker)
    })

    // Inject pulse animation
    if (!document.getElementById('map-pulse-style')) {
      const style = document.createElement('style')
      style.id = 'map-pulse-style'
      style.textContent = `
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.25; }
          50% { transform: scale(1.4); opacity: 0.1; }
        }
      `
      document.head.appendChild(style)
    }

  }, [leafletReady, activeCategory, acceptedIds, skippedIds])

  // ── HANDLERS ────────────────────────────────────────────────────────────────

  function handleAccept() {
    if (!selectedNeighbor) return
    setAcceptedIds(p => [...p, selectedNeighbor.id])
    setSelectedNeighbor(null)
  }

  function handleSkip() {
    if (!selectedNeighbor) return
    setSkippedIds(p => [...p, selectedNeighbor.id])
    setSelectedNeighbor(null)
  }

  const activeCat    = CATEGORIES.find(c => c.label === activeCategory)
  const visibleCount = NEIGHBORS.filter(n =>
    n.categories.includes(activeCategory) && !skippedIds.includes(n.id)
  ).length

  // ── RENDER ──────────────────────────────────────────────────────────────────

  return (
    <div className="flex-1 bg-gray-50 min-h-screen flex flex-col">

      {/* TOP BAR */}
      <div className="sticky top-0 z-[999] bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between">
        <button onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors group">
          <span className="group-hover:-translate-x-1 transition-transform duration-150 inline-block">←</span>
          Back to Feed
        </button>
        <div className="flex items-center gap-2">
          <FiNavigation size={15} style={{ color: '#8B3FDE' }} />
          <h1 className="font-black text-gray-900 text-sm">Neighbor Map</h1>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-gray-500 font-medium">{visibleCount} nearby</span>
        </div>
      </div>

      {/* CATEGORY FILTER BAR */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 z-[998]">
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
          <FiFilter size={14} className="text-gray-400 shrink-0" />
          {CATEGORIES.map(cat => {
            const active = activeCategory === cat.label
            return (
              <button key={cat.label}
                onClick={() => { setActiveCategory(cat.label); setSelectedNeighbor(null) }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-150 shrink-0"
                style={{
                  backgroundColor: active ? cat.color : `${cat.color}10`,
                  color: active ? 'white' : cat.color,
                  transform: active ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: active ? `0 2px 10px ${cat.color}40` : 'none',
                }}>
                <cat.icon size={12} />
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* MAP CONTAINER */}
      <div className="flex-1 relative">
        {!leafletReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center animate-pulse"
                style={{ background: 'var(--gradient-qriblik)' }}>
                <FiMapPin size={20} className="text-white" />
              </div>
              <p className="text-sm text-gray-400 font-medium">Loading map...</p>
            </div>
          </div>
        )}

        {/* Leaflet mounts here */}
        <div ref={mapRef} className="w-full h-full" style={{ minHeight: 'calc(100vh - 140px)' }} />

        {/* Active category legend */}
        {activeCat && (
          <div className="absolute top-4 left-4 z-[500] bg-white rounded-2xl px-4 py-2.5 flex items-center gap-2.5"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)', border: `1.5px solid ${activeCat.color}30` }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${activeCat.color}15` }}>
              <activeCat.icon size={16} style={{ color: activeCat.color }} />
            </div>
            <div>
              <p className="text-xs font-black text-gray-900">{activeCategory}</p>
              <p className="text-[10px] text-gray-400">{visibleCount} neighbors interested</p>
            </div>
          </div>
        )}

        {/* Accepted counter */}
        {acceptedIds.length > 0 && (
          <div className="absolute top-4 right-4 z-[500] bg-white rounded-2xl px-4 py-2.5 flex items-center gap-2"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <FiUsers size={14} style={{ color: '#8B3FDE' }} />
            <span className="text-xs font-black" style={{ color: '#8B3FDE' }}>{acceptedIds.length} connected</span>
          </div>
        )}

        {/* Neighbor card popup */}
        {selectedNeighbor && (
          <NeighborCard
            neighbor={selectedNeighbor}
            activeCategory={activeCategory}
            onClose={() => setSelectedNeighbor(null)}
            onAccept={handleAccept}
            onSkip={handleSkip}
          />
        )}
      </div>
    </div>
  )
}