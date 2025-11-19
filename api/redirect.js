// api/redirect.js
export default async function handler(req, res) {
  try {
    const REDIRECT_URI = process.env.ALIEXPRESS_REDIRECT_URI;

    if (!REDIRECT_URI) {
      return res.status(500).json({ error: "Missing REDIRECT_URI env" });
    }

    const AUTH_URL = `https://auth.aliexpress.com/oauth/authorize?response_type=code&client_id=${process.env.ALIEXPRESS_APP_KEY}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=1234`;

    return res.redirect(AUTH_URL);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}