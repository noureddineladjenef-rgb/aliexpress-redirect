// api/redirect.js
export default async function handler(req, res) {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: "Missing url" });
    }

    // --- إدخل معلوماتك هنا (أو استخدم متغيرات البيئة) ---
    const APP_KEY = "503368";
    const APP_SECRET = "OMIS6a8bKcWrUsu5Bsr34NooT9yYwB3q";
    const TRACKING_ID = "default"; // أو ما تريد

    // نشفّر الرابط للتمرير إلى API
    const encoded = encodeURIComponent(url);

    // هذا endpoint الذي استخدمته سابقاً — قد يختلف حسب توثيق AliExpress.
    // نحن نطلب الـ endpoint ثم نحاول استخراج رابط التحويل إن أعاد api JSON أو اتّبع إعادة التوجيه
    const apiUrl = `https://api.aliexpress.com/sync?app_key=${APP_KEY}&tracking_id=${TRACKING_ID}&target_url=${encoded}`;

    // نجرب جلب الـ apiUrl
    const response = await fetch(apiUrl, { redirect: "follow" });

    // إذا اتبعت fetch إعادة توجيه ووصلنا لصفحة نهائية، response.url سيكون مفيداً
    if (response.url && response.url !== apiUrl) {
      // ربما الـ API أعاد إعادة توجيه مباشرة إلى رابط أفليت
      return res.redirect(response.url);
    }

    // حاول نقرأ JSON (لو الـ API أعاد JSON يحتوي على رابط)
    let text;
    try {
      text = await response.text();
      const json = JSON.parse(text);
      // تحقق من حقول محتملة تحمل رابط التحويل
      const possible =
        json.redirectUrl ||
        json.redirect_url ||
        json.data?.redirectUrl ||
        json.data?.url ||
        json.url ||
        json.result?.url;

      if (possible) return res.redirect(possible);
    } catch (e) {
      // فشل تحويل النص إلى JSON -> سنتابع بالحل الاحتياطي
    }

    // كحل احتياطي: أعد توجيه المستخدم إلى رابط AliExpress الأصلي (أو إلى apiUrl)
    return res.redirect(url);
  } catch (e) {
    console.error("redirect error:", e);
    return res.status(500).json({ error: "Server error", details: e.message });
  }
}