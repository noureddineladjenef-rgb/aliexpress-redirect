// api/token.js
let cachedToken = null;
let cachedExpire = 0;

export default async function handler(req, res) {
  try {
    const now = Date.now();
    if (cachedToken && now < cachedExpire) {
      return res.status(200).json({ access_token: cachedToken, cached: true });
    }

    const APP_KEY = process.env.ALI_APP_KEY || "503368";
    const APP_SECRET = process.env.ALI_APP_SECRET || "elN0hkFZhXbUKORbj0L35409sRnPZ1eq";

    const url = "https://api.aliexpress.com/oauth/token";
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("app_key", APP_KEY);
    params.append("app_secret", APP_SECRET);

    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString()
    });

    const data = await resp.json();
    console.log("client_credentials token response:", data);

    const token = data.access_token || (data.data && data.data.access_token);
    const expiresIn = data.expires_in || (data.data && data.data.expires_in) || 3600;

    if (!token) {
      return res.status(500).json({ error: "No access_token returned", raw: data });
    }

    cachedToken = token;
    cachedExpire = Date.now() + (expiresIn - 10) * 1000; // اطرح 10 ثواني للسلامة

    return res.status(200).json({ access_token: cachedToken, expires_in: expiresIn });
  } catch (err) {
    console.error("token error:", err);
    return res.status(500).json({ error: err.message });
  }
}