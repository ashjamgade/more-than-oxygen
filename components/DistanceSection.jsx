"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

export default function DistanceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [sydneyTime, setSydneyTime] = useState("");
  const [hyderabadTime, setHyderabadTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setSydneyTime(now.toLocaleTimeString("en-AU", { timeZone: "Australia/Sydney", hour: "2-digit", minute: "2-digit", hour12: true }));
      setHyderabadTime(now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: true }));
    };
    update();
    const t = setInterval(update, 60000);
    return () => clearInterval(t);
  }, []);

  const textLines = [
    "Two different countries. Two different time zones.",
    "But distance is just a number.",
    "Because even though we are apart by countries...",
    "You are the first thought of mine.",
    "You are the closest thing near to me.",
  ];

  return (
    <section ref={ref} className="min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center px-6 py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-yellow-400 rounded-full blur-[150px] opacity-10 pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.5 }} className="text-center mb-12 z-10">
        <p className="text-yellow-400 text-sm tracking-[0.3em] uppercase mb-4">Oceans Apart</p>
        <h2 className="text-white text-3xl md:text-5xl font-light tracking-widest">Sydney & Hyderabad</h2>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 md:gap-12 mb-12 z-10 w-full max-w-2xl">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
          <p className="text-white/60 text-xs tracking-widest uppercase mb-2">Sydney · Ashwin</p>
          <p className="text-white text-2xl md:text-4xl font-light tracking-wider">{sydneyTime}</p>
          <p className="text-yellow-400 text-xs mt-2 tracking-widest">👨‍💻</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="backdrop-blur-xl bg-yellow-400/5 border border-yellow-400/30 rounded-2xl p-6 text-center">
          <p className="text-yellow-400/70 text-xs tracking-widest uppercase mb-2">Hyderabad · Dolly</p>
          <p className="text-white text-2xl md:text-4xl font-light tracking-wider">{hyderabadTime}</p>
          <p className="text-yellow-400 text-xs mt-2 tracking-widest">👩‍🔬</p>
        </motion.div>
      </div>

      <div className="relative w-full max-w-4xl h-[300px] md:h-[400px] mb-12">
        <svg viewBox="0 0 800 400" className="w-full h-full absolute inset-0" preserveAspectRatio="xMidYMid meet">
          {Array.from({ length: 40 }).map((_, i) => (
            <circle key={i} cx={50 + Math.random() * 700} cy={50 + Math.random() * 300} r="1" fill="#ffffff" opacity="0.05" />
          ))}

          <motion.circle cx="650" cy="300" r="6" fill="#FFFFFF"
            initial={{ scale: 0, opacity: 0 }} animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }} />
          <motion.circle cx="650" cy="300" r="20" fill="none" stroke="#FFFFFF" strokeWidth="1"
            initial={{ scale: 0, opacity: 0 }} animate={isInView ? { scale: [1, 2], opacity: [0.8, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
          <motion.text x="650" y="340" fill="#B9B9B9" fontSize="14" textAnchor="middle"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 1 }}>
            Sydney 🇦🇺
          </motion.text>

          <motion.circle cx="300" cy="180" r="6" fill="#FFD700"
            initial={{ scale: 0, opacity: 0 }} animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1 }} />
          <motion.circle cx="300" cy="180" r="20" fill="none" stroke="#FFD700" strokeWidth="1"
            initial={{ scale: 0, opacity: 0 }} animate={isInView ? { scale: [1, 2], opacity: [0.8, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }} />
          <motion.text x="300" y="220" fill="#FFD700" fontSize="14" textAnchor="middle"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 1.5 }}>
            Hyderabad 🇮🇳
          </motion.text>

          <motion.path d="M 300 180 Q 475 50 650 300" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 2.5, delay: 2, ease: "easeInOut" }} />

          <motion.text x="475" y="100" fontSize="28" textAnchor="middle"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 3 }}>
            ✈️
          </motion.text>

          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 max-w-3xl text-center flex flex-col gap-6">
        {textLines.map((line, i) => (
          <motion.p key={i}
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.5, delay: 3.5 + i * 1.2, ease: "easeOut" }}
            className={`text-white font-light tracking-wide leading-relaxed ${
              i === textLines.length - 1 ? "text-2xl md:text-4xl mt-6 text-yellow-400 font-medium" : "text-lg md:text-2xl"
            }`}>
            {line}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
