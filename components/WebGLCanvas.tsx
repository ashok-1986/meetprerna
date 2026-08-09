"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Renderer, Camera, Program, Mesh, Triangle } from 'ogl';

interface WebGLCanvasProps {
  vertexShader: string;
  fragmentShader: string;
}

export default function WebGLCanvas({ vertexShader, fragmentShader }: WebGLCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isKilled, setIsKilled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Hardware Kill Switches
    const checkKillSwitches = () => {
      const nav = navigator as any;
      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        console.info("WebGL Killed: prefers-reduced-motion");
        return true;
      }
      if (nav.connection && nav.connection.saveData) {
        console.info("WebGL Killed: saveData enabled");
        return true;
      }
      if (nav.deviceMemory && nav.deviceMemory <= 4) {
        console.info("WebGL Killed: deviceMemory <= 4GB");
        return true;
      }
      if (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) {
        console.info("WebGL Killed: hardwareConcurrency <= 4 cores");
        return true;
      }
      return false;
    };

    if (checkKillSwitches()) {
      setIsKilled(true);
      return;
    }

    // 2. Defend the main thread: Wait for requestIdleCallback before mounting WebGL
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
      
      try {
        // Capped DPR: 1.25 on mobile (<768px), 1.75 on desktop
        const cappedDPR = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.25 : 1.75);
        
        const renderer = new Renderer({ alpha: true, antialias: false, dpr: cappedDPR });
        const gl = renderer.gl;
        
        if (!gl) throw new Error("No WebGL context");
        
        containerRef.current.appendChild(gl.canvas);
        setIsLoaded(true);

        const camera = new Camera(gl);
        
        function resize() {
          renderer.setSize(window.innerWidth, window.innerHeight);
          if (program) {
              program.uniforms.u_resolution.value = [gl.canvas.width, gl.canvas.height];
          }
        }
        window.addEventListener('resize', resize, { passive: true });

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
          const x = e.clientX / window.innerWidth;
          const y = 1.0 - (e.clientY / window.innerHeight);
          program.uniforms.u_mouse.value = [x, y];
        };
        window.addEventListener('pointermove', onPointerMove, { passive: true });
        
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
              setIsKilled(true);
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
          
          const ext = gl.getExtension('WEBGL_lose_context');
          if (ext) ext.loseContext();
          
          if (containerRef.current && gl.canvas.parentNode === containerRef.current) {
              containerRef.current.removeChild(gl.canvas);
          }
        };
      } catch(e) {
        console.error("WebGL Initialization failed, killing shader.", e);
        setIsKilled(true);
      }
    };

    if ('requestIdleCallback' in window) {
      idleCallbackId = requestIdleCallback(mountCanvas);
    } else {
      mountCanvas(); // Safari fallback
    }

    return () => {
      if (idleCallbackId) {
        if ('cancelIdleCallback' in window) {
           (window as any).cancelIdleCallback(idleCallbackId);
        } else {
           clearTimeout(idleCallbackId);
        }
      }
    };
  }, [vertexShader, fragmentShader]);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none" aria-hidden="true">
      {/* Fallback Static Gradient + CSS Grain Overlay */}
      {(!isLoaded || isKilled) && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-ink-100 via-ink to-ink transition-opacity duration-1000 opacity-100" />
          <div 
            className="absolute inset-0 opacity-[0.04] mix-blend-screen pointer-events-none transition-opacity duration-1000 opacity-100"
            style={{
              backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')"
            }}
          />
        </>
      )}

      {/* WebGL Container */}
      {!isKilled && (
        <div 
          ref={containerRef} 
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
}
