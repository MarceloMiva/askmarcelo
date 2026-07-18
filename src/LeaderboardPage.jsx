import { useState, useEffect } from "react";

const T = {
  bg:"#050714", surface:"#0d1022", card:"#111425", border:"#1e2240",
  cyan:"#0DFFE0", violet:"#7B5EA7", red:"#FF4D6D", yellow:"#FFB547",
  green:"#10B981", text:"#e2e8f0", muted:"#64748b", dim:"#94a3b8",
  gold:"#FFD700", silver:"#C0C0C0", bronze:"#CD7F32",
};

const SCHOOLS = {
  "School of Computing & IT":{icon:"💻",color:"#6C63FF",short:"SCIT",departments:{
    "Computer Science":{color:"#6C63FF",icon:"💻",degree:"BSc.",careers:[
      {id:"fullstack_cs",title:"Full-Stack Web Developer"},{id:"mobile_dev",title:"Mobile App Developer"},
      {id:"devops",title:"DevOps / Cloud Engineer"},{id:"game_dev",title:"Game Developer"},
      {id:"blockchain",title:"Blockchain Developer"},{id:"sysarch",title:"Systems Architect"},
    ]},
    "Cybersecurity":{color:"#0DFFE0",icon:"🔐",degree:"BSc.",careers:[
      {id:"pentest",title:"Penetration Tester"},{id:"soc_analyst",title:"SOC Analyst"},
      {id:"dfir",title:"DFIR Specialist"},{id:"malware_an",title:"Malware Analyst"},
      {id:"cloud_sec",title:"Cloud Security Architect"},{id:"red_team",title:"Red Team Operator"},
      {id:"grc",title:"GRC Analyst"},{id:"threat_intel",title:"Threat Intelligence Analyst"},
    ]},
    "Data Science":{color:"#FF6B6B",icon:"📊",degree:"BSc.",careers:[
      {id:"data_analyst",title:"Data Analyst"},{id:"data_sci",title:"Data Scientist"},
      {id:"data_eng",title:"Data Engineer"},{id:"bi_analyst",title:"BI Analyst"},
      {id:"ml_eng",title:"Machine Learning Engineer"},{id:"data_viz",title:"Data Viz Engineer"},
    ]},
    "Software Engineering":{color:"#FFB547",icon:"⚙️",degree:"BSc.",careers:[
      {id:"backend_eng",title:"Backend Engineer"},{id:"frontend_eng",title:"Frontend Engineer"},
      {id:"qa_eng",title:"QA / Test Engineer"},{id:"sre",title:"Site Reliability Engineer"},
      {id:"embedded",title:"Embedded Systems Engineer"},{id:"tech_pm",title:"Technical Product Manager"},
    ]},
    "Information Technology":{color:"#4ECDC4",icon:"🖧",degree:"BSc.",careers:[
      {id:"sysadmin",title:"Systems Administrator"},{id:"net_eng",title:"Network Engineer"},
      {id:"cloud_admin",title:"Cloud Administrator"},{id:"dba",title:"Database Administrator"},
      {id:"it_sec",title:"IT Security Analyst"},{id:"it_pm",title:"IT Project Manager"},
    ]},
    "Artificial Intelligence":{color:"#A855F7",icon:"🧠",degree:"BSc.",careers:[
      {id:"ai_eng",title:"AI Engineer"},{id:"nlp_eng",title:"NLP Engineer"},
      {id:"cv_eng",title:"Computer Vision Engineer"},{id:"llm_eng",title:"LLM / GenAI Engineer"},
      {id:"mlops",title:"MLOps Engineer"},{id:"ai_res",title:"AI Research Scientist"},
      {id:"robotics",title:"Robotics Engineer"},
    ]},
  }},
  "School of Management & Social Sciences":{icon:"🏛️",color:"#F59E0B",short:"SMSS",departments:{
    "Business Management":{color:"#F59E0B",icon:"📊",degree:"BSc.",careers:[
      {id:"brand_mgr",title:"Brand Manager"},{id:"ops_mgr",title:"Operations Manager"},
      {id:"hr_mgr",title:"HR Manager"},{id:"mktg_mgr",title:"Marketing Manager"},
      {id:"biz_analyst",title:"Business Analyst"},
    ]},
    "Economics":{color:"#10B981",icon:"📉",degree:"BSc.",careers:[
      {id:"economist",title:"Economist"},{id:"policy_analyst",title:"Policy Analyst"},
      {id:"fin_economist",title:"Financial Economist"},{id:"dev_economist",title:"Development Economist"},
    ]},
    "Accounting":{color:"#3B82F6",icon:"🧾",degree:"BSc.",careers:[
      {id:"auditor",title:"Auditor"},{id:"tax_consultant",title:"Tax Consultant"},
      {id:"forensic_acc",title:"Forensic Accountant"},
    ]},
    "Entrepreneurship":{color:"#EF4444",icon:"🚀",degree:"BSc.",careers:[
      {id:"startup_founder",title:"Startup Founder"},{id:"vc_analyst",title:"VC Analyst"},
      {id:"biz_dev",title:"Business Development Manager"},{id:"product_mgr",title:"Product Manager"},
    ]},
    "Public Policy & Administration":{color:"#8B5CF6",icon:"🏛️",degree:"BSc.",careers:[
      {id:"civil_servant",title:"Civil Servant"},{id:"govt_policy",title:"Policy Analyst"},
      {id:"ngo_pm",title:"NGO Programme Manager"},
    ]},
    "Criminology & Security Studies":{color:"#DC2626",icon:"🔐",degree:"BSc.",careers:[
      {id:"crime_analyst",title:"Crime Analyst"},{id:"security_con",title:"Security Consultant"},
      {id:"counter_intel",title:"Counter-Intelligence Officer"},
    ]},
  }},
  "School of Communications & Media":{icon:"📡",color:"#EC4899",short:"SCM",departments:{
    "Mass Communication & Media Studies":{color:"#EC4899",icon:"📡",degree:"BSc.",careers:[
      {id:"journalist",title:"Journalist"},{id:"pr_specialist",title:"PR Specialist"},
      {id:"content_creator",title:"Content Creator"},{id:"broadcast_prod",title:"Broadcast Producer"},
      {id:"social_media_mgr",title:"Social Media Manager"},{id:"advert_strat",title:"Advertising Strategist"},
    ]},
  }},
  "School of Allied Health Sciences":{icon:"🏥",color:"#06B6D4",short:"SAHS",departments:{
    "Public Health":{color:"#06B6D4",icon:"🏥",degree:"BSc.",careers:[
      {id:"epidemiologist",title:"Epidemiologist"},{id:"health_promo",title:"Health Promotion Officer"},
      {id:"pub_health_analyst",title:"Public Health Analyst"},{id:"global_health",title:"Global Health Consultant"},
    ]},
    "Nursing Science":{color:"#F472B6",icon:"🩺",degree:"BSc.",careers:[
      {id:"clinical_nurse",title:"Clinical Nurse"},{id:"nurse_educator",title:"Nurse Educator"},
      {id:"icu_nurse",title:"ICU Nurse"},{id:"nurse_mgr",title:"Nurse Manager"},
    ]},
    "Community Health Science":{color:"#34D399",icon:"🤝",degree:"B.CHS.",careers:[
      {id:"comm_health_wkr",title:"Community Health Worker"},{id:"health_educator",title:"Health Educator"},
      {id:"outreach_coord",title:"Outreach Coordinator"},
    ]},
    "Environmental Health Science":{color:"#86EFAC",icon:"🌿",degree:"B.EHS.",careers:[
      {id:"env_health_spec",title:"Environmental Health Specialist"},{id:"occ_health",title:"Occupational Health Specialist"},
      {id:"food_safety",title:"Food Safety Inspector"},
    ]},
  }},
  "School of Education":{icon:"🎓",color:"#F97316",short:"SOE",departments:{
    "Primary Education":{color:"#F97316",icon:"📖",degree:"B.Ed.",careers:[
      {id:"primary_teacher",title:"Primary School Teacher"},{id:"curriculum_dev",title:"Curriculum Developer"},
      {id:"school_admin",title:"School Administrator"},{id:"edu_consultant",title:"Education Consultant"},
    ]},
    "Early Childhood Education":{color:"#FCD34D",icon:"🧒",degree:"B.Ed.",careers:[
      {id:"nursery_teacher",title:"Nursery Teacher"},{id:"child_dev_spec",title:"Child Development Specialist"},
      {id:"family_support",title:"Family Support Worker"},
    ]},
  }},
};

