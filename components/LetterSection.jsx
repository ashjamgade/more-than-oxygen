"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function LetterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [visibleChars, setVisibleChars] = useState(0);

  const letterContent = [
    "Dear Dolly,",
    "I don't know exactly how to start this. We matched on Shaadi.com, and then we had that first video call. I still remember it was the best call of my life.",
    "I know we haven't met in person yet. And I know I might not be the perfect guy you imagined. But I promise you, my love for you is pure.",
    "I notice the little things. I remember your room from that first call. I quietly changed my camera angle so you wouldn't catch me staring.",
    "I remember the day you told me your stomach was paining. That day, I couldn't sleep properly either. Your pain became mine.",
    "You once told me you like skirts. That day, I thought — I will buy you a whole wardrobe of the clothes you love.",
    "And I remember when you said you wanted a one-year break. I told my parents. They said, 'It's okay, we can wait.'",
    "You are in Hyderabad, chasing your dreams at IIIT. I am in Sydney. Different countries, different time zones. But you are the first thought of my morning.",
    "I am like water, Dolly. I will take the shape of whatever life you want to build. I don't want to change you. I just want to be a part of your world.",
    "Every day, I think about what I can do just so you understand how much I love you.",
    "— Ashwin ❤️",
  ];

  const fullText = letterContent.join("\n\n");
  const totalChars = fullText.length;

  useEffect(() => {
    if (!isInView) return;
    if (visibleChars >= totalChars) return;

    const timer = setTimeout(() => {
      setVisibleChars((c) => Math.min(c + 3, totalChars));
    }, 20);
    return () => clearTimeout(timer);
  }, [isInView, visibleChars, totalChars]);

  // Split rendered text back into paragraphs
  const visibleText = fullText.slice(0, visibleChars);
  const paragraphs = visibleText.split("\n\n");

  return (
    <section
      ref={ref}
      className="min-h-screen w-full bg-[#050505] flex items-center justify-center px-6 py-32 relative"
    >
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/aged-paper.png')",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 max-w-3xl w-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 md:p-16 shadow-2xl"
      >
        <div className="flex flex-col gap-6 text-gray-200">
          {paragraphs.map((p, i) => {
            const isFirst = i === 0;
            const isLast = i === paragraphs.length - 1 && visibleChars >= totalChars;
            return (
              <p
                key={i}
                className={`font-handwriting leading-relaxed text-xl md:text-2xl whitespace-pre-wrap ${
                  isFirst ? "text-yellow-400 text-3xl md:text-4xl mb-4" : ""
                } ${isLast ? "text-right mt-8 text-yellow-400 text-3xl md:text-4xl" : ""}`}
              >
                {p}
              </p>
            );
          })}

          {/* Blinking cursor */}
          {visibleChars < totalChars && (
            <span className="inline-block w-[2px] h-[1.5em] bg-yellow-400 animate-pulse" />
          )}
        </div>
      </motion.div>
    </section>
  );
}