# ElevenLabs Production Auth Setup (Signed URLs)

This project is now configured for **Full Production Security** using ElevenLabs Authenticated mode. This is the most secure method: your Agent ID, API Key, and WebSocket signatures are all hidden on the server.

## 1. Hosting: Vercel Required
Since we are using Server-Side signing, you must host on **Vercel** (or any provider with Node.js API support). GitHub Pages will not work.

## 2. ElevenLabs Dashboard Settings
1.  Go to your **ElevenLabs Agent Settings**.
2.  Switch **"Enable authentication"** to **ON**.
3.  Click **Publish** to save transitions.

## 3. Environment Variables (Vercel)
Add these two variables to your Vercel Project Settings:
1.  `ELEVENLABS_AGENT_ID`: Your Agent ID.
2.  `ELEVENLABS_API_KEY`: Your API Key (required for signing).

## 4. How it works
- The visitor opens your site.
- The browser calls `/api/get-signed-url`.
- Your Vercel server uses your API key to generate a single-use token from ElevenLabs.
- The agent initializes securely without ever exposing your secrets.