function buildCareerMap() {
  const map = {};
  for (const sd of Object.values(SCHOOLS))
    for (const [deptName, dd] of Object.entries(sd.departments))
      for (const c of dd.careers)
        map[c.id] = { ...c, dept:deptName, deptColor:dd.color, deptIcon:dd.icon };
  return map;
}
const CAREER_MAP = buildCareerMap();

// ── Streak logic ─────────────────────────────────────────
const STREAK_KEY = "askmarcelo_streaks_v1";
function loadStreaks() { try { return JSON.parse(localStorage.getItem(STREAK_KEY)) || {}; } catch { return {}; } }
function saveStreaks(s) { try { localStorage.setItem(STREAK_KEY, JSON.stringify(s)); } catch {} }
function todayStr() { return new Date().toISOString().slice(0,10); }
function yesterdayStr() { const d=new Date(); d.setDate(d.getDate()-1); return d.toISOString().slice(0,10); }

export function recordActivity(userId) {
  const streaks = loadStreaks();
  const user    = streaks[userId] || { streak:0, lastDate:"", best:0, totalDays:0, log:[] };
  const td      = todayStr();
  if (user.lastDate === td) return user;
  const newStreak = user.lastDate === yesterdayStr() ? user.streak+1 : 1;
  const updated   = { streak:newStreak, lastDate:td, best:Math.max(user.best||0,newStreak), totalDays:(user.totalDays||0)+1, log:[...(user.log||[]).slice(-60),td] };
  streaks[userId] = updated;
  saveStreaks(streaks);
  return updated;
}

