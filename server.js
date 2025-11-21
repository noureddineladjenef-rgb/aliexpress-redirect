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

// الصفحة الرئيسية
app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>AliExpress OAuth</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 40px; text-align: center; background: #f5f5f5; }
                .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                .btn { display: inline-block; padding: 12px 24px; margin: 10px; 
                       background: #ff6a00; color: white; text-decoration: none; 
                       border-radius: 5px; font-weight: bold; transition: background 0.3s; }
                .btn:hover { background: #e55a00; }
                .info { background: #e7f3ff; padding: 15px; border-radius: 5px; margin: 20px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🚀 AliExpress OAuth on Render</h1>
                <div class="info">
                    <strong>التطبيق يعمل على Render!</strong>
                    <p>استخدم الروابط أدناه لبدء عملية المصادقة</p>
                </div>
                <a class="btn" href="/api/redirect">بدء عملية OAuth</a>
                <br>
                <a class="btn" href="/api/token">الحصول على Token</a>
                <br>
                <a class="btn" href="/api/verify">فحص الإعدادات</a>
            </div>
        </body>
        </html>
    `);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
});