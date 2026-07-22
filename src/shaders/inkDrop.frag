// MeetPrerna — Ink Drop fragment shader.
// A single ink droplet on cursor click. Triggered, not always running.
// Reference: docs/shaders.md §6.

precision highp float;

uniform float uTime;
uniform float uLifetime;
uniform vec3  uInchworm;
uniform float uSize;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float r = length(uv);
  float t = clamp(uTime / uLifetime, 0.0, 1.0);
  float alpha = smoothstep(0.5, 0.0, r) * (1.0 - t);
  if (alpha < 0.001) discard;
  float scale = 1.0 - t * 0.2;
  gl_FragColor = vec4(uInchworm, alpha * 0.6 * scale);
}
