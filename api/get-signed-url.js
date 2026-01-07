/**
 * This is a Vercel/Node.js Serverless Function to securely sign ElevenLabs URLs.
 * You should deploy this to a provider that supports serverless functions (like Vercel).
 */

export default async function (req, res) {
  const agentId = process.env.ELEVENLABS_AGENT_ID;
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const siteAccessCode = process.env.SITE_ACCESS_CODE;

  // Handle both GET and POST for password check
  let providedPassword = '';
  if (req.method === 'POST') {
    // Vercel might not parse the body automatically if not configured
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    providedPassword = body?.password;
  } else {
    providedPassword = req.query?.password;
  }

  if (!agentId) {
    return res.status(500).json({ error: 'Missing ELEVENLABS_AGENT_ID on server' });
  }

  // 1. SECURE PASSWORD CHECK (Server-side only)
  if (siteAccessCode && providedPassword !== siteAccessCode) {
    return res.status(401).json({ error: 'Unauthorized: Incorrect access code' });
  }

  // 2. OPTIONAL: SIGNED URL (Requires API Key)
  if (!apiKey) {
    console.log('No API Key found. Falling back to Allowlist mode.');
    return res.status(200).json({ 
      success: true, 
      message: 'Password correct. Using Allowlist mode (no signed URL).' 
    });
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
    // data.signed_url contains the wss://... URL with conversation_signature
    res.status(200).json(data);
  } catch (error) {
    console.error('Error signing URL:', error);
    res.status(500).json({ error: error.message });
  }
}
