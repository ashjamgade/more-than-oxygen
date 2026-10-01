"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Fireflies() {
  const [fireflies, setFireflies] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    if (mobile) return;

    // Create fireflies
    const count = 25;
    const items = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 8 + 12,
      delay: Math.random() * 5,
      driftX: (Math.random() - 0.5) * 30,
      driftY: (Math.random() - 0.5) * 30,
    }));
    setFireflies(items);
  }, []);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {fireflies.map((fly) => (
        <motion.div
          key={fly.id}
          className="absolute rounded-full"
          style={{
            left: `${fly.x}%`,
            top: `${fly.y}%`,
            width: `${fly.size}px`,
            height: `${fly.size}px`,
            background: "#FFD700",
            boxShadow: "0 0 12px #FFD700, 0 0 20px rgba(255, 215, 0, 0.6)",
          }}
          animate={{
            x: [0, fly.driftX, -fly.driftX / 2, fly.driftX / 1.5, 0],
            y: [0, fly.driftY, -fly.driftY, fly.driftY / 2, 0],
            opacity: [0.2, 0.9, 0.4, 1, 0.2],
            scale: [0.8, 1.2, 0.9, 1.1, 0.8],
          }}
          transition={{
            duration: fly.duration,
            delay: fly.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}