"use client";
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import SceneCanvas from './SceneCanvas';
function Tunnel({ progress }) {
  const stars = useRef();
  const positions = useMemo(() => {
    const a = new Float32Array(900 * 3);
    for(let i=0;i<900;i++) { const angle=i*2.39996, radius=1.7+((i*13)%83)/15; a[i*3]=Math.cos(angle)*radius; a[i*3+1]=Math.sin(angle)*radius; a[i*3+2]=-(i%100)/3; }
    return a;
  },[]);
  useFrame((state,delta)=>{const p=progress.get();state.camera.position.z=5-p*21;state.camera.position.x=Math.sin(p*Math.PI*2)*.8;state.camera.position.y=state.pointer.y*.12;stars.current.rotation.z+=Math.min(delta,.05)*.012;});
  return <><points ref={stars}><bufferGeometry><bufferAttribute attach="attributes-position" array={positions} count={900} itemSize={3}/></bufferGeometry><pointsMaterial size={.035} color="#e7c987" transparent opacity={.8} sizeAttenuation/></points>
    {[0,1,2,3].map(i=><group key={i} position={[Math.sin(i*2)*1.6,Math.cos(i*2)*.6,-i*6]} rotation={[.1,.2,i*.4]}><mesh><torusGeometry args={[2.2,.009,5,64]}/><meshBasicMaterial color={i%2?'#a19bea':'#dfbc72'} transparent opacity={.32}/></mesh></group>)}
  </>;
}
const frames=[['A small beginning','5 July 2025. You accepted my request.'],['The moments in between','A conversation. A smile. A familiar name on my screen.'],['A whole world to discover','Your curiosity, your dreams, and everything that makes you, you.']];
function Caption({index,progress}){const opacity=useTransform(progress,[index/3-.12,index/3+.04,index/3+.23,index/3+.35],[0,1,1,0]);const y=useTransform(progress,[index/3,index/3+.3],[35,-35]);return <motion.div className="cosmic-caption" style={{opacity,y}}><p className="eyebrow">0{index+1} / A journey in light</p><h2>{frames[index][0]}</h2><p>{frames[index][1]}</p></motion.div>;}
export default function ScrollUniverse(){const ref=useRef();const reduced=useReducedMotion();const {scrollYProgress}=useScroll({target:ref,offset:['start start','end end']});
 return <section id="universe" data-chapter ref={ref} className={`scroll-universe ${reduced?'still-universe':''}`} aria-label="A cinematic journey through our story">
  <div className="cosmic-sticky"><SceneCanvas fallback={<div className="static-starfield"/>}><Tunnel progress={scrollYProgress}/></SceneCanvas><div className="cosmic-vignette"/>
  {reduced?<div className="still-captions">{frames.map(([title,copy])=><div key={title}><h2>{title}</h2><p>{copy}</p></div>)}</div>:frames.map((_,i)=><Caption key={i} index={i} progress={scrollYProgress}/>)}
  <p className="cosmic-scroll-hint">Your scroll is the journey <span aria-hidden="true">↓</span></p></div>
 </section>;
}
