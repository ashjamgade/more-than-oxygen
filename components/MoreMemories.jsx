"use client";
import { useState } from 'react';
import dynamic from 'next/dynamic';
const Gallery=dynamic(()=>import('./GallerySection'),{loading:()=> <p className="loading-note" role="status">Gathering the photographs…</p>});
const Timeline=dynamic(()=>import('./TimelineSection'));
const Stories=dynamic(()=>import('./InstaStorySection'));
const Achievements=dynamic(()=>import('./AchievementsSection'));
const Profiles=dynamic(()=>import('./TwoProfilesSection'));
const Promises=dynamic(()=>import('./PromiseSection'));
const Reasons=dynamic(()=>import('./ReasonsInteractive'));
const WhyYou=dynamic(()=>import('./WhyYouSection'));
export default function MoreMemories(){const [open,setOpen]=useState(false);return <section id="memories" data-chapter className="more-memories"><div className="chapter-heading"><p className="eyebrow">Stay a little longer, if you like</p><h2>The memories<br/><em>between the moments.</em></h2><p>A photo album, our timeline, and a few favourite frames.</p></div><button className="gold-button" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-controls="extra-memories">{open?'Close the album':'Open the memory album'} <span aria-hidden="true">{open?'−':'+'}</span></button><div id="extra-memories" hidden={!open}>{open&&<><Gallery/><Timeline/><Stories/><WhyYou/><Achievements/><Profiles/><Reasons/><Promises/></>}</div></section>;}
