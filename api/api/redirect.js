export default function handler(req, res) {
  const { product } = req.query;

  if (!product) {
    return res.status(400).json({ error: "Missing product ID" });
  }

  const finalUrl = `https://aliexpress.com/item/${product}.html`;

  return res.redirect(finalUrl);
}