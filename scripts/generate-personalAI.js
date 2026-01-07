const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, '..', 'public', 'template.html');
const outPath = path.join(__dirname, '..', 'public', 'index.html');

const tpl = fs.readFileSync(templatePath, 'utf8');
// REMOVED Agent ID injection from here to keep HTML clean
fs.writeFileSync(outPath, tpl, 'utf8');
console.log('public/index.html generated successfully (Clean Version).');
