export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: "Missing code" });
  }

  try {
    const response = await fetch("https://api.aliexpress.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        client_id: process.env.APP_KEY,
        client_secret: process.env.APP_SECRET,
        code: code,
        redirect_uri: process.env.REDIRECT_URI
      })
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: "Request failed", details: error.message });
  }
}