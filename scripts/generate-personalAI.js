const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, '..', 'public', 'template.html');
const outPath = path.join(__dirname, '..', 'public', 'index.html');
const agentId = process.env.ELEVENLABS_AGENT_ID;

if (!agentId) {
  console.error('ERROR: ELEVENLABS_AGENT_ID environment variable is not set.');
}

const tpl = fs.readFileSync(templatePath, 'utf8');
let out = tpl.replace(/{{ELEVENLABS_AGENT_ID}}/g, agentId || 'your-agent-id-here');

fs.writeFileSync(outPath, out, 'utf8');
console.log('public/index.html generated successfully.');
