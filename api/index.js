import fetch from "node-fetch";

export default async function handler(req, res) {
  const { productId } = req.query;

  if (!productId) {
    return res.status(400).json({ error: "Missing productId" });
  }

  try {
    const response = await fetch(
      `https://api.aliexpress.com/product?appKey=${process.env.APP_KEY}&productId=${productId}`
    );
    const data = await response.json();

    res.status(200).json({
      success: true,
      redirectUrl: data.productUrl || null,
    });
  } catch (error) {
    res.status(500).json({
      error: "Server error",
      details: error.message,
    });
  }
}
