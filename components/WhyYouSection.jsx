"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyYouSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5,
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" } }
      );
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 100, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, delay: i * 0.2,
            scrollTrigger: { trigger: card, start: "top 85%" } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const reasons = [
    { title: "Your Mind.", desc: "From IISER Bhopal to IIIT-Hyderabad. Your curiosity about Machine Learning and the universe is breathtaking." },
    { title: "Your Roots.", desc: "A girl from Akola, deeply rooted in culture and family, yet looking at the world with modern, open eyes." },
    { title: "Your Calm.", desc: "In a world that is constantly rushing, your simplicity and honesty are the most refreshing things I have ever encountered." },
    { title: "Your Voice.", desc: "I still remember our first video call. You were in your room, and it was the best call of my life." }
  ];

  return (
    <section ref={sectionRef} className="min-h-screen bg-[#050505] py-32 px-6 flex flex-col items-center justify-center">
      <h2 ref={titleRef} className="text-white text-4xl md:text-6xl lg:text-7xl font-light tracking-widest text-center max-w-5xl leading-tight mb-24">
        Out of 8 billion people...<br />
        <span className="text-yellow-400">Why you, Dolly?</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {reasons.map((r, i) => (
          <div key={i} ref={(el) => (cardsRef.current[i] = el)}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 hover:bg-white/10 transition-colors duration-500">
            <h3 className="text-white text-2xl md:text-3xl font-medium mb-4">{r.title}</h3>
            <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed">{r.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
