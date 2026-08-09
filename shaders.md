# WebGL Shader Library

This document stores the raw GLSL code used by the WebGL canvas. It is parsed at build/runtime.

## Vertex Shader

```glsl
// Full-screen triangle vertex shader (no diagonal seam)
attribute vec2 position;
attribute vec2 uv;

varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
}
```

## Fragment Shader

```glsl
precision highp float;

varying vec2 vUv;

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_fluid_enabled; // Kill switch (1.0 = on, 0.0 = off)

// Hash for noise grain
float hash(vec2 p) {
    vec3 p3  = fract(vec3(p.xyx) * .1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

void main() {
    // 1. Fluid Background (procedural SDF-based ink spread)
    vec3 color = vec3(0.047, 0.051, 0.051); // Base Eerie Black (bg-ink)
    
    if (u_fluid_enabled > 0.5) {
        // Correct aspect ratio
        vec2 st = vUv;
        vec2 mouse = u_mouse;
        
        st.x *= u_resolution.x / u_resolution.y;
        mouse.x *= u_resolution.x / u_resolution.y;
        
        // Distance to cursor
        float dist = distance(st, mouse);
        
        // Procedural ripple/fluid displacement (simplification for 5ms budget)
        // In a true fluid sim this would be advected, here we simulate a reactive field
        float ripple = sin(dist * 20.0 - u_time * 2.0) * exp(-dist * 4.0);
        
        // Fluid color (a slightly lighter ink tone to show the ripple)
        vec3 fluidColor = vec3(0.08, 0.085, 0.09);
        
        // Mix based on proximity and ripple
        float fluidMix = smoothstep(0.4, 0.0, dist) * abs(ripple) * 0.5;
        color = mix(color, fluidColor, fluidMix);
    }
    
    // 2. Temporal Noise Grain (Pass 2)
    // Grain is animated by shifting the UV by u_time
    float grain = hash(vUv * u_resolution + fract(u_time));
    
    // Mix the grain over the background at 4% opacity
    color = mix(color, vec3(grain), 0.04);
    
    gl_FragColor = vec4(color, 1.0);
}
```
