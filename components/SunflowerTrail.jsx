"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SunflowerTrail() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    let last = 0;
    const handleMove = (e) => {
      const now = Date.now();
      if (now - last < 200) return;
      last = now;
      const id = now + Math.random();
      setParticles((prev) => [
        ...prev,
        {
          id,
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          rotation: Math.random() * 360,
          scale: Math.random() * 0.5 + 0.5,
        },
      ].slice(-8));
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id));
      }, 1200);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998] hidden md:block">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.5, x: p.x, y: p.y, rotate: 0 }}
            animate={{ opacity: 0, scale: 1, y: p.y + 50, rotate: p.rotation }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute text-lg"
            style={{ left: p.x, top: p.y }}
          >
            🌻
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
