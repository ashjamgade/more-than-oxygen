"use client";
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import dynamic from 'next/dynamic';
const StardustName = dynamic(() => import('./universe/StardustName'), { ssr: false, loading: () => <span className="stardust-fallback">Dolly</span> });
export default function OpeningScene() {
  const reduced = useReducedMotion(); const [revealed, setRevealed] = useState(false);
  useEffect(() => { if (reduced) { setRevealed(true); return; } const timer = setTimeout(() => setRevealed(true), 3900); return () => clearTimeout(timer); }, [reduced]);
  return <section className={`opening-scene living-opening ${revealed ? 'portrait-revealed' : ''}`} aria-labelledby="opening-title">
    <div className="hero-orbit orbit-one" aria-hidden="true"/><div className="hero-orbit orbit-two" aria-hidden="true"/>
    <motion.div className="hero-copy" initial={reduced ? false : {opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:1.1}}>
      <p className="eyebrow">A little universe, just for you</p>
      <div className="stardust-name"><StardustName/><span className="sr-only">Golden stardust forming Dolly's name</span></div>
      <h1 id="opening-title">You make the<br/><em>ordinary cosmic.</em></h1>
      <p className="hero-description">A few memories. A little stardust. And all the things I wanted to tell you, Dolly.</p>
      <a className="gold-button" href="#universe">Enter our universe <span aria-hidden="true">↗</span></a>
      {!revealed && <button className="intro-skip" onClick={() => setRevealed(true)}>Reveal the portrait now</button>}
      <p className="hero-signature">With love, Ashwin</p>
    </motion.div>
    <div className="hero-portrait living-portrait"><img src="/photos/dolly-profile.jpg" alt="Dolly" fetchPriority="high"/><div className="portrait-caption"><span>My favourite kind of magic</span><strong>Dolly, in her own light.</strong></div><span className="portrait-flower" aria-hidden="true">✳</span></div>
    <a className="scroll-note" href="#universe">Scroll to travel through the story ↓</a>
  </section>;
}
