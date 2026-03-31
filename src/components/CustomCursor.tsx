'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useSpring, animate } from 'framer-motion';

// ── Multiple irregular ring paths ──────────────────────────────
// Each is a slightly different hand-drawn circle
// We cycle between them to create a living, breathing feel
const RING_PATHS = [
  // Ring 1 — slightly squashed left
  "M 50,10 C 75,8 92,25 92,50 C 92,75 75,92 50,92 C 25,92 8,75 8,50 C 8,25 25,12 50,10 Z",
  // Ring 2 — slightly squashed right
  "M 50,8 C 76,10 94,26 93,51 C 92,76 74,93 49,92 C 24,91 7,74 8,49 C 9,24 24,6 50,8 Z",
  // Ring 3 — slightly taller
  "M 50,6 C 74,7 93,24 93,50 C 93,76 76,94 50,94 C 24,94 7,76 7,50 C 7,24 26,5 50,6 Z",
  // Ring 4 — back toward start (loop)
  "M 50,10 C 74,9 91,26 91,50 C 91,74 74,91 50,91 C 26,91 9,74 9,50 C 9,26 26,11 50,10 Z",
];

// ── Splat paths for click animation ───────────────────────────
const SPLAT_PATH =
  "M 50,15 C 60,5 75,8 80,20 C 90,15 95,28 88,35 C 98,42 95,58 85,60 C 88,72 78,82 68,78 C 65,90 52,93 45,85 C 38,95 24,90 22,78 C 10,80 5,65 12,55 C 2,48 5,32 15,28 C 10,16 22,8 32,14 C 36,4 48,3 50,15 Z";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [pathIndex, setPathIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isSplatting, setIsSplatting] = useState(false);
  const [splatPos, setSplatPos] = useState({ x: 0, y: 0 });

  // Motion values for position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const rotation = useMotionValue(0);
  const ringScale = useMotionValue(1);

  // Springs — smooth, organic movement
  const springX = useSpring(cursorX, { stiffness: 120, damping: 28, mass: 0.8 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 28, mass: 0.8 });
  const microSpringX = useSpring(cursorX, { stiffness: 50, damping: 20, mass: 1.2 });
  const microSpringY = useSpring(cursorY, { stiffness: 50, damping: 20, mass: 1.2 });

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;

    let rotationValue = 0;
    let velocityX = 0;
    let velocityY = 0;
    let lastX = 0;
    let lastY = 0;
    let pathCycleTimer: ReturnType<typeof setInterval>;
    let idlePulseTimer: ReturnType<typeof setInterval>;
    let isMoving = false;
    let moveTimeout: ReturnType<typeof setTimeout>;

    // ── Slowly morph between ring shapes ────────────────────────
    // Creates the "breathing" organic feel
    pathCycleTimer = setInterval(() => {
      setPathIndex(i => (i + 1) % RING_PATHS.length);
    }, 2000);

    // ── Idle pulse ───────────────────────────────────────────────
    // Ring pulses gently when mouse is still
    idlePulseTimer = setInterval(() => {
      if (!isMoving && !isHovering) {
        animate(ringScale, [1, 1.08, 1], {
          duration: 1.8,
          ease: 'easeInOut',
        });
      }
    }, 2500);

    // ── Mouse move ───────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Velocity for rotation speed
      velocityX = e.clientX - lastX;
      velocityY = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      // Rotate based on movement speed
      const speed = Math.sqrt(velocityX ** 2 + velocityY ** 2);
      rotationValue += speed * 0.4;
      rotation.set(rotationValue);

      // Scale ring slightly with speed — feels responsive
      const speedScale = Math.min(1 + speed * 0.008, 1.3);
      ringScale.set(speedScale);

      // Mark as moving — suppress idle pulse
      isMoving = true;
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        isMoving = false;
        ringScale.set(1);
      }, 150);
    };

    // ── Click splat ──────────────────────────────────────────────
    const onClick = (e: MouseEvent) => {
      setSplatPos({ x: e.clientX, y: e.clientY });
      setIsSplatting(true);
      setTimeout(() => setIsSplatting(false), 500);
    };

    // ── Magnetic hover ───────────────────────────────────────────
    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as Element).closest(
        'a, button, [data-cursor="hover"]'
      );
      if (!target) return;

      setIsHovering(true);

      // Snap toward element centre
      const rect = target.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Magnetic pull — partial snap
      cursorX.set(cursorX.get() + (cx - cursorX.get()) * 0.4);
      cursorY.set(cursorY.get() + (cy - cursorY.get()) * 0.4);

      // Grow ring on hover
      animate(ringScale, 1.6, {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      });
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = (e.target as Element).closest(
        'a, button, [data-cursor="hover"]'
      );
      if (!target) return;

      setIsHovering(false);

      // Return ring to normal size
      animate(ringScale, 1, {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    return () => {
      clearInterval(pathCycleTimer);
      clearInterval(idlePulseTimer);
      clearTimeout(moveTimeout);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
    };
  }, [mounted, isHovering, cursorX, cursorY, rotation, ringScale]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* ── MAIN BRUSH RING CURSOR ── */}
      <motion.div
        style={{
          position: 'fixed',
          left: springX,
          top: springY,
          width: '44px',
          height: '44px',
          marginLeft: '-22px',
          marginTop: '-22px',
          pointerEvents: 'none',
          zIndex: 2147483646,
          rotate: rotation,
          scale: ringScale,
          transformOrigin: 'center center',
        }}
      >
        <svg
          width="44"
          height="44"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: 'visible' }}
        >
          {/* Morphing ring — cycles through irregular paths */}
          <motion.path
            d={RING_PATHS[pathIndex]}
            animate={{ d: RING_PATHS[pathIndex] }}
            transition={{
              duration: 1.8,
              ease: 'easeInOut',
            }}
            stroke={isHovering ? '#C4FF61' : 'rgba(253,255,233,0.7)'}
            strokeWidth={isHovering ? '3' : '1.5'}
            fill={isHovering ? 'rgba(196,255,97,0.08)' : 'none'}
            style={{
              transition: 'stroke 0.3s ease, fill 0.3s ease, stroke-width 0.3s ease',
            }}
          />

          {/* Inner dot — always visible, tiny */}
          <circle
            cx="50"
            cy="50"
            r={isHovering ? '3' : '1.5'}
            fill={isHovering ? '#C4FF61' : 'rgba(253,255,233,0.5)'}
            style={{ transition: 'r 0.3s ease, fill 0.3s ease' }}
          />

          {/* Brush texture marks — small dashes on the ring */}
          {/* These make it look hand-drawn */}
          <motion.path
            d="M 50,10 L 50,6"
            stroke="rgba(196,255,97,0.4)"
            strokeWidth="1"
            strokeLinecap="round"
            animate={{ opacity: isHovering ? 0 : 1 }}
          />
          <motion.path
            d="M 88,38 L 92,36"
            stroke="rgba(196,255,97,0.3)"
            strokeWidth="1"
            strokeLinecap="round"
            animate={{ opacity: isHovering ? 0 : 1 }}
          />
          <motion.path
            d="M 88,62 L 92,64"
            stroke="rgba(196,255,97,0.2)"
            strokeWidth="1"
            strokeLinecap="round"
            animate={{ opacity: isHovering ? 0 : 1 }}
          />
        </svg>
      </motion.div>

      {/* ── CLICK SPLAT ── */}
      {isSplatting && (
        <motion.div
          key={`splat-${splatPos.x}-${splatPos.y}`}
          initial={{ scale: 0, opacity: 0.9 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            left: splatPos.x - 24,
            top: splatPos.y - 24,
            width: '48px',
            height: '48px',
            pointerEvents: 'none',
            zIndex: 2147483645,
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 100 100"
            fill="none"
          >
            <path
              d={SPLAT_PATH}
              fill="rgba(196,255,97,0.25)"
              stroke="rgba(196,255,97,0.5)"
              strokeWidth="1"
            />
          </svg>
        </motion.div>
      )}

      {/* ── TRAILING MICRO RING ── */}
      {/* Smaller, slower ring that follows behind */}
      {/* Creates depth — two rings at different speeds */}
      <motion.div
        style={{
          position: 'fixed',
          left: microSpringX,
          top: microSpringY,
          width: '16px',
          height: '16px',
          marginLeft: '-8px',
          marginTop: '-8px',
          pointerEvents: 'none',
          zIndex: 2147483644,
          opacity: isHovering ? 0 : 0.35,
          rotate: rotation,
          transition: 'opacity 0.3s ease',
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 100 100"
          fill="none"
        >
          <path
            d={RING_PATHS[(pathIndex + 2) % RING_PATHS.length]}
            stroke="#C4FF61"
            strokeWidth="4"
            fill="none"
          />
        </svg>
      </motion.div>
    </>,
    document.body
  );
}