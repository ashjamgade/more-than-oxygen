"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Image, OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";

function PhotoRing({ photos }) {
  const groupRef = useRef();
  const [paused, setPaused] = useState(false);

  useFrame(() => {
    if (groupRef.current && !paused) groupRef.current.rotation.y += 0.003;
  });

  const radius = 3.5;

  return (
    <group ref={groupRef}>
      {photos.map((photo, i) => {
        const angle = (i / photos.length) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        return (
          <group key={i} position={[x, 0, z]} rotation={[0, angle, 0]}
            onPointerOver={() => setPaused(true)}
            onPointerOut={() => setPaused(false)}>
            <Image url={photo} scale={[1.6, 2.1]} transparent opacity={1} />
          </group>
        );
      })}
    </group>
  );
}

export default function PhotoCarousel3D({ photos }) {
  return (
    <Canvas camera={{ position: [0, 0, 9], fov: 50 }} gl={{ alpha: true }}>
      <ambientLight intensity={1.2} />
      <PhotoRing photos={photos} />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate rotateSpeed={0.5}
        minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
    </Canvas>
  );
}
