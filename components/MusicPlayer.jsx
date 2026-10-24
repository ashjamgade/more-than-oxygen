"use client";
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    let disposed = false;
    let player;
    const host = document.createElement('div');
    iframeRef.current.appendChild(host);
    const initialize = () => {
      if (disposed || player || !window.YT?.Player) return;
      player = new window.YT.Player(host, {
        height: '200', width: '200', videoId: '2Vv-BfVoq4g',
        playerVars: { autoplay: 0, controls: 0, loop: 1, playlist: '2Vv-BfVoq4g', playsinline: 1 },
        events: {
          onReady: () => { if (!disposed) setReady(true); },
          onStateChange: event => { if (!disposed) setPlaying(event.data === 1); },
          onError: () => { if (!disposed) { setReady(false); setPlaying(false); } },
        },
      });
      playerRef.current = player;
    };
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(script);
    }
    initialize();
    const poll = setInterval(() => { initialize(); if (player) clearInterval(poll); }, 250);
    const timeout = setTimeout(() => clearInterval(poll), 20000);
    return () => { disposed = true; clearInterval(poll); clearTimeout(timeout); player?.destroy(); host.remove(); playerRef.current = null; };
  }, []);

  const togglePlay = () => {
    if (!ready || !playerRef.current) return;

    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }

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
        disabled={!ready}
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
          Music unavailable or loading
        </motion.p>
      )}
    </>
  );
}