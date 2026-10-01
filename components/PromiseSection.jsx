"use client";
import { motion } from "framer-motion";

export default function PromiseSection() {
  const promises = [
    { num: "01", text: "I promise to always respect your space. Your dreams, your career, your time — they come first." },
    { num: "02", text: "I promise to laugh at your worst jokes, and to make you laugh at mine (even when they're terrible)." },
    { num: "03", text: "I promise to be your safest place. The one you can be completely yourself with, without any fear." },
    { num: "04", text: "I promise to celebrate every one of your wins like it's my own — every paper, every role, every dream." },
    { num: "05", text: "I promise to never try to change you. I fell for you as you are, and that's exactly who I want." },
    { num: "06", text: "I promise to be patient. However long you need, however slow we go — I'll be right here." },
    { num: "07", text: "I promise to love you not just in words, but in the quiet, ordinary things. Every single day." },
  ];

  return (
    <section className="relative min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center py-32 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400 rounded-full blur-[200px] opacity-[0.06] pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 1.5 }}
        className="text-center mb-20 relative z-10">
        <p className="text-yellow-400 text-sm tracking-[0.3em] uppercase mb-4">My Word to You</p>
        <h2 className="text-white text-4xl md:text-6xl font-light tracking-widest">I Promise</h2>
      </motion.div>

      <div className="max-w-3xl w-full z-10 space-y-6">
        {promises.map((p, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }}
            className="flex items-start gap-6 backdrop-blur-xl bg-white/5 border-l-2 border-yellow-400/50 rounded-r-2xl p-6 md:p-8 hover:bg-white/10 transition-all duration-500">
            <span className="text-yellow-400 text-2xl md:text-3xl font-light tracking-widest flex-shrink-0">{p.num}</span>
            <p className="text-gray-200 text-base md:text-lg font-light leading-relaxed">{p.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 1 }}
        className="text-center text-gray-300 text-lg md:text-xl font-light mt-20 z-10 max-w-2xl">
        And I promise to keep these promises, not because I have to —<br />
        <span className="text-yellow-400">but because you deserve nothing less.</span>
      </motion.p>
    </section>
  );
}
