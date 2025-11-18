let cachedToken = null;
let cachedExpire = 0;

export default async function handler(req, res) {
  try {
    const now = Date.now();

    if (cachedToken && now < cachedExpire) {
      return res.json({ access_token: cachedToken });
    }

    const resp = await fetch("https://api.aliexpress.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "client_credentials",
        app_key: process.env.ALI_APP_KEY,
        app_secret: process.env.ALI_APP_SECRET
      })
    });

    const data = await resp.json();

    if (!data.access_token) {
      return res.status(500).json({ error: "Failed to get token", details: data });
    }

    cachedToken = data.access_token;
    cachedExpire = now + (data.expires_in * 1000);

    return res.json({ access_token: cachedToken });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}