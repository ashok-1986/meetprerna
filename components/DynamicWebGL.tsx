"use client";

import dynamic from "next/dynamic";

const WebGLCanvas = dynamic(() => import("@/components/WebGLCanvas"), {
  ssr: false,
});

export default function DynamicWebGL(props: { vertexShader: string; fragmentShader: string }) {
  return <WebGLCanvas {...props} />;
}
