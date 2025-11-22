app.get("/api/callback", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: "Missing code" });
  }

  try {
    const tokenUrl = "https://api-sg.aliexpress.com/oauth/token";

    const result = await axios.post(tokenUrl, null, {
      params: {
        grant_type: "authorization_code",
        code: code,
        app_id: process.env.ALIEXPRESS_APP_KEY,
        app_secret: process.env.ALIEXPRESS_APP_SECRET,
        redirect_uri: process.env.ALIEXPRESS_REDIRECT_URI,
      },
    });

    res.json(result.data);
  } catch (err) {
    res.status(500).json({ error: err.response?.data || err.message });
  }
});