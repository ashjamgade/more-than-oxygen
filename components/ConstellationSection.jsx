"use client";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Stars } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

function MemoryStar({ position, photoUrl, title, message, onSelect }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) meshRef.current.position.y = position[1] + Math.sin(t + position[0]) * 0.2;
  });
  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => onSelect({ photoUrl, title, message })}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color={hovered ? "#FFD700" : "#FFFFFF"} />
          {hovered && <pointLight color="#FFD700" intensity={2} distance={5} />}
        </mesh>
      </Float>
    </group>
  );
}

export default function ConstellationSection() {
  const [selected, setSelected] = useState(null);

  const memories = [
    { position: [2, 1, 0], photoUrl: "/photos/dolly-1.jpg", title: "The First Time I Saw You", message: "I didn't just see a beautiful girl. I saw a future I wanted to be a part of." },
    { position: [-2, 0.5, 1], photoUrl: "/photos/dolly-2.jpg", title: "Your Instagram Story", message: "When you post a story, it becomes my world's favorite thing to think about." },
    { position: [1, -1, -1], photoUrl: "/photos/dolly-3.jpg", title: "Your Phone Text", message: "Your text is my phone's most favorite notification." },
    { position: [-1.5, -0.5, 2], photoUrl: "/photos/dolly-4.jpg", title: "Your Ambition", message: "From IISER Bhopal to IIIT-Hyderabad. Your intelligence is the most attractive thing about you." },
    { position: [0, 1.5, -2], photoUrl: "/photos/dolly-5.jpg", title: "Your Simplicity", message: "You value honesty and meaningful conversations. That is so rare." },
    { position: [2.5, -0.5, 1.5], photoUrl: "/photos/dolly-6.jpg", title: "Your Roots", message: "Deeply rooted in family and culture, yet modern in your thinking." },
    { position: [-2.5, 1, -1], photoUrl: "/photos/dolly-7.jpg", title: "The Video Call", message: "I still remember our first video call. It was the best call of my life." },
  ];

  return (
    <section className="relative h-screen w-full bg-[#050505] overflow-hidden">
      <div className="absolute top-10 left-0 w-full text-center z-10 pointer-events-none">
        <h2 className="text-white text-3xl md:text-5xl font-light tracking-widest">Our Little Universe</h2>
        <p className="text-gray-400 mt-2 text-sm md:text-base font-light">Tap a star to see what it means to me</p>
      </div>
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <ambientLight intensity={0.5} />
        {memories.map((m, i) => (
          <MemoryStar key={i} {...m} onSelect={setSelected} />
        ))}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
            onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white/10 border border-white/20 rounded-3xl p-8 max-w-lg w-full text-center"
              onClick={(e) => e.stopPropagation()}>
              <div className="w-full h-64 bg-gray-800 rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
                <img src={selected.photoUrl} alt={selected.title} className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }} />
              </div>
              <h3 className="text-yellow-400 text-2xl font-medium mb-3">{selected.title}</h3>
              <p className="text-white text-lg font-light leading-relaxed">{selected.message}</p>
              <button onClick={() => setSelected(null)}
                className="mt-8 text-gray-400 text-sm uppercase tracking-widest hover:text-white">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
