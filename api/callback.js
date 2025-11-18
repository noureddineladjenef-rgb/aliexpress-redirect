export default async function handler(req, res) {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: "Missing code" });
    }

    const clientId = 503368;
    const clientSecret = "OMiS6a8bKcWrUsu5Bsr34NooT9yYwB3q";
    const redirectUri = "https://aliexpress-redirect.vercel.app/api/callback";

    const tokenUrl = `https://api.aliexpress.com/oauth/token?grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${encodeURIComponent(redirectUri)}&code=${code}`;

    const response = await fetch(tokenUrl);
    const data = await response.json();

    return res.status(200).json(data);

  } catch (e) {
    return res.status(500).json({ error: "Server error", details: e.message });
  }
}