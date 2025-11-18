export default async function handler(req, res) {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: "Missing code" });
    }

    return res.status(200).json({
      success: true,
      message: "Authorization successful",
      code,
    });

  } catch (e) {
    return res.status(500).json({ error: "Server error", details: e.message });
  }
}