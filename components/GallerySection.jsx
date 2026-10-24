"use client";
import { useEffect, useRef, useState } from "react";
export default function GallerySection(){
 const [selected,setSelected]=useState(null); const dialog=useRef(null); const trigger=useRef(null);
 const photos=Array.from({length:12},(_,i)=>`/photos/dolly-${i+1}.jpg`);
 useEffect(()=>{if(selected!==null&&!dialog.current.open)dialog.current.showModal();},[selected]);
 function close(){dialog.current.close();setSelected(null);trigger.current?.focus();}
 return <section className="memory-section"><div className="memory-heading"><div><p className="eyebrow">The little things stay</p><h2>A gallery of<br/><em>ordinary magic.</em></h2></div><p>No grand explanation.<br/>Just moments that make me smile.<br/><span>Tap a photograph to look closer.</span></p></div>
  <div className="memory-grid">{photos.map((src,i)=><button key={src} className="memory-photo" onClick={e=>{trigger.current=e.currentTarget;setSelected(i);}} aria-label={`Open photograph ${i+1}`}><img src={src} alt={`Dolly, memory ${i+1}`} loading="lazy"/><span>{String(i+1).padStart(2,'0')} <span aria-hidden="true">↗</span></span></button>)}</div>
  <dialog ref={dialog} className="photo-dialog" aria-label="Photograph viewer" onCancel={e=>{e.preventDefault();close();}} onClick={e=>{if(e.target===dialog.current)close();}}><button className="dialog-close" onClick={close} aria-label="Close photograph">✕</button>{selected!==null&&<><img src={photos[selected]} alt={`Dolly, memory ${selected+1}`}/><div className="photo-controls"><button onClick={()=>setSelected((selected+11)%12)} aria-label="Previous photograph">←</button><span>{selected+1} / 12</span><button onClick={()=>setSelected((selected+1)%12)} aria-label="Next photograph">→</button></div></>}</dialog>
 </section>;
}
