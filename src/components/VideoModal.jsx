const T = {
  bg:"#050714", card:"#111425", border:"#1e2240",
  cyan:"#0DFFE0", violet:"#7B5EA7", text:"#e2e8f0", muted:"#64748b", dim:"#94a3b8",
};

export default function VideoModal({ course, color, onClose }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"#000000CC", zIndex:900, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }} onClick={onClose}>
      <div style={{ background:T.card, borderRadius:16, overflow:"hidden", width:"100%", maxWidth:800, border:`1px solid ${color}33`, animation:"slideUp .2s ease" }} onClick={e => e.stopPropagation()}>
        <div style={{ padding:"14px 20px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ fontSize:14, fontWeight:700, color:T.text, flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{course.title}</div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:T.muted, cursor:"pointer", fontSize:20, marginLeft:12, flexShrink:0 }}>✕</button>
        </div>
        <div style={{ position:"relative", paddingBottom:"56.25%", background:"#000" }}>
          <iframe
            key={course.ytId}
            src={`https://www.youtube.com/embed/${course.ytId}?autoplay=1&rel=0&modestbranding=1`}
            style={{ position:"absolute", inset:0, width:"100%", height:"100%", border:"none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title={course.title}
          />
        </div>
        <div style={{ padding:"14px 20px", display:"flex", alignItems:"center", gap:12 }}>
          <p style={{ color:T.dim, fontSize:13, lineHeight:1.5, flex:1 }}>{course.desc}</p>
          {course.lab && (
            <span style={{ background:`${T.violet}22`, color:T.violet, border:`1px solid ${T.violet}44`, borderRadius:8, padding:"4px 10px", fontSize:11, fontWeight:700, whiteSpace:"nowrap", flexShrink:0 }}>🧪 Lab</span>
          )}
        </div>
      </div>
    </div>
  );
}
