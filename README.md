# Pawgress 🐕

יומן אילוף לכלבים עם שני צדדים:

- **בעלי כלב** רושמים פיפי, קקי, טיולים, אוכל, אימונים ומשקל, ורואים ציר יומי ומפת שעות שבועית.
- **מאלפים** מקבלים קוד ייחודי, ורואים בזמן אמת את כל הלקוחות שנרשמו עם הקוד שלהם.

אתר סטטי (HTML + JS) על Firebase Auth ו־Firestore, בלי שלב build.

## הקמה

1. ב־Firebase Console: יוצרים פרויקט, מוסיפים Web app.
2. **Authentication** → Sign-in method → מפעילים **Email/Password**.
3. **Firestore Database** → יוצרים מסד נתונים, ובלשונית **Rules** מדביקים את התוכן של `firestore.rules` ומפרסמים.
4. מעתיקים את פרטי ה־config לקובץ `firebase-config.js`.
5. ב־Authentication → Settings → **Authorized domains** מוסיפים את הדומיין של Vercel (למשל `pawgress.vercel.app`).
6. ב־Vercel: Import Project מהריפו. Framework Preset: **Other**, בלי build command ובלי output directory.

## מבנה הנתונים

| נתיב | תוכן |
|---|---|
| `profiles/{uid}` | תפקיד, פרטי הכלב או העסק, `trainerId` ללקוח, `code` למאלף |
| `codes/{CODE}` | בעלות על קוד מאלף, נוצר בטרנזקציה כדי שכל קוד יהיה ייחודי |
| `logs/{uid}/days/{YYYY-MM-DD}` | כל הרשומות של הכלב באותו יום |
