const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, '..', 'personalAI.template.html');
const outPath = path.join(__dirname, '..', 'index.html');
const agentId = process.env.ELEVENLABS_AGENT_ID;
const siteAccessCode = process.env.SITE_ACCESS_CODE || '';

if (!agentId) {
  console.error('ERROR: ELEVENLABS_AGENT_ID environment variable is not set.');
  console.log('Using a placeholder ID for demonstration.');
}

const tpl = fs.readFileSync(templatePath, 'utf8');
let out = tpl.replace(/{{ELEVENLABS_AGENT_ID}}/g, agentId || 'your-agent-id-here');
out = out.replace(/{{SITE_ACCESS_CODE}}/g, siteAccessCode);

fs.writeFileSync(outPath, out, 'utf8');
console.log('index.html generated successfully.');
