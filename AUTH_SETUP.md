# ElevenLabs Authentication Setup

To use the **"Enable authentication"** toggle for your ElevenLabs agent, you need a backend to sign tokens so your API Key is never exposed.

## Option 1: Simple JavaScript Gate (Easiest for GitHub Pages)
We have added a simple password prompt to the homepage. 
1. Add a secret named `SITE_ACCESS_CODE` in your GitHub Repository Secrets.
2. When the site builds, this password will be required before the widget loads.
*Note: This is "soft" security. A developer can still find the password in the HTML source code, but it stops casual visitors.*

## Option 2: Full Authentication (Requires Vercel/Netlify)
To use the **"Enable authentication"** toggle...
