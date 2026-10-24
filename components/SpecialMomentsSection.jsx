"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

const moments = [
  {
    src: "/photos/dolly-graduation.mp4",
    title: "Graduation Day",
    desc: "A moment of pride, joy, and the start of endless possibilities.",
  },
  {
    src: "/photos/dolly-skirt.mp4",
    title: "Little Twirls",
    desc: "Pure grace and candid laughter caught on tape.",
  },
];

function VideoCard({ item, index }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState("");
  const statusId = `moment-status-${index}`;

  async function play() {
    const video = videoRef.current;
    if (!video) return;
    setError("");
    setWaiting(true);
    try {
      if (video.error) video.load();
      await video.play();
      // Actual media events below own the playback state.
    } catch (failure) {
      setWaiting(false);
      if (failure.name === "AbortError") return;
      setError(failure.name === "NotAllowedError"
        ? "Playback was blocked. Try the video's own play control below."
        : "This video could not start. Retry, or open the video directly.");
    }
  }

  function mediaError() {
    setPlaying(false);
    setWaiting(false);
    setError("This video could not load. Retry, or open the video directly.");
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="moment-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
    >
      <div className="moment-video-frame">
        <video
          ref={videoRef}
          src={`${item.src}#t=0.001`}
          controls
          muted
          playsInline
          preload="metadata"
          aria-label={item.title}
          aria-describedby={statusId}
          onPlaying={() => { setPlaying(true); setWaiting(false); setError(""); }}
          onPause={() => { setPlaying(false); setWaiting(false); }}
          onEnded={() => { setPlaying(false); setWaiting(false); }}
          onWaiting={() => setWaiting(true)}
          onCanPlay={() => setWaiting(false)}
          onError={mediaError}
        >
          Your browser does not support this video. <a href={item.src}>Open {item.title}</a>.
        </video>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white">{item.title}</h3>
        <p className="mt-2 text-sm text-white/70">{item.desc}</p>
        <div className="moment-actions">
          <button
            type="button"
            onClick={() => playing ? videoRef.current.pause() : play()}
            aria-label={`${playing ? "Pause" : error ? "Retry" : "Play"} ${item.title}`}
          >
            {playing ? "Pause" : error ? "Retry video" : "Play video"}
          </button>
          <a href={item.src} target="_blank" rel="noopener noreferrer">Open video ↗</a>
        </div>
        <p id={statusId} className="moment-status" role="status">
          {error || (waiting ? "Loading video…" : "Use the video controls for sound, seeking and fullscreen.")}
        </p>
      </div>
    </motion.article>
  );
}

export default function SpecialMomentsSection() {
  return (
    <section id="special-moments" className="relative z-10 py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-widest text-yellow-400/80">Motion & Life</span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mt-2">Special Moments</h2>
        <p className="moment-intro">Press play to watch a little moment. Sound starts muted.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {moments.map((item, index) => <VideoCard key={item.src} item={item} index={index} />)}
      </div>
    </section>
  );
}
