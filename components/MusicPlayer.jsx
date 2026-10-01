"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setPlaying(!playing)}
        className="fixed bottom-8 right-8 z-[9999] w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-yellow-400/30 flex items-center justify-center text-xl text-white shadow-lg hover:bg-yellow-400/20 transition-all"
        aria-label={playing ? "Pause music" : "Play music"}
      >
        {playing ? "⏸️" : "▶️"}
      </motion.button>

      {playing && (
        <iframe
          width="0"
          height="0"
          src="https://www.youtube.com/embed/2Vv-BfVoq4g?autoplay=1&loop=1&playlist=2Vv-BfVoq4g"
          title="Music Player"
          allow="autoplay"
          className="hidden"
          style={{ position: "absolute", width: 0, height: 0, border: 0 }}
        />
      )}
    </>
  );
}
