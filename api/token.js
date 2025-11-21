// api/token.js
import axios from "axios";

export default async function handler(req, res) {
    try {
        // نجلب الكود من query parameter أو من environment
        const code = req.query.code || process.env.AUTH_CODE;

        if (!code) {
            return res.status(400).json({
                error: "Authorization code not found! Provide ?code= parameter or set AUTH_CODE in environment"
            });
        }

        const url = "https://api.aliexpress.com/rest/auth/token";
        
        const params = new URLSearchParams({
            grant_type: "authorization_code",
            client_id: process.env.ALIEXPRESS_APP_KEY,
            client_secret: process.env.ALIEXPRESS_APP_SECRET,
            code: code,
            redirect_uri: process.env.ALIEXPRESS_REDIRECT_URI
        });

        const response = await axios.post(url, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        res.status(200).json({
            success: true,
            data: response.data
        });

    } catch (error) {
        console.error("Token error:", error.response?.data || error.message);
        
        res.status(500).json({
            error: "Failed to get access token",
            details: error.response?.data || error.message
        });
    }
}