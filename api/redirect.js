export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: "Missing url" });
    }

    const clientId = 503368;
    const trackingId = "default";

    const encodedUrl = encodeURIComponent(url);

    const finalUrl = `https://api.aliexpress.com/sync?app_key=${clientId}&tracking_id=${trackingId}&target_url=${encodedUrl}`;

    return res.redirect(finalUrl);

  } catch (e) {
    return res.status(500).json({ error: "Server error", details: e.message });
  }
}