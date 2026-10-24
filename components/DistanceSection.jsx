"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { STORY } from '../lib/story';
import { cityTime } from '../lib/city-time';
const ConnectedGlobe=dynamic(()=>import('./universe/ConnectedGlobe'),{ssr:false,loading:()=> <div className="globe-fallback"><div className="globe-fallback-sphere"/></div>});
export default function DistanceSection(){const [clocks,setClocks]=useState(null);
 useEffect(()=>{const update=()=>{const now=new Date();setClocks({sydney:cityTime(STORY.sydneyZone,now),mumbai:cityTime(STORY.indiaZone,now)});};update();const timer=setInterval(update,1000);return()=>clearInterval(timer);},[]);
 return <section className="connected-section" id="across-oceans"><div className="chapter-heading"><p className="eyebrow">Two cities. One little connection.</p><h2>Different skies.<br/><em>Still, a little closer.</em></h2><p>Sydney to Mumbai. A thread of light across the world.</p></div>
 <div className="globe-layout"><div className="city-clock sydney-clock" data-period={clocks?.sydney.period||"night"}><span className="city-dot sydney-dot"/> <p className="eyebrow">Sydney · Ashwin</p><strong>{clocks?.sydney.time || '—'}</strong><span>Australia/Sydney</span><small>{clocks?.sydney.label}</small></div>
 <div className="globe-stage"><ConnectedGlobe/><span className="globe-instruction">Drag to explore · Illustrative globe</span></div>
 <div className="city-clock mumbai-clock" data-period={clocks?.mumbai.period||"night"}><span className="city-dot"/><p className="eyebrow">Mumbai · Dolly</p><strong>{clocks?.mumbai.time || '—'}</strong><span>IST · UTC +05:30</span><small>{clocks?.mumbai.label}</small><small>Researcher, IIT Bombay</small></div></div>
 <p className="section-afterword">A whole ocean between us. A conversation is still only a moment away.</p></section>;
}
