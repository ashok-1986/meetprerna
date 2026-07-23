/**
 * InkField — the full-bleed ambient ink shader.
 * Reference: docs/shaders.md §3.
 */
'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import inkFieldFrag from '@/shaders/inkField.frag?raw';
import inkFieldVert from '@/shaders/inkField.vert?raw';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useDeviceTier } from '@/hooks/useDeviceTier';
import { usePathname } from 'next/navigation';
import { gsap } from '@/lib/gsap';
import { R3FRenderBridge } from './R3FRenderBridge';

const INK_HEX = 0x1a1a1a;
const INCHWORM_HEX = 0xc4ff61;

const srgbToLinear = (c: number) => Math.pow(c / 255, 2.2);

function InkFieldMaterial() {
  const { size, gl } = useThree();
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const timeListenerRegistered = useRef(false);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseInfluence: { value: 0 },
      uScroll: { value: 0 },
      uInk: {
        value: new THREE.Vector3(
          srgbToLinear((INK_HEX >> 16) & 0xff),
          srgbToLinear((INK_HEX >> 8) & 0xff),
          srgbToLinear(INK_HEX & 0xff),
        ),
      },
      uInchworm: {
        value: new THREE.Vector3(
          srgbToLinear((INCHWORM_HEX >> 16) & 0xff),
          srgbToLinear((INCHWORM_HEX >> 8) & 0xff),
          srgbToLinear(INCHWORM_HEX & 0xff),
        ),
      },
      uIntensity: { value: 1.0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    uniforms.uResolution.value.set(
      size.width * gl.getPixelRatio(),
      size.height * gl.getPixelRatio(),
    );
  }, [size, gl, uniforms]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      uniforms.uMouse.value.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight,
      );
      uniforms.uMouseInfluence.value = Math.min(1, uniforms.uMouseInfluence.value + 0.04);
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      uniforms.uScroll.value = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, [uniforms]);

  useEffect(() => {
    // Guard against React Strict Mode double-invoking this effect (which
    // would otherwise register the ticker callback twice).
    if (timeListenerRegistered.current) return;

    const updateTime = () => {
      uniforms.uTime.value = gsap.ticker.time;
    };

    timeListenerRegistered.current = true;
    gsap.ticker.add(updateTime);
    return () => {
      gsap.ticker.remove(updateTime);
      timeListenerRegistered.current = false;
    };
  }, [uniforms]);

  return (
    <shaderMaterial
      ref={matRef}
      vertexShader={inkFieldVert}
      fragmentShader={inkFieldFrag}
      uniforms={uniforms}
      depthTest={false}
      depthWrite={false}
      transparent={false}
    />
  );
}

/**
 * Route-to-intensity mapping.
 * Per shaders.md §3.5: 1.0 on /, 0.6 on /about, 0.4 on contact, 0 on /book.
 */
const ROUTE_INTENSITY: Record<string, number> = {
  '/': 1.0,
  '/tattoos': 0.8,
  '/paintings': 0.8,
  '/sketches': 0.8,
  '/process': 0.7,
  '/about': 0.6,
  '/contact': 0.4,
  '/book': 0,
};

function getRouteIntensity(pathname: string | null): number {
  if (!pathname) return 0.6;
  const val = ROUTE_INTENSITY[pathname];
  if (val !== undefined) return val;
  // Prefix match for dynamic routes like /tattoos/[slug]
  for (const [route, intensity] of Object.entries(ROUTE_INTENSITY)) {
    if (route !== '/' && pathname.startsWith(route)) return intensity;
  }
  return 0.6; // sensible default
}

export function InkField() {
  const reduce = usePrefersReducedMotion();
  const tier = useDeviceTier();
  const pathname = usePathname();
  const intensityRef = useRef({ value: getRouteIntensity(pathname) });

  // Ease intensity to target on route change
  useEffect(() => {
    const target = getRouteIntensity(pathname);
    gsap.to(intensityRef.current, {
      value: target,
      duration: 0.8,
      ease: 'power2.inOut',
    });
  }, [pathname]);

  if (reduce || tier === 'low') return null;

  return (
    <div className="shader-canvas" aria-hidden="true">
      <Canvas
        frameloop="demand"
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        dpr={[1, tier === 'mid' ? 1.25 : 1.5]}
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1, near: 0.1, far: 10 }}
        style={{ width: '100vw', height: '100vh' }}
      >
        <R3FRenderBridge />
        <mesh>
          <planeGeometry args={[2, 2]} />
          <InkFieldMaterial />
        </mesh>
        {/* Drive uIntensity from route */}
        <RouteIntensityDriver intensityRef={intensityRef} />
      </Canvas>
    </div>
  );
}

/**
 * R3F component that reads the eased intensity ref and writes it to the
 * shader material's uIntensity uniform each frame.
 */
function RouteIntensityDriver({ intensityRef }: { intensityRef: React.RefObject<{ value: number }> }) {
  const { scene } = useThree();
  const intensityListenerRegistered = useRef(false);

  useEffect(() => {
    // Guard against React Strict Mode double-invoking this effect (which
    // would otherwise register the ticker callback twice).
    if (intensityListenerRegistered.current) return;

    const updateIntensity = () => {
      // Walk the scene to find the shader material
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        const material = mesh.material as THREE.ShaderMaterial;
        if (material && material.uniforms && material.uniforms.uIntensity) {
          material.uniforms.uIntensity.value = intensityRef.current?.value ?? 1.0;
        }
      });
    };

    intensityListenerRegistered.current = true;
    gsap.ticker.add(updateIntensity);
    return () => {
      gsap.ticker.remove(updateIntensity);
      intensityListenerRegistered.current = false;
    };
  }, [scene, intensityRef]);

  return null;
}
