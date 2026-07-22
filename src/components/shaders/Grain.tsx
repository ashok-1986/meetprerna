'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';
import grainFrag from '@/shaders/grain.frag?raw';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

function GrainMaterial() {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uOpacity: { value: 0.08 },
    }),
    [],
  );

  useFrame((_, dt) => {
    uniforms.uTime.value += dt;
  });

  return (
    <shaderMaterial
      vertexShader={`attribute vec3 position; void main(){ gl_Position = vec4(position, 1.0); }`}
      fragmentShader={grainFrag}
      uniforms={uniforms}
      transparent
      depthTest={false}
    />
  );
}

export function Grain() {
  const reduce = usePrefersReducedMotion();
  if (reduce) return null;

  return (
    <div
      className="shader-canvas shader-canvas--grain"
      aria-hidden="true"
    >
      <Canvas
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        dpr={[1, 1]}
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        style={{ width: '100vw', height: '100vh' }}
      >
        <mesh>
          <planeGeometry args={[2, 2]} />
          <GrainMaterial />
        </mesh>
      </Canvas>
    </div>
  );
}
