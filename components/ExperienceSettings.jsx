"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
const Experience = createContext({ effects:'gentle' });
export const useExperience = () => useContext(Experience);
export default function ExperienceSettings({children}) {
  const [effects,setEffects]=useState('gentle');
  useEffect(()=>{let saved;try{saved=localStorage.getItem('oxygen-effects');}catch{}
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const constrained=navigator.connection?.saveData || (navigator.deviceMemory && navigator.deviceMemory<4);
    setEffects(saved==='full'||saved==='gentle'?saved:reduced||constrained?'gentle':'full');
  },[]);
  useEffect(()=>{document.documentElement.dataset.effects=effects;},[effects]);
  function toggle(){const next=effects==='full'?'gentle':'full';setEffects(next);try{localStorage.setItem('oxygen-effects',next);}catch{}}
  return <Experience.Provider value={{effects}}><MotionConfig reducedMotion={effects==='gentle'?'always':'user'}>
    <button className="effects-control" onClick={toggle} aria-label={`Effects: ${effects}. Switch to ${effects==='full'?'gentle':'full'} effects.`}><span aria-hidden="true">✦</span> {effects==='full'?'Full':'Gentle'} effects</button>
    {children}
  </MotionConfig></Experience.Provider>;
}
