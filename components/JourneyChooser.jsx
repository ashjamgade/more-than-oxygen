"use client";
import { useState } from 'react';
import { useExperience } from './ExperienceSettings';
const paths=[['01','Our story','A few memories, a little stardust.','#universe'],['02','Your new chapter','A celebration of your curiosity.','#new-chapter'],['03','A letter for you','Just a few words from me.','#letter']];
export default function JourneyChooser(){const [travelling,setTravelling]=useState(null);const {effects}=useExperience();
 function choose(e,id){if(effects==='gentle')return;e.preventDefault();setTravelling(id);setTimeout(()=>{document.querySelector(id)?.scrollIntoView({behavior:'auto'});history.replaceState(null,'',id);setTravelling(null);},450);}
 return <section id="choose-journey" className="journey-chooser"><p className="eyebrow">There's no right order</p><h2>Where shall we go?</h2><div className="journey-options">{paths.map(([n,title,copy,id])=><a key={id} href={id} onClick={e=>choose(e,id)}><span>{n} / EXPLORE</span><h3>{title} <i aria-hidden="true">↗</i></h3><p>{copy}</p></a>)}</div>{travelling&&<div className="journey-transition" aria-hidden="true"><span>✦</span></div>}</section>;
}
