import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

export default function Modal({ isOpen, onClose }) {
    const { dark } = useTheme();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 backdrop-blur-sm z-50"
                        style={{ background: dark ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.5)" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md rounded-3xl p-8 flex flex-col items-center gap-5 shadow-2xl"
                        style={{
                            background: dark ? "rgba(20, 8, 40, 0.97)" : "white",
                            border: dark ? "1px solid rgba(139,63,222,0.25)" : "none",
                            boxShadow: dark
                                ? "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,63,222,0.15)"
                                : "0 25px 60px rgba(0,0,0,0.15)",
                            transition: "background 0.5s ease",
                        }}
                        initial={{ opacity: 0, scale: 0.85, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 40 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-5 text-xl font-bold transition-colors"
                            style={{ color: dark ? "rgba(196,168,240,0.6)" : "#9ca3af" }}
                            onMouseEnter={e => e.currentTarget.style.color = dark ? "#c084fc" : "#374151"}
                            onMouseLeave={e => e.currentTarget.style.color = dark ? "rgba(196,168,240,0.6)" : "#9ca3af"}
                        >
                            ✕
                        </button>

                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-colors duration-500"
                            style={{ background: dark ? "rgba(139,63,222,0.2)" : "#f5f3ff" }}
                        >
                            😊
                        </div>

                        <h2
                            className="text-2xl font-black text-center transition-colors duration-500"
                            style={{
                                fontFamily: "'Syne', sans-serif",
                                color: dark ? "#f5f0ff" : "#111827",
                            }}
                        >
                            Want to explore more?
                        </h2>

                        <p
                            className="text-sm text-center leading-relaxed transition-colors duration-500"
                            style={{ color: dark ? "rgba(196,168,240,0.6)" : "#6b7280" }}
                        >
                            Join{" "}
                            <span
                                className="font-bold transition-colors duration-500"
                                style={{ color: dark ? "#d4bbff" : "#1f2937" }}
                            >
                                Qriblik
                            </span>{" "}
                            and unlock everything — events, sports, trading, skill swaps, and more.
                            Your community is waiting for you!
                        </p>

                        <Link
                            to="/SignUp"
                            onClick={onClose}
                            className="w-full py-3 rounded-2xl text-white text-sm font-bold text-center tracking-wide transition-transform hover:-translate-y-0.5"
                            style={{
                                background: "linear-gradient(135deg, #8B3FDE 0%, #C837AB 50%, #FF6B35 100%)",
                                boxShadow: dark
                                    ? "0 8px 28px rgba(139,63,222,0.45)"
                                    : "0 8px 24px #C837AB44",
                            }}
                        >
                            Create Free Account →
                        </Link>

                        <Link
                            to="/SignIn"
                            onClick={onClose}
                            className="text-sm transition-colors"
                            style={{ color: dark ? "rgba(196,168,240,0.5)" : "#9ca3af" }}
                            onMouseEnter={e => e.currentTarget.style.color = dark ? "#c084fc" : "#4b5563"}
                            onMouseLeave={e => e.currentTarget.style.color = dark ? "rgba(196,168,240,0.5)" : "#9ca3af"}
                        >
                            Already have an account?{" "}
                            <span className="underline font-medium">Log in</span>
                        </Link>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}