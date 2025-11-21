import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// الصفحة الرئيسية
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>AliExpress OAuth - Fixed Version</title>
        <style>
            body { font-family: Arial, sans-serif; padding: 40px; text-align: center; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .btn { display: inline-block; padding: 12px 24px; margin: 10px; background: #ff6a00; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; }
            .info { background: #e7f3ff; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 AliExpress OAuth - الإصدار المصحح</h1>
            <div class="info">
                <strong>تم إصلاح المشكلات!</strong>
                <p>استخدم الروابط أدناه لبدء المصادقة</p>
            </div>
            <a class="btn" href="/auth/redirect">🎯 بدء عملية OAuth</a>
            <br>
            <a class="btn" href="/auth/verify">🔍 فحص الإعدادات</a>
        </div>
    </body>
    </html>
  `);
});

// فحص الإعدادات
app.get('/auth/verify', (req, res) => {
  const envCheck = {
    ALI_APP_KEY: process.env.ALI_APP_KEY ? '✅ موجود' : '❌ مفقود',
    ALI_APP_SECRET: process.env.ALI_APP_SECRET ? '✅ موجود' : '❌ مفقود', 
    ALI_REDIRECT_URI: process.env.ALI_REDIRECT_URI || '❌ غير معين',
    NODE_ENV: process.env.NODE_ENV || 'development'
  };

  res.json({
    status: 'عملية الفحص',
    environment: envCheck,
    instructions: {
      missing_credentials: 'اذهب إلى AliExpress Open Platform → My Apps → App Info',
      redirect_uri: `يجب أن يكون: ${process.env.ALI_REDIRECT_URI || 'https://your-app.onrender.com/auth/callback'}`
    }
  });
});

// إعادة التوجيه إلى AliExpress
app.get('/auth/redirect', (req, res) => {
  try {
    const { ALI_APP_KEY, ALI_REDIRECT_URI } = process.env;

    if (!ALI_APP_KEY || !ALI_REDIRECT_URI) {
      return res.status(500).json({
        error: 'إعدادات البيئة ناقصة',
        required: ['ALI_APP_KEY', 'ALI_REDIRECT_URI']
      });
    }

    const authUrl = new URL('https://oauth.aliexpress.com/authorize');
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('client_id', ALI_APP_KEY);
    authUrl.searchParams.append('redirect_uri', ALI_REDIRECT_URI);
    authUrl.searchParams.append('state', 'fixed_' + Date.now());
    authUrl.searchParams.append('scope', 'api1');
    authUrl.searchParams.append('view', 'web');

    console.log('🔗 إعادة التوجيه إلى:', authUrl.toString());
    res.redirect(authUrl.toString());

  } catch (error) {
    console.error('❌ خطأ في إعادة التوجيه:', error);
    res.status(500).json({ error: error.message });
  }
});

// استقبال الرد من AliExpress
app.get('/auth/callback', async (req, res) => {
  try {
    const { code, error, error_description } = req.query;

    console.log('📥 استقبال callback:', { code, error, error_description });

    if (error) {
      return res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>فشل المصادقة</title></head>
        <body style="font-family: Arial; padding: 40px; text-align: center;">
          <h2>❌ فشل المصادقة من AliExpress</h2>
          <p><strong>الخطأ:</strong> ${error}</p>
          <p><strong>الوصف:</strong> ${error_description || 'لا يوجد وصف'}</p>
          <a href="/" style="padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">العودة للرئيسية</a>
        </body>
        </html>
      `);
    }

    if (!code) {
      return res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>لا يوجد كود</title></head>
        <body style="font-family: Arial; padding: 40px; text-align: center;">
          <h2>⚠️ لم يتم استلام كود المصادقة</h2>
          <p>المعلمات المستلمة: ${JSON.stringify(req.query)}</p>
          <a href="/" style="padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">العودة للرئيسية</a>
        </body>
        </html>
      `);
    }

    // عرض الكود بنجاح
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>نجحت المصادقة!</title>
        <style>
          body { font-family: Arial; padding: 40px; text-align: center; background: #f0f8f0; }
          .code { background: #f4f4f4; padding: 15px; margin: 20px 0; border-radius: 5px; font-family: monospace; }
          .btn { display: inline-block; padding: 10px 20px; margin: 10px; background: #28a745; color: white; text-decoration: none; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h2>✅ نجحت المصادقة!</h2>
        <p>كود المصادقة:</p>
        <div class="code">${code}</div>
        <a class="btn" href="/auth/token?code=${code}">الحصول على Access Token</a>
        <a class="btn" href="/">الرئيسية</a>
      </body>
      </html>
    `);

  } catch (error) {
    console.error('❌ خطأ في callback:', error);
    res.status(500).send('خطأ في الخادم');
  }
});

// الحصول على Token
app.get('/auth/token', async (req, res) => {
  try {
    const code = req.query.code || process.env.AUTH_CODE;
    const { ALI_APP_KEY, ALI_APP_SECRET, ALI_REDIRECT_URI } = process.env;

    if (!code) {
      return res.status(400).json({ error: 'كود المصادقة مطلوب' });
    }

    const tokenUrl = 'https://api.aliexpress.com/rest/auth/token';
    
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: ALI_APP_KEY,
      client_secret: ALI_APP_SECRET,
      code: code,
      redirect_uri: ALI_REDIRECT_URI
    });

    console.log('🔄 طلب Token بالمعلمات:', { 
      client_id: ALI_APP_KEY?.substring(0, 8) + '...',
      code_length: code.length
    });

    const response = await axios.post(tokenUrl, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('❌ خطأ في الحصول على Token:', error.response?.data || error.message);
    
    res.status(500).json({
      error: 'فشل في الحصول على Token',
      details: error.response?.data || error.message
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 الخادم يعمل على المنفذ ${PORT}`);
  console.log(`📍 الرابط: http://localhost:${PORT}`);
});