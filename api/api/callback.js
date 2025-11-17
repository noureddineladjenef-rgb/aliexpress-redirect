export default function handler(req, res) {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Missing authorization code" });
  }

  return res.status(200).json({
    success: true,
    message: "AliExpress Auth Callback Received",
    code,
    state
  });
}