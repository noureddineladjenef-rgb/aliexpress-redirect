export default async function handler(req, res) {
  const { code, state } = req.query;

  if (!code || !state) {
    return res.status(400).json({ error: 'Missing OAuth data' });
  }

  return res.status(200).json({
    message: "Callback received successfully!",
    code,
    state
  });
}