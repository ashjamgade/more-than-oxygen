"use client";
import { useState } from "react";
import { motion } from "framer-motion";
export default function PasswordGate({children}) {
 const [unlocked,setUnlocked]=useState(false);
 const [word,setWord]=useState(""); const [error,setError]=useState(false);
 if(unlocked) return children;
 return <main className="invitation-screen"><motion.div className="invitation-card" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}>
  <span className="invitation-flower" aria-hidden="true">✳</span><p className="eyebrow">A letter, in the shape of a website</p>
  <h1>For you,<br/><em>Dolly.</em></h1><p>A small surprise awaits. Enter our secret word and take a little look around.</p>
  <form onSubmit={e=>{e.preventDefault();if(word.trim().toLowerCase()==="oxygen")setUnlocked(true);else setError(true);}}>
   <label htmlFor="secret-word">The secret word</label><input id="secret-word" type="password" autoComplete="off" value={word} onChange={e=>{setWord(e.target.value);setError(false);}} aria-describedby={error?"word-hint":undefined} aria-invalid={error} required/>
   {error&&<p id="word-hint" role="alert">Think of the word in the website's name, after “more than”.</p>}
   <button className="gold-button" type="submit">Open your surprise ↗</button>
  </form><small>A surprise screen, not a secure login.</small>
 </motion.div></main>;
}
