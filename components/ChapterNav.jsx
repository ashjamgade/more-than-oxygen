"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
export default function ChapterNav(){
 const {scrollYProgress}=useScroll(); const scaleX=useSpring(scrollYProgress,{stiffness:100,damping:30});
 const [active,setActive]=useState("universe");
 useEffect(()=>{const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)setActive(entry.target.id);},{rootMargin:"-15% 0px -60% 0px"});document.querySelectorAll('[data-chapter]').forEach(el=>observer.observe(el));return()=>observer.disconnect();},[]);
 return <><motion.div className="reading-progress" style={{scaleX}}/><nav className="chapter-nav" aria-label="Story chapters"><a href="#top" className="chapter-brand" aria-label="Back to the beginning">D<span>✳</span>A</a><div>{[["universe","Universe"],["new-chapter","Her next chapter"],["memories","Memories"],["letter","A letter"]].map(([id,label])=><a key={id} href={'#'+id} aria-current={active===id?'location':undefined}>{label}</a>)}</div></nav></>;
}
