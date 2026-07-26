const fs = require('fs');
const path = require('path');

const terms = [
  "six years",
  "seven years",
  "pay nothing",
  "98%",
  "TODO(prerna)",
  "TODO(owner)"
];

const results = {};
terms.forEach(t => results[t] = []);

function walkDir(dir, callback) {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(f => {
      let dirPath = path.join(dir, f);
      if (fs.statSync(dirPath).isDirectory()) {
        walkDir(dirPath, callback);
      } else {
        callback(dirPath);
      }
    });
  }
}

walkDir('src', function(filePath) {
  if (filePath.match(/\.(ts|tsx|md|css|js|json|txt)$/)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      terms.forEach(term => {
        if (line.toLowerCase().includes(term.toLowerCase())) {
          results[term].push(`${filePath}:${index + 1}: ${line.trim()}`);
        }
      });
    });
  }
});

console.log("=== GREP AUDIT RESULTS ===");
terms.forEach(term => {
  console.log(`\nSearch: "${term}" (${results[term].length} matches)`);
  results[term].forEach(res => console.log(res));
});
