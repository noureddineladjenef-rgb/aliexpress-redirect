import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

// -------------------- OAuth Redirect --------------------
app.get("/api/redirect", (req, res) => {
  const url =
    `https://login.aliexpress.com/oauth2/auth?` +
    `app_id=${process.env.ALIEXPRESS_APP_KEY}` +
    `&redirect_uri=${process.env.ALIEXPRESS_REDIRECT_URI}` +
    `&response_type=code` +
    `&state=success`;

  res.redirect(url);
});

// -------------------- OAuth Callback --------------------
app.get("/api/callback", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: "Missing code" });
  }

  try {
    const tokenUrl = "https://api.aliexpress.com/oauth2/token";

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

// -------------------- HOME --------------------
app.get("/", (req, res) => {
  res.send("AliExpress Redirect API is running ✔");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));