"use client";
import { Component, Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useInView, useReducedMotion } from 'framer-motion';
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}
export default function SceneCanvas({ children, fallback, camera = { position: [0, 0, 6], fov: 48 }, className = '' }) {
  const ref = useRef(null);
  const visible = useInView(ref, { margin: '150px' });
  const reduced = useReducedMotion();
  const [supported, setSupported] = useState(null);
  const [entered, setEntered] = useState(false);
  useEffect(() => { if (visible) setEntered(true); }, [visible]);
  const [pageVisible, setPageVisible] = useState(true);
  useEffect(() => {
    try {
      const probe = document.createElement('canvas');
      const gl = probe.getContext('webgl2') || probe.getContext('webgl');
      setSupported(Boolean(gl));
      gl?.getExtension('WEBGL_lose_context')?.loseContext();
    } catch { setSupported(false); }
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => document.removeEventListener('visibilitychange', visibility);
  }, []);
  return <div ref={ref} className={`scene-canvas ${className}`} data-renderer={supported === false ? "fallback-no-webgl" : reduced ? "fallback-reduced-motion" : entered && supported ? "webgl" : "waiting"} aria-hidden="true">
    {supported && entered && !reduced ? <SceneBoundary fallback={fallback}><Suspense fallback={fallback}>
      <Canvas camera={camera} dpr={[1, 1.5]} gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }} frameloop={visible && pageVisible ? 'always' : 'never'} onCreated={({ gl }) => { gl.setClearColor(0x000000, 0); }} fallback={fallback}>
        {children}
      </Canvas>
    </Suspense></SceneBoundary> : fallback}
  </div>;
}
