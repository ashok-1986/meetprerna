/**
 * WebGL feature detection.
 * Reference: docs/shaders.md §11.
 */

export function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    return !!gl;
  } catch {
    return false;
  }
}

export function getWebGLContext(attrs: WebGLContextAttributes = {}): WebGL2RenderingContext | WebGLRenderingContext | null {
  if (typeof window === 'undefined') return null;
  const canvas = document.createElement('canvas');
  return canvas.getContext('webgl2', attrs) || canvas.getContext('webgl', attrs);
}

export function getMaxTextureSize(): number {
  const gl = getWebGLContext();
  if (!gl) return 2048;
  return gl.getParameter(gl.MAX_TEXTURE_SIZE);
}

export function getSupportedExtensions(): string[] {
  const gl = getWebGLContext();
  if (!gl) return [];
  return gl.getSupportedExtensions() || [];
}