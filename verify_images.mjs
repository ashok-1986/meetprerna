import fs from 'fs';
import path from 'path';

const imagePaths = new Set();

// 1. Portfolio images
const contentStr = fs.readFileSync('src/content/portfolio.ts', 'utf8');
const imageRegex = /(?:image|healed):\s*'([^']+)'/g;
let match;
while ((match = imageRegex.exec(contentStr)) !== null) {
  imagePaths.add(path.posix.join('/images/portfolio', match[1]));
}

// 2. site.heroImage
const siteStr = fs.readFileSync('src/content/site.ts', 'utf8');
const heroMatch = siteStr.match(/heroImage:\s*'([^']+)'/);
if (heroMatch) imagePaths.add(heroMatch[1]);

// 3. About images
const aboutStr = fs.readFileSync('src/app/about/page.tsx', 'utf8');
const importRegex = /import\s+.*?from\s+'([^']+)'/g;
while ((match = importRegex.exec(aboutStr)) !== null) {
  if (match[1].includes('public/images/')) {
    const idx = match[1].indexOf('/images/');
    imagePaths.add(match[1].substring(idx));
  }
}

// 4. Still band image
imagePaths.add('/images/studio/prerna-working-bw.jpg');

console.log("Checking images...");
for (const img of Array.from(imagePaths).sort()) {
  const fullPath = path.join('public', img);
  if (fs.existsSync(fullPath)) {
    console.log(`[RESOLVED] ${img}`);
  } else {
    console.log(`[MISSING]  ${img}`);
  }
}