export function getStreak(userId) {
  const streaks = loadStreaks();
  const user    = streaks[userId];
  if (!user) return { streak:0, best:0, totalDays:0, log:[], lastDate:"" };
  const active = user.lastDate===todayStr() || user.lastDate===yesterdayStr();
  return { ...user, streak: active ? user.streak : 0 };
}

// ── Mock leaderboard data ─────────────────────────────────
const NIGERIAN_NAMES = [
  "Adebayo Okafor","Chidinma Eze","Emeka Nwachukwu","Fatima Abdullahi",
  "Gbenga Adeleke","Halima Musa","Ibrahim Yusuf","Joke Adeyemi",
  "Kemi Balogun","Lanre Omotosho","Maryam Sule","Nnamdi Obi",
  "Oluwaseun Akinwale","Precious Enwere","Rashida Garba","Sola Fashola",
  "Tunde Bakare","Uche Obiora","Vivian Okonkwo","Yemi Oduola",
];

function seededRand(seed) {
  let s = seed;
  return () => { s=(s*16807+0)%2147483647; return (s-1)/2147483646; };
}

function generateLeaderboard(careerId, count=20) {
  const rand         = seededRand(careerId.split("").reduce((a,c)=>a+c.charCodeAt(0),0));
  const totalCourses = 7+Math.floor(rand()*5);
  return NIGERIAN_NAMES.slice(0,count).map((name,i)=>{
    const completed = Math.max(1,Math.round((1-i*0.04)*totalCourses*(0.7+rand()*0.3)));
    const streak    = Math.max(0,Math.round((1-i*0.05)*(3+rand()*14)));
    const pct       = Math.round((completed/totalCourses)*100);
    const levels    = ["100L","200L","300L","400L"];
    return { rank:i+1, name, initials:name.split(" ").map(w=>w[0]).join(""), completed, total:totalCourses, pct, streak, days:Math.round(2+rand()*28), level:levels[Math.floor(rand()*4)] };
  }).sort((a,b)=>b.completed-a.completed||b.streak-a.streak).map((e,i)=>({...e,rank:i+1}));
}

