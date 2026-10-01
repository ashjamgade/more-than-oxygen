"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function ParticleHeart({ count = 3500 }) {
  const pointsRef = useRef();

  // Generate heart-shaped particle positions
  const { positions, originalPositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Heart parametric equation
      const t = Math.random() * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);

      // Scale down and add 3D depth
      const scale = 0.045;
      const depthSpread = (Math.random() - 0.5) * 3; // Z-depth
      const radiusVariation = 0.7 + Math.random() * 0.3; // Fill inside heart

      const px = (x * scale * radiusVariation) + (Math.random() - 0.5) * 0.05;
      const py = (y * scale * radiusVariation) + (Math.random() - 0.5) * 0.05;
      const pz = depthSpread * 0.25 + (Math.random() - 0.5) * 0.1;

      pos[i * 3] = px;
      pos[i * 3 + 1] = py;
      pos[i * 3 + 2] = pz;

      orig[i * 3] = px;
      orig[i * 3 + 1] = py;
      orig[i * 3 + 2] = pz;
    }

    return { positions: pos, originalPositions: orig };
  }, [count]);

  // Animation: heartbeat + particle drift
  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.elapsedTime;

    // Heartbeat scale
    const beat =
      1 + Math.abs(Math.sin(time * 1.8)) * 0.08 + Math.sin(time * 3.6) * 0.02;
    pointsRef.current.scale.set(beat, beat, beat);

    // Slow rotation
    pointsRef.current.rotation.y = Math.sin(time * 0.3) * 0.4;

    // Particle drift (subtle float)
    const positions = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      positions[ix] = originalPositions[ix] + Math.sin(time * 0.5 + i) * 0.008;
      positions[ix + 1] =
        originalPositions[ix + 1] + Math.cos(time * 0.5 + i) * 0.008;
      positions[ix + 2] =
        originalPositions[ix + 2] + Math.sin(time * 0.3 + i) * 0.008;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#FFD700"
        transparent
        opacity={0.95}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Glowing halo around heart
function HeartHalo() {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.8) * 0.05;
      meshRef.current.scale.set(pulse, pulse, pulse);
    }
  });
  return (
    <mesh ref={meshRef} position={[0, 0, -1.5]}>
      <circleGeometry args={[1.8, 64]} />
      <meshBasicMaterial color="#FF5470" transparent opacity={0.06} />
    </mesh>
  );
}

export default function ParticleHeart3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 55 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={2} color="#FFD700" />
        <pointLight position={[-3, -3, 3]} intensity={1.2} color="#FF5470" />
        <HeartHalo />
        <ParticleHeart count={3500} />
      </Canvas>
    </div>
  );
}