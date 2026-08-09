"use client";

import React, { useRef, useEffect, useState } from "react";
import { Renderer, Camera, Transform, Plane, Program, Mesh } from "ogl";
import gsap from "gsap";

const vertex = `
  attribute vec3 position;
  attribute vec2 uv;
  
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// A fluid noise function to create the ripple effect
const fragment = `
  precision highp float;
  
  uniform float uProgress;
  uniform float uTime;
  uniform vec2 uResolution;
  
  varying vec2 vUv;
  
  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    // Generate organic noise
    float noise = snoise(vUv * 4.0 + uTime * 0.4);
    
    // Create a smooth threshold based on progress
    // uProgress goes from 0 (fully visible) to 1 (fully hidden)
    // We map progress to a range that allows the noise to fully clear the screen
    float threshold = uProgress * 2.5 - 0.75;
    
    // Smoothstep creates the sharp, liquid edges
    float alpha = smoothstep(threshold - 0.15, threshold + 0.15, noise * 0.4 + vUv.y);
    
    // Inverse alpha because we want it to disappear
    alpha = 1.0 - alpha;
    
    // Pure Ink color: #0A0A0A -> rgb(10, 10, 10) -> 10/255 = ~0.039
    gl_FragColor = vec4(0.039, 0.039, 0.039, alpha);
  }
`;

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Check if we've already seen the preloader this session
    const hasSeenPreloader = sessionStorage.getItem('prerna_preloader_seen');
    
    if (hasSeenPreloader === 'true' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsComplete(true);
      return;
    }

    if (!containerRef.current || !canvasRef.current) return;

    // --- OGL WebGL Setup ---
    const renderer = new Renderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio, 2),
    });

    const gl = renderer.gl;
    const camera = new Camera(gl, { fov: 45 });
    camera.position.z = 1;

    const scene = new Transform();

    // Create a plane that covers the whole screen
    const geometry = new Plane(gl, { width: 2, height: 2 }); // Will be scaled in resize

    const program = new Program(gl, {
      vertex,
      fragment,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uResolution: { value: [window.innerWidth, window.innerHeight] },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    // Resize handler to keep plane fullscreen
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      // Calculate how big the plane needs to be to cover the camera frustum at z=1
      const aspect = window.innerWidth / window.innerHeight;
      const fov = camera.fov * (Math.PI / 180);
      const height = 2 * Math.tan(fov / 2) * camera.position.z;
      const width = height * aspect;
      
      mesh.scale.set(width, height, 1);
      program.uniforms.uResolution.value = [window.innerWidth, window.innerHeight];
    };

    window.addEventListener('resize', onResize);
    onResize();

    // Render loop
    let animationId: number;
    const render = (t: number) => {
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene, camera });
      animationId = requestAnimationFrame(render);
    };
    animationId = requestAnimationFrame(render);

    // --- GSAP Animation Sequence ---
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';
    
    const tl = gsap.timeline({
      onComplete: () => {
        // Cleanup
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', onResize);
        document.body.style.overflow = '';
        sessionStorage.setItem('prerna_preloader_seen', 'true');
        setIsComplete(true);
      }
    });

    // Hold for a moment to let the page load behind
    tl.to({}, { duration: 0.2 });
    
    // Animate the displacement progress
    tl.to(program.uniforms.uProgress, {
      value: 1,
      duration: 2.2,
      ease: "power3.inOut",
    });

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      document.body.style.overflow = '';
      tl.kill();
    };
  }, []);

  // Don't render anything if already complete or server-side
  if (!isMounted || isComplete) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block"
      />
    </div>
  );
}
