# AskMarcelo v2 — AI-Powered Career Learning Platform

Built for Miva Open University students.
**5 schools · 19 departments · 70+ career paths**

---

## What's new in v2

- ✅ **AI Mentor 2.0** — personalised greeting on every login, knows your progress
- ✅ **Quiz System** — 5 AI-generated questions per lesson, score tracking
- ✅ **CV Builder** — AI writes your CV section based on completed courses
- ✅ **Quick Actions** — Explain, ELI5, Example, Assignment, Interview Prep, Code Challenge
- ✅ **Dashboard** — live progress overview with AI greeting
- ✅ **Quiz scores** — saved to Supabase, shown on roadmap and profile
- ✅ **Streak tracking** — localStorage-based daily learning streak
- ✅ **Proper component structure** — src/components, src/pages, src/services, src/data

---

## Setup (3 steps)

### 1. Add your keys
Edit `src/services/supabase.js` lines 4-5:
```js
export const SUPABASE_URL = "https://ypuvvnbkaqpblcrabxdd.supabase.co";
export const SUPABASE_KEY = "your-anon-key";
```

### 2. Run the updated schema in Supabase
Supabase → SQL Editor → paste `supabase-schema.sql` → Run

### 3. Add Vercel environment variables
```
VITE_SUPABASE_URL = https://ypuvvnbkaqpblcrabxdd.supabase.co
VITE_SUPABASE_KEY = your-anon-key
ANTHROPIC_KEY     = sk-ant-your-key   ← server only, powers AI Mentor
```
Get Anthropic key free at: console.anthropic.com → API Keys

---

## Deploy

```bash
npm install
npm run dev        # test locally

git add .
git commit -m "AskMarcelo v2 - AI Mentor + Quiz System"
git push           # Vercel auto-redeploys
```

---

## Project structure

```
askmarcelo/
├── api/
│   └── tutor.js                  ← Anthropic proxy (fixes CORS)
├── src/
│   ├── components/
│   │   ├── AiMentor.jsx          ← Full AI Mentor with chat, quiz, CV builder
│   │   ├── Dashboard.jsx         ← Personalised dashboard with AI greeting
│   │   └── VideoModal.jsx        ← YouTube embed modal
│   ├── pages/
│   │   └── RoadmapPage.jsx       ← Learning path with quiz scores
│   ├── services/
│   │   ├── supabase.js           ← All Supabase calls
│   │   └── ai.js                 ← All Claude AI calls
│   ├── data/
│   │   ├── schools.js            ← Schools, departments, careers
│   │   └── roadmaps.js           ← All roadmaps with real YouTube IDs
│   ├── StudentApp.jsx            ← Main app shell
│   ├── AdminApp.jsx              ← Admin dashboard (PIN: 2580)
│   ├── LeaderboardPage.jsx       ← Leaderboard + badges + streaks
│   ├── App.jsx                   ← Router
│   └── main.jsx                  ← React entry
├── public/favicon.svg
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── supabase-schema.sql
└── .env.example
```

---

## URLs
| URL | Description |
|-----|-------------|
| `/` | Student app |
| `/#/admin` | Admin panel (PIN: 2580) |

Built by **MarceloMiva** · Powered by Claude AI
