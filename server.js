import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// استيراد الرواتب
import redirectRoute from "./api/redirect.js";
import callbackRoute from "./api/callback.js";
import tokenRoute from "./api/token.js";
import verifyRoute from "./api/verify.js";

app.use("/api/redirect", redirectRoute);
app.use("/api/callback", callbackRoute);
app.use("/api/token", tokenRoute);
app.use("/api/verify", verifyRoute);

// صفحة التحقق الأساسية
app.get("/api/verify", (req, res) => {
    const envInfo = {
        NODE_ENV: process.env.NODE_ENV || 'not set',
        PORT: process.env.PORT || 'not set',
        ALIEXPRESS_APP_KEY: process.env.ALIEXPRESS_APP_KEY ? '✅ SET' : '❌ MISSING',
        ALIEXPRESS_APP_SECRET: process.env.ALIEXPRESS_APP_SECRET ? '✅ SET' : '❌ MISSING',
        ALIEXPRESS_REDIRECT_URI: process.env.ALIEXPRESS_REDIRECT_URI || '❌ NOT SET'
    };

    res.json({
        status: "Server is running",
        environment: envInfo,
        timestamp: new Date().toISOString()
    });
});

// الصفحة الرئيسية
app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>AliExpress OAuth</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 40px; text-align: center; }
                .btn { display: inline-block; padding: 12px 24px; margin: 10px; 
                       background: #ff6a00; color: white; text-decoration: none; 
                       border-radius: 5px; font-weight: bold; }
            </style>
        </head>
        <body>
            <h1>🚀 AliExpress OAuth</h1>
            <p>Test the following endpoints:</p>
            <a class="btn" href="/api/redirect">Start OAuth</a>
            <a class="btn" href="/api/verify">Check Settings</a>
            <a class="btn" href="/api/token">Get Token</a>
        </body>
        </html>
    `);
});

// handle all other routes
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found",
        available_routes: [
            "/",
            "/api/redirect", 
            "/api/callback",
            "/api/token",
            "/api/verify"
        ]
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
});