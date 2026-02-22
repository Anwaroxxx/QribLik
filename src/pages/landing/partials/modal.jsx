import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModalContext } from "../../../contexts/Context-moda";
import { useTheme } from "../../../contexts/ThemeContext";
import { Link } from "react-router-dom";

const gradientStyle =
  "linear-gradient(135deg, #8B3FDE 0%, #C837AB 50%, #FF6B35 100%)";

export default function QribLikModal() {
  const { open, setOpen } = useContext(ModalContext);
  const { dark } = useTheme();

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

        .close-btn:hover {
          background: rgba(139, 63, 222, 0.1);
        }
      `}</style>

      <AnimatePresence>
        {open && (
          <>

            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={() => setOpen(false)}
              className="modal-backdrop fixed inset-0 z-40"
              style={{
                background: dark
                  ? "rgba(5, 0, 20, 0.6)"
                  : "rgba(20, 4, 46, 0.25)",
              }}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">


              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.88, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[32px] relative"
                style={{
                  width: "min(480px, 92vw)",
                  padding: "48px 44px 40px",
                  pointerEvents: "auto",
                  background: dark
                    ? "rgba(20, 8, 40, 0.95)"
                    : "rgba(255, 255, 255, 0.92)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: dark
                    ? "1px solid rgba(139,63,222,0.25)"
                    : "1px solid rgba(139,63,222,0.10)",
                  boxShadow: dark
                    ? "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,63,222,0.15)"
                    : "0 32px 80px rgba(139,63,222,0.18), 0 2px 8px rgba(139,63,222,0.08)",
                  transition: "background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease",
                }}
              >

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setOpen(false)}
                  className="close-btn absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-150"
                  style={{ color: dark ? "#c084fc" : "#9b72cf" }}
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


                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
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
                  transition={{ delay: 0.2, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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
                  <span style={{ color: "white", fontSize: 22 }}>✦</span>
                </motion.div>

                {/* Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 34,
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                    marginBottom: 14,

                    color: dark ? "#f5f0ff" : "#1a0a2e",
                    transition: "color 0.5s ease",
                  }}
                >
                  Welcome to{" "}
                  <span className="gradient-text">QribLik</span>
                </motion.h2>


                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontSize: 15,
                    lineHeight: 1.7,
                    marginBottom: 36,
                    fontWeight: 400,
                    // ── subtext color switches ──
                    color: dark ? "rgba(196,168,240,0.7)" : "#7a5fa0",
                    transition: "color 0.5s ease",
                  }}
                >
                  You should register with us to see the best and most diverse
                  communities. Let's go!
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.38, duration: 0.4 }}
                  style={{
                    height: 1,
                    background: dark
                      ? "linear-gradient(90deg, rgba(139,63,222,0.25) 0%, rgba(255,107,53,0.12) 100%)"
                      : "linear-gradient(90deg, rgba(139,63,222,0.12) 0%, rgba(255,107,53,0.06) 100%)",
                    marginBottom: 28,
                    transition: "background 0.5s ease",
                  }}
                />


                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: "flex", gap: 12 }}
                >
                  <Link to="/SignUp" className="w-full">
                    <button
                      onClick={() => setOpen(false)}
                      className="gradient-btn w-full py-3 rounded-full text-white font-semibold text-[14px] shadow-[0_8px_24px_rgba(200,55,171,0.24)]"
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