'use client';

import React, { useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { ease, dur } from '@/animations/easing';
import { useGsapContext } from '@/hooks/useGsapContext';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export interface AnimatedFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'type' | 'size'> {
  label: string;
  type?: 'text' | 'email' | 'tel' | 'textarea';
  error?: string;
}

export const AnimatedField = React.forwardRef<HTMLDivElement, AnimatedFieldProps>(({
  label,
  name,
  type = 'text',
  required = false,
  error,
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  className,
  ...props
}, ref) => {
  const internalRef = useRef<HTMLDivElement>(null);
  const containerRef = (ref as React.RefObject<HTMLDivElement>) || internalRef;
  const labelRef = useRef<HTMLLabelElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || '');

  const isControlled = value !== undefined;
  const hasValue = isControlled ? String(value).length > 0 : String(internalValue).length > 0;
  const shouldFloat = isFocused || hasValue;
    
  useGsapContext(() => {
    if (prefersReducedMotion) {
      gsap.set(labelRef.current, { y: shouldFloat ? -20 : 0, scale: shouldFloat ? 0.8 : 1 });
      gsap.set(borderRef.current, { 
        height: isFocused ? 2 : 1, 
        backgroundColor: error ? 'var(--danger)' : isFocused ? 'var(--inchworm)' : 'var(--ivory-dim)' 
      });
      return;
    }
    
    const tl = gsap.timeline();
    tl.to(labelRef.current, {
      y: shouldFloat ? -20 : 0,
      scale: shouldFloat ? 0.8 : 1,
      duration: dur.d180,
      ease: ease.soft
    }, 0);
    
    tl.to(borderRef.current, {
      height: isFocused ? 2 : 1,
      backgroundColor: error ? 'var(--danger)' : isFocused ? 'var(--inchworm)' : 'var(--ivory-dim)',
      duration: dur.d180,
      ease: ease.soft
    }, 0);
  }, [isFocused, value, error, prefersReducedMotion]);

  // Error shake animation
  useGsapContext(() => {
    const tl = gsap.timeline();
    if (error && !prefersReducedMotion) {
      tl.fromTo(inputRef.current, 
        { x: -8 },
        { x: 8, duration: 0.06, yoyo: true, repeat: 3, ease: 'none', clearProps: 'x' }, 0
      );
    }
    
    tl.to(errorRef.current, {
      opacity: error ? 1 : 0,
      y: error ? 0 : -5,
      duration: prefersReducedMotion ? 0 : dur.d180,
      ease: ease.soft
    }, 0);
  }, [error, prefersReducedMotion]);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };
  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e as any);
  };

  const InputComponent = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div ref={containerRef} className={`relative w-full pt-6 pb-6 ${className || ''}`}>
      <label 
        ref={labelRef} 
        htmlFor={name}
        className="absolute left-0 top-6 text-base text-gray-500 origin-left pointer-events-none"
      >
        {label} {required && <span className="text-danger">*</span>}
      </label>
      
      <InputComponent
        ref={inputRef as any}
        id={name}
        name={name}
        type={type !== 'textarea' ? type : undefined}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={required}
        className="w-full bg-transparent border-none outline-none text-base p-0 m-0 shadow-none focus:ring-0 text-ivory"
        rows={type === 'textarea' ? 4 : undefined}
        {...(props as any)}
      />
      
      <div 
        ref={borderRef} 
        className="absolute bottom-6 left-0 w-full origin-bottom"
        style={{ height: '1px', backgroundColor: 'var(--ivory-dim)' }}
      />
      
      <div 
        ref={errorRef}
        className="absolute bottom-1 left-0 text-sm opacity-0 translate-y-[-5px] text-danger"
        aria-live="polite"
      >
        {error}
      </div>
    </div>
  );
});

AnimatedField.displayName = 'AnimatedField';
