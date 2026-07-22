// MeetPrerna — Grain fragment shader.
// High-frequency noise overlay for film texture.
// Reference: docs/shaders.md §4.

precision highp float;

uniform float uTime;
uniform vec2  uResolution;
uniform float uOpacity;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy;
  // Re-seed every 6 frames at 60fps → 10Hz, perceptually static.
  float n = hash(uv + floor(uTime * 10.0));
  vec3 col = vec3(n);
  gl_FragColor = vec4(col, uOpacity);
}
