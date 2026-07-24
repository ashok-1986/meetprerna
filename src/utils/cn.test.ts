import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('resolves conflicting Tailwind classes to the last one, not both', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8');
  });

  it('drops falsy conditional classes without leaving artifacts', () => {
    const isActive = false;
    expect(cn('base', isActive && 'active', 'trailing')).toBe('base trailing');
  });

  it('merges arrays and objects the same way clsx does, before tailwind-merge dedupes', () => {
    expect(cn(['flex', 'gap-2'], { 'text-ivory': true, 'text-ink': false })).toBe(
      'flex gap-2 text-ivory'
    );
  });
});
