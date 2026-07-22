// MeetPrerna — Process fragment shader.
// Soft ink-mix transition between process steps.
// Reference: docs/shaders.md §7.

precision highp float;

uniform sampler2D uFrom;
uniform sampler2D uTo;
uniform float uMix;
uniform float uTime;
uniform vec2  uResolution;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec4 a = texture2D(uFrom, uv);
  vec4 b = texture2D(uTo, uv);
  // Hash-based dissolve for the "mix" feel.
  float n = fract(sin(dot(uv * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
  float t = smoothstep(uMix - 0.05, uMix + 0.05, n);
  gl_FragColor = mix(a, b, t);
}
