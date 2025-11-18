export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: "Missing url" });
    }

    // ترميز الرابط
    const encoded = encodeURIComponent(url);

    // رابط التحويل الرسمي الصحيح
    const apiUrl = `https://api.aliexpress.com/gateway/link/convert?app_key=503368&promotion_link_type=1&source=default&url=${encoded}`;

    // إعادة التوجيه
    return res.redirect(apiUrl);

  } catch (e) {
    return res.status(500).json({
      error: "Server error",
      details: e.message,
    });
  }
}