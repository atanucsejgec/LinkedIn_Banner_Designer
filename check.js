const fs = require('fs');
const t = fs.readFileSync('templates/templates.js', 'utf8');
const matches = t.match(/name:\s*['"`]/g);
console.log('Templates:', matches ? matches.length : 0);
const comps = fs.readdirSync('templates/components').filter(f => f.endsWith('.js') && f !== 'component-loader.js').map(f => f.replace('.js',''));
console.log('Components:', comps.length, comps);
