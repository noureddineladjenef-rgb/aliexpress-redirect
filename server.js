app.get('/auth/debug', (req, res) => {
  const debugInfo = {
    app_key: process.env.ALI_APP_KEY,
    app_key_length: process.env.ALI_APP_KEY?.length,
    has_secret: !!process.env.ALI_APP_SECRET,
    redirect_uri: process.env.ALI_REDIRECT_URI,
    timestamp: new Date().toISOString()
  };
  
  res.json(debugInfo);
});