"use client";
import { motion, useReducedMotion } from "framer-motion";
export default function OpeningScene() {
 const reduced = useReducedMotion();
 return <section className="opening-scene" aria-labelledby="opening-title">
  <div className="hero-orbit orbit-one" aria-hidden="true"/><div className="hero-orbit orbit-two" aria-hidden="true"/>
  <motion.div className="hero-copy" initial={reduced ? false : {opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:1.2}}>
   <p className="eyebrow">A little universe, just for you</p>
   <h1 id="opening-title">Some people<br/>feel like <em>sunshine.</em><br/><span>You do, Dolly.</span></h1>
   <p className="hero-description">A collection of little moments, things I admire about you, and words I wanted to say. Made with a little courage. And a lot of heart.</p>
   <a className="gold-button" href="#our-story">Step into our story <span aria-hidden="true">↗</span></a>
   <p className="hero-signature">With love, Ashwin</p>
  </motion.div>
  <motion.div className="hero-portrait" initial={reduced ? false : {opacity:0,rotate:4}} animate={{opacity:1,rotate:-3}} transition={{duration:1.4,delay:.2}}>
   <img src="/photos/dolly-profile.jpg" alt="Dolly" fetchPriority="high"/>
   <div className="portrait-caption"><span>01 / My favourite kind of magic</span><strong>Dolly, in her own light.</strong></div>
   <span className="portrait-flower" aria-hidden="true">✳</span>
  </motion.div>
  <a className="scroll-note" href="#our-story">Take your time. There's no rush. ↓</a>
 </section>;
}
