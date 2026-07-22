// ── Supabase client ─────────────────────────────────────────
// Replace URL and KEY with your values from supabase.com → Settings → API

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://ypuvvnbkaqpblcrabxdd.supabase.co";
export const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwdXZ2bmJrYXFwYmxjcmFieGRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1MDg2NDIsImV4cCI6MjA5ODA4NDY0Mn0.23MB2QZERRSkw5bcS6wJ-MsLo5LfovdawA9_CcArgew";

const h = (token) => ({
  "Content-Type": "application/json",
  "apikey": SUPABASE_KEY,
  ...(token ? { "Authorization": `Bearer ${token}` } : {}),
});

export const sb = {
  async signUp(email, password, meta = {}) {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/signup`, { method:"POST", headers:h(), body:JSON.stringify({ email, password, data:meta }) });
    return r.json();
  },
  async signIn(email, password) {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, { method:"POST", headers:h(), body:JSON.stringify({ email, password }) });
    return r.json();
  },
  async signOut(token) {
    await fetch(`${SUPABASE_URL}/auth/v1/logout`, { method:"POST", headers:h(token) });
  },
  async getUser(token) {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/user`, { headers:h(token) });
    return r.json();
  },
  async resetPassword(email) {
    await fetch(`${SUPABASE_URL}/auth/v1/recover`, { method:"POST", headers:h(), body:JSON.stringify({ email }) });
  },
  async upsertProfile(token, profile) {
    await fetch(`${SUPABASE_URL}/rest/v1/profiles`, { method:"POST", headers:{ ...h(token), "Prefer":"resolution=merge-duplicates" }, body:JSON.stringify(profile) });
  },
  async getProfile(token, userId) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/profiles?user_id=eq.${userId}&select=*`, { headers:h(token) });
    const data = await r.json();
    return Array.isArray(data) ? data[0] || null : null;
  },
  async upsertProgress(token, userId, careerId, courseId, done) {
    await fetch(`${SUPABASE_URL}/rest/v1/progress`, { method:"POST", headers:{ ...h(token), "Prefer":"resolution=merge-duplicates" }, body:JSON.stringify({ user_id:userId, career_id:careerId, course_id:courseId, done }) });
  },
  async getProgress(token, userId, careerId) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/progress?user_id=eq.${userId}&career_id=eq.${careerId}&select=*`, { headers:h(token) });
    const rows = await r.json();
    if (!Array.isArray(rows)) return {};
    return rows.reduce((acc, row) => ({ ...acc, [row.course_id]: row.done }), {});
  },
  async saveQuizScore(token, userId, courseId, score, total) {
    await fetch(`${SUPABASE_URL}/rest/v1/quiz_scores`, { method:"POST", headers:{ ...h(token), "Prefer":"resolution=merge-duplicates" }, body:JSON.stringify({ user_id:userId, course_id:courseId, score, total, taken_at: new Date().toISOString() }) });
  },
  async getQuizScores(token, userId) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/quiz_scores?user_id=eq.${userId}&select=*`, { headers:h(token) });
    const rows = await r.json();
    if (!Array.isArray(rows)) return {};
    return rows.reduce((acc, row) => ({ ...acc, [row.course_id]: { score:row.score, total:row.total } }), {});
  },
  async saveLabSubmission(token, userId, labId, payload) {
    // payload: { code?, output?, grade?, metadata? }
    await fetch(`${SUPABASE_URL}/rest/v1/lab_submissions`, { method:"POST", headers:{ ...h(token), "Prefer":"resolution=merge-duplicates" }, body:JSON.stringify({ user_id:userId, lab_id:labId, payload, submitted_at: new Date().toISOString() }) });
  },
  async getLabSubmissions(token, userId, labId) {
    try {
      const params = [];
      if (userId) params.push(`user_id=eq.${userId}`);
      if (labId) params.push(`lab_id=eq.${labId}`);
      params.push('select=*');
      const url = `${SUPABASE_URL}/rest/v1/lab_submissions?` + params.join('&');
      const r = await fetch(url, { headers:h(token) });
      const rows = await r.json();
      return Array.isArray(rows) ? rows : [];
    } catch (e) { return []; }
  },
};

// ── Session helpers ──────────────────────────────────────────
const SESSION_KEY = "askmarcelo_session_v1";
export const loadSession = () => { try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; } catch { return null; } };
export const saveSession = (s) => { try { if(s) localStorage.setItem(SESSION_KEY, JSON.stringify(s)); else localStorage.removeItem(SESSION_KEY); } catch {} };

const PROFILE_KEY = "askmarcelo_profile_v1";
export const loadProfile = () => { try { return JSON.parse(localStorage.getItem(PROFILE_KEY)); } catch { return null; } };
export const saveProfile = (p) => { try { if(p) localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); else localStorage.removeItem(PROFILE_KEY); } catch {} };
