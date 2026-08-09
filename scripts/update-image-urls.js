const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (let file of list) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  }
  return results;
}

const dirsToScan = [
  path.join(__dirname, '../app'),
  path.join(__dirname, '../components'),
  path.join(__dirname, '../lib')
];

let files = [];
for (const dir of dirsToScan) {
  if (fs.existsSync(dir)) {
    files = files.concat(walk(dir));
  }
}

let modifiedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // 1. Replace JSX string props: src="/images/xyz.jpg" -> src={`https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/images/xyz.jpg`}
  const jsxRegex = /(src|image)=["'](\/images\/[^"']+)["']/g;
  content = content.replace(jsxRegex, (match, p1, p2) => {
    return `${p1}={\`https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev${p2}\`}`;
  });

  // 2. Replace object properties or variables: src: "/images/xyz.jpg" -> src: "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/images/xyz.jpg"
  // Let's just do a generic replace for ANY string "/images/..." to "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/images/..."
  // This is safer since we want all /images/ strings updated.
  const bareRegex = /["'](\/images\/[^"']+)["']/g;
  content = content.replace(bareRegex, (match, p1) => {
    return `"https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev${p1}"`;
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
    console.log(`Updated ${file}`);
  }
}

console.log(`Update complete! Modified ${modifiedCount} files.`);
