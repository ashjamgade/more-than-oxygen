"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const moments = [
  {
    type: "video",
    src: "/photos/dolly-graduation.mp4",
    title: "Graduation Day",
    desc: "A moment of pride, joy, and the start of endless possibilities.",
  },
  {
    type: "video",
    src: "/photos/dolly-skirt.mp4",
    title: "Little Twirls",
    desc: "Pure grace and candid laughter caught on tape.",
  },
];

function VideoCard({ item, index }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Force autoplay on mount (browser policy workaround)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force muted via JS (React sometimes misses this)
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");

    // Try to play
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
    >
      <div
        className="relative aspect-[4/5] w-full overflow-hidden bg-black/40 cursor-pointer"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={item.src}
          loop
          muted
          playsInline
          preload="auto"
          autoPlay
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Play button overlay when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none">
            <div className="w-20 h-20 rounded-full bg-yellow-400/95 flex items-center justify-center shadow-[0_0_40px_rgba(255,215,0,0.8)]">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="black"
                style={{ marginLeft: "4px" }}
              >
                <polygon points="6,4 20,12 6,20" />
              </svg>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white">{item.title}</h3>
        <p className="mt-2 text-sm text-white/70">{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function SpecialMomentsSection() {
  return (
    <section className="relative z-10 py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-widest text-yellow-400/80">
          Motion & Life
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mt-2">
          Special Moments
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {moments.map((item, idx) => (
          <VideoCard key={idx} item={item} index={idx} />
        ))}
      </div>
    </section>
  );
}