// MeetPrerna — InkField vertex shader.
// Reference: docs/shaders.md §3.4.

attribute vec3 position;
void main() {
  gl_Position = vec4(position, 1.0);
}
