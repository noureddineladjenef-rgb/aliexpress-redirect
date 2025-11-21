export default async function handler(req, res) {
    try {
        const APP_KEY = process.env.ALIEXPRESS_APP_KEY;
        const REDIRECT_URI = process.env.ALIEXPRESS_REDIRECT_URI;

        if (!APP_KEY || !REDIRECT_URI) {
            return res.status(500).json({
                error: "Missing environment variables"
            });
        }

        const authUrl = `https://oauth.aliexpress.com/authorize?response_type=code&client_id=${APP_KEY}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=render_${Date.now()}&scope=api1&view=web`;
        
        console.log('Redirecting to AliExpress OAuth');
        return res.redirect(authUrl);
        
    } catch (err) {
        console.error('Redirect error:', err);
        return res.status(500).json({
            error: err.message
        });
    }
}