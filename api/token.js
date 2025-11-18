export default function handler(req, res) {
  return res.status(200).json({
    success: true,
    message: "AliExpress Redirect API is running correctly",
    redirect_url: "https://aliexpress-redirect-vercel.app/api/redirect"
  });
}