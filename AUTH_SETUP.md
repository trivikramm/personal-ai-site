# ElevenLabs Secure Authentication Setup

To ensure your password is **never visible** in the browser console or "Inspect Element", this project now uses **Server-side Authentication**.

## 1. Requirement: Vercel or Netlify
**GitHub Pages is NOT supported for secure password protection.** 
GitHub Pages can only host "Static" sites. Since we need to hide the password from the user's browser, we must use a backend. Vercel and Netlify are free and automatically run the backend code in the `api/` folder.

## 2. Environment Variables (Required in Vercel/Netlify)
You must add these three variables to your **Vercel** or **Netlify** project:
1. `ELEVENLABS_AGENT_ID`: Your Agent ID.
2. `ELEVENLABS_API_KEY`: Your ElevenLabs API Key.
3. `SITE_ACCESS_CODE`: The secret password you want users to type.

## 3. How the Security Works
1. User types the password on your site.
2. The site sends the password to the backend function (`/api/get-signed-url`).
3. The **Server** (which users cannot see) compares it with your `SITE_ACCESS_CODE`.
4. If correct, the **Server** fetches the ElevenLabs token.
5. The password itself **never** exists in the browser's source code.

