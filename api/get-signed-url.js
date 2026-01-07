/**
 * This is a Vercel/Node.js Serverless Function to securely sign ElevenLabs URLs.
 * You should deploy this to a provider that supports serverless functions (like Vercel).
 */

export default async function (req, res) {
  const agentId = process.env.ELEVENLABS_AGENT_ID;
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const siteAccessCode = process.env.SITE_ACCESS_CODE;

  // 1. SECURE PASSWORD CHECK (Server-side)
  // Get password from request (detects both body or query)
  let providedPassword = '';
  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    providedPassword = body?.password;
  } else {
    providedPassword = req.query?.password;
  }

  // If a password is set in Vercel, it MUST match the one provided by the user
  if (siteAccessCode && providedPassword !== siteAccessCode) {
    return res.status(401).json({ error: 'Unauthorized: Incorrect access code' });
  }

  if (!agentId || !apiKey) {
    return res.status(500).json({ error: 'Missing environment variables on Vercel' });
  }

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${agentId}`,
      {
        method: 'GET',
        headers: {
          'xi-api-key': apiKey,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ElevenLabs API error: ${errorText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error signing URL:', error);
    res.status(500).json({ error: error.message });
  }
}
