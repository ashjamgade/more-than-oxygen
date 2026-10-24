"use client";
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
const paragraphs=[
 "I still smile when I think about how this started. One accepted request, then a conversation, and suddenly there was someone new I looked forward to hearing from.",
 "I like learning the little things about you — what makes you laugh, what you are working on, and the things you want to do next. I know there is still so much for us to discover about each other.",
 "And now, IIT Bombay. Seeing you begin this new research chapter makes me proud. I admire your curiosity and the effort you put into following it.",
 "You are in Mumbai, and I am in Sydney. Some days that feels like a very long way. But a message or a call can still make the distance feel a little smaller.",
 "I made this little universe because I wanted to give you something personal. A place to celebrate you, keep a few memories, and say the things that sometimes come out better in writing.",
 "Whatever the next chapter brings, I hope it is full of good conversations, honesty, and the freedom to be ourselves. There is no rush. I would simply love to keep getting to know you.",
];
export default function LetterSection(){const [open,setOpen]=useState(false);const [count,setCount]=useState(0);const reduced=useReducedMotion();const heading=useRef();
 useEffect(()=>{if(!open)return;if(reduced){setCount(paragraphs.length);return;}if(count>=paragraphs.length)return;const timer=setTimeout(()=>setCount(n=>n+1),count===0?350:2300);return()=>clearTimeout(timer);},[open,count,reduced]);
 function unfold(){setOpen(true);setTimeout(()=>heading.current?.focus(),0);}
 return <section className={`unfolding-letter ${open?'letter-open':''}`}><div className="chapter-heading"><p className="eyebrow">A few words, just for you</p><h2>Some things deserve<br/><em>a little paper.</em></h2></div>
 <div className="envelope-wrap"><div className="envelope-back" aria-hidden="true"/><div className="envelope-flap" aria-hidden="true"/><div className="envelope-front" aria-hidden="true"><span>A letter for Dolly</span></div>
 {!open?<button className="envelope-seal" onClick={unfold} aria-label="Open Ashwin's letter">♡<span>Open the letter</span></button>:<article className="letter-paper"><div className="letter-toolbar"><span>A personal note / 01</span><button onClick={()=>setCount(paragraphs.length)} disabled={count===paragraphs.length}>Show all</button></div><h3 ref={heading} tabIndex={-1}>Dear Dolly,</h3>
 {paragraphs.slice(0,count).map((p,i)=><motion.p key={p} initial={reduced?false:{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.7}}>{p}</motion.p>)}
 {count===paragraphs.length?<p className="letter-signature">With love,<br/>Ashwin ♡</p>:<span className="letter-ink" aria-label="The next paragraph is appearing"/>}</article>}
 </div></section>;}
