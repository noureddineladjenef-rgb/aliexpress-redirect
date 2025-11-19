// api/callback.js
export default async function handler(req, res) {
  try {
    const code = req.query.code || req.query.auth_code;
    const state = req.query.state || null;

    if (!code) {
      return res.status(400).json({ error: "Missing code" });
    }

    const APP_KEY = process.env.ALI_APP_KEY || "503368";
    const APP_SECRET = process.env.ALI_APP_SECRET || "YOUR_APP_SECRET";
    const REDIRECT_URI = process.env.REDIRECT_URI || "https://yourproject.vercel.app/api/callback";

    // تبادل الكود مقابل Access Token
    const tokenUrl = "https://api.aliexpress.com/oauth/token";

    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("app_key", APP_KEY);
    params.append("app_secret", APP_SECRET);
    params.append("redirect_uri", REDIRECT_URI);

    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString()
    });

    const data = await response.json();

    // سجل في لوقات Vercel لتتحقق لاحقًا
    console.log("aliexpress token response:", data);

    if (!data || (!data.access_token && !data.data && !data.result)) {
      // نعيد الجسم كاملًا لتشخيص المشكلة
      return res.status(500).json({ error: "No access_token in response", raw: data });
    }

    // بعض واجهات AliExpress ترجع access_token مباشرة أو داخل data
    const access_token = data.access_token || (data.data && data.data.access_token) || (data.result && data.result.access_token);

    return res.status(200).json({
      success: true,
      access_token,
      raw: data,
      state
    });

  } catch (err) {
    console.error("callback error:", err);
    return res.status(500).json({ error: err.message });
  }
}