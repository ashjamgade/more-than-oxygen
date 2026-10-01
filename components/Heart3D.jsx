"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function HeartMesh() {
  const meshRef = useRef();
  const heartGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x + 0.5, y + 0.5);
    shape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
    shape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
    shape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
    shape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
    shape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1, y);
    shape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.4,
      bevelEnabled: true,
      bevelSegments: 12,
      steps: 2,
      bevelSize: 0.15,
      bevelThickness: 0.15,
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.4;
      const beat = 1 + Math.abs(Math.sin(state.clock.elapsedTime * 1.5)) * 0.08;
      meshRef.current.scale.set(beat, beat, beat);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} geometry={heartGeometry} position={[-0.5, -0.95, 0]}>
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FF5470"
          emissiveIntensity={1.2}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

export default function Heart3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={3} color="#FF5470" />
        <pointLight position={[-5, -3, -5]} intensity={1.5} color="#FFD700" />
        <HeartMesh />
      </Canvas>
    </div>
  );
}
