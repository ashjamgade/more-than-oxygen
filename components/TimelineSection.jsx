"use client";
import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";

export default function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Scroll progress for drawing line
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const timeline = [
    {
      date: "5th July 2025",
      title: "You Accepted My Request",
      desc: "Out of thousands of profiles on Shaadi.com, you said yes to me. That small notification changed everything.",
      emoji: "💌",
    },
    {
      date: "Soon After",
      title: "Our First Video Call",
      desc: "The best call of my life. You were in your room, and I couldn't stop smiling. I noticed everything — even the little things on your desk.",
      emoji: "📹",
    },
    {
      date: "Slowly",
      title: "Your Text Lit Up My Screen",
      desc: "It became my phone's most favorite notification. Even today, seeing your name changes my entire mood.",
      emoji: "💬",
    },
    {
      date: "Every Time",
      title: "When You Posted a Story",
      desc: "It became my world's favorite thing to think about. I paused, smiled, and fell a little more.",
      emoji: "✨",
    },
    {
      date: "That Night",
      title: "When Your Stomach Hurt",
      desc: "I couldn't sleep properly that night either. Your pain became mine. I just wanted to take it all away.",
      emoji: "🫂",
    },
    {
      date: "The Big Step",
      title: "You Asked for a Year",
      desc: "I told my parents. They said, 'It's okay, we can wait.' Who can say no when the thing is about you?",
      emoji: "⏳",
    },
    {
      date: "Today",
      title: "Still Falling, Every Single Day",
      desc: "From Sydney to Hyderabad, from your texts to your stories — I fall for you more every single day. And I made this website, just for you.",
      emoji: "🌻",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center py-32 px-6 overflow-hidden"
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-yellow-400 rounded-full blur-[200px] opacity-[0.07] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.5 }}
        className="text-center mb-24 relative z-10"
      >
        <p className="text-yellow-400 text-sm tracking-[0.3em] uppercase mb-4">
          Chapter by Chapter
        </p>
        <h2 className="text-white text-4xl md:text-6xl font-light tracking-widest">
          Our Journey So Far
        </h2>
      </motion.div>

      <div className="relative max-w-3xl w-full">
        {/* Background track line (dim) */}
        <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />

        {/* Animated draw-on-scroll line */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-600 shadow-[0_0_20px_rgba(255,215,0,0.8)]"
        />

        {timeline.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: i * 0.1 }}
            className={`relative flex items-start gap-6 mb-16 ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } md:gap-12`}
          >
            {/* Dot */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
              className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_25px_rgba(255,215,0,0.9)] z-10 mt-2"
            >
              <motion.div
                animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="absolute inset-0 rounded-full bg-yellow-400"
              />
            </motion.div>

            {/* Content */}
            <div
              className={`ml-16 md:ml-0 md:w-1/2 ${
                i % 2 === 0
                  ? "md:pr-12 md:text-right"
                  : "md:pl-12 md:text-left"
              }`}
            >
              <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-yellow-400/30 transition-all duration-500">
                <span className="text-yellow-400 text-xs tracking-[0.3em] uppercase">
                  {item.date}
                </span>
                <h3 className="text-white text-xl md:text-2xl font-medium mt-2 mb-3 flex items-center gap-2 justify-start md:justify-inherit">
                  <span>{item.emoji}</span>
                  <span>{item.title}</span>
                </h3>
                <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>

            <div className="hidden md:block md:w-1/2" />
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="text-center text-gray-400 text-base md:text-lg font-light mt-8 z-10 max-w-2xl"
      >
        And this is just the beginning. 🌻
      </motion.p>
    </section>
  );
}