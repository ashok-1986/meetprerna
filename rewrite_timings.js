const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('src', function(filePath) {
  if (filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    if (content.includes('0.1s')) {
      content = content.replace(/0\.1s/g, '130ms');
      changed = true;
    }
    
    if (content.includes('0.15s')) {
      content = content.replace(/0\.15s/g, '200ms');
      changed = true;
    }

    if (content.includes('150ms')) {
      content = content.replace(/150ms/g, '200ms');
      changed = true;
    }

    if (content.includes('100ms')) {
      content = content.replace(/100ms/g, '130ms');
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated ' + filePath);
    }
  }
});
