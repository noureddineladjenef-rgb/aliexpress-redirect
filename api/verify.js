// api/verify.js
export default function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Missing code" });
  }

  return res.status(200).json({
    success: true,
    message: "Verification code received",
    code: code
  });
}