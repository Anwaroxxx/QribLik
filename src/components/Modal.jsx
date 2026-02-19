import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ isOpen, onClose }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                            w-[90%] max-w-md bg-white rounded-3xl p-8 flex flex-col items-center gap-5 shadow-2xl"
                        initial={{ opacity: 0, scale: 0.85, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 40 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-5 text-gray-400 hover:text-gray-700 text-xl font-bold transition-colors"
                        >
                            ✕
                        </button>

                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-purple-50">
                            😊
                        </div>

                        <h2
                            className="text-2xl font-black text-gray-900 text-center"
                            style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                            Want to explore more?
                        </h2>

                        <p className="text-gray-500 text-sm text-center leading-relaxed">
                            Join <span className="font-bold text-gray-800">Qriblik</span> and unlock
                            everything — events, sports, trading, skill swaps, and more.
                            Your community is waiting for you!
                        </p>

                        <Link
                            to="/SignUp"
                            onClick={onClose}
                            className="w-full py-3 rounded-2xl text-white text-sm font-bold text-center tracking-wide transition-transform hover:-translate-y-0.5"
                            style={{
                                background: "linear-gradient(135deg, #8B3FDE 0%, #C837AB 50%, #FF6B35 100%)",
                                boxShadow: "0 8px 24px #C837AB44",
                            }}
                        >
                            Create Free Account →
                        </Link>

                        <Link
                            to="/SignIn"
                            onClick={onClose}
                            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
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