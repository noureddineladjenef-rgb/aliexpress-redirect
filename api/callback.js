// api/callback.js
export default async function handler(req, res) {
    try {
        const { code } = req.query;
        
        if (!code) {
            return res.status(400).json({
                error: "Missing authorization code"
            });
        }

        res.status(200).send(`
            <html>
                <head>
                    <title>Authorization Successful</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        pre { background: #f4f4f4; padding: 10px; border-radius: 5px; }
                    </style>
                </head>
                <body>
                    <h2>✅ Authorization Successful</h2>
                    <p>Copy this code and paste it in your .env file:</p>
                    <pre>AUTH_CODE=${code}</pre>
                    <p>Or click below to get token automatically:</p>
                    <a href="/api/token?code=${code}">Get Access Token</a>
                </body>
            </html>
        `);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
}