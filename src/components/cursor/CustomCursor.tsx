/**
 * CustomCursor — the ink-blot cursor.
 * Reference: docs/animations.md §10, §2.2.
 */
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useIsCoarsePointer } from '@/hooks/useIsCoarsePointer';

interface CursorState {
  variant: 'default' | 'open' | 'drag' | 'lead' | 'write' | 'link';
  label: string;
}

const CURSOR_DATA_ATTR = 'data-cursor';
const CURSOR_LABEL_DATA_ATTR = 'data-cursor-label';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<CursorState>({ variant: 'default', label: '' });
  const reduce = usePrefersReducedMotion();
  const isCoarse = useIsCoarsePointer();
  
  // Cache bounds for lead elements to avoid layout thrashing
  const leadBounds = useRef<Map<Element, DOMRect>>(new Map());

  useEffect(() => {
    if (reduce || isCoarse) return;

    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label) return;

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.6, ease: 'power3.out' });
    const xToLabel = gsap.quickTo(label, 'x', { duration: 0.8, ease: 'power3.out' });
    const yToLabel = gsap.quickTo(label, 'y', { duration: 0.8, ease: 'power3.out' });

    const setState = (next: Partial<CursorState>) => {
      stateRef.current = { ...stateRef.current, ...next };

      const tl = gsap.timeline();
      const variant = stateRef.current.variant;
      switch (variant) {
        case 'open':
        case 'link':
          tl.to(cursor, { width: 8, height: 8, opacity: 1, backgroundColor: 'rgb(var(--color-inchworm))', border: 'none', duration: 0.18, ease: 'power2.out' }, 0);
          break;
        case 'lead':
          tl.to(cursor, { width: 12, height: 12, opacity: 0.7, backgroundColor: 'rgb(var(--color-inchworm))', border: 'none', duration: 0.26, ease: 'power3.out' }, 0);
          break;
        case 'drag':
          tl.to(cursor, { width: 56, height: 56, opacity: 1, backgroundColor: 'transparent', border: '1.5px solid rgb(var(--color-ivory))', duration: 0.26, ease: 'power3.out' }, 0);
          break;
        case 'write':
          tl.to(cursor, { width: 12, height: 12, opacity: 0.8, backgroundColor: 'rgb(var(--color-marigold))', border: 'none', duration: 0.26, ease: 'power3.out' }, 0);
          break;
        default:
          tl.to(cursor, { width: 24, height: 24, opacity: 0.4, backgroundColor: 'rgb(var(--color-ivory))', border: 'none', duration: 0.26, ease: 'power3.out' }, 0);
      }

      const text = stateRef.current.label;
      if (text) {
        label.textContent = text;
        tl.to(label, { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' }, 0);
      } else {
        tl.to(label, { opacity: 0, y: 8, duration: 0.18, ease: 'power2.in' }, 0);
      }
    };

    // Approach effect logic
    let throttleTimer: any = null;
    let lastTime = 0;
    
    const updateApproachEffect = (mouseX: number, mouseY: number) => {
      const now = Date.now();
      if (now - lastTime < 60) {
        if (throttleTimer) clearTimeout(throttleTimer);
        throttleTimer = setTimeout(() => {
          lastTime = Date.now();
          applyApproach(mouseX, mouseY);
        }, 60);
        return;
      }
      lastTime = now;
      applyApproach(mouseX, mouseY);
    };

    const applyApproach = (mouseX: number, mouseY: number) => {
      leadBounds.current.forEach((rect, el) => {
        // Calculate shortest distance from point to rect
        const dx = Math.max(rect.left - mouseX, 0, mouseX - rect.right);
        const dy = Math.max(rect.top - mouseY, 0, mouseY - rect.bottom);
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          const shift = 100 * (1 - dist / 100);
          const baseWght = parseFloat(window.getComputedStyle(el).getPropertyValue('--font-wght') || '400');
          (el as HTMLElement).style.fontVariationSettings = `"wght" ${baseWght + shift}`;
        } else {
          (el as HTMLElement).style.fontVariationSettings = ''; // reset
        }
      });
    };

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xToLabel(e.clientX);
      yToLabel(e.clientY + 28);
      
      if (leadBounds.current.size > 0) {
        updateApproachEffect(e.clientX, e.clientY);
      }
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      
      const customType = target.closest(`[${CURSOR_DATA_ATTR}]`)?.getAttribute(CURSOR_DATA_ATTR);
      const customLabel = target.closest(`[${CURSOR_DATA_ATTR}]`)?.getAttribute(CURSOR_LABEL_DATA_ATTR);
      
      const linkTarget = target.closest('a, button');

      if (customType === 'open') {
        setState({ variant: 'open', label: customLabel ?? 'View' });
      } else if (customType === 'drag') {
        setState({ variant: 'drag', label: '' });
      } else if (customType === 'lead') {
        setState({ variant: 'lead', label: '' });
      } else if (customType === 'write') {
        setState({ variant: 'write', label: customLabel ?? 'Write' });
      } else if (linkTarget) {
        let label = linkTarget.getAttribute('aria-label') || linkTarget.textContent?.trim() || '';
        if (label.length > 15) label = ''; // Don't show long text
        setState({ variant: 'link', label });
      } else {
        setState({ variant: 'default', label: '' });
      }
    };

    // Cache layout on resize/mutation
    const ro = new ResizeObserver((entries) => {
      entries.forEach(entry => {
        leadBounds.current.set(entry.target, entry.target.getBoundingClientRect());
      });
    });

    const observer = new MutationObserver(() => {
      const leads = document.querySelectorAll(`[${CURSOR_DATA_ATTR}="lead"]`);
      leadBounds.current.clear();
      ro.disconnect();
      leads.forEach(el => {
        leadBounds.current.set(el, el.getBoundingClientRect());
        ro.observe(el);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial setup
    document.querySelectorAll(`[${CURSOR_DATA_ATTR}="lead"]`).forEach(el => {
      leadBounds.current.set(el, el.getBoundingClientRect());
      ro.observe(el);
    });

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.classList.add('cursor-active');

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.documentElement.classList.remove('cursor-active');
      ro.disconnect();
      observer.disconnect();
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, [reduce, isCoarse]);

  if (reduce || isCoarse) return null;

  return (
    <div className="cursor-blend" aria-hidden="true">
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: -12,
          left: -12,
          width: 24,
          height: 24,
          borderRadius: 9999,
          backgroundColor: 'rgb(var(--color-ivory))',
          opacity: 0.4,
          pointerEvents: 'none',
          mixBlendMode: 'difference',
          zIndex: 9999,
          willChange: 'transform, width, height, opacity',
        }}
      />
      <div
        ref={labelRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          fontFamily: 'var(--font-body)',
          fontSize: 12,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'rgb(var(--color-inchworm))',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform, opacity',
        }}
      />
    </div>
  );
}
