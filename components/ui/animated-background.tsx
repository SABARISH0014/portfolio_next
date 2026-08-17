"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const prefersReducedMotion = useReducedMotion();

  // Generate random particles
  const count = 3000;
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 20 * Math.cbrt(Math.random());
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      if (prefersReducedMotion) {
        // Near zero movement
        ref.current.rotation.x -= delta * 0.005;
        ref.current.rotation.y -= delta * 0.007;
      } else {
        // Interactive / idle animation
        ref.current.rotation.x -= delta * 0.05;
        ref.current.rotation.y -= delta * 0.07;
        
        // Slight mouse tracking
        const mouseX = (state.pointer.x * Math.PI) / 10;
        const mouseY = (state.pointer.y * Math.PI) / 10;
        
        // Smoothly interpolate rotation towards mouse
        ref.current.rotation.x += (mouseY - ref.current.rotation.x) * 0.02;
        ref.current.rotation.y += (mouseX - ref.current.rotation.y) * 0.02;
      }
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#22d3ee" // Cyan
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export function AnimatedBackground() {
  return (
    <div className="absolute top-0 left-[50%] -z-10 h-full w-[100vw] -translate-x-1/2 bg-[#09090b] overflow-hidden">
      <Suspense fallback={<div className="bg-[#09090b] absolute inset-0 -z-10" />}>
        <Canvas camera={{ position: [0, 0, 15] }} dpr={[1, 2]}>
          <color attach="background" args={["#09090b"]} />
          <ambientLight intensity={0.5} />
          <ParticleField />
        </Canvas>
      </Suspense>
    </div>
  );
}
