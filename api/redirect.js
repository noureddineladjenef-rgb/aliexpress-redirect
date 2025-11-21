// api/redirect.js
export default async function handler(req, res) {
    try {
        const REDIRECT_URI = process.env.ALIEXPRESS_REDIRECT_URI;
        const APP_KEY = process.env.ALIEXPRESS_APP_KEY;

        if (!REDIRECT_URI || !APP_KEY) {
            return res.status(500).json({
                error: "Missing environment variables: REDIRECT_URI or APP_KEY"
            });
        }

        const AUTH_URL = `https://oauth.aliexpress.com/authorize?response_type=code&client_id=${APP_KEY}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=1234&scope=api1`;
        
        return res.redirect(AUTH_URL);
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
}