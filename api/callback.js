export default async function handler(req, res) {
  try {
    const code = req.query.code;

    if (!code) {
      return res.status(400).json({ error: "Missing code" });
    }

    res.status(200).send(`
      <h2>Authorization Successful</h2>
      <p>Copy this code and paste it in your .env file:</p>
      <pre>${code}</pre>
    `);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}