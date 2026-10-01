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
    "I remember your room. The little things on your desk. Just you, being completely real.",
    "I quietly changed my camera angle so you couldn't see all the things... so you wouldn't catch me staring.",
    "Even a year later, that moment is my favorite memory. I fall for you more every single day.",
    "For me, that's you, Dolly.",
  ];

  return (
    <section ref={ref} className="min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center px-6 py-32 relative overflow-hidden">
      <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-yellow-400 rounded-full blur-[120px]" />
      <div className="relative z-10 max-w-4xl text-center flex flex-col gap-8">
        {textLines.map((line, i) => (
          <motion.p key={i}
            initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.5, delay: i * 2.5, ease: "easeOut" }}
            className={`text-white font-light tracking-wide leading-relaxed ${
              i === textLines.length - 1 ? "text-3xl md:text-5xl mt-8 text-yellow-400 font-medium" : "text-xl md:text-3xl"
            }`}>
            {line}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
