import { useState } from "react";

const MapPinIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      fill="white"
      opacity="0.95"
    />
    <circle cx="12" cy="9" r="2.5" fill="url(#pinGrad)" />
    <defs>
      <radialGradient id="pinGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FF6B35" />
        <stop offset="100%" stopColor="#8B3FDE" />
      </radialGradient>
    </defs>
  </svg>
);

export default function MapsButton() {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
  };

  return (
    <>
      <style>{`
        :root {
          --gradient-qriblik: linear-gradient(135deg, #8B3FDE 0%, #C837AB 50%, #FF6B35 100%);
        }

        .maps-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          overflow: hidden;
          background: var(--gradient-qriblik);
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.3px;
          outline: none;
          transition: transform 0.15s ease, box-shadow 0.3s ease;
          box-shadow:
            0 4px 24px rgba(139, 63, 222, 0.45),
            0 2px 8px rgba(0,0,0,0.3);
          -webkit-tap-highlight-color: transparent;
        }

        .maps-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--gradient-qriblik);
          opacity: 0;
          transition: opacity 0.3s ease;
          filter: brightness(1.3) saturate(1.2);
          border-radius: inherit;
        }

        .maps-btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow:
            0 0 32px rgba(200, 55, 171, 0.5),
            0 0 64px rgba(139, 63, 222, 0.25),
            0 8px 32px rgba(0,0,0,0.4);
        }

        .maps-btn:hover::before {
          opacity: 1;
        }

        .maps-btn:active {
          transform: translateY(0px) scale(0.97);
        }

        .maps-btn .btn-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .maps-btn .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: scale(0);
          animation: rippleAnim 0.7s linear forwards;
          pointer-events: none;
          z-index: 1;
        }

        @keyframes rippleAnim {
          to { transform: scale(4); opacity: 0; }
        }

        .maps-btn .highlight-sheen {
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transform: skewX(-20deg);
          animation: sheen 3.5s ease-in-out infinite;
          pointer-events: none;
          z-index: 3;
        }

        @keyframes sheen {
          0%, 60% { left: -75%; opacity: 0; }
          65% { opacity: 1; }
          80%, 100% { left: 130%; opacity: 0; }
        }
      `}</style>

      <button className="maps-btn" onClick={handleClick}>
        <div className="highlight-sheen" />

        {ripples.map((r) => (
          <span
            key={r.id}
            className="ripple"
            style={{ width: 80, height: 80, left: r.x - 40, top: r.y - 40 }}
          />
        ))}

        <div className="btn-content">
          <MapPinIcon />
          <span>Maps</span>
        </div>
      </button>
    </>
  );
}