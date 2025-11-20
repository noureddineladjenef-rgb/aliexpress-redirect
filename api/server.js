import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// -------------------------
// VERIFY
// -------------------------
app.get("/api/verify", (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Missing code" });
  }

  return res.json({
    success: true,
    message: "Verification code received",
    code,
  });
});

// -------------------------
// REDIRECT
// -------------------------
app.get("/api/redirect", (req, res) => {
  const REDIRECT_URI = process.env.ALIEXPRESS_REDIRECT_URI;
  const APP_KEY = process.env.ALIEXPRESS_APP_KEY;

  if (!REDIRECT_URI) {
    return res.status(500).json({ error: "Missing REDIRECT_URI env" });
  }

  const AUTH_URL = `https://auth.aliexpress.com/oauth/authorize?response_type=code&client_id=${APP_KEY}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&state=1234`;

  res.redirect(AUTH_URL);
});

// -------------------------
// CALLBACK
// -------------------------
app.get("/api/callback", (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Missing code" });
  }

  res.send(`
    <h2>Authorization Successful</h2>
    <p>Copy this code and paste it in your .env file:</p>
    <pre>${code}</pre>
  `);
});

// -------------------------
// GET ACCESS TOKEN
// -------------------------
app.get("/api/token", async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: "Missing code" });
    }

    const APP_KEY = process.env.ALIEXPRESS_APP_KEY;
    const APP_SECRET = process.env.ALIEXPRESS_APP_SECRET;
    const REDIRECT_URI = process.env.ALIEXPRESS_REDIRECT_URI;

    const params = new URLSearchParams({
      grant_type: "authorization_code",
      app_key: APP_KEY,
      app_secret: APP_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
    });

    const response = await fetch("https://api.aliexpress.com/oauth/token", {
      method: "POST",
      body: params,
    });

    const data = await response.json();

    return res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------
app.get("/", (req, res) => {
  res.send("AliExpress OAuth server is running!");
});

// -------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on PORT: " + PORT));