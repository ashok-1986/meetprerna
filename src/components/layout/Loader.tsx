'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

/**
 * Loader Component
 * Full-screen loading animation with brand name and progress bar
 * Slides up on completion to reveal page content
 */
export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2000; // 2 seconds total
    const interval = 50;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 600); // Wait for exit animation
          }, 200);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ backgroundColor: 'var(--color-black)' }}
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Brand Name */}
          <motion.div
            className="mb-8 overflow-hidden"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          >
            <h1
              className="text-5xl md:text-7xl font-serif text-ivory"
              style={{ letterSpacing: '-0.02em' }}
            >
              Prerna
            </h1>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-[180px] h-[1px] bg-white/10 mb-4 overflow-hidden">
            <motion.div
              className="h-full"
              style={{
                background: 'linear-gradient(90deg, var(--color-green), var(--color-yellow))',
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </div>

          {/* Sub Text */}
          <motion.p
            className="text-muted text-sm tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Navi Mumbai · By Appointment
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
