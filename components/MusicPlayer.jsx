"use client";
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  // Load YouTube IFrame API on mount
  useEffect(() => {
    // If API already loaded, mark ready
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }

    // Otherwise load it
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      initPlayer();
    };

    return () => {
      // Cleanup
      delete window.onYouTubeIframeAPIReady;
    };
  }, []);

  const initPlayer = () => {
    playerRef.current = new window.YT.Player(iframeRef.current, {
      height: '0',
      width: '0',
      videoId: '2Vv-BfVoq4g', // Ed Sheeran - Perfect
      playerVars: {
        autoplay: 0,
        controls: 0,
        loop: 1,
        playlist: '2Vv-BfVoq4g',
        playsinline: 1,
        modestbranding: 1,
      },
      events: {
        onReady: () => {
          setReady(true);
        },
      },
    });
  };

  const togglePlay = () => {
    if (!ready || !playerRef.current) return;

    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setPlaying(!playing);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="fixed bottom-8 right-8 z-[9999] w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-yellow-400/30 flex items-center justify-center text-xl text-white shadow-lg hover:bg-yellow-400/20 transition-all"
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        {playing ? '⏸️' : '▶️'}
      </motion.button>

      {/* Hidden iframe — always mounted, just controlled */}
      <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', opacity: 0 }}>
        <div ref={iframeRef} />
      </div>

      {/* Small hint when not ready */}
      {!ready && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-24 right-8 text-[10px] text-yellow-400/50 tracking-widest uppercase z-[9999]"
        >
          Loading music...
        </motion.p>
      )}
    </>
  );
}