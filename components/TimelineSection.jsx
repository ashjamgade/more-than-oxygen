"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const timeline = [
    { date: "The Beginning", title: "We Matched on Shaadi.com", desc: "Out of thousands of profiles, we found each other. A small notification, a big beginning.", emoji: "💌" },
    { date: "The First Call", title: "Our First Video Call", desc: "The best call of my life. You were in your room, and I couldn't stop smiling. I noticed everything — even the little things on your desk.", emoji: "📹" },
    { date: "The First Text", title: "Your Text Lit Up My Screen", desc: "It became my phone's most favorite notification. Even today, seeing your name changes my entire mood.", emoji: "💬" },
    { date: "The First Story", title: "When You Posted a Story", desc: "It became my world's favorite thing to think about. I paused, smiled, and fell a little more.", emoji: "✨" },
    { date: "The Tough Day", title: "When Your Stomach Hurt", desc: "I couldn't sleep properly that night either. Your pain became mine. I just wanted to take it all away.", emoji: "🫂" },
    { date: "The Big Step", title: "You Asked for a Year", desc: "I told my parents. They said, 'It's okay, we can wait.' Who can say no when the thing is about you?", emoji: "⏳" },
    { date: "Today", title: "Still Falling, Every Single Day", desc: "From Sydney to Hyderabad, from your texts to your stories — I fall for you more every single day. And I made this website, just for you.", emoji: "🌻" },
  ];

  return (
    <section ref={ref} className="relative min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center py-32 px-6 overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-yellow-400 rounded-full blur-[200px] opacity-[0.07] pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.5 }} className="text-center mb-20 relative z-10">
        <p className="text-yellow-400 text-sm tracking-[0.3em] uppercase mb-4">Chapter by Chapter</p>
        <h2 className="text-white text-4xl md:text-6xl font-light tracking-widest">Our Journey So Far</h2>
      </motion.div>

      <div className="relative max-w-3xl w-full">
        <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-yellow-400/40 to-transparent" />

        {timeline.map((item, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: i * 0.3 }}
            className={`relative flex items-start gap-6 mb-16 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:gap-12`}>
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_20px_rgba(255,215,0,0.8)] z-10 mt-2" />

            <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500">
                <span className="text-yellow-400 text-xs tracking-[0.3em] uppercase">{item.date}</span>
                <h3 className="text-white text-xl md:text-2xl font-medium mt-2 mb-3">{item.emoji} {item.title}</h3>
                <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
            <div className="hidden md:block md:w-1/2" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
