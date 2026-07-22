import { useState } from "react";
import VideoModal from "../components/VideoModal.jsx";
import AiMentor   from "../components/AiMentor.jsx";

const T = {
  bg:"#050714", surface:"#0d1022", card:"#111425", border:"#1e2240",
  cyan:"#0DFFE0", violet:"#7B5EA7", red:"#FF4D6D", yellow:"#FFB547",
  green:"#10B981", text:"#e2e8f0", muted:"#64748b", dim:"#94a3b8",
};

function Spinner({ color = T.cyan }) {
  return <div style={{ width:16,height:16,border:`2px solid ${color}33`,borderTop:`2px solid ${color}`,borderRadius:"50%",animation:"spin .8s linear infinite" }}/>;
}

export default function RoadmapPage({ profile, roadmap, completed, quizScores, deptColor, syncing, onToggle, onQuizComplete, onOpenLab }) {
  const [activeVideo,  setActiveVideo]  = useState(null);
  const [activeMentor, setActiveMentor] = useState(null);
  const [browseMode,   setBrowseMode]   = useState(false);

  const allCourses     = roadmap?.stages?.flatMap(s => s.courses) || [];
  const completedList  = allCourses.filter(c => completed[c.id]);
  const pct            = allCourses.length ? Math.round((completedList.length / allCourses.length) * 100) : 0;

  return (
    <div style={{ animation:"slideUp .25s ease" }}>
      {activeVideo  && <VideoModal course={activeVideo} color={deptColor} onClose={() => setActiveVideo(null)} onOpenLab={(c) => { setActiveVideo(null); onOpenLab?.(c); }} />}
      {activeMentor && (
        <AiMentor
          profile={profile}
          course={activeMentor}
          completedCourses={completedList}
          onClose={() => setActiveMentor(null)}
          onQuizComplete={(courseId, score, total) => {
            onQuizComplete?.(courseId, score, total);
            setActiveMentor(null);
          }}
        />
      )}

      {/* Hero progress card */}
      <div style={{ background:`linear-gradient(135deg,${deptColor}18 0%,${T.card} 100%)`, border:`1px solid ${deptColor}33`, borderRadius:16, padding:"20px", marginBottom:20 }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16, flexWrap:"wrap" }}>
          <div>
            <div style={{ fontSize:11, color:deptColor, fontWeight:700, letterSpacing:".1em", marginBottom:6 }}>YOUR LEARNING PATH</div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:20, fontWeight:800, color:T.text, marginBottom:4 }}>{roadmap?.stages?.length} Stages · {allCourses.length} Lessons</div>
            <div style={{ color:T.muted, fontSize:13 }}>{completedList.length} completed · {allCourses.length - completedList.length} remaining</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:34, fontWeight:800, color:deptColor }}>{pct}%</div>
            {syncing && <div style={{ fontSize:11, color:T.muted, display:"flex", alignItems:"center", gap:4, justifyContent:"flex-end" }}><Spinner color={T.muted}/> syncing</div>}
          </div>
        </div>
        <div style={{ margin:"14px 0 0", background:T.bg, borderRadius:99, height:6, overflow:"hidden" }}>
          <div style={{ width:`${pct}%`, background:deptColor, height:"100%", borderRadius:99, transition:"width .5s" }}/>
        </div>
        <div style={{ marginTop:12, display:"flex", flexWrap:"wrap", gap:6 }}>
          {roadmap?.certPath?.map((c, i) => (
            <span key={c} style={{ display:"flex", alignItems:"center", gap:4 }}>
              <span style={{ background:`${deptColor}18`, color:deptColor, border:`1px solid ${deptColor}33`, borderRadius:6, padding:"2px 8px", fontSize:11, fontWeight:600 }}>🏅 {c}</span>
              {i < roadmap.certPath.length-1 && <span style={{ color:T.border, fontSize:10 }}>→</span>}
            </span>
          ))}
        </div>
      </div>

      {/* View toggle */}
      <div style={{ display:"flex", gap:4, background:T.card, padding:4, borderRadius:12, marginBottom:20, border:`1px solid ${T.border}`, width:"fit-content" }}>
        {[{key:false,label:"🗺️ Roadmap"},{key:true,label:"📚 All Lessons"}].map(m => (
          <button key={String(m.key)} onClick={() => setBrowseMode(m.key)} style={{ padding:"8px 16px", borderRadius:9, border:"none", background:browseMode===m.key?deptColor:"transparent", color:browseMode===m.key?T.bg:T.muted, fontWeight:700, fontSize:13, cursor:"pointer", transition:"all .2s" }}>{m.label}</button>
        ))}
      </div>

      {/* ── ROADMAP VIEW ── */}
      {!browseMode && roadmap?.stages?.map((stage, si) => (
        <div key={stage.level} style={{ marginBottom:36 }}>
          {/* Stage header */}
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
            <div style={{ width:30, height:30, borderRadius:"50%", background:`${stage.color}22`, border:`2px solid ${stage.color}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, color:stage.color, flexShrink:0 }}>{si+1}</div>
            <div style={{ height:2, flex:1, background:`linear-gradient(90deg,${stage.color}44,transparent)` }}/>
            <span style={{ background:`${stage.color}18`, color:stage.color, border:`1px solid ${stage.color}33`, borderRadius:8, padding:"4px 12px", fontSize:12, fontWeight:700 }}>{stage.level}</span>
          </div>

          {/* Courses */}
          <div style={{ marginLeft:15, borderLeft:`2px solid ${stage.color}22`, paddingLeft:24, display:"flex", flexDirection:"column", gap:12 }}>
            {stage.courses.map(course => {
              const done   = !!completed[course.id];
              const locked = si > 0 && !roadmap.stages[si-1].courses.every(c => completed[c.id]);
              const quiz   = quizScores?.[course.id];
              const quizPct = quiz ? Math.round((quiz.score / quiz.total) * 100) : null;

              return (
                <div key={course.id} style={{ position:"relative" }}>
                  {/* Spine dot */}
                  <div style={{ position:"absolute", left:-30, top:16, width:10, height:10, borderRadius:"50%", background:done?stage.color:T.border, boxShadow:done?`0 0 10px ${stage.color}80`:"none", transition:"all .3s" }}/>

                  <div style={{ background:T.surface, borderRadius:14, border:`1.5px solid ${done?stage.color+"55":T.border}`, padding:"14px 16px", opacity:locked?.4:1, transition:"all .2s" }}>
                    <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, fontWeight:700, color:done?stage.color:T.text, marginBottom:4, lineHeight:1.4 }}>{course.title}</div>
                        <div style={{ color:T.muted, fontSize:11, lineHeight:1.5, marginBottom:8 }}>{course.desc}</div>
                        <div style={{ display:"flex", gap:5, flexWrap:"wrap", alignItems:"center" }}>
                          <span style={{ background:`${stage.color}18`, color:stage.color, borderRadius:6, padding:"2px 7px", fontSize:10, fontWeight:600 }}>⏱ {course.duration}</span>
                          {course.lab && <span style={{ background:`${T.violet}18`, color:T.violet, borderRadius:6, padding:"2px 7px", fontSize:10, fontWeight:600 }}>🧪 Lab</span>}
                          {done && <span style={{ background:"#00C89722", color:"#00C897", borderRadius:6, padding:"2px 7px", fontSize:10, fontWeight:600 }}>✓ Done</span>}
                          {quizPct !== null && (
                            <span style={{ background:`${quizPct>=80?T.green:quizPct>=60?T.yellow:T.red}18`, color:quizPct>=80?T.green:quizPct>=60?T.yellow:T.red, borderRadius:6, padding:"2px 7px", fontSize:10, fontWeight:600 }}>📝 {quizPct}%</span>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div style={{ display:"flex", flexDirection:"column", gap:6, flexShrink:0 }}>
                        <button onClick={() => !locked && setActiveVideo(course)} disabled={locked} style={{ padding:"7px 12px", borderRadius:8, border:"none", background:locked?T.border:stage.color, color:locked?T.muted:T.bg, fontWeight:700, fontSize:11, cursor:locked?"not-allowed":"pointer", whiteSpace:"nowrap" }}>▶ Watch</button>
                        <button onClick={() => !locked && setActiveMentor(course)} disabled={locked} style={{ padding:"7px 12px", borderRadius:8, border:`1px solid ${locked?T.border:T.cyan+"66"}`, background:"transparent", color:locked?T.muted:T.cyan, fontWeight:700, fontSize:11, cursor:locked?"not-allowed":"pointer", whiteSpace:"nowrap" }}>🤖 Mentor</button>
                        {course.lab && <button onClick={() => {
                            if (locked) return;
                            if (course.labLink) { window.open(course.labLink, '_blank', 'noopener'); }
                            else { onOpenLab?.(course); }
                          }} disabled={locked} style={{ padding:"7px 12px", borderRadius:8, border:`1px solid ${T.violet}44`, background:`${T.violet}12`, color:T.violet, fontWeight:700, fontSize:11, cursor:locked?"not-allowed":"pointer", whiteSpace:"nowrap" }}>🧪 Lab</button>}
                        <button onClick={() => !locked && onToggle(course.id, !done)} disabled={locked} style={{ padding:"7px 12px", borderRadius:8, border:`1px solid ${done?stage.color+"66":T.border}`, background:done?`${stage.color}18`:"transparent", color:done?stage.color:T.muted, fontWeight:700, fontSize:11, cursor:locked?"not-allowed":"pointer", whiteSpace:"nowrap" }}>{done?"✓ Done":"Mark Done"}</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* ── BROWSE ALL VIEW ── */}
      {browseMode && (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {roadmap?.stages?.flatMap(stage => stage.courses.map(course => {
            const done    = !!completed[course.id];
            const quiz    = quizScores?.[course.id];
            const quizPct = quiz ? Math.round((quiz.score / quiz.total) * 100) : null;
            return (
              <div key={course.id} style={{ background:T.surface, borderRadius:12, border:`1.5px solid ${done?stage.color+"44":T.border}`, padding:"12px 14px", display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:34, height:34, borderRadius:9, background:`${stage.color}18`, border:`1px solid ${stage.color}33`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ fontSize:8, fontWeight:800, color:stage.color }}>{stage.level.slice(0,3).toUpperCase()}</span>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:T.text, marginBottom:3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{course.title}</div>
                  <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                    <span style={{ background:`${stage.color}18`, color:stage.color, borderRadius:5, padding:"1px 6px", fontSize:10, fontWeight:600 }}>{stage.level}</span>
                    <span style={{ color:T.dim, fontSize:10 }}>⏱ {course.duration}</span>
                    {quizPct !== null && <span style={{ color:quizPct>=80?T.green:T.yellow, fontSize:10, fontWeight:600 }}>📝 {quizPct}%</span>}
                    {done && <span style={{ color:T.green, fontSize:10, fontWeight:600 }}>✓</span>}
                  </div>
                </div>
                <div style={{ display:"flex", gap:5 }}>
                  <button onClick={() => setActiveVideo(course)} style={{ padding:"6px 10px", borderRadius:7, border:"none", background:stage.color, color:T.bg, fontWeight:700, fontSize:10, cursor:"pointer" }}>▶</button>
                  <button onClick={() => setActiveMentor(course)} style={{ padding:"6px 10px", borderRadius:7, border:`1px solid ${T.cyan}44`, background:"transparent", color:T.cyan, fontWeight:700, fontSize:10, cursor:"pointer" }}>🤖</button>
                  {course.lab && <button onClick={() => { if (course.labLink) { window.open(course.labLink, '_blank', 'noopener'); } else { onOpenLab?.(course); } }} style={{ padding:"6px 10px", borderRadius:7, border:`1px solid ${T.violet}44`, background:`${T.violet}12`, color:T.violet, fontWeight:700, fontSize:10, cursor:"pointer" }}>🧪</button>}
                  <button onClick={() => onToggle(course.id, !done)} style={{ padding:"6px 10px", borderRadius:7, border:`1px solid ${done?stage.color+"66":T.border}`, background:done?`${stage.color}18`:"transparent", color:done?stage.color:T.muted, fontWeight:700, fontSize:10, cursor:"pointer" }}>{done?"✓":"○"}</button>
                </div>
              </div>
            );
          }))}
        </div>
      )}
    </div>
  );
}
