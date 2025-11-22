app.get('/auth/redirect', (req, res) => {
  try {
    const { ALI_APP_KEY, ALI_REDIRECT_URI } = process.env;

    if (!ALI_APP_KEY || !ALI_REDIRECT_URI) {
      return res.status(500).json({
        error: 'إعدادات البيئة ناقصة',
        required: ['ALI_APP_KEY', 'ALI_REDIRECT_URI']
      });
    }

    // استخدام نطاقات مختلفة
    const authUrl = new URL('https://oauth.aliexpress.com/authorize');
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('client_id', ALI_APP_KEY);
    authUrl.searchParams.append('redirect_uri', ALI_REDIRECT_URI);
    authUrl.searchParams.append('state', 'scope_fix_' + Date.now());
    
    // جرب نطاقات مختلفة
    authUrl.searchParams.append('scope', 'api'); // بدلاً من api1
    authUrl.searchParams.append('view', 'web');

    console.log('🔗 إعادة التوجيه مع scope جديد:', authUrl.toString());
    res.redirect(authUrl.toString());

  } catch (error) {
    console.error('❌ خطأ في إعادة التوجيه:', error);
    res.status(500).json({ error: error.message });
  }
});