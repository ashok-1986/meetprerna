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

  const regex = /https:\/\/pub-fc30457eaa7a478196bf63dff9cbf7d3\.r2\.dev\/images\//g;
  content = content.replace(regex, 'https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
    console.log(`Updated ${file}`);
  }
}

console.log(`Fix complete! Modified ${modifiedCount} files.`);
