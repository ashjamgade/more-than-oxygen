"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function OxygenSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const textLines = [
    "Oxygen keeps the body alive.",
    "But some people... make life feel worth living.",
    "A year has passed since our first video call.",
    "But for me, it still feels like yesterday.",
    "I remember your room. The little things on your desk.",
    "I quietly changed my camera angle so you wouldn't catch me staring.",
    "Even a year later, that moment is my favorite memory.",
    "For me, that's you, Dolly.",
  ];

  return (
    <section
      ref={ref}
      className="min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center px-6 py-32 relative overflow-hidden"
    >
      {/* Pulsing glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[700px] md:h-[700px] bg-yellow-400 rounded-full blur-[180px] pointer-events-none"
      />

      {/* ECG Line */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <svg
          viewBox="0 0 1000 200"
          className="w-full h-[200px]"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 0 100 L 150 100 L 170 100 L 185 40 L 200 160 L 215 100 L 240 100 L 260 100 L 280 60 L 295 140 L 310 100 L 350 100 L 370 100 L 385 30 L 400 170 L 415 100 L 440 100 L 470 100 L 490 50 L 505 150 L 520 100 L 550 100 L 570 100 L 590 20 L 605 180 L 620 100 L 650 100 L 680 100 L 700 60 L 715 140 L 730 100 L 760 100 L 780 100 L 800 40 L 815 160 L 830 100 L 860 100 L 890 100 L 910 50 L 925 150 L 940 100 L 1000 100"
            stroke="#FFD700"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1.5,
            }}
          />
        </svg>
      </div>

      {/* Text */}
      <div className="relative z-10 max-w-3xl text-center flex flex-col gap-6">
        {textLines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.4, delay: i * 1.8, ease: "easeOut" }}
            className={`text-white font-light tracking-wide leading-relaxed ${
              i === textLines.length - 1
                ? "text-3xl md:text-5xl mt-8 text-yellow-400 font-medium"
                : "text-lg md:text-2xl"
            }`}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </section>
  );
}