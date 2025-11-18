export default function handler(req, res) {
  const { code } = req.query;

  // التحقق إذا كان الكود غير موجود
  if (!code) {
    return res.status(400).json({ error: "Missing code" });
  }

  // إذا استلم الكود بنجاح
  return res.status(200).json({
    success: true,
    message: "Callback received successfully",
    code: code
  });
}