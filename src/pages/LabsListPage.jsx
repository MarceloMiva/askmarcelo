import { useMemo } from 'react';
import { ROADMAPS } from '../data/roadmaps.js';

const T = {
  bg:'#050714', surface:'#0d1022', card:'#111425', border:'#1e2240',
  cyan:'#0DFFE0', violet:'#7B5EA7', red:'#FF4D6D', yellow:'#FFB547',
  green:'#10B981', text:'#e2e8f0', muted:'#64748b', dim:'#94a3b8',
};

export default function LabsListPage({ onClose }) {
  const all = useMemo(() => {
    return Object.values(ROADMAPS).flatMap(r => r.stages.flatMap(s => s.courses.map(c => ({ ...c, career: r }))) );
  }, []);

  const grouped = all.reduce((acc, c) => {
    const school = c.school || (c.id.startsWith('pt')||c.id.startsWith('soc')? 'Cybersecurity' : 'General');
    acc[school] = acc[school] || [];
    acc[school].push(c);
    return acc;
  }, {});

  return (
    <div style={{ padding:20 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
        <div style={{ fontSize:18, fontWeight:800, color:T.text }}>Labs Directory</div>
        <button onClick={onClose} style={{ background:'transparent', border:'none', color:T.muted }}>Close</button>
      </div>
      {Object.keys(grouped).map(school => (
        <div key={school} style={{ marginBottom:16 }}>
          <div style={{ fontSize:14, fontWeight:800, color:T.cyan, marginBottom:8 }}>{school}</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 }}>
            {grouped[school].map(c => (
              <div key={c.id} style={{ background:T.card, padding:12, borderRadius:8, border:`1px solid ${T.border}` }}>
                <div style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:6 }}>{c.title}</div>
                <div style={{ color:T.muted, fontSize:12, marginBottom:8 }}>{c.desc}</div>
                <div style={{ display:'flex', gap:8 }}>
                  {c.labLink ? <a href={c.labLink} target="_blank" rel="noreferrer" style={{ padding:'8px 10px', background:T.cyan, color:'#001', borderRadius:8, fontWeight:700, textDecoration:'none' }}>Open</a> : <button style={{ padding:'8px 10px', background:T.violet, color:'#fff', borderRadius:8, border:'none' }}>Open</button>}
                  <a href={`https://www.youtube.com/watch?v=${c.ytId}`} target="_blank" rel="noreferrer" style={{ padding:'8px 10px', borderRadius:8, background:'transparent', border:`1px solid ${T.border}`, color:T.muted, textDecoration:'none' }}>Watch</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
