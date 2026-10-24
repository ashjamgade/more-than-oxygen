"use client";
import { motion, useReducedMotion } from 'framer-motion';
export default function SunflowerBloom(){const reduced=useReducedMotion();return <div className="sunflower-bloom" aria-hidden="true"><svg viewBox="0 0 300 350" fill="none">
 <defs><linearGradient id="petal-gold" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#ffebaf"/><stop offset=".5" stopColor="#eebc56"/><stop offset="1" stopColor="#bd7926"/></linearGradient><radialGradient id="flower-heart"><stop stopColor="#5f422a"/><stop offset="1" stopColor="#211b17"/></radialGradient></defs>
 <motion.path d="M150 320 Q160 245 150 155" stroke="#79956c" strokeWidth="4" initial={reduced?false:{pathLength:0}} whileInView={{pathLength:1}} viewport={{once:true}} transition={{duration:1.1}}/>
 <path d="M152 265 Q205 209 214 236 Q197 278 152 265M154 292 Q104 245 97 263 Q115 306 154 292" fill="#71916a" fillOpacity=".65"/>
 {[...Array(24)].map((_,i)=><g key={i} transform={`rotate(${i*15} 150 140)`}><motion.path d="M150 139 C125 112 131 53 150 38 C169 53 175 112 150 139Z" fill="url(#petal-gold)" fillOpacity={i%2?.92:.72} style={{transformOrigin:'150px 140px'}} initial={reduced?false:{scale:0,opacity:0}} whileInView={{scale:i%2?1:.83,opacity:1}} viewport={{once:true}} transition={{duration:1,delay:.12+i*.035,ease:'easeOut'}}/></g>)}
 <circle cx="150" cy="140" r="34" fill="url(#flower-heart)"/>{Array.from({length:80},(_,i)=>{const angle=i*2.39996,r=Math.sqrt(i)*3.2;return <circle key={i} cx={150+Math.cos(angle)*r} cy={140+Math.sin(angle)*r} r="1.2" fill="#c99b4e" opacity=".65"/>;})}
 </svg><div className="sunflower-aura"/></div>;}
