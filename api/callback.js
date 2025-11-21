export default async function handler(req, res) {
    try {
        const { code, error, error_description, state } = req.query;
        
        // تسجيل جميع المعلمات للتصحيح
        console.log('🔍 Callback Debug - All Query Parameters:', {
            code: code || 'MISSING',
            error: error || 'none',
            error_description: error_description || 'none', 
            state: state || 'none',
            all_params: req.query
        });

        // إذا كان هناك خطأ من AliExpress
        if (error) {
            return res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>فشل المصادقة</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 40px; background: #ffe6e6; text-align: center; }
                        .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
                        .error { color: #d00; background: #fdd; padding: 15px; border-radius: 5px; margin: 20px 0; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2>❌ فشل المصادقة من AliExpress</h2>
                        <div class="error">
                            <strong>الخطأ:</strong> ${error}<br>
                            <strong>الوصف:</strong> ${error_description || 'لا يوجد وصف'}
                        </div>
                        <h3>الحلول المقترحة:</h3>
                        <ol style="text-align: right; direction: rtl;">
                            <li>تأكد أن التطبيق في وضع "Online" في AliExpress</li>
                            <li>تحقق من صحة App Key و App Secret</li>
                            <li>تأكد من تطابق Redirect URI</li>
                            <li>جرب حساب AliExpress مختلف</li>
                        </ol>
                        <a href="/" style="display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px;">العودة للرئيسية</a>
                    </div>
                </body>
                </html>
            `);
        }

        // إذا لم يكن هناك كود
        if (!code) {
            return res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>لا يوجد كود مصادقة</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 40px; background: #fff3cd; text-align: center; }
                        .container { max-width: 700px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
                        .debug { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: left; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2>⚠️ لم يتم استلام كود المصادقة</h2>
                        <p>AliExpress لم يعد بكود المصادقة. هذه المعلمات المستلمة:</p>
                        
                        <div class="debug">
                            <strong>معلمات URL المستلمة:</strong>
                            <pre>${JSON.stringify(req.query, null, 2)}</pre>
                        </div>

                        <h3>🔧 أسباب محتملة:</h3>
                        <ol style="text-align: right; direction: rtl;">
                            <li><strong>التطبيق غير مفعل:</strong> تأكد من أن التطبيق في وضع "Online" في AliExpress</li>
                            <li><strong>Redirect URI غير صحيح:</strong> تحقق من إعدادات OAuth في AliExpress</li>
                            <li><strong>مشكلة في الحساب:</strong> جرب حساب AliExpress مختلف</li>
                            <li><strong>App Key/Secret خاطئ:</strong> تأكد من استخدام بيانات الإنتاج الصحيحة</li>
                        </ol>

                        <div style="margin-top: 30px;">
                            <a href="/api/redirect" style="padding: 10px 20px; background: #28a745; color: white; text-decoration: none; border-radius: 5px; margin: 10px;">إعادة المحاولة</a>
                            <a href="/" style="padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 10px;">الرئيسية</a>
                        </div>
                    </div>
                </body>
                </html>
            `);
        }

        // إذا كان هناك كود ناجح
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>