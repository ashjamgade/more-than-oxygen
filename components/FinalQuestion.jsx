"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FinalQuestion() {
  const [stage, setStage] = useState("intro");
  const [jokeText, setJokeText] = useState("");
  const [dodgeCount, setDodgeCount] = useState(0);
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const [thinkPos, setThinkPos] = useState({ x: 0, y: 0 });
  const [notYetPos, setNotYetPos] = useState({ x: 0, y: 0 });
  const [celebration, setCelebration] = useState([]);

  const handleDodge = (type) => {
    const moveX = (Math.random() - 0.5) * 600;
    const moveY = (Math.random() - 0.5) * 400;
    if (type === "think") {
      setThinkPos({ x: moveX, y: moveY });
      setJokeText(
        dodgeCount === 0
          ? "Arre! Where are you going? 😂"
          : dodgeCount === 1
          ? "The only right answer is YES ❤️"
          : "Don't make me run, Dolly! 🏃‍♂️"
      );
    } else {
      setNotYetPos({ x: moveX, y: moveY });
      setJokeText(
        dodgeCount === 0
          ? "Nope, not happening! 😜"
          : dodgeCount === 1
          ? "Just say yes, Dolly! 🌻"
          : "My heart is set on YES! ❤️"
      );
    }
    setDodgeCount((c) => c + 1);
    setButtonsVisible(false);
    setTimeout(() => setButtonsVisible(true), 300);
  };

  useEffect(() => {
    if (stage !== "yes") return;
    const items = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      emoji: ["❤️", "🌻", "✨", "🎉", "💛", "🌟", "🌸", "💫"][i % 8],
      size: Math.random() * 20 + 14,
      duration: Math.random() * 3 + 3,
      delay: Math.random() * 2,
      drift: (Math.random() - 0.5) * 200,
      rotate: Math.random() * 720,
    }));
    setCelebration(items);
  }, [stage]);

  return (
    <section className="min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {stage === "yes" && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {celebration.map((item) => (
            <motion.div
              key={item.id}
              initial={{ x: `${item.x}vw`, y: "110vh", opacity: 0, scale: 0, rotate: 0 }}
              animate={{
                y: "-20vh",
                x: `calc(${item.x}vw + ${item.drift}px)`,
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0.8],
                rotate: item.rotate,
              }}
              transition={{ duration: item.duration, delay: item.delay, repeat: Infinity, ease: "easeOut" }}
              className="absolute"
              style={{ fontSize: `${item.size}px` }}
            >
              {item.emoji}
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -50 }} className="text-center flex flex-col items-center gap-8">
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1.5 }} className="text-white text-2xl md:text-4xl font-light tracking-widest">
              And after everything I've shown you, Dolly...
            </motion.h2>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 1.5 }} className="text-white text-4xl md:text-6xl font-medium tracking-tight">
              I have one question.
            </motion.h1>
            <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 4, duration: 1 }} whileHover={{ scale: 1.1 }} onClick={() => setStage("question")} className="mt-8 px-10 py-4 border border-yellow-400 text-yellow-400 rounded-full text-lg tracking-widest uppercase">
              Ready?
            </motion.button>
          </motion.div>
        )}

        {stage === "question" && (
          <motion.div key="question" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="text-center flex flex-col items-center gap-12 relative w-full max-w-4xl">
            <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
              Will you let me, Ashwin, be the one to <span className="text-yellow-400">stand by your side?</span>
            </h1>

            <div className="flex flex-col md:flex-row gap-6 mt-8 relative w-full justify-center items-center h-40">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setStage("yes")} className="px-10 py-4 bg-pink-500 text-white rounded-full text-lg font-medium tracking-widest shadow-[0_0_30px_rgba(255,84,112,0.5)] z-20">
                YES ❤️
              </motion.button>

              <motion.button animate={thinkPos} onMouseEnter={() => handleDodge("think")} onClick={() => handleDodge("think")} onTouchStart={() => handleDodge("think")} className={`px-8 py-4 border border-white/30 text-white/70 rounded-full text-lg tracking-widest z-10 transition-opacity duration-300 ${buttonsVisible ? "opacity-100" : "opacity-0"}`}>
                LET ME THINK 🌸
              </motion.button>

              <motion.button animate={notYetPos} onMouseEnter={() => handleDodge("notYet")} onClick={() => handleDodge("notYet")} onTouchStart={() => handleDodge("notYet")} className={`px-8 py-4 border border-white/30 text-white/70 rounded-full text-lg tracking-widest z-10 transition-opacity duration-300 ${buttonsVisible ? "opacity-100" : "opacity-0"}`}>
                NOT YET 🤍
              </motion.button>
            </div>

            <AnimatePresence>
              {jokeText && (
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute -bottom-20 text-yellow-400 text-xl font-handwriting">
                  {jokeText}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {stage === "yes" && (
          <motion.div key="yes" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="text-center flex flex-col items-center gap-8 z-10">
            <motion.h1 initial={{ opacity: 0, y: 20, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.5, duration: 1.5, type: "spring" }} className="text-pink-500 text-4xl md:text-6xl font-medium tracking-tight drop-shadow-[0_0_40px_rgba(255,84,112,0.6)]">
              You just made me the happiest person in the world, Dolly. ❤️
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5, duration: 1.5 }} className="text-white text-xl md:text-3xl font-light tracking-wide">
              I, Ashwin, promise to always stand by your side.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5, duration: 1.5 }} className="text-gray-400 mt-12 text-lg font-light">
              (P.S. Check your WhatsApp 😉)
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}