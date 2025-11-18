export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: "Missing url" });
    }

    const encoded = encodeURIComponent(url);

    const apiUrl = `https://api.aliexpress.com/sync?app_key=503368&tracking_id=default&target_url=${encoded}`;

    return res.redirect(apiUrl);

  } catch (e) {
    return res.status(500).json({ error: "Server error", details: e.message });
  }
}