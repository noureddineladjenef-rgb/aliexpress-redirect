export default function handler(req, res) {
  const token = "OMiS6a8bKcWrUsu5Bsr34NooT9yYwB3q";
  const code = "503368";

  res.status(200).json({
    token: token,
    code: code,
    redirect_url: "https://aliexpress-redirect-v2.vercel.app/api/callback"
  });
}