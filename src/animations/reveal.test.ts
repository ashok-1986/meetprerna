import { describe, it, expect } from 'vitest';
import { createRevealTimeline } from './reveal';

// Regression tests for the CLS fix: a translateY-based reveal moved each
// element's rendered bounding rect, which Chromium's Layout Instability API
// scores as a real layout shift (measured 0.313 CLS live, 0.287 of it from
// one grid reveal). The fix switched to autoAlpha (opacity + visibility)
// with no positional transform at all. These tests fail if a `y`/transform
// is ever reintroduced into the initial gsap.set state.

function makeContainerWithChildren(count: number): HTMLElement {
  const container = document.createElement('div');
  for (let i = 0; i < count; i++) {
    container.appendChild(document.createElement('div'));
  }
  document.body.appendChild(container);
  return container;
}

describe('createRevealTimeline', () => {
  it('sets children to opacity 0 with no transform (children mode, no scrollTrigger)', () => {
    const container = makeContainerWithChildren(3);

    const { kill } = createRevealTimeline(container, { children: true, y: 24 });

    for (const child of Array.from(container.children)) {
      const el = child as HTMLElement;
      expect(el.style.opacity).toBe('0');
      expect(el.style.transform).toBe('');
    }

    kill();
    container.remove();
  });

  it('sets the single-element target to opacity 0 with no transform', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);

    const { kill } = createRevealTimeline(el, { y: 24 });

    expect(el.style.opacity).toBe('0');
    expect(el.style.transform).toBe('');

    kill();
    el.remove();
  });

  it('ignores the deprecated y option entirely, even when explicitly passed', () => {
    const container = makeContainerWithChildren(2);

    const withY = createRevealTimeline(container, { children: true, y: 999 });
    const transformsWithY = Array.from(container.children).map(
      (c) => (c as HTMLElement).style.transform
    );
    withY.kill();

    expect(transformsWithY.every((t) => t === '')).toBe(true);
    container.remove();
  });
});
