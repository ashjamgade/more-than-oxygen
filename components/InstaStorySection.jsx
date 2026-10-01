"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InstaStorySection() {
  const stories = [
    { url: "/photos/dolly-1.jpg", caption: "Roots 🌿", location: "Akola, Maharashtra" },
    { url: "/photos/dolly-2.jpg", caption: "Elegance ✨", location: "IISER Bhopal" },
    { url: "/photos/dolly-3.jpg", caption: "Just you 🌻", location: "Somewhere beautiful" },
    { url: "/photos/dolly-4.jpg", caption: "Culture 🤍", location: "Pahadi vibes" },
    { url: "/photos/dolly-5.jpg", caption: "Candid 💛", location: "Campus days" },
    { url: "/photos/dolly-6.jpg", caption: "Glow 🌟", location: "Diwali nights" },
    { url: "/photos/dolly-7.jpg", caption: "Dreamer 💫", location: "Chasing goals" },
    { url: "/photos/dolly-8.jpg", caption: "Sunflower soul 🌻", location: "Always" },
  ];

  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const DURATION = 4000;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrent((c) => (c + 1) % stories.length);
          return 0;
        }
        return prev + (100 / (DURATION / 50));
      });
    }, 50);
    return () => clearInterval(interval);
  }, [current, isPaused, stories.length]);

  useEffect(() => { setProgress(0); }, [current]);

  return (
    <section className="relative min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center py-32 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400 rounded-full blur-[200px] opacity-[0.08] pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 1.5 }}
        className="text-center mb-16 relative z-10">
        <p className="text-yellow-400 text-sm tracking-[0.3em] uppercase mb-4">Her Story, Every Frame</p>
        <h2 className="text-white text-4xl md:text-6xl font-light tracking-widest">A Girl I Can't Stop Watching</h2>
        <p className="text-gray-500 mt-4 text-base max-w-xl mx-auto">Tap the sides to move through her moments.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 }}
        className="relative z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}>
        <div className="relative w-[320px] h-[620px] md:w-[380px] md:h-[720px] rounded-[3rem] bg-gradient-to-b from-neutral-900 to-black border border-white/10 shadow-[0_0_80px_rgba(255,215,0,0.15)] p-3">
          <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-black">
            <AnimatePresence mode="wait">
              <motion.img key={current} src={stories[current].url} alt={stories[current].caption}
                initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://via.placeholder.com/380x720/0A0A0A/FFD700?text=Dolly"; }} />
            </AnimatePresence>

            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/90 to-transparent z-10 pointer-events-none" />

            <div className="absolute top-4 left-4 right-4 flex gap-1 z-20">
              {stories.map((_, i) => (
                <div key={i} className="flex-1 h-[2.5px] bg-white/30 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-yellow-400 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: i < current ? "100%" : i === current ? `${progress}%` : "0%" }}
                    transition={{ duration: 0.05, ease: "linear" }} />
                </div>
              ))}
            </div>

            <div className="absolute top-8 left-4 right-4 flex items-center gap-3 z-20">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-pink-500 p-[2px]">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-sm">🌻</div>
              </div>
              <div>
                <p className="text-white text-sm font-medium tracking-wide">_sharyu_uu</p>
                <p className="text-white/70 text-xs tracking-wider">{stories[current].location}</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={current}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.6 }}
                className="absolute bottom-8 left-6 right-6 z-20">
                <p className="text-white text-2xl font-light tracking-wide">{stories[current].caption}</p>
                <p className="text-yellow-400 text-xs tracking-widest uppercase mt-3">— My favorite story, every time</p>
              </motion.div>
            </AnimatePresence>

            <button onClick={() => { setCurrent((c) => (c - 1 + stories.length) % stories.length); setProgress(0); }}
              className="absolute left-0 top-0 bottom-0 w-1/3 z-30 focus:outline-none" aria-label="Previous" />
            <button onClick={() => { setCurrent((c) => (c + 1) % stories.length); setProgress(0); }}
              className="absolute right-0 top-0 bottom-0 w-1/3 z-30 focus:outline-none" aria-label="Next" />
          </div>
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 h-16 bg-yellow-400 blur-3xl opacity-20 rounded-full" />
      </motion.div>

      <AnimatePresence>
        {isPaused && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="text-yellow-400 text-sm tracking-widest uppercase mt-8 z-10">
            ⏸ Paused — Take your time
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}
