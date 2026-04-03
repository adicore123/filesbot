# BizBot — כותב תיאורי עסק בעברית

בוט שיחה שאוסף מידע מהמשתמש ומייצר תיאור עסק מקצועי בעברית.

## מבנה הפרויקט

```
bizbot/
├── api/
│   └── generate.js   ← Serverless Function (מפתח HF כאן, בצד שרת)
├── index.html         ← ממשק המשתמש
├── vercel.json        ← הגדרות Vercel
└── README.md
```

---

## העלאה ל-Vercel (צעד אחר צעד)

### 1. GitHub
- צור ריפו חדש ב-GitHub
- העלה את כל הקבצים לריפו

### 2. Vercel
- היכנס ל-[vercel.com](https://vercel.com) עם חשבון GitHub
- לחץ **Add New → Project**
- בחר את הריפו שיצרת
- לחץ **Deploy** (הגדרות ברירת מחדל בסדר)

### 3. Environment Variable (המפתח)
- בדשבורד של הפרויקט ← **Settings → Environment Variables**
- הוסף:
  - **Name:** `HF_API_KEY`
  - **Value:** המפתח שלך `hf_...`
- לחץ **Save**
- חזור ל-**Deployments** ולחץ **Redeploy**

### 4. סיום
הבוט עולה חי על דומיין `https://your-project.vercel.app`

---

## טכנולוגיות
- **Frontend:** HTML + CSS + Vanilla JS
- **Backend:** Vercel Serverless Functions (Node.js)
- **AI:** Mistral-7B-Instruct-v0.3 via HuggingFace Inference API
