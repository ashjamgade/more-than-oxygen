"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Heart3D from "./Heart3D";

export default function OpeningScene() {
  const textRef = useRef(null);
  const [showHeart, setShowHeart] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(textRef.current, { opacity: 1, duration: 2.5, delay: 1.5 })
      .to(textRef.current, { opacity: 0, duration: 1.5, delay: 2.5 })
      .to(textRef.current, {
        textContent: "But in a world full of artificial intelligence…",
        opacity: 1,
        duration: 2.5,
        delay: 1,
      })
      .to(textRef.current, { opacity: 0, duration: 1.5, delay: 2.5 })
      .add(() => setShowHeart(true))
      .to(textRef.current, {
        textContent: "you became the most real thing I've ever found.",
        opacity: 1,
        duration: 3,
        delay: 1,
      })
      .to(textRef.current, { opacity: 0, duration: 1, delay: 1.5 })
      .to(textRef.current, {
        textContent: "Dolly.",
        opacity: 1,
        duration: 3,
        delay: 1,
        color: "#FFD700",
        scale: 1.2,
      });
  }, []);

  return (
    <main className="relative h-screen w-screen bg-[#050505] flex items-center justify-center overflow-hidden">
      {showHeart && (
        <div className="absolute inset-0 flex items-center justify-center opacity-70">
          <Heart3D />
        </div>
      )}
      <h1
        ref={textRef}
        className="relative z-10 text-white text-3xl md:text-5xl lg:text-6xl font-light tracking-widest opacity-0 text-center max-w-4xl px-6 leading-relaxed"
      >
        They say you need oxygen to live.
      </h1>
    </main>
  );
}
