export default function handler(req, res) {
  const redirectUri = process.env.REDIRECT_URI;

  if (!redirectUri) {
    return res.status(500).json({ error: "Missing REDIRECT_URI in environment variables" });
  }

  const authUrl = `https://auth.aliexpress.com/oauth/authorize?response_type=code&client_id=${process.env.APP_KEY}&redirect_uri=${encodeURIComponent(redirectUri)}&state=12345`;

  res.redirect(authUrl);
}