// ── Components ────────────────────────────────────────────
function Spinner({ color=T.cyan }) {
  return <div style={{ width:18,height:18,border:`2px solid ${color}33`,borderTop:`2px solid ${color}`,borderRadius:"50%",animation:"spin 0.8s linear infinite" }}/>;
}

function RankBadge({ rank }) {
  if (rank===1) return <div style={{ fontSize:22 }}>🥇</div>;
  if (rank===2) return <div style={{ fontSize:22 }}>🥈</div>;
  if (rank===3) return <div style={{ fontSize:22 }}>🥉</div>;
  return <div style={{ width:28,height:28,borderRadius:"50%",background:T.surface,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:T.muted }}>#{rank}</div>;
}

function Avatar({ initials, color, size=36 }) {
  return (
    <div style={{ width:size,height:size,borderRadius:"50%",background:`${color}22`,border:`1.5px solid ${color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Space Grotesk',sans-serif",fontSize:size*0.35,fontWeight:800,color,flexShrink:0 }}>
      {initials}
    </div>
  );
}

function MiniBar({ value, color }) {
  return (
    <div style={{ background:T.border,borderRadius:99,height:4,width:64,overflow:"hidden" }}>
      <div style={{ width:`${value}%`,background:color,height:"100%",borderRadius:99 }}/>
    </div>
  );
}

function StreakFlame({ streak }) {
  const color = streak>=7?T.red:streak>=3?T.yellow:T.muted;
  return (
    <div style={{ display:"flex",alignItems:"center",gap:4 }}>
      <span style={{ fontSize:14 }}>{streak>=7?"🔥":streak>=3?"⚡":"💧"}</span>
      <span style={{ fontSize:12,fontWeight:700,color }}>{streak}d</span>
    </div>
  );
}

function HeatMap({ log=[] }) {
  const days = 35;
  const td   = todayStr();
  const cells = Array.from({ length:days },(_,i)=>{
    const d = new Date(); d.setDate(d.getDate()-(days-1-i));
    const key = d.toISOString().slice(0,10);
    return { key, active:log.includes(key), isToday:key===td };
  });
  return (
    <div style={{ display:"flex",gap:3,flexWrap:"wrap" }}>
      {cells.map(c=>(
        <div key={c.key} title={c.key} style={{ width:10,height:10,borderRadius:2,background:c.active?T.cyan:T.border,opacity:c.isToday?1:c.active?0.8:0.3,border:c.isToday?`1px solid ${T.cyan}`:undefined }}/>
      ))}
    </div>
  );
}

function MyStatsCard({ profile, completed, total, color, streakData }) {
  const pct    = total ? Math.round((completed/total)*100) : 0;
  const career = CAREER_MAP[profile?.career];
  return (
    <div style={{ background:`linear-gradient(135deg,${color}18 0%,${T.card} 100%)`,border:`1px solid ${color}33`,borderRadius:16,padding:"20px",marginBottom:24 }}>
      <div style={{ fontSize:11,color,fontWeight:700,letterSpacing:".1em",marginBottom:10 }}>YOUR STANDING</div>
      <div style={{ display:"flex",alignItems:"center",gap:16,flexWrap:"wrap" }}>
        <Avatar initials={(profile?.name||"?").split(" ").map(w=>w[0]).join("")} color={color} size={52}/>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:18,fontWeight:800,color:T.text,marginBottom:2 }}>{profile?.name||"You"}</div>
          <div style={{ fontSize:12,color:T.muted,marginBottom:8 }}>{career?.title||"—"} · {profile?.level}L</div>
          <div style={{ display:"flex",gap:16,flexWrap:"wrap" }}>
            {[{val:`${pct}%`,label:"Progress",color},{val:streakData.streak,label:"Streak",color:T.yellow},{val:streakData.best,label:"Best",color:T.green},{val:streakData.totalDays,label:"Days",color:T.violet}].map(s=>(
              <div key={s.label} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:22,fontWeight:800,color:s.color }}>{s.val}</div>
                <div style={{ fontSize:10,color:T.muted }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginTop:16 }}>
        <div style={{ fontSize:11,color:T.muted,marginBottom:8 }}>Activity — last 35 days</div>
        <HeatMap log={streakData.log||[]}/>
      </div>
      <div style={{ marginTop:14 }}>
        <div style={{ display:"flex",justifyContent:"space-between",marginBottom:6 }}>
          <span style={{ fontSize:11,color:T.muted }}>Course completion</span>
          <span style={{ fontSize:11,fontWeight:700,color }}>{completed}/{total} courses</span>
        </div>
        <div style={{ background:T.bg,borderRadius:99,height:6,overflow:"hidden" }}>
          <div style={{ width:`${pct}%`,background:color,height:"100%",borderRadius:99,transition:"width .5s" }}/>
        </div>
      </div>
    </div>
  );
}

function LeaderboardTable({ entries, color, myName }) {
  const [sort, setSort] = useState("completed");
  const sorted = [...entries].sort((a,b)=>{
    if (sort==="streak") return b.streak-a.streak||b.completed-a.completed;
    if (sort==="days")   return b.days-a.days||b.completed-a.completed;
    return b.completed-a.completed||b.streak-a.streak;
  }).map((e,i)=>({...e,rank:i+1}));

  const top3 = sorted.slice(0,3);
  const rest = sorted.slice(3);

  return (
    <div>
      {/* Sort tabs */}
      <div style={{ display:"flex",gap:4,background:T.card,padding:4,borderRadius:12,marginBottom:20,border:`1px solid ${T.border}`,width:"fit-content" }}>
        {[["completed","🎬 Courses"],["streak","🔥 Streak"],["days","📅 Days"]].map(([key,label])=>(
          <button key={key} onClick={()=>setSort(key)} style={{ padding:"7px 14px",borderRadius:9,border:"none",background:sort===key?color:"transparent",color:sort===key?T.bg:T.muted,fontWeight:700,fontSize:12,cursor:"pointer",transition:"all .2s" }}>{label}</button>
        ))}
      </div>

      {/* Podium */}
      <div style={{ display:"flex",alignItems:"flex-end",justifyContent:"center",gap:12,marginBottom:28,padding:"0 8px" }}>
        {[top3[1]&&{...top3[1],rankColor:T.silver,medal:"🥈",h:120},top3[0]&&{...top3[0],rankColor:T.gold,medal:"🥇",h:150,crown:true},top3[2]&&{...top3[2],rankColor:T.bronze,medal:"🥉",h:100}].filter(Boolean).map((e,i)=>(
          <div key={e.id||i} style={{ flex:1,textAlign:"center" }}>
            {e.crown && <div style={{ fontSize:20,marginBottom:4 }}>👑</div>}
            <Avatar initials={e.initials} color={e.rankColor} size={e.crown?56:44}/>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:e.crown?14:13,fontWeight:e.crown?800:700,color:T.text,marginTop:8,marginBottom:4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{e.name.split(" ")[0]}</div>
            <div style={{ background:`${e.rankColor}22`,border:`1px solid ${e.rankColor}44`,borderRadius:10,padding:`${e.crown?14:10}px 4px`,marginTop:4 }}>
              <div style={{ fontSize:e.crown?20:18 }}>{e.medal}</div>
              <div style={{ fontSize:e.crown?13:12,fontWeight:700,color:e.rankColor,marginTop:4 }}>{e.completed} done</div>
              <StreakFlame streak={e.streak}/>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background:T.card,borderRadius:14,border:`1px solid ${T.border}`,overflow:"hidden" }}>
        <div style={{ display:"grid",gridTemplateColumns:"40px 1fr 80px 70px 60px",padding:"10px 16px",borderBottom:`1px solid ${T.border}`,background:T.surface }}>
          {["#","Student","Courses","Streak","Level"].map(h=><div key={h} style={{ fontSize:10,fontWeight:700,color:T.muted,letterSpacing:".06em" }}>{h}</div>)}
        </div>
        {rest.map(entry=>{
          const isMe = myName && entry.name===myName;
          return (
            <div key={entry.rank} style={{ display:"grid",gridTemplateColumns:"40px 1fr 80px 70px 60px",padding:"12px 16px",borderBottom:`1px solid ${T.border}`,background:isMe?`${color}0a`:"transparent" }}>
              <div style={{ display:"flex",alignItems:"center" }}><RankBadge rank={entry.rank}/></div>
              <div style={{ display:"flex",alignItems:"center",gap:10,minWidth:0 }}>
                <Avatar initials={entry.initials} color={isMe?color:T.muted} size={32}/>
                <div style={{ minWidth:0 }}>
                  <div style={{ fontSize:13,fontWeight:isMe?700:500,color:isMe?color:T.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{entry.name}{isMe?" (You)":""}</div>
                  <MiniBar value={entry.pct} color={isMe?color:T.muted}/>
                </div>
              </div>
              <div style={{ display:"flex",alignItems:"center" }}>
                <span style={{ fontSize:13,fontWeight:700,color:isMe?color:T.text }}>{entry.completed}</span>
                <span style={{ fontSize:11,color:T.muted,marginLeft:2 }}>/{entry.total}</span>
              </div>
              <div style={{ display:"flex",alignItems:"center" }}><StreakFlame streak={entry.streak}/></div>
              <div style={{ display:"flex",alignItems:"center" }}>
                <span style={{ background:`${T.violet}18`,color:T.violet,borderRadius:6,padding:"2px 7px",fontSize:10,fontWeight:700 }}>{entry.level}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Badges ────────────────────────────────────────────────
const BADGES = [
  { id:"first_course",  icon:"🎯", title:"First Step",       desc:"Complete your first course",        check:(c)=>c>=1 },
  { id:"three_done",    icon:"🔥", title:"On Fire",          desc:"Complete 3 courses",                check:(c)=>c>=3 },
  { id:"streak_3",      icon:"⚡", title:"3-Day Streak",     desc:"Learn 3 days in a row",             check:(_,s)=>s.streak>=3 },
  { id:"halfway",       icon:"🌗", title:"Halfway There",    desc:"Complete 50% of your roadmap",      check:(_,_2,p)=>p>=50 },
  { id:"streak_7",      icon:"🌊", title:"Week Warrior",     desc:"7-day learning streak",             check:(_,s)=>s.streak>=7||s.best>=7 },
  { id:"ten_done",      icon:"💎", title:"Diamond Hands",    desc:"Complete 10 courses",               check:(c)=>c>=10 },
  { id:"streak_14",     icon:"🚀", title:"Two-Week Run",     desc:"14-day learning streak",            check:(_,s)=>s.streak>=14||s.best>=14 },
  { id:"complete",      icon:"🏆", title:"Road Completed",   desc:"Complete your full roadmap",        check:(_,_2,p)=>p>=100 },
];

function BadgesPanel({ completed, total, streakData, color }) {
  const pct = total ? Math.round((completed/total)*100) : 0;
  return (
    <div style={{ animation:"slideUp .2s ease" }}>
      <h3 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:16,fontWeight:800,color:T.text,marginBottom:4 }}>Achievement Badges</h3>
      <p style={{ color:T.muted,fontSize:12,marginBottom:20 }}>Earn badges by completing courses and maintaining streaks</p>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
        {BADGES.map(b=>{
          const earned = b.check(completed, streakData, pct);
          return (
            <div key={b.id} style={{ background:T.card,borderRadius:12,padding:"14px 16px",border:`1px solid ${earned?color+"44":T.border}`,display:"flex",alignItems:"center",gap:12,opacity:earned?1:0.45,transition:"all .3s" }}>
              <div style={{ width:40,height:40,borderRadius:10,background:earned?`${color}22`:T.surface,border:`1.5px solid ${earned?color+"44":T.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0 }}>
                {earned?b.icon:"🔒"}
              </div>
              <div>
                <div style={{ fontSize:13,fontWeight:700,color:earned?T.text:T.muted,marginBottom:2 }}>{b.title}</div>
                <div style={{ fontSize:11,color:T.muted,lineHeight:1.4 }}>{b.desc}</div>
                {earned && <div style={{ fontSize:10,color,fontWeight:700,marginTop:4 }}>✓ Earned</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── MAIN EXPORT ───────────────────────────────────────────
export default function LeaderboardPage({ profile, completed, roadmap }) {
  const [tab,         setTab]         = useState("global");
  const [filterSchool,setFilterSchool]= useState("all");
  const [entries,     setEntries]     = useState([]);
  const [loading,     setLoading]     = useState(false);

  const careerId   = profile?.career || "pentest";
  const careerInfo = CAREER_MAP[careerId];
  const deptColor  = careerInfo?.deptColor || T.cyan;
  const userId     = profile?.user_id || "guest";
  const streakData = getStreak(userId);
  const totalCourses     = roadmap ? roadmap.stages.flatMap(s=>s.courses).length : 8;
  const completedCount   = Object.values(completed||{}).filter(Boolean).length;

  useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{ setEntries(generateLeaderboard(careerId,20)); setLoading(false); },600);
  },[careerId]);

  const filtered = filterSchool==="all" ? entries : entries.filter((_,i)=>i%Object.keys(SCHOOLS).length===Object.keys(SCHOOLS).indexOf(filterSchool));

  const TABS = [
    { key:"global", label:"🌍 Leaderboard" },
    { key:"badges", label:"🏅 My Badges"   },
    { key:"stats",  label:"📊 My Stats"    },
  ];

  return (
    <div style={{ animation:"slideUp .25s ease" }}>
      <div style={{ marginBottom:24 }}>
        <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:22,fontWeight:800,color:T.text,marginBottom:4 }}>
          {careerInfo?.deptIcon} Leaderboard
        </h2>
        <div style={{ color:T.muted,fontSize:13 }}>
          Top students on the <span style={{ color:deptColor,fontWeight:700 }}>{careerInfo?.title||careerId}</span> path
        </div>
      </div>

      <MyStatsCard profile={profile} completed={completedCount} total={totalCourses} color={deptColor} streakData={streakData}/>

      {/* Tabs */}
      <div style={{ display:"flex",gap:4,background:T.card,padding:4,borderRadius:12,marginBottom:24,border:`1px solid ${T.border}` }}>
        {TABS.map(t=>(
          <button key={t.key} onClick={()=>setTab(t.key)} style={{ flex:1,padding:"9px 12px",borderRadius:9,border:"none",background:tab===t.key?deptColor:"transparent",color:tab===t.key?T.bg:T.muted,fontWeight:700,fontSize:12,cursor:"pointer",transition:"all .2s" }}>{t.label}</button>
        ))}
      </div>

      {/* Global */}
      {tab==="global" && (
        <>
          <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginBottom:20 }}>
            <button onClick={()=>setFilterSchool("all")} style={{ padding:"5px 12px",borderRadius:99,border:filterSchool==="all"?`1.5px solid ${deptColor}`:`1.5px solid ${T.border}`,background:filterSchool==="all"?`${deptColor}18`:T.surface,color:filterSchool==="all"?deptColor:T.muted,fontWeight:600,fontSize:11,cursor:"pointer" }}>All Schools</button>
            {Object.entries(SCHOOLS).map(([name,s])=>(
              <button key={name} onClick={()=>setFilterSchool(name)} style={{ padding:"5px 12px",borderRadius:99,border:filterSchool===name?`1.5px solid ${s.color}`:`1.5px solid ${T.border}`,background:filterSchool===name?`${s.color}18`:T.surface,color:filterSchool===name?s.color:T.muted,fontWeight:600,fontSize:11,cursor:"pointer" }}>{s.icon} {s.short}</button>
            ))}
          </div>
          {loading ? (
            <div style={{ display:"flex",alignItems:"center",gap:10,color:T.muted,fontSize:13,padding:"40px 0",justifyContent:"center" }}>
              <Spinner/> Loading leaderboard…
            </div>
          ) : (
            <LeaderboardTable entries={filtered} color={deptColor} myName={profile?.name}/>
          )}
        </>
      )}

      {/* Badges */}
      {tab==="badges" && (
        <BadgesPanel completed={completedCount} total={totalCourses} streakData={streakData} color={deptColor}/>
      )}

      {/* Stats */}
      {tab==="stats" && (
        <div style={{ animation:"slideUp .2s ease" }}>
          <h3 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:16,fontWeight:800,color:T.text,marginBottom:20 }}>Detailed Statistics</h3>

          {/* Streak */}
          <div style={{ background:T.card,borderRadius:14,border:`1px solid ${T.border}`,padding:"20px",marginBottom:16 }}>
            <div style={{ fontSize:12,color:T.muted,fontWeight:700,letterSpacing:".06em",marginBottom:16 }}>🔥 STREAK DETAILS</div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12 }}>
              {[{label:"Current",value:`${streakData.streak}d`,color:T.red},{label:"Best",value:`${streakData.best}d`,color:T.yellow},{label:"Total Days",value:`${streakData.totalDays}d`,color:T.cyan}].map(s=>(
                <div key={s.label} style={{ textAlign:"center",padding:"14px",background:T.surface,borderRadius:10 }}>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:22,fontWeight:800,color:s.color,marginBottom:4 }}>{s.value}</div>
                  <div style={{ fontSize:11,color:T.muted }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:16 }}>
              <div style={{ fontSize:11,color:T.muted,marginBottom:8 }}>Activity heatmap — last 35 days</div>
              <HeatMap log={streakData.log||[]}/>
            </div>
          </div>

          {/* By level */}
          <div style={{ background:T.card,borderRadius:14,border:`1px solid ${T.border}`,padding:"20px",marginBottom:16 }}>
            <div style={{ fontSize:12,color:T.muted,fontWeight:700,letterSpacing:".06em",marginBottom:16 }}>📚 COMPLETION BY LEVEL</div>
            {(roadmap?.stages||[]).map(stage=>{
              const stageDone  = stage.courses.filter(c=>completed[c.id]).length;
              const stageTotal = stage.courses.length;
              const stagePct   = stageTotal?Math.round((stageDone/stageTotal)*100):0;
              return (
                <div key={stage.level} style={{ marginBottom:14 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:6 }}>
                    <span style={{ fontSize:13,fontWeight:600,color:stage.color }}>{stage.level}</span>
                    <span style={{ fontSize:12,color:T.muted }}>{stageDone}/{stageTotal}</span>
                  </div>
                  <div style={{ background:T.surface,borderRadius:99,height:8,overflow:"hidden" }}>
                    <div style={{ width:`${stagePct}%`,background:stage.color,height:"100%",borderRadius:99,transition:"width .5s" }}/>
                  </div>
                </div>
              );
            })}
            {!roadmap && <div style={{ color:T.muted,fontSize:13 }}>Start your roadmap to see level-by-level progress.</div>}
          </div>

          {/* Motivation */}
          <div style={{ background:`${deptColor}12`,border:`1px solid ${deptColor}33`,borderRadius:14,padding:"18px 20px" }}>
            <div style={{ fontSize:13,fontWeight:700,color:deptColor,marginBottom:6 }}>
              {completedCount===0&&"🚀 Ready to start?"}
              {completedCount>0&&completedCount<totalCourses*0.33&&"💪 Great start — keep going!"}
              {completedCount>=totalCourses*0.33&&completedCount<totalCourses*0.66&&"🔥 You're building real skills!"}
              {completedCount>=totalCourses*0.66&&completedCount<totalCourses&&"⚡ Almost there — finish strong!"}
              {completedCount>=totalCourses&&"🏆 Roadmap complete!"}
            </div>
            <div style={{ fontSize:12,color:T.dim,lineHeight:1.6 }}>
              {completedCount===0&&"Complete your first course to get on the leaderboard and start your streak."}
              {completedCount>0&&completedCount<totalCourses&&`You've completed ${completedCount} of ${totalCourses} courses. Stay consistent — even one course a day compounds massively.`}
              {completedCount>=totalCourses&&`You've mastered the entire ${careerInfo?.title||"career"} roadmap. Time to go get that job! 🎓`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
