"use client";
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { MEMORIES } from '../lib/story';
const MemorySky=dynamic(()=>import('./universe/MemorySky'),{ssr:false,loading:()=> <div className="static-starfield"/>});
export default function ConstellationSection(){const [selected,setSelected]=useState(null);const dialog=useRef();const trigger=useRef();
 function select(index){trigger.current=document.activeElement;setSelected(index);}
 useEffect(()=>{if(selected!==null&&!dialog.current.open)dialog.current.showModal();},[selected]);
 function close(){dialog.current.close();setSelected(null);trigger.current?.focus();}
 return <section className="memory-universe" id="constellation"><div className="chapter-heading"><p className="eyebrow">A constellation of little things</p><h2>Every memory,<br/><em>its own small star.</em></h2><p>Touch a floating photograph, or choose a memory below.</p></div>
 <div className="memory-sky"><MemorySky memories={MEMORIES} onSelect={select}/></div>
 <div className="memory-star-list" aria-label="Choose a memory">{MEMORIES.map((m,i)=><button key={m.title} onClick={()=>select(i)}><span aria-hidden="true">✦</span><span>{m.title}</span></button>)}</div>
 <dialog ref={dialog} className="photo-dialog memory-dialog" aria-labelledby="memory-title" onCancel={e=>{e.preventDefault();close();}} onClick={e=>{if(e.target===dialog.current)close();}}><button className="dialog-close" onClick={close} aria-label="Close memory">✕</button>{selected!==null&&<><img src={MEMORIES[selected].photo} alt={MEMORIES[selected].title}/><h3 id="memory-title">{MEMORIES[selected].title}</h3><p>{MEMORIES[selected].caption}</p></>}</dialog>
 </section>;}
