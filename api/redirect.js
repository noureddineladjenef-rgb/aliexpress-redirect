export default function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing URL" });
  }

  const redirectUrl = `https://portals.aliexpress.com/linkgen__v3?aff_fcid=${process.env.ALI_AFFILIATE_ID}&aff_fsk=${process.env.ALI_APP_KEY}&dp=c2&url=${encodeURIComponent(url)}`;

  return res.redirect(redirectUrl);
}