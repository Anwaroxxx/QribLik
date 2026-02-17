import { FiX, FiHeart, FiMessageCircle, FiAlertCircle, FiRepeat, FiCalendar, FiMapPin } from 'react-icons/fi'

const notifications = [
  {
    id: 1,
    type: 'post',
    read: false,
    avatar: 'https://i.pravatar.cc/150?img=33',
    user: 'David Chen',
    action: 'posted something in',
    target: 'Trading',
    preview: 'Trading vintage camera for a tablet 📷',
    time: '2 min ago',
  },
  {
    id: 2,
    type: 'like',
    read: false,
    avatar: 'https://i.pravatar.cc/150?img=47',
    user: 'Marta Wilson',
    action: 'liked your post',
    target: 'Looking for a tennis partner',
    preview: null,
    time: '15 min ago',
  },
  {
    id: 3,
    type: 'comment',
    read: false,
    avatar: 'https://i.pravatar.cc/150?img=23',
    user: 'Emma Wilson',
    action: 'commented on your post',
    target: null,
    preview: '"I know someone who plays! I\'ll DM you 🎾"',
    time: '1 hour ago',
  },
  {
    id: 4,
    type: 'lostfound',
    read: true,
    avatar: 'https://i.pravatar.cc/150?img=11',
    user: 'Alex Rivera',
    action: 'marked a Lost & Found post as',
    target: 'Resolved ✅',
    preview: 'Golden Retriever near Central Park',
    time: '3 hours ago',
  },
  {
    id: 5,
    type: 'swap',
    read: true,
    avatar: 'https://i.pravatar.cc/150?img=15',
    user: 'Karim Berrada',
    action: 'wants to swap skills with you',
    target: null,
    preview: 'He offers Guitar lessons in exchange for Coding 🎸',
    time: '5 hours ago',
  },
  {
    id: 6,
    type: 'event',
    read: true,
    avatar: 'https://i.pravatar.cc/150?img=20',
    user: 'Sofia Tazi',
    action: 'created an event near',
    target: 'Sunset District',
    preview: 'Neighborhood cleanup Saturday 9AM 🌿',
    time: 'Yesterday',
  },
]

const iconMap = {
  post: { icon: FiRepeat, color: '#8B3FDE', bg: 'rgba(139,63,222,0.1)' },
  like: { icon: FiHeart, color: '#C837AB', bg: 'rgba(200,55,171,0.1)' },
  comment: { icon: FiMessageCircle, color: '#8B3FDE', bg: 'rgba(139,63,222,0.1)' },
  lostfound: { icon: FiAlertCircle, color: '#FF6B35', bg: 'rgba(255,107,53,0.1)' },
  swap: { icon: FiRepeat, color: '#C837AB', bg: 'rgba(200,55,171,0.1)' },
  event: { icon: FiCalendar, color: '#FF6B35', bg: 'rgba(255,107,53,0.1)' },
}

export default function NotificationsPanel({ onClose }) {
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    /* Backdrop */
    <div className="fixed inset-0 z-50" onClick={onClose}>
      {/* Panel — stop click from bubbling to backdrop */}
      <div
        className="absolute right-4 top-16 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
        style={{ boxShadow: '0 20px 60px rgba(139,63,222,0.12)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-gray-900 text-base">Notifications</h2>
            {unreadCount > 0 && (
              <span
                className="text-xs font-bold text-white px-2 py-0.5 rounded-full"
                style={{ background: 'var(--gradient-qriblik)' }}
              >
                {unreadCount} new
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Notification list */}
        <div className="overflow-y-auto max-h-[480px]">
          {notifications.map((notif) => {
            const { icon: Icon, color, bg } = iconMap[notif.type]
            return (
              <div
                key={notif.id}
                className={`flex gap-3 px-5 py-4 border-b border-gray-50 cursor-pointer transition-colors duration-150 hover:bg-gray-50 ${
                  !notif.read ? 'bg-purple-50/40' : ''
                }`}
              >
                {/* Avatar + type icon */}
                <div className="relative shrink-0">
                  <img
                    src={notif.avatar}
                    alt={notif.user}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div
                    className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: bg, border: `1.5px solid white` }}
                  >
                    <Icon size={10} style={{ color }} />
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 leading-snug">
                    <span className="font-semibold text-gray-900">{notif.user}</span>
                    {' '}{notif.action}{' '}
                    {notif.target && (
                      <span className="font-semibold" style={{ color }}>{notif.target}</span>
                    )}
                  </p>
                  {notif.preview && (
                    <p className="text-xs text-gray-400 mt-0.5 truncate">{notif.preview}</p>
                  )}
                  <div className="flex items-center gap-1 mt-1">
                    <FiMapPin size={9} className="text-gray-300" />
                    <p className="text-[10px] text-gray-400">{notif.time}</p>
                  </div>
                </div>

                {/* Unread dot */}
                {!notif.read && (
                  <div className="shrink-0 mt-1.5 w-2 h-2 rounded-full" style={{ background: '#8B3FDE' }} />
                )}
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 text-center">
          <button
            className="text-sm font-semibold transition-colors"
            style={{ color: '#8B3FDE' }}
          >
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  )
}