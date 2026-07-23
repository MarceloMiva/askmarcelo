import { useRef, useState } from "react";

const T = {
  bg: "#050714",
  card: "#111425",
  border: "#1e2240",
  cyan: "#0DFFE0",
  violet: "#7B5EA7",
  text: "#e2e8f0",
  muted: "#64748b",
  dim: "#94a3b8",
};

export default function VideoModal({ course, color, onClose, onOpenLab }) {
  const iframeRef = useRef(null);
  const [showPlayOverlay, setShowPlayOverlay] = useState(true);
  const [muted, setMuted] = useState(true);
  const [playRequested, setPlayRequested] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const embedSrc = course?.ytId
    ? `https://www.youtube-nocookie.com/embed/${course.ytId}?rel=0&modestbranding=1&controls=1&playsinline=1&autoplay=${playRequested ? 1 : 0}&mute=${muted ? 1 : 0}`
    : "";

  return (
    <div style={{ position:"fixed", inset:0, background:"#000000CC", zIndex:900, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }} onClick={onClose}>
      <div style={{ background:T.card, borderRadius:16, overflow:"hidden", width:"100%", maxWidth:800, border:`1px solid ${color}33`, animation:"slideUp .2s ease" }} onClick={e => e.stopPropagation()}>
          <div style={{ padding:"14px 20px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ fontSize:14, fontWeight:700, color:T.text, flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{course.title}</div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <button onClick={(e)=>{ e.stopPropagation(); setMuted(m=>!m); setPlayRequested(true); }} style={{ background:"none", border:"none", color:T.muted, cursor:"pointer", fontSize:16, marginLeft:8, flexShrink:0 }}>{muted?"🔇":"🔊"}</button>
            <button onClick={onClose} style={{ background:"none", border:"none", color:T.muted, cursor:"pointer", fontSize:20, marginLeft:4, flexShrink:0 }}>✕</button>
          </div>
        </div>
        <div style={{ position:"relative", paddingBottom:"56.25%", background:"#000" }}>
          {embedSrc && !videoError ? (
            <iframe
              ref={iframeRef}
              key={`${course.ytId}-${playRequested}`}
              src={embedSrc}
              style={{ position:"absolute", inset:0, width:"100%", height:"100%", border:"none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              allowFullScreen
              title={course.title}
              onError={() => setVideoError(true)}
            />
          ) : (
            <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", padding:"24px", textAlign:"center", background:"#000", color:T.text }}>
              <div style={{ fontSize:42, marginBottom:10 }}>🎬</div>
              <div style={{ fontSize:16, fontWeight:700, marginBottom:6 }}>Video unavailable</div>
              <div style={{ fontSize:13, color:T.muted, marginBottom:14 }}>This lesson’s video could not be loaded from YouTube. You can still open it directly on YouTube.</div>
              <a href={`https://www.youtube.com/watch?v=${course.ytId}`} target="_blank" rel="noreferrer" style={{ padding:"8px 12px", borderRadius:8, background:T.cyan, color:T.bg, fontWeight:700, textDecoration:"none" }}>Open on YouTube</a>
            </div>
          )}
          {/* Play overlay for browsers that block autoplay with sound */}
          {showPlayOverlay && !videoError && (
            <div onClick={(e) => { e.stopPropagation(); setShowPlayOverlay(false); setMuted(false); setPlayRequested(true); setVideoError(false); }} style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
              <div style={{ width:84, height:84, borderRadius:999, background:"rgba(0,0,0,0.6)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:36, border:`4px solid ${color}33` }}>▶</div>
            </div>
          )}
        </div>
        <div style={{ padding:"14px 20px", display:"flex", alignItems:"center", gap:12 }}>
          <p style={{ color:T.dim, fontSize:13, lineHeight:1.5, flex:1 }}>{course.desc}</p>
          <div style={{ display:"flex", gap:8, alignItems:"center", flexShrink:0 }}>
            {course.lab && (
              <button onClick={(e) => { e.stopPropagation(); onClose?.(); onOpenLab?.(course); }} style={{ background:`${T.violet}12`, color:T.violet, border:`1px solid ${T.violet}44`, borderRadius:8, padding:"6px 10px", fontSize:12, fontWeight:700, cursor:"pointer" }} data-lab>
                🧪 Open Lab
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
