import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export default async function handler(req, res) {
  try {
    // نجلب الكود مباشرة من .env
    const code = process.env.AUTH_CODE;

    if (!code) {
      return res.json({ error: "AUTH_CODE not found in environment!" });
    }

    const url = "https://api.aliexpress.com/auth/token";

    const params = {
      grant_type: "authorization_code",
      client_id: process.env.ALIEXPRESS_APP_KEY,
      client_secret: process.env.ALIEXPRESS_APP_SECRET,
      code,
      redirect_uri: process.env.ALIEXPRESS_REDIRECT_URI
    };

    const response = await axios.get(url, { params });

    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    res.json({
      error: "Token API failed",
      details: error?.response?.data || error.message
    });
  }
}