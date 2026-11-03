"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const prefersReducedMotion = useReducedMotion();

  // Generate random particles across a wide 3D space
  const count = 3000;
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 22 * Math.cbrt(Math.random());

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      if (prefersReducedMotion) {
        // Minimal idle drift
        ref.current.rotation.x -= delta * 0.005;
        ref.current.rotation.y -= delta * 0.007;
      } else {
        // Continuous ambient rotation
        ref.current.rotation.x -= delta * 0.05;
        ref.current.rotation.y -= delta * 0.07;

        // Subtle pointer tracking
        const mouseX = (state.pointer.x * Math.PI) / 10;
        const mouseY = (state.pointer.y * Math.PI) / 10;

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
    <div className="pointer-events-none absolute -top-8 sm:-top-14 left-1/2 -translate-x-1/2 -z-10 h-[calc(100%+4rem)] w-screen max-w-none overflow-hidden">
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 15] }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <ParticleField />
        </Canvas>
      </Suspense>

      {/* Smooth bottom gradient fade blending seamlessly into following sections */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
    </div>
  );
}
