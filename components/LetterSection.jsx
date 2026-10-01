"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function LetterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const letterContent = [
    "Dear Dolly,",
    "I don't know exactly how to start this. We matched on Shaadi.com, and then we had that first video call. I still remember it was the best call of my life. I was sitting there, looking at you, and somewhere between that conversation, I fell for you. Slowly, and then all at once.",
    "I know we haven't met in person yet. And I know I might not be the perfect guy you always imagined. I may not be as handsome as your dream guy. But I promise you, my love for you is pure.",
    "I notice the little things. I remember your room from that first call. I noticed the small things on your desk. I quietly changed my camera angle so you wouldn't catch me staring. Even a year later, that ordinary moment is my favorite memory.",
    "I remember the day you told me your stomach was paining. That day, I couldn't sleep properly either. Your pain became mine.",
    "You once told me you like skirts. That day, I thought to myself — I will buy you a whole wardrobe of the clothes you love, just so I can see you happy all the time.",
    "And I remember when you said you wanted a one-year break before thinking about engagement. I told my parents. They said, 'It's okay, we can wait.' I mean, who can say no when the thing is about you?",
    "You are in Hyderabad, chasing your dreams at IIIT. I am here in Sydney. We are in different countries, different time zones. But you are the first thought of my morning. You are the closest thing to me. Your text is my phone's most favorite notification. Even if you don't text, just seeing your name light up my screen changes my entire mood. When you post a story, it becomes my world's favorite thing to think about.",
    "I might not be perfect. But I am like water, Dolly. I will take the shape of whatever life you want to build. I am like sand. I will adapt to whatever shape you need me to be. I don't want to change you. I just want to be a part of your world.",
    "Every day, I think about what I can do just so you understand how much I love you.",
    "I made this because sometimes words aren't enough. And maybe this website isn't enough either. But every little detail here exists because you matter to me.",
    "— Ashwin ❤️",
  ];

  return (
    <section ref={ref} className="min-h-screen w-full bg-[#050505] flex items-center justify-center px-6 py-32 relative">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 max-w-3xl w-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 md:p-16 shadow-2xl">
        <div className="flex flex-col gap-6 text-gray-200">
          {letterContent.map((p, i) => (
            <motion.p key={i}
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: i * 0.3 }}
              className={`font-handwriting leading-relaxed text-xl md:text-2xl ${
                i === 0 ? "text-yellow-400 text-3xl md:text-4xl mb-4" : ""
              } ${i === letterContent.length - 1 ? "text-right mt-8 text-yellow-400 text-3xl md:text-4xl" : ""}`}>
              {p}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
