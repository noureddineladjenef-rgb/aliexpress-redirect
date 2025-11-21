// server.js
import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// --- ROUTES ---
import redirectRoute from "./api/redirect.js";
import callbackRoute from "./api/callback.js";
import tokenRoute from "./api/token.js";
import verifyRoute from "./api/verify.js";

app.use("/api/redirect", redirectRoute);
app.use("/api/callback", callbackRoute);
app.use("/api/token", tokenRoute);
app.use("/api/verify", verifyRoute);

// Home route
app.get("/", (req, res) => {
    res.send(`
        <html>
            <head>
                <title>AliExpress OAuth</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; text-align: center; }
                    .btn { display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 10px; }
                </style>
            </head>
            <body>
                <h1>🚀 AliExpress OAuth Integration</h1>
                <p>Click below to start authorization process:</p>
                <a class="btn" href="/api/redirect">Start OAuth Flow</a>
                <br>
                <a class="btn" href="/api/token">Get Token (if you have code)</a>
            </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Home: http://localhost:${PORT}`);
    console.log(`🔗 OAuth Start: http://localhost:${PORT}/api/redirect`);
});