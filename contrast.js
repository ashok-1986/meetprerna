function getLuminance(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  
  [r, g, b] = [r, g, b].map(c => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrast(hex1, hex2) {
  let l1 = getLuminance(hex1);
  let l2 = getLuminance(hex2);
  let lightest = Math.max(l1, l2);
  let darkest = Math.min(l1, l2);
  return (lightest + 0.05) / (darkest + 0.05);
}

const colors = {
  ink: '#1A1A1A',
  ink500: '#6B6B6B',
  ivory: '#FDFFE9',
  ivoryDim: '#C9CBB6', // Not used on light background, ink500 is used instead
  inchworm: '#C4FF61',
  inchwormDeep: '#9FCC4A'
};

console.log("1) Body text (ink-500) on ivory:", getContrast(colors.ink500, colors.ivory).toFixed(2));
console.log("2) Ivory-dim equivalent on ivory (ink-500 is the equivalent):", getContrast(colors.ink500, colors.ivory).toFixed(2));
console.log("3) M2 session line stroke (inchworm) on ivory:", getContrast(colors.inchworm, colors.ivory).toFixed(2));
console.log("4) CTA label (ink) on filled accent (inchworm):", getContrast(colors.ink, colors.inchworm).toFixed(2));
