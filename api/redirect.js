import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing url" });
  }

  try {
    const encodedUrl = encodeURIComponent(url);

    // رابط API الرسمي للتحويل في AliExpress
    const apiUrl = `https://api.aliexpress.com/sync?app_key=503368&tracking_id=default&target_url=${encodedUrl}&sign_method=hmac&timestamp=${Date.now()}`;

    // نعيد توجيه المستخدم مباشرة إلى رابط الأفلييت
    return res.redirect(apiUrl);

  } catch (err) {
    return res.status(500).json({
      error: "Failed to generate affiliate link",
      details: err.message,
    });
  }
}