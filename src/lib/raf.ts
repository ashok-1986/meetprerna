/**
 * makeRafLoop — minimal RAF loop factory.
 * Used for WebGL render loops, custom cursors, etc.
 * Reference: docs/shaders.md §11.
 */

export interface RafLoop {
  start: () => void;
  stop: () => void;
  setCallback: (fn: (dt: number, time: number) => void) => void;
}

export function makeRafLoop(
  callback: (dt: number, time: number) => void,
  options: { autoStart?: boolean } = {}
): RafLoop {
  let frameId: number | null = null;
  let lastTime = 0;
  let running = false;
  let currentCallback = callback;

  function tick(time: number) {
    if (!running) return;
    const dt = (time - lastTime) / 1000;
    lastTime = time;
    currentCallback(dt, time / 1000);
    frameId = requestAnimationFrame(tick);
  }

  const loop: RafLoop = {
    start() {
      if (running) return;
      running = true;
      lastTime = performance.now();
      frameId = requestAnimationFrame(tick);
    },
    stop() {
      running = false;
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
    },
    setCallback(fn: (dt: number, time: number) => void) {
      currentCallback = fn;
    },
  };

  if (options.autoStart) loop.start();
  return loop;
}