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
      setSydneyTime(
        now.toLocaleTimeString("en-AU", {
          timeZone: "Australia/Sydney",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
      setHyderabadTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
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
    <section
      ref={ref}
      className="min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center px-6 py-32 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400 rounded-full blur-[180px] opacity-10 pointer-events-none" />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.5 }}
        className="text-center mb-16 z-10"
      >
        <p className="text-yellow-400 text-sm tracking-[0.3em] uppercase mb-4">
          Oceans Apart
        </p>
        <h2 className="text-white text-3xl md:text-5xl font-light tracking-widest">
          Sydney & Hyderabad
        </h2>
      </motion.div>

      {/* Live Clocks */}
      <div className="grid grid-cols-2 gap-4 md:gap-12 mb-16 z-10 w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
        >
          <p className="text-white/60 text-xs tracking-widest uppercase mb-2">
            Sydney · Ashwin
          </p>
          <p className="text-white text-2xl md:text-4xl font-light tracking-wider tabular-nums">
            {sydneyTime}
          </p>
          <p className="text-yellow-400 text-xs mt-2 tracking-widest">👨‍💻</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="backdrop-blur-xl bg-yellow-400/5 border border-yellow-400/30 rounded-2xl p-6 text-center"
        >
          <p className="text-yellow-400/70 text-xs tracking-widest uppercase mb-2">
            Hyderabad · Dolly
          </p>
          <p className="text-white text-2xl md:text-4xl font-light tracking-wider tabular-nums">
            {hyderabadTime}
          </p>
          <p className="text-yellow-400 text-xs mt-2 tracking-widest">👩‍🔬</p>
        </motion.div>
      </div>

      {/* Rotating Globe */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.5, delay: 1 }}
        className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] mb-16 z-10"
      >
        {/* Glow behind globe */}
        <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-3xl" />

        {/* Wireframe Sphere */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-yellow-400/30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 30%, rgba(255,215,0,0.15), transparent 60%)",
          }}
        >
          {/* Latitude lines */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`lat-${i}`}
              className="absolute border border-yellow-400/20 rounded-full"
              style={{
                left: 0,
                right: 0,
                top: `${(i + 1) * 14}%`,
                height: "2px",
                borderRadius: "50%",
              }}
            />
          ))}
          {/* Longitude lines (vertical-ish) */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`lon-${i}`}
              className="absolute border border-yellow-400/15 rounded-full"
              style={{
                top: 0,
                bottom: 0,
                left: `${(i + 1) * 20}%`,
                width: "2px",
              }}
            />
          ))}

          {/* Sydney Marker */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_12px_#fff]"
            style={{ top: "68%", left: "22%" }}
          />
          {/* Hyderabad Marker */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_12px_#FFD700]"
            style={{ top: "50%", left: "62%" }}
          />
        </motion.div>

        {/* Dotted Arc Connecting them */}
        <svg
          className="absolute inset-0 pointer-events-none"
          viewBox="0 0 400 400"
          fill="none"
        >
          <motion.path
            d="M 88 272 Q 200 80 248 200"
            stroke="url(#globeGrad)"
            strokeWidth="2"
            strokeDasharray="6 6"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 3, delay: 2, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="globeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
          </defs>
        </svg>

        {/* Plane emoji along arc */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 3.5 }}
          className="absolute text-2xl"
          style={{ top: "32%", left: "42%" }}
        >
          ✈️
        </motion.div>
      </motion.div>

      {/* Text Lines */}
      <div className="relative z-10 max-w-3xl text-center flex flex-col gap-6">
        {textLines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.5, delay: 3.5 + i * 1.2, ease: "easeOut" }}
            className={`text-white font-light tracking-wide leading-relaxed ${
              i === textLines.length - 1
                ? "text-2xl md:text-4xl mt-6 text-yellow-400 font-medium"
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