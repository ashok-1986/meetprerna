/**
 * MeetPrerna — GSAP Paid Plugin Stubs.
 *
 * SplitText, InertiaPlugin, MotionPathPlugin, DrawSVGPlugin are paid GreenSock plugins.
 * These stubs provide functional no-ops for Phase 1–2 development without a license.
 * Enable with NEXT_PUBLIC_GSAP_STUBS=true in .env.local
 *
 * Reference: docs/agents.md Critical Fix 2.
 */

/**
 * SplitText stub — manually wraps words/lines in spans with display:inline-block.
 * Supports .revert() to restore original text.
 */
export class SplitTextStub {
  elements: HTMLElement[];
  originalHTML: string;
  words: HTMLElement[];
  lines: HTMLElement[];
  chars: HTMLElement[];

  constructor(
    target: string | HTMLElement | HTMLElement[],
    options: { type?: 'chars' | 'words' | 'lines'; linesClass?: string; wordsClass?: string; charsClass?: string } = {}
  ) {
    const targets = Array.isArray(target) ? target : [target];
    this.elements = [];
    this.originalHTML = '';
    this.words = [];
    this.lines = [];
    this.chars = [];

    targets.forEach((el) => {
      if (typeof el === 'string') {
        const found = document.querySelectorAll(el);
        found.forEach((e) => this.processElement(e as HTMLElement, options));
      } else {
        this.processElement(el, options);
      }
    });
  }

  private processElement(el: HTMLElement, options: { type?: 'chars' | 'words' | 'lines'; linesClass?: string; wordsClass?: string; charsClass?: string }) {
    this.originalHTML = el.innerHTML;
    const text = el.textContent || '';
    const type = options.type || 'words';

    let html = '';
    if (type === 'words') {
      const words = text.split(/(\s+)/);
      html = words
        .map((w) => (w.trim() ? `<span class="${options.wordsClass || 'split-word'}" style="display:inline-block">${w}</span>` : w))
        .join('');
    } else if (type === 'lines') {
      const words = text.split(/(\s+)/);
      html = words
        .map((w) => (w.trim() ? `<span class="${options.wordsClass || 'split-word'}" style="display:inline-block">${w}</span>` : w))
        .join('');
    } else {
      html = text
        .split('')
        .map((c) => `<span class="${options.charsClass || 'split-char'}" style="display:inline-block">${c === ' ' ? '&nbsp;' : c}</span>`)
        .join('');
    }

    el.innerHTML = html;
    const spans = Array.from(el.querySelectorAll('span')) as HTMLElement[];
    this.elements.push(...spans);

    if (type === 'words') this.words.push(...spans);
    else if (type === 'lines') this.lines.push(...spans);
    else this.chars.push(...spans);
  }

  revert(): void {
    this.elements.forEach((el) => {
      const parent = el.parentElement;
      if (parent) {
        parent.innerHTML = this.originalHTML;
      }
    });
    this.elements = [];
    this.words = [];
    this.lines = [];
    this.chars = [];
  }
}

/**
 * InertiaPlugin stub — no-op.
 */
export const InertiaPlugin = {
  getById: () => null,
  isTouch: false,
  track: () => {},
  untrack: () => {},
  version: '3.12.5',
};

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.warn('[GSAP Stub] InertiaPlugin — using no-op stub. Set NEXT_PUBLIC_GSAP_STUBS=false with a valid license to enable real plugin.');
}

/**
 * MotionPathPlugin stub — no-op.
 */
export const MotionPathPlugin = {
  getRawPath: () => [],
  stringToRawPath: () => [],
  rawPathToString: () => '',
  pointsToSegment: () => [],
  sliceRawPath: () => [],
  getPositionOnPath: () => ({ x: 0, y: 0 }),
  getGlobalMatrix: () => ({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }),
  convertToPath: () => {},
  version: '3.12.5',
};

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.warn('[GSAP Stub] MotionPathPlugin — using no-op stub. Set NEXT_PUBLIC_GSAP_STUBS=false with a valid license to enable real plugin.');
}

/**
 * DrawSVGPlugin stub — no-op.
 */
export const DrawSVGPlugin = {
  getLength: () => 0,
  version: '3.12.5',
};

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.warn('[GSAP Stub] DrawSVGPlugin — using no-op stub. Set NEXT_PUBLIC_GSAP_STUBS=false with a valid license to enable real plugin.');
}

/**
 * Register stubs with GSAP (if needed for API compatibility).
 */
export function registerStubs(gsap: any): void {
  gsap.registerPlugin({
    name: 'SplitText',
    init() { return true; },
  } as any);

  gsap.registerPlugin(
    InertiaPlugin as any,
    MotionPathPlugin as any,
    DrawSVGPlugin as any
  );
}