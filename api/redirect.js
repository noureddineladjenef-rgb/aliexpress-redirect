// api/redirect.js
export default function handler(req, res) {
  const APP_KEY = process.env.ALI_APP_KEY || "503368";
  const REDIRECT_URI = process.env.REDIRECT_URI || "https://yourproject.vercel.app/api/callback";
  const state = "xyz_" + Date.now();

  const authUrl = `https://auth.aliexpress.com/oauth/authorize?response_type=code&client_id=${encodeURIComponent(APP_KEY)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${encodeURIComponent(state)}&force_auth=true`;

  return res.redirect(authUrl);
}