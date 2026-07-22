/**
 * MeetPrerna — Easing & duration library.
 *
 * Imported by every timeline factory. No inline strings.
 * Reference: docs/designs.md §7.1, §7.2.
 */

/** CSS cubic-bezier strings (for non-GSAP use, e.g., CSS transitions). */
export const easeCss = {
  studio: 'cubic-bezier(0.65, 0, 0.35, 1)',
  editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
  soft: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  glide: 'cubic-bezier(0.22, 1, 0.36, 1)',
  breath: 'cubic-bezier(0.45, 0, 0.55, 1)',
} as const;

/** Durations in seconds, for GSAP. */
export const dur = {
  d120: 0.12,
  d180: 0.18,
  d260: 0.26,
  d420: 0.42,
  d620: 0.62,
  d900: 0.9,
  d1400: 1.4,
} as const;

/** GSAP-friendly ease aliases. */
export const ease = {
  studio: 'power2.inOut',
  editorial: 'expo.out',
  soft: 'power1.out',
  glide: 'power3.out',
  breath: 'sine.inOut',
  sharpOut: 'power4.out',
  sharpIn: 'power4.in',
} as const;