import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ParsedShaders {
  vertex: string;
  fragment: string;
}

/**
 * Reads shaders.md from the project root and extracts the GLSL code blocks.
 * This function must only be called on the Server (e.g. Server Components).
 */
export function getShaders(): ParsedShaders {
  try {
    const filePath = path.join(process.cwd(), 'shaders.md');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    // Simple regex to extract code blocks tagged with glsl
    const glslRegex = /```glsl\n([\s\S]*?)```/g;
    const matches = [...fileContent.matchAll(glslRegex)];
    
    // We expect at least 2 matches: Vertex then Fragment
    const vertex = matches[0] ? matches[0][1] : '';
    const fragment = matches[1] ? matches[1][1] : '';
    
    return { vertex, fragment };
  } catch (error) {
    console.error("Failed to parse shaders.md", error);
    return { vertex: '', fragment: '' };
  }
}
