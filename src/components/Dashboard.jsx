import { useState, useEffect } from "react";
import { getMentorGreeting } from "../services/ai.js";

const T = {
  bg:"#050714", surface:"#0d1022", card:"#111425", border:"#1e2240",
  cyan:"#0DFFE0", violet:"#7B5EA7", red:"#FF4D6D", yellow:"#FFB547",
  green:"#10B981", text:"#e2e8f0", muted:"#64748b", dim:"#94a3b8",
};

function ProgressArc({ pct, color = T.cyan, size = 72 }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform:"rotate(-90deg)", flexShrink:0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={T.border} strokeWidth={6}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={6}
        strokeDasharray={`${dash} ${circ-dash}`} strokeLinecap="round"
        style={{ filter:`drop-shadow(0 0 4px ${color})`, transition:"stroke-dasharray .6s ease" }}/>
    </svg>
  );
}

export default function Dashboard({ profile, roadmap, completed, quizScores, deptColor, onNavigate }) {
  const [greeting,      setGreeting]      = useState("");
  const [greetLoading,  setGreetLoading]  = useState(true);

  const allCourses  = roadmap?.stages?.flatMap(s => s.courses) || [];
  const doneCourses = allCourses.filter(c => completed[c.id]);
  const pct         = allCourses.length ? Math.round((doneCourses.length / allCourses.length) * 100) : 0;

  // Next course = first undone course
  const nextCourse  = allCourses.find(c => !completed[c.id]);
  // Last completed
  const lastDone    = [...allCourses].reverse().find(c => completed[c.id]);

  // Quiz stats
  const quizCount   = Object.keys(quizScores || {}).length;
  const avgScore    = quizCount > 0
    ? Math.round(Object.values(quizScores).reduce((a, q) => a + (q.score / q.total) * 100, 0) / quizCount)
    : 0;

  // Streak from localStorage
  const streak = (() => {
    try {
      const s = JSON.parse(localStorage.getItem("askmarcelo_streaks_v1") || "{}");
      return s[profile?.user_id || "guest"]?.streak || 0;
    } catch { return 0; }
  })();

  // Fetch AI greeting
  useEffect(() => {
    let cancelled = false;
    setGreetLoading(true);
    getMentorGreeting(profile, nextCourse, lastDone?.title, pct)
      .then(g => { if (!cancelled) { setGreeting(g); setGreetLoading(false); } })
      .catch(() => { if (!cancelled) {
        const firstName = profile?.name?.split(" ")[0] || "Student";
        const hour = new Date().getHours();
        const tod = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";
        setGreeting(`Good ${tod}, ${firstName}! ${nextCourse ? `Today's lesson: **${nextCourse.title}**. Ready?` : "You're doing great — keep it up!"}`);
        setGreetLoading(false);
      }});
    return () => { cancelled = true; };
  }, [profile?.user_id, nextCourse?.id]);

  function renderGreeting(text) {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong style='color:#0DFFE0'>$1</strong>").replace(/\n/g, "<br/>");
  }

  const hour = new Date().getHours();
  const emoji = hour < 6 ? "🌙" : hour < 12 ? "🌅" : hour < 17 ? "☀️" : hour < 21 ? "🌆" : "🌙";

  return (
    <div style={{ animation:"slideUp .25s ease" }}>

      {/* AI Greeting Card */}
      <div style={{ background:`linear-gradient(135deg, ${deptColor}18 0%, ${T.card} 100%)`, border:`1px solid ${deptColor}33`, borderRadius:20, padding:"20px", marginBottom:20, position:"relative", overflow:"hidden" }}>
        {/* Streak light */}
        <div style={{ position:"absolute", top:0, left:"-20%", width:"25%", height:"100%", background:"linear-gradient(90deg,transparent,rgba(255,255,255,.03),transparent)", pointerEvents:"none" }}/>

        <div style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
          <div style={{ width:44, height:44, borderRadius:12, background:`${deptColor}22`, border:`1px solid ${deptColor}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>🤖</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:11, color:deptColor, fontWeight:700, letterSpacing:".08em", marginBottom:6 }}>MARCELO AI MENTOR {emoji}</div>
            {greetLoading ? (
              <div style={{ display:"flex", gap:4 }}>
                {[0,1,2].map(i=><div key={i} style={{ width:6,height:6,borderRadius:"50%",background:deptColor,animation:`pulse 1.2s ease ${i*.2}s infinite` }}/>)}
              </div>
            ) : (
              <div style={{ fontSize:14, color:T.text, lineHeight:1.7 }} dangerouslySetInnerHTML={{ __html:renderGreeting(greeting) }}/>
            )}
          </div>
        </div>

        {nextCourse && !greetLoading && (
          <button onClick={() => onNavigate("roadmap")} style={{ width:"100%", marginTop:16, padding:"12px", borderRadius:12, border:"none", background:deptColor, color:T.bg, fontWeight:800, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            ▶ Continue — {nextCourse.title}
          </button>
        )}
      </div>

      {/* Stats row */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:10, marginBottom:20 }}>
        {[
          { icon:"📚", value:`${doneCourses.length}/${allCourses.length}`, label:"Courses",  color:deptColor  },
          { icon:"🔥", value:`${streak}d`,                                 label:"Streak",   color:T.yellow   },
          { icon:"📝", value:`${avgScore}%`,                               label:"Quiz Avg", color:T.violet   },
          { icon:"🏅", value:`${pct}%`,                                    label:"Progress", color:T.green    },
        ].map(s => (
          <div key={s.label} style={{ background:T.card, borderRadius:14, padding:"12px 8px", textAlign:"center", border:`1px solid ${T.border}` }}>
            <div style={{ fontSize:18, marginBottom:4 }}>{s.icon}</div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:15, fontWeight:800, color:s.color, marginBottom:2 }}>{s.value}</div>
            <div style={{ fontSize:10, color:T.muted }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Overall progress card */}
      <div style={{ background:T.card, borderRadius:16, padding:"20px", border:`1px solid ${T.border}`, marginBottom:20, display:"flex", alignItems:"center", gap:20 }}>
        <div style={{ position:"relative", flexShrink:0 }}>
          <ProgressArc pct={pct} color={deptColor} size={80}/>
          <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:17, fontWeight:800, color:deptColor }}>{pct}%</div>
          </div>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:16, fontWeight:700, color:T.text, marginBottom:6 }}>
            {pct === 0 && "Start your journey 🚀"}
            {pct > 0 && pct < 33  && "Building foundations 💪"}
            {pct >= 33 && pct < 66 && "Halfway there 🔥"}
            {pct >= 66 && pct < 100 && "Almost job-ready ⚡"}
            {pct === 100 && "Roadmap complete! 🎉"}
          </div>
          <div style={{ fontSize:12, color:T.muted, marginBottom:10 }}>{doneCourses.length} of {allCourses.length} lessons completed</div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {roadmap?.stages?.map(stage => {
              const stageDone  = stage.courses.filter(c => completed[c.id]).length;
              const stageTotal = stage.courses.length;
              const stagePct   = Math.round((stageDone / stageTotal) * 100);
              return (
                <div key={stage.level} style={{ display:"flex", alignItems:"center", gap:5 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:stagePct===100?stage.color:T.border }}/>
                  <span style={{ fontSize:11, color:stagePct===100?stage.color:T.muted, fontWeight:stagePct===100?700:400 }}>{stage.level} {stageDone}/{stageTotal}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quiz scores */}
      {quizCount > 0 && (
        <div style={{ background:T.card, borderRadius:16, padding:"18px 20px", border:`1px solid ${T.border}`, marginBottom:20 }}>
          <div style={{ fontSize:12, color:T.muted, fontWeight:700, letterSpacing:".06em", marginBottom:14 }}>📝 QUIZ PERFORMANCE</div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {Object.entries(quizScores).slice(0, 5).map(([courseId, qs]) => {
              const course = allCourses.find(c => c.id === courseId);
              const pctScore = Math.round((qs.score / qs.total) * 100);
              return (
                <div key={courseId} style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:12, fontWeight:600, color:T.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{course?.title || courseId}</div>
                    <div style={{ background:T.border, borderRadius:99, height:4, marginTop:4, overflow:"hidden" }}>
                      <div style={{ width:`${pctScore}%`, height:"100%", background:pctScore>=80?T.green:pctScore>=60?T.yellow:T.red, borderRadius:99 }}/>
                    </div>
                  </div>
                  <div style={{ fontSize:12, fontWeight:700, color:pctScore>=80?T.green:pctScore>=60?T.yellow:T.red, whiteSpace:"nowrap" }}>{qs.score}/{qs.total}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick nav */}
      <div style={{ fontSize:12, color:T.muted, fontWeight:700, letterSpacing:".06em", marginBottom:12 }}>QUICK ACCESS</div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        {[
          { icon:"🗺️", label:"Learning Path",  desc:"Your roadmap",      action:"roadmap",     color:deptColor },
          { icon:"🔭", label:"Explore",         desc:"All career paths",  action:"explore",     color:T.violet  },
          { icon:"🏆", label:"Leaderboard",     desc:"See your ranking",  action:"leaderboard", color:T.yellow  },
          { icon:"👤", label:"My Profile",      desc:"Stats & progress",  action:"profile",     color:T.green   },
        ].map(item => (
          <div key={item.action} onClick={() => onNavigate(item.action)} style={{ background:T.card, borderRadius:14, padding:"16px", border:`1px solid ${T.border}`, cursor:"pointer", transition:"border-color .2s", display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:38, height:38, borderRadius:10, background:`${item.color}18`, border:`1px solid ${item.color}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{item.icon}</div>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:T.text }}>{item.label}</div>
              <div style={{ fontSize:11, color:T.muted }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
