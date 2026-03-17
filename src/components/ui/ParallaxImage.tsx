'use client';

import { useRef } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  parallaxFactor?: number;
  className?: string;
  containerClassName?: string;
}

/**
 * Parallax Image Component
 * Image with scroll-based parallax effect using Framer Motion
 */
export function ParallaxImage({
  src,
  alt,
  parallaxFactor = 0.1,
  className = '',
  containerClassName = '',
  ...props
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, parallaxFactor * 100]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${containerClassName}`}>
      <motion.div style={{ y }} className={`h-full ${className}`}>
        <Image src={src} alt={alt} fill className="object-cover" {...props} />
      </motion.div>
    </div>
  );
}
