"use client";

import React, { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform, Program, Mesh, Triangle } from 'ogl';

interface WebGLCanvasProps {
  vertexShader: string;
  fragmentShader: string;
}

export default function WebGLCanvas({ vertexShader, fragmentShader }: WebGLCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // 1. Defend the main thread: Wait for requestIdleCallback before mounting WebGL
    let idleCallbackId: number;
    let rAF: number;
    
    // Performance State
    let frameCount = 0;
    let badFrames = 0;
    let level1Degraded = false;
    let fluidEnabled = true;
    let lastTime = performance.now();
    let isVisible = true;
    
    const mountCanvas = () => {
      if (!containerRef.current) return;
      
      const renderer = new Renderer({ alpha: true, antialias: false, dpr: 1 });
      const gl = renderer.gl;
      containerRef.current.appendChild(gl.canvas);

      // We don't need a perspective camera for a full screen shader
      const camera = new Camera(gl);
      
      function resize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        // Map to pixel coordinates
        if (program) {
            program.uniforms.u_resolution.value = [gl.canvas.width, gl.canvas.height];
        }
      }
      window.addEventListener('resize', resize, false);

      const geometry = new Triangle(gl);

      const program = new Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: {
          u_time: { value: 0 },
          u_mouse: { value: [0.5, 0.5] },
          u_resolution: { value: [gl.canvas.width, gl.canvas.height] },
          u_fluid_enabled: { value: 1.0 }
        },
      });

      const mesh = new Mesh(gl, { geometry, program });
      resize();
      
      // Pointer tracking
      const onPointerMove = (e: PointerEvent) => {
        // Normalize coordinates to 0..1
        const x = e.clientX / window.innerWidth;
        const y = 1.0 - (e.clientY / window.innerHeight); // WebGL Y is flipped
        program.uniforms.u_mouse.value = [x, y];
      };
      window.addEventListener('pointermove', onPointerMove);
      
      // Visibility Tracking (Backgrounding Kill Switch)
      const onVisibilityChange = () => {
          isVisible = !document.hidden;
      };
      document.addEventListener('visibilitychange', onVisibilityChange);

      // Render Loop & Performance Monitor
      const update = (t: number) => {
        rAF = requestAnimationFrame(update);
        
        if (!isVisible) {
            lastTime = t;
            return; // Pause completely if backgrounded
        }
        
        const delta = t - lastTime;
        lastTime = t;
        
        // 5ms GPU Budget Monitoring (Approximation via frame delta)
        // If the frame took longer than 33ms (sub-30fps), we increment badFrames
        if (delta > 33) {
            badFrames++;
        } else {
            badFrames = Math.max(0, badFrames - 0.5); // Recover slowly
        }
        
        // Level 1 Degradation: Halve Resolution
        if (badFrames > 15 && !level1Degraded) {
            renderer.dpr = 0.5; // Render at half resolution
            resize();
            level1Degraded = true;
            console.warn("WebGL Level 1 Degradation: Dropped Resolution");
        }
        
        // Level 2 Degradation: Disable Fluid Pass
        if (badFrames > 30 && fluidEnabled) {
            fluidEnabled = false;
            program.uniforms.u_fluid_enabled.value = 0.0;
            console.warn("WebGL Level 2 Degradation: Disabled Fluid Pass");
        }
        
        // Level 3 Degradation: Unmount Completely
        if (badFrames > 60) {
            console.error("WebGL Level 3 Degradation: Frame times critical. Unmounting Canvas.");
            cancelAnimationFrame(rAF);
            if (containerRef.current && gl.canvas) {
                 containerRef.current.removeChild(gl.canvas);
            }
            return;
        }

        program.uniforms.u_time.value = t * 0.001;
        renderer.render({ scene: mesh, camera });
      };
      
      rAF = requestAnimationFrame(update);
      
      // Cleanup
      return () => {
        cancelAnimationFrame(rAF);
        window.removeEventListener('resize', resize);
        window.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('visibilitychange', onVisibilityChange);
        if (containerRef.current && gl.canvas.parentNode === containerRef.current) {
            containerRef.current.removeChild(gl.canvas);
        }
      };
    };

    if ('requestIdleCallback' in window) {
      idleCallbackId = requestIdleCallback(mountCanvas);
    } else {
      mountCanvas(); // Safari fallback
    }

    return () => {
      if (idleCallbackId) cancelIdleCallback(idleCallbackId);
    };
  }, [vertexShader, fragmentShader]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[-1] pointer-events-none" 
      aria-hidden="true"
    />
  );
}
