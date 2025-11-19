export default async function handler(req, res) {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Missing code" });
  }

  return res.status(200).send(`
    <h2>Authorization Successful</h2>
    <p>Copy this code and paste it in your .env file:</p>
    <pre>${code}</pre>
  `);
}