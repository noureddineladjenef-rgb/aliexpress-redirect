export default async function handler(req, res) {
    try {
        const { code, state } = req.query;
        
        if (!code) {
            return res.status(400).json({
                error: "Missing authorization code"
            });
        }

        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Authorization Successful</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; text-align: center; background: #f0f8f0; }
                    .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                    .code { background: #f4f4f4; padding: 15px; border-radius: 5px; font-family: monospace; margin: 20px 0; }
                    .btn { display: inline-block; padding: 10px 20px; background: #28a745; color: white; text-decoration: none; border-radius: 5px; margin: 10px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>✅ Authorization Successful on Render</h2>
                    <p>Copy this authorization code:</p>
                    <div class="code">${code}</div>
                    <p>Use this code to get your access token:</p>
                    <a class="btn" href="/api/token?code=${code}">Get Access Token Automatically</a>
                    <br>
                    <a class="btn" href="/">Return to Home</a>
                </div>
            </body>
            </html>
        `);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
}