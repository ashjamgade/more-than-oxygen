"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ParticleHeart3D from "./ParticleHeart3D";

export default function OpeningScene() {
  const textRef = useRef(null);
  const dollyRef = useRef(null);
  const [stage, setStage] = useState("text"); // "text" | "heart" | "name"

  // Step 1: Text sequence
  useEffect(() => {
    if (stage !== "text") return;

   const lines = [
  "They say every soul has a missing piece.",
  "I searched for years, thinking I'd never find mine.",
  "Then you happened, Dolly. And I finally felt whole.",
];
    let currentIndex = 0;
    const el = textRef.current;
    if (!el) return;

    // Set first line
    el.textContent = lines[0];
    gsap.set(el, { opacity: 0 });

    const tl = gsap.timeline();

    lines.forEach((line) => {
      tl.to(el, {
        opacity: 1,
        duration: 1.8,
        ease: "power2.out",
        onStart: () => {
          el.textContent = line;
        },
      })
        .to(el, { duration: 2, ease: "none" }) // Hold
        .to(el, { opacity: 0, duration: 1.2, ease: "power2.in" });
    });

    // After all lines, go to heart stage
    tl.add(() => setStage("heart"));

    return () => {
      tl.kill();
    };
  }, [stage]);

  // Step 2: Heart stage → wait 3.5s → name stage
  useEffect(() => {
    if (stage !== "heart") return;
    const timer = setTimeout(() => setStage("name"), 3500);
    return () => clearTimeout(timer);
  }, [stage]);

  // Step 3: Name stage → fade in Dolly card
  useEffect(() => {
    if (stage !== "name") return;
    const el = dollyRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.7, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 1.8, ease: "power3.out", delay: 0.3 }
    );
  }, [stage]);

  return (
    <main className="relative h-screen w-screen bg-[#050505] flex items-center justify-center overflow-hidden">
      {/* Particle Heart — appears only during heart & name stage */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-[1500ms] ${
          stage === "heart" ? "opacity-80" : stage === "name" ? "opacity-30" : "opacity-0"
        }`}
      >
        <ParticleHeart3D />
      </div>

      {/* Text — only during text stage */}
      {stage === "text" && (
        <h1
          ref={textRef}
          className="relative z-10 text-white text-2xl md:text-4xl lg:text-5xl font-light tracking-widest text-center max-w-4xl px-8 leading-relaxed"
          style={{ opacity: 0 }}
        >
          They say you need oxygen to live.
        </h1>
      )}

      {/* Dolly Name + Photo — only during name stage */}
      {stage === "name" && (
        <div
          ref={dollyRef}
          className="relative z-10 flex flex-col items-center gap-6 px-6"
          style={{ opacity: 0 }}
        >
          {/* Profile Picture */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-yellow-400 opacity-40 blur-xl animate-pulse" />
            <div
              className="absolute -inset-2 rounded-full border border-yellow-400/50 animate-spin"
              style={{ animationDuration: "12s" }}
            />
            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-yellow-400/80 shadow-[0_0_60px_rgba(255,215,0,0.5)] bg-gradient-to-br from-yellow-900/40 to-black">
              <img
                src="/photos/dolly-profile.jpg"
                alt="Dolly"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-black border-2 border-yellow-400 flex items-center justify-center text-base shadow-[0_0_20px_rgba(255,215,0,0.6)]">
              🌻
            </div>
          </div>

          {/* Name — Simple Golden Gradient */}
          <h1
            style={{
              fontFamily: "var(--font-elegant), serif",
              fontStyle: "italic",
              background: "linear-gradient(135deg, #FFE88A 0%, #FFD700 50%, #D4A017 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-wide leading-none drop-shadow-[0_0_40px_rgba(255,215,0,0.35)]"
          >
            Dolly
          </h1>

          <p className="text-gray-500 text-xs md:text-sm tracking-[0.4em] uppercase font-light">
            Sharayu Borade
          </p>
        </div>
      )}
    </main>
  );
}