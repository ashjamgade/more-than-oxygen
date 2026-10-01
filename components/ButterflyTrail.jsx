"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ButterflyTrail() {
  const [particles, setParticles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    if (mobile) return;

    let last = 0;
    const handleMove = (e) => {
      const now = Date.now();
      if (now - last < 250) return; // Only 4 butterflies per second
      last = now;

      const id = now + Math.random();
      const isButterfly = Math.random() > 0.5;

      setParticles((prev) =>
        [
          ...prev,
          {
            id,
            x: e.clientX + (Math.random() - 0.5) * 30,
            y: e.clientY + (Math.random() - 0.5) * 30,
            rotation: Math.random() * 360,
            emoji: isButterfly ? "🦋" : "🌻",
          },
        ].slice(-10)
      );

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id));
      }, 1500);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              opacity: 1,
              scale: 0.4,
              x: p.x,
              y: p.y,
              rotate: 0,
            }}
            animate={{
              opacity: 0,
              scale: 1.2,
              y: p.y - 80,
              x: p.x + (Math.random() - 0.5) * 60,
              rotate: p.rotation,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute text-xl"
            style={{ left: p.x, top: p.y }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}