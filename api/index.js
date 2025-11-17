export default function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Missing code" });
  }

  const clientId = "OMiS6a8bKcWrUsu5Bsr34NooT9yYwB3q";
  const redirectUri = "https://aliexpress-redirect-v2.vercel.app/api/callback";

  const authURL =
    `https://oauth.aliexpress.com/authorize?` +
    `response_type=code&` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `state=12345`;

  return res.redirect(authURL);
}
