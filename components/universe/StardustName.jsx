"use client";
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import SceneCanvas from './SceneCanvas';
function seed(i) { return ((Math.sin(i * 127.1 + 311.7) * 43758.5453) % 1 + 1) % 1; }
function NameCloud() {
  const ref = useRef(); const elapsed = useRef(0);
  const { positions, targets, origins } = useMemo(() => {
    const canvas = document.createElement('canvas'); canvas.width = 700; canvas.height = 260;
    const ctx = canvas.getContext('2d'); ctx.font = 'italic 190px Georgia'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('Dolly', 350, 125);
    const data = ctx.getImageData(0, 0, 700, 260).data; const samples = [];
    for (let y = 0; y < 260; y += 5) for (let x = 0; x < 700; x += 5) if (data[(y * 700 + x) * 4 + 3] > 120) samples.push((x - 350) / 100, (130 - y) / 100, 0);
    const targets = new Float32Array(samples); const origins = new Float32Array(samples.length);
    for (let i = 0; i < samples.length; i += 3) { origins[i] = (seed(i) - .5) * 15; origins[i + 1] = (seed(i + 1) - .5) * 8; origins[i + 2] = (seed(i + 2) - .5) * 5; }
    return { positions: origins.slice(), origins, targets };
  }, []);
  useFrame((state, delta) => {
    elapsed.current += Math.min(delta, .05);
    const progress = Math.min(1, elapsed.current / 3.6); const eased = 1 - (1 - progress) ** 3;
    const a = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < a.length; i += 3) {
      a[i] = origins[i] + (targets[i] - origins[i]) * eased;
      a[i + 1] = origins[i + 1] + (targets[i + 1] - origins[i + 1]) * eased + Math.sin(state.clock.elapsedTime + i) * .014 * eased;
      a[i + 2] = origins[i + 2] * (1 - eased);
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = state.pointer.x * .08;
  });
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3}/></bufferGeometry><pointsMaterial color="#e9bd65" size={.023} transparent opacity={.95} depthWrite={false}/></points>;
}
export default function StardustName() {
  return <SceneCanvas camera={{position:[0,0,6],fov:40}} fallback={<span className="stardust-fallback">Dolly</span>}><NameCloud/></SceneCanvas>;
}
