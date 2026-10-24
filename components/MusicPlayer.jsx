"use client";
import { useEffect, useRef, useState } from "react";

const SONG_URL = 'https://www.youtube.com/watch?v=2Vv-BfVoq4g';
export default function MusicPlayer() {
  const frame = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    // Removing the embed stops its audio, including when a scene claims audio focus.
    const pause = () => setPlaying(false);
    window.addEventListener('oxygen:video-start', pause);
    window.addEventListener('oxygen:voice-start', pause);
    return () => {
      window.removeEventListener('oxygen:video-start', pause);
      window.removeEventListener('oxygen:voice-start', pause);
    };
  }, []);
  function play() {
    window.dispatchEvent(new Event('oxygen:soundtrack-start'));
    setPlaying(true);
  }
  return <div className="soundscape">
    <button className="soundscape-toggle" onClick={() => setExpanded(value => !value)} aria-expanded={expanded} aria-controls="soundscape-panel" aria-label={expanded ? 'Close music controls' : 'Open dedicated song'}>
      <span className="sound-bars" aria-hidden="true"><i/><i/><i/><i/></span><span>Our song</span>
    </button>
    <div id="soundscape-panel" className="soundscape-panel" hidden={!expanded}>
      <p className="eyebrow">A song dedicated to you</p><strong>Perfect</strong>
      <p>Ed Sheeran · From Ashwin, for Dolly.<br/>This is the song I dedicated to you.</p>
      <div className="soundscape-actions">
        <button onClick={playing ? () => setPlaying(false) : play}>{playing ? 'Stop song' : 'Play Perfect'}</button>
        <a href={SONG_URL} target="_blank" rel="noopener noreferrer">Open on YouTube ↗</a>
      </div>
      {playing && <iframe ref={frame} width="226" height="150" style={{width:'100%',border:0,borderRadius:12}} src="https://www.youtube-nocookie.com/embed/2Vv-BfVoq4g?autoplay=1&playsinline=1" title="Perfect — Ed Sheeran, dedicated to Dolly" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen/>}
      <p>Use the video controls to pause or adjust sound. Stops when a memory video or voice note starts. If playback is unavailable here, open it on YouTube.</p>
    </div>
  </div>;
}
