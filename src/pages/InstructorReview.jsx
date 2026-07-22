import { useEffect, useState } from 'react';
import { sb, loadSession } from '../services/supabase.js';

const T = { bg:'#050714', surface:'#0d1022', card:'#111425', border:'#1e2240', cyan:'#0DFFE0', text:'#e2e8f0', muted:'#64748b' };

export default function InstructorReview() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const sess = loadSession();
      const token = sess?.access_token;
      try {
        const res = await sb.getLabSubmissions(token);
        setSubmissions(res || []);
      } catch (e) {
        setSubmissions([]);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div style={{ padding:20 }}>Loading submissions…</div>;

  return (
    <div style={{ padding:20 }}>
      <div style={{ fontSize:18, fontWeight:800, color:T.text, marginBottom:12 }}>Instructor — Lab Submissions</div>
      {submissions.length === 0 && <div style={{ color:T.muted }}>No submissions yet.</div>}
      {submissions.map(s => (
        <div key={s.id} style={{ background:T.card, padding:12, borderRadius:8, border:`1px solid ${T.border}`, marginBottom:10 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
            <div style={{ fontWeight:800, color:T.cyan }}>{s.user_id}</div>
            <div style={{ color:T.muted }}>{s.created_at}</div>
          </div>
          <div style={{ color:T.text, fontSize:13, marginBottom:8 }}>Lab: {s.lab_id}</div>
          <pre style={{ background:'#070815', padding:8, borderRadius:6, color:T.muted, overflow:'auto' }}>{JSON.stringify(s.payload, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}
