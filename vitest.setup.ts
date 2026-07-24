import '@testing-library/jest-dom/vitest';

// happy-dom doesn't implement the Font Loading API; src/lib/gsap.ts calls
// document.fonts.ready.then(...) at module load time, which would otherwise
// throw for every test that imports gsap (directly or via reveal.ts).
if (typeof document !== 'undefined' && !('fonts' in document)) {
  Object.defineProperty(document, 'fonts', {
    value: { ready: Promise.resolve() },
    configurable: true,
  });
}
