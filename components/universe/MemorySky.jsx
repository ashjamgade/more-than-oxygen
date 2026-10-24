"use client";
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Stars, Image } from '@react-three/drei';
import SceneCanvas from './SceneCanvas';
const locations=[[-2.5,1,0],[-.8,.5,-1],[1.2,1,0],[2.5,-.6,-.5],[.4,-1.1,.2],[-2,-.9,-.3]];
function MemoryPhoto({memory,index,onSelect}){const ref=useRef();useFrame(state=>{ref.current.position.y=locations[index][1]+Math.sin(state.clock.elapsedTime*.65+index)*.09;ref.current.rotation.y=Math.sin(state.clock.elapsedTime*.3+index)*.1;});return <group ref={ref} position={locations[index]} onClick={e=>{e.stopPropagation();onSelect(index);}} onPointerOver={e=>{e.stopPropagation();}}><mesh position={[0,0,-.02]}><planeGeometry args={[1.04,1.25]}/><meshBasicMaterial color="#d3b773"/></mesh><Image url={memory.photo} scale={[1,1.2]} transparent/><mesh position={[.4,-.65,.05]}><sphereGeometry args={[.035,12,12]}/><meshBasicMaterial color="#f4cd7c"/></mesh></group>;}
function Sky({memories,onSelect}){const group=useRef();useFrame((state,delta)=>{group.current.rotation.y+=(state.pointer.x*.08-group.current.rotation.y)*Math.min(delta*2,1);});return <><Stars radius={40} depth={20} count={600} factor={2} fade speed={.35}/><group ref={group}>{memories.map((m,i)=><MemoryPhoto key={m.photo} memory={m} index={i} onSelect={onSelect}/>)}<Line points={[...locations,locations[0]]} color="#d4b777" transparent opacity={.28} lineWidth={1}/></group></>;}
export default function MemorySky({memories,onSelect}){return <SceneCanvas camera={{position:[0,0,7],fov:45}} fallback={<div className="static-starfield"><span className="memory-fallback-note">Choose a memory below to open its photograph.</span></div>}><Sky memories={memories} onSelect={onSelect}/></SceneCanvas>;}
