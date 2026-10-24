"use client";
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';
import { CITIES, LAND, geoPoint, inPolygon } from '../../lib/globe';
import SceneCanvas from './SceneCanvas';
function City({city,color}){const pos=geoPoint(city.lat,city.lon,1.025);const ref=useRef();useFrame(state=>{ref.current.scale.setScalar(1+Math.sin(state.clock.elapsedTime*2)*.18);});return <group position={pos}><mesh ref={ref}><sphereGeometry args={[.037,12,12]}/><meshBasicMaterial color={color}/></mesh><pointLight color={color} intensity={.4} distance={.5}/></group>;}
function Globe(){const traveller=useRef();
 const land=useMemo(()=>{const a=[];for(let lat=-55;lat<80;lat+=3)for(let lon=-177;lon<180;lon+=3)if(LAND.some(p=>inPolygon(lon,lat,p)))a.push(...geoPoint(lat,lon,1.006));return new Float32Array(a);},[]);
 const route=useMemo(()=>{const from=new THREE.Vector3(...geoPoint(CITIES.mumbai.lat,CITIES.mumbai.lon));const to=new THREE.Vector3(...geoPoint(CITIES.sydney.lat,CITIES.sydney.lon));const angle=from.angleTo(to);return Array.from({length:90},(_,i)=>{const t=i/89;return from.clone().multiplyScalar(Math.sin((1-t)*angle)/Math.sin(angle)).addScaledVector(to,Math.sin(t*angle)/Math.sin(angle)).multiplyScalar(1.04+Math.sin(t*Math.PI)*.3);});},[]);
 useFrame(state=>{const t=(state.clock.elapsedTime*.15)%1;const i=t*(route.length-1),lo=Math.floor(i);traveller.current.position.copy(route[lo]).lerp(route[Math.min(lo+1,route.length-1)],i-lo);});
 return <><ambientLight intensity={1.1}/><directionalLight position={[3,3,5]} intensity={2} color="#b4c4ff"/>
 <group rotation={[.2,-1.9,.1]}>
 <mesh><sphereGeometry args={[1,48,48]}/><meshStandardMaterial color="#102a44" roughness={.8} metalness={.25}/></mesh>
 <mesh><sphereGeometry args={[1.003,24,16]}/><meshBasicMaterial color="#7194b6" wireframe transparent opacity={.12}/></mesh>
 <points><bufferGeometry><bufferAttribute attach="attributes-position" array={land} count={land.length/3} itemSize={3}/></bufferGeometry><pointsMaterial color="#b3c0a7" size={.018}/></points>
 <Line points={route} color="#f4cb79" lineWidth={1.5}/><mesh ref={traveller}><sphereGeometry args={[.028,12,12]}/><meshBasicMaterial color="#fff1bb"/></mesh>
 <City city={CITIES.mumbai} color="#f4cb79"/><City city={CITIES.sydney} color="#c2b8ff"/>
 <mesh><sphereGeometry args={[1.09,32,32]}/><meshBasicMaterial color="#91b7eb" transparent opacity={.045} side={THREE.BackSide}/></mesh>
 </group><OrbitControls enableZoom={false} enablePan={false} enableDamping autoRotate autoRotateSpeed={.25} minPolarAngle={.65} maxPolarAngle={2.4}/></>;
}
export default function ConnectedGlobe(){return <SceneCanvas camera={{position:[0,0,3.7],fov:43}} fallback={<div className="globe-fallback"><div className="globe-fallback-sphere"/><span>Mumbai <i aria-hidden="true">↝</i> Sydney</span></div>}><Globe/></SceneCanvas>;}
