"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { STORY, elapsedSince } from "../lib/story";

export default function LiveTimeCounter() {
  const [elapsed, setElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculate = () => {
      setElapsed(elapsedSince(STORY.counterStart));
    };

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center py-32 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400 rounded-full blur-[200px] opacity-[0.08] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="text-center mb-16 relative z-10"
      >
        <p className="text-yellow-400 text-sm tracking-[0.3em] uppercase mb-4">
          A little more time, a little more us
        </p>
        <h2 className="text-white text-3xl md:text-5xl font-light tracking-widest">
          Our Story, Since 25 July 2025
        </h2>
      </motion.div>

      {/* Counter Grid */}
      <div className="relative z-10 grid grid-cols-4 gap-3 md:gap-6 max-w-3xl w-full">
        {[
          { label: "Days", value: elapsed.days },
          { label: "Hours", value: elapsed.hours },
          { label: "Minutes", value: elapsed.minutes },
          { label: "Seconds", value: elapsed.seconds },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            className="backdrop-blur-xl bg-white/5 border border-yellow-400/20 rounded-2xl p-4 md:p-6 text-center hover:bg-white/10 transition-all duration-500"
          >
            <div className="text-3xl md:text-5xl font-light text-white tracking-wider tabular-nums">
              {String(item.value).padStart(2, "0")}
            </div>
            <div className="text-yellow-400/70 text-[10px] md:text-xs tracking-[0.3em] uppercase mt-2">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 1 }}
        className="text-center text-gray-400 text-base md:text-lg font-light mt-16 max-w-xl z-10 leading-relaxed"
      >
        You accepted my request on 5 July 2025.
        <br />
        This little clock begins on 25 July 2025, at midnight in India.
      </motion.p>
    </section>
  );
}