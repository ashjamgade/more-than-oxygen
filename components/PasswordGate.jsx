"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PasswordGate({ children }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const SECRET_PASSWORD = "oxygen";

  useEffect(() => {
    if (localStorage.getItem("dolly_unlocked") === "true") setIsUnlocked(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === SECRET_PASSWORD) {
      localStorage.setItem("dolly_unlocked", "true");
      setIsUnlocked(true);
    } else {
      setError(true);
      setPassword("");
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center px-6"
          >
            <motion.div className="text-center flex flex-col items-center gap-6 max-w-sm">
              <div className="w-16 h-16 rounded-full border border-yellow-400/50 flex items-center justify-center mb-4 relative">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping absolute" />
                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              </div>
              <h1 className="text-white text-2xl font-light tracking-widest">
                This is a private space.
              </h1>
              <p className="text-gray-400 font-light">
                Please enter the secret word to enter.
              </p>
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mt-4">
                <motion.input
                  animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password..."
                  autoFocus
                  className="w-full bg-transparent border-b border-white/20 text-white text-center text-xl py-4 focus:outline-none focus:border-yellow-400 transition-colors"
                />
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-yellow-400 text-sm tracking-widest uppercase text-center"
                  >
                    Hint: Kya tumhe oxygen se zyada kisi ki zaroorat hai? 🌻
                  </motion.p>
                )}
                <button
                  type="submit"
                  className="mt-4 px-8 py-3 border border-white/20 text-white rounded-full text-sm tracking-widest uppercase hover:bg-white/10 transition-colors"
                >
                  Unlock
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={`transition-opacity duration-1000 ${isUnlocked ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}>
        {children}
      </div>
    </>
  );
}
