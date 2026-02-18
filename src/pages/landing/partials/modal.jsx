import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { ModalContext } from "../../../contexts/Context-moda";
import { Link } from "react-router-dom";
const gradientStyle =
  "linear-gradient(135deg, #8B3FDE 0%, #C837AB 50%, #FF6B35 100%)";

export default function QribLikModal() {
  const { open, setOpen } = useContext(ModalContext);

  return (
    <>
      <style>{`
        
        .gradient-text {
          background: linear-gradient(135deg, #8B3FDE 0%, #C837AB 50%, #FF6B35 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gradient-btn {
          background: linear-gradient(135deg, #8B3FDE 0%, #C837AB 50%, #FF6B35 100%);
          transition: opacity 0.2s, transform 0.15s;
        }

        .gradient-btn:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }

        .gradient-btn:active {
          transform: translateY(0px);
        }

        .modal-backdrop {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .modal-card {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }

        .close-btn:hover {
          background: rgba(139, 63, 222, 0.08);
        }

        .outline-gradient-btn {
          position: relative;
          background: white;
          z-index: 0;
        }

        .outline-gradient-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 100px;
          padding: 1.5px;
          background: linear-gradient(135deg, #8B3FDE 0%, #C837AB 50%, #FF6B35 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          z-index: -1;
        }
      `}</style>
      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={() => setOpen(false)}
              className="modal-backdrop fixed inset-0 z-40"
              style={{ background: "rgba(20, 4, 46, 0.25)" }}
            />

            {/* Centering wrapper */}
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
              {/* Modal card */}
              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.88, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 16 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="modal-card rounded-[32px] shadow-[0_32px_80px_rgba(139,63,222,0.18),0_2px_8px_rgba(139,63,222,0.08)]"
                style={{
                  width: "min(480px, 92vw)",
                  padding: "48px 44px 40px",
                  border: "1px solid rgba(139,63,222,0.10)",
                  pointerEvents: "auto",
                }}
              >
                {/* Close button */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setOpen(false)}
                  className="close-btn absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-150"
                  style={{ color: "#9b72cf" }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M12 4L4 12M4 4l8 8"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.button>

                {/* Top gradient bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    height: 3,
                    background: gradientStyle,
                    borderRadius: 100,
                    marginBottom: 36,
                    transformOrigin: "left",
                  }}
                />

                {/* Icon mark */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    background: gradientStyle,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 24,
                    boxShadow: "0 8px 24px rgba(200,55,171,0.28)",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"
                      fill="white"
                      opacity="0"
                    />
                    <path
                      d="M17 12l-5-5-5 5M12 7v10"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span style={{ color: "white", fontSize: 22 }}>✦</span>
                </motion.div>

                {/* Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.25,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 34,
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                    marginBottom: 14,
                    color: "#1a0a2e",
                  }}
                >
                  Welcome to
                  <span className="gradient-text">QribLik</span>
                </motion.h2>

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.32,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: "#7a5fa0",
                    marginBottom: 36,
                    fontWeight: 400,
                  }}
                >
                  You should register with us to see the best and most diverse
                  communities. Let's go!{" "}
                </motion.p>

                {/* Divider */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.38, duration: 0.4 }}
                  style={{
                    height: 1,
                    background:
                      "linear-gradient(90deg, rgba(139,63,222,0.12) 0%, rgba(255,107,53,0.06) 100%)",
                    marginBottom: 28,
                  }}
                />

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.42,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ display: "flex", gap: 12 }}
                >
                  <Link to="/SignUp" className=" w-full">
                    <button
                      onClick={() => setOpen(false)}
                      className="gradient-btn flex-1 py-3 rounded-full text-white w-full font-semibold text-[14px] shadow-[0_8px_24px_rgba(200,55,171,0.24)]"
                      style={{ letterSpacing: "0.02em" }}
                    >
                      Get started
                    </button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
