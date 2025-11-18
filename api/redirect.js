export default function handler(req, res) {
  const authUrl = `https://login.aliexpress.com/oauth2/authorize?response_type=code&force_auth=true&client_id=${process.env.APP_KEY}&redirect_uri=${process.env.REDIRECT_URI}`;
  res.redirect(authUrl);
}