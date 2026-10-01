"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReasonsInteractive() {
  const [current, setCurrent] = useState(null);
  const [used, setUsed] = useState([]);

  const reasons = [
    { num: 1, text: "Because you balance a modern outlook with deep cultural values." },
    { num: 2, text: "Because you love swimming, singing, and travelling — the simple joys of life." },
    { num: 3, text: "Because you chose the hard path — research at IIIT-H — and you're owning it." },
    { num: 4, text: "Because a girl from Akola is now at the forefront of AI research." },
    { num: 5, text: "Because your calm and honesty make the world feel quieter." },
    { num: 6, text: "Because every photo of yours makes me fall for you more." },
    { num: 7, text: "Because your text is my phone's favorite notification." },
    { num: 8, text: "Because your stories become my world's favorite thing to think about." },
    { num: 9, text: "Because you asked for a year, and you trusted me with that." },
    { num: 10, text: "Because you like sunflowers — and sunflowers always turn towards the light." },
    { num: 11, text: "Because you said you like skirts, and I wanted to buy you a whole wardrobe." },
    { num: 12, text: "Because even when your stomach hurt, I couldn't sleep." },
    { num: 13, text: "Because being apart by countries doesn't change how close you are to me." },
    { num: 14, text: "Because you make ordinary moments feel like memories." },
    { num: 15, text: "Because you are you, Dolly. And that's enough." },
  ];

  const reveal = () => {
    const remaining = reasons.filter((r) => !used.includes(r.num));
    if (remaining.length === 0) {
      setUsed([]);
      setCurrent(reasons[Math.floor(Math.random() * reasons.length)]);
      return;
    }
    const picked = remaining[Math.floor(Math.random() * remaining.length)];
    setCurrent(picked);
    setUsed((p) => [...p, picked.num]);
  };

  return (
    <section className="relative min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center py-32 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400 rounded-full blur-[200px] opacity-[0.08] pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 1.5 }}
        className="text-center mb-16 relative z-10">
        <p className="text-yellow-400 text-sm tracking-[0.3em] uppercase mb-4">Just for you</p>
        <h2 className="text-white text-4xl md:text-6xl font-light tracking-widest">A Hundred Reasons</h2>
        <p className="text-gray-500 mt-4 text-base">Tap the button, Dolly. One reason at a time.</p>
      </motion.div>

      <div className="relative z-10 w-full max-w-2xl min-h-[220px] flex items-center justify-center mb-12">
        <AnimatePresence mode="wait">
          {current ? (
            <motion.div key={current.num}
              initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }} transition={{ duration: 0.6 }}
              className="backdrop-blur-xl bg-white/5 border border-yellow-400/20 rounded-3xl p-10 md:p-14 text-center shadow-[0_0_60px_rgba(255,215,0,0.1)]">
              <p className="text-yellow-400 text-sm tracking-[0.3em] uppercase mb-4">Reason #{current.num}</p>
              <p className="text-white text-xl md:text-2xl font-light leading-relaxed">{current.text}</p>
            </motion.div>
          ) : (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-600 text-lg italic">
              A reason will appear here...
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={reveal}
        className="relative z-10 px-10 py-4 bg-yellow-400 text-black rounded-full text-base md:text-lg font-medium tracking-widest uppercase shadow-[0_0_40px_rgba(255,215,0,0.5)] hover:shadow-[0_0_60px_rgba(255,215,0,0.8)] transition-shadow">
        {used.length === 0 ? "Give me a reason ✨" : "One more 🌻"}
      </motion.button>

      <p className="text-gray-600 text-xs tracking-widest uppercase mt-6 z-10">
        {used.length} of {reasons.length} revealed
      </p>
    </section>
  );
}
