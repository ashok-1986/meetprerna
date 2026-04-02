const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;

            // Splitting by lines
            let lines = content.split('\n');
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].includes('fontWeight: 700')) {
                    // Check previous few lines for 'Times New Roman'
                    let isHeading = false;
                    for (let j = Math.max(0, i - 5); j <= i; j++) {
                        if (lines[j].includes('Times New Roman') || lines[j].includes('tag=')) {
                            isHeading = true;
                            break;
                        }
                    }
                    // Some line reveals don't have font-family in the same object but have tag="h2"

                    if (isHeading) {
                        lines[i] = lines[i].replace('fontWeight: 700', 'fontWeight: 500');
                        changed = true;
                    }
                }
            }

            if (changed) {
                fs.writeFileSync(fullPath, lines.join('\n'));
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

processDir(path.join(__dirname, 'src'));
console.log('Done.');
