// api/token.js

export default async function handler(req, res) {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: "Missing code" });
    }

    const APP_KEY = process.env.ALIEXPRESS_APP_KEY;
    const APP_SECRET = process.env.ALIEXPRESS_APP_SECRET;
    const REDIRECT_URI = process.env.ALIEXPRESS_REDIRECT_URI;

    const url = "https://api.aliexpress.com/oauth/token";

    const params = new URLSearchParams({
      grant_type: "authorization_code",
      app_key: APP_KEY,
      app_secret: APP_SECRET,
      code,
      redirect_uri: REDIRECT_URI
    });

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    });

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}