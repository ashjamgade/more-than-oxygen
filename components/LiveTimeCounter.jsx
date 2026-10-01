"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ⚠️ YAHAN APNI DATE DAALO (First video call ki date)
// Format: "YYYY-MM-DDTHH:MM:SS"
const FIRST_CALL_DATE = "2025-10-01T20:30:00";

export default function LiveTimeCounter() {
  const [elapsed, setElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculate = () => {
      const start = new Date(FIRST_CALL_DATE).getTime();
      const now = Date.now();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setElapsed({ days, hours, minutes, seconds });
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
          Every Second Counts
        </p>
        <h2 className="text-white text-3xl md:text-5xl font-light tracking-widest">
          Since Our First Video Call
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
        And I've counted <span className="text-yellow-400">every single one</span> of them.
        <br />
        Because you matter that much to me. 🌻
      </motion.p>
    </section>
  );
}