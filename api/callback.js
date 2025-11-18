export default async function handler(req, res) {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: "Missing code" });
    }

    const redirectUri = "https://aliexpress-redirect.vercel.app/api/callback";

    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: "503368",
      client_secret: "OMiS6a8bKeWrJusu5Bsr34NooT9yYwB3q",
      redirect_uri: redirectUri,
    });

    const tokenRes = await fetch(
      `https://api.aliexpress.com/oauth/token?${params.toString()}`,
      { method: "POST" }
    );

    const data = await tokenRes.json();
    return res.status(200).json(data);

  } catch (e) {
    return res.status(500).json({ error: "Server error", details: e.message });
  }
}