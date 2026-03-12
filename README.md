# HRFA.MA — منصة الحرفيين المغاربة

<p align="center">
  <img src="https://img.shields.io/badge/status-active-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/language-HTML%20%7C%20CSS%20%7C%20JS-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/mobile-responsive-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/license-MIT-lightgrey?style=for-the-badge" />
</p>

> منصة رقمية متكاملة تربط الحرفيين المغاربة بالزبائن — بتصميم عصري واحترافي يعمل على جميع الأجهزة.

---

## 📸 لمحة عن المشروع

**HRFA.MA** هي منصة ويب مخصصة للسوق المغربي، تهدف إلى:
- ربط الحرفيين (كهربائيين، سباكين، نجارين...) بالزبائن القريبين منهم
- تمكين الحرفيين من إدارة حجوزاتهم، رسائلهم، وملفهم الشخصي
- توفير متجر إلكتروني للمعدات المهنية حصريًا للحرفيين

---

## 🗂️ هيكل الملفات

```
frontend/
│
├── index.html              ← الصفحة الرئيسية
├── artisans.html           ← قائمة الحرفيين والبحث
├── artisan-profile.html    ← ملف الحرفي العام
│
├── artisan-dashboard.html  ← لوحة تحكم الحرفي
├── client-dashboard.html   ← لوحة تحكم الزبون
│
├── shop.html               ← متجر المعدات (للحرفيين فقط)
├── product-detail.html     ← صفحة تفاصيل المنتج
│
├── login.html              ← تسجيل الدخول
├── register.html           ← إنشاء حساب جديد
│
├── contact.html            ← تواصل معنا
├── faq.html                ← الأسئلة الشائعة
├── privacy.html            ← سياسة الخصوصية
├── terms.html              ← شروط الاستخدام
│
├── styles.css              ← نظام التصميم الكامل
├── navbar.js               ← شريط التنقل الديناميكي
├── api.js                  ← طبقة الـ API (Mock)
└── logo.png.jpeg           ← الشعار
```

---

## ✨ المميزات الرئيسية

### 🏠 الصفحة الرئيسية
- Hero section مع بحث متقدم (خدمة + مدينة)
- قائمة الخدمات المتاحة مع أيقونات
- عرض أفضل الحرفيين
- قسم "كيف يعمل؟" و"لماذا HRFA.MA؟"
- Newsletter subscription

### 👷 لوحة تحكم الحرفي
- إحصائيات الأداء (نجوم، طلبات، أرباح)
- إدارة طلبات الحجز (قبول / رفض / إتمام)
- نظام رسائل داخلي (Chat)
- تعديل الملف الشخصي في الوقت الفعلي
- إعدادات الحساب والاشتراك

### 👤 لوحة تحكم الزبون
- نظرة عامة على الطلبات والنجوم
- سجل الحجوزات مع حالة كل طلب
- إمكانية إلغاء الطلبات وتقييم الحرفيين
- نظام رسائل مع الحرفيين

### 🛒 متجر المعدات
- **مقيّد للحرفيين المسجلين فقط**
- فلاتر متقدمة (فئة، ماركة، سعر)
- بحث لحظي في المنتجات
- صفحة تفاصيل لكل منتج
- نظام طلب عبر WhatsApp مع نموذج معلومات التوصيل

### 📱 تجربة الهاتف (Mobile UX)
- شريط تنقل سفلي (Bottom Navigation) كتطبيقات الهاتف
- Sidebar مع backdrop overlay
- Skeleton loading للمحتوى
- تصميم متجاوب 100% (mobile-first)
- دعم iPhone safe-area

---

## 🎨 نظام التصميم

| العنصر | القيمة |
|---|---|
| اللون الرئيسي | `#FF4500` (برتقالي HRFA) |
| الخط | `Tajawal` (Google Fonts) |
| الاتجاه | RTL (عربي) |
| الـ Icons | Remix Icon v2.5 |
| الـ Radius | `16px` / `12px` |

---

## 🔐 نظام المصادقة

المصادقة تعتمد على `localStorage`:

```javascript
// بيانات المستخدم المحفوظة
localStorage.setItem('hrfa_token', token);
localStorage.setItem('hrfa_user', JSON.stringify({
  id: 1,
  name: "أحمد العبدلاوي",
  role: "artisan",   // أو "client"
  phone: "0600000000",
  address: "الدار البيضاء"
}));
```

> الوصول للمتجر يتطلب `role === 'artisan'`

---

## 🚀 تشغيل المشروع

لا يحتاج المشروع أي تثبيت. يكفي فتح الملفات مباشرة في المتصفح، أو استخدام خادم محلي بسيط:

```bash
# باستخدام VS Code Live Server
# أو
npx serve .

# أو
python -m http.server 8080
```

ثم افتح: `http://localhost:8080`

---

## 📡 الـ API (Mock)

الملف `api.js` يحتوي على كلاس `APIClient` مع Mock data جاهزة:

```javascript
const api = new APIClient();

// جلب الحرفيين
await api.getArtisans({ category, city, q });

// جلب المعدات
await api.getTools({ category, brand, maxPrice, q });

// الحصول على منتج بـ ID
await api.getToolById(id);
```

---

## 📦 التقنيات المستخدمة

- **HTML5** — بنية الصفحات
- **CSS3** — تصميم متجاوب بدون Frameworks
- **Vanilla JavaScript** — منطق الواجهة بدون مكتبات خارجية
- **Remix Icons** — أيقونات احترافية
- **Google Fonts (Tajawal)** — خط عربي حديث
- **WhatsApp API** — نظام الطلبات والتواصل

---

## 🤝 المساهمة

1. Fork المستودع
2. أنشئ Branch جديد: `git checkout -b feature/my-feature`
3. Commit التغييرات: `git commit -m 'Add feature'`
4. Push: `git push origin feature/my-feature`
5. افتح Pull Request

---

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة **MIT**.

---

<p align="center">
  صنع بـ ❤️ من أجل الحرفي المغربي<br>
  <strong>HRFA.MA</strong> — حرفتك، رقمية
</p>
