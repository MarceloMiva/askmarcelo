import { useState, useEffect, useRef } from "react";

const T = {
  bg:"#050714", surface:"#0d1022", card:"#111425", border:"#1e2240",
  cyan:"#0DFFE0", violet:"#7B5EA7", red:"#FF4D6D", yellow:"#FFB547",
  green:"#10B981", text:"#e2e8f0", muted:"#64748b", dim:"#94a3b8",
};

const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:#050714;font-family:'Inter',sans-serif;color:#e2e8f0}
    ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#0a0d1a}::-webkit-scrollbar-thumb{background:#1a1d2e;border-radius:99px}
    input,textarea,button,select{font-family:'Inter',sans-serif}
    @keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    @keyframes spin{to{transform:rotate(360deg)}}
    input:focus,select:focus,textarea:focus{outline:2px solid #0DFFE044!important}
  `}</style>
);

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

// ── Storage ──────────────────────────────────────────────
const ADMIN_KEY = "askmarcelo_admin_v1";
const PIN_KEY   = "askmarcelo_admin_pin";
function loadAdmin() {
  try { return JSON.parse(localStorage.getItem(ADMIN_KEY)) || { courses:{}, careers:{}, departments:{}, activity:[] }; }
  catch { return { courses:{}, careers:{}, departments:{}, activity:[] }; }
}
function saveAdmin(d) { try { localStorage.setItem(ADMIN_KEY, JSON.stringify(d)); } catch {} }
function getPin()  { return localStorage.getItem(PIN_KEY) || "2580"; }
function setPin(p) { localStorage.setItem(PIN_KEY, p); }
function uid()     { return Math.random().toString(36).slice(2,9); }

function logActivity(admin, action) {
  admin.activity = [{ id:uid(), action, time:Date.now() }, ...(admin.activity||[])].slice(0,50);
  return admin;
}

function totalCounts() {
  let depts=0, careers=0;
  for (const sd of Object.values(SCHOOLS)) {
    depts += Object.keys(sd.departments).length;
    for (const dd of Object.values(sd.departments)) careers += dd.careers.length;
  }
  return { schools:Object.keys(SCHOOLS).length, depts, careers };
}

// ── Small components ────────────────────────────────────
function Badge({ label, color }) {
  return <span style={{ background:`${color}18`, color, border:`1px solid ${color}33`, borderRadius:6, padding:"2px 8px", fontSize:11, fontWeight:700 }}>{label}</span>;
}
function StatCard({ icon, label, value, color }) {
  return (
    <div style={{ background:T.card, borderRadius:14, padding:"20px", border:`1px solid ${T.border}`, flex:1, minWidth:120 }}>
      <div style={{ fontSize:24, marginBottom:8 }}>{icon}</div>
      <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:28, fontWeight:800, color:color||T.cyan, marginBottom:4 }}>{value}</div>
      <div style={{ fontSize:12, color:T.muted }}>{label}</div>
    </div>
  );
}
function Confirm({ msg, onYes, onNo }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"#000000aa", zIndex:2000, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ background:T.card, borderRadius:16, padding:"28px", maxWidth:360, width:"90%", border:`1px solid ${T.border}`, animation:"slideUp .2s ease" }}>
        <div style={{ fontSize:18, fontWeight:700, color:T.text, marginBottom:12 }}>Are you sure?</div>
        <div style={{ color:T.muted, fontSize:14, marginBottom:24 }}>{msg}</div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={onNo}  style={{ flex:1, padding:"10px", borderRadius:10, border:`1px solid ${T.border}`, background:"transparent", color:T.muted, fontWeight:700, cursor:"pointer" }}>Cancel</button>
          <button onClick={onYes} style={{ flex:1, padding:"10px", borderRadius:10, border:"none", background:T.red, color:"#fff", fontWeight:700, cursor:"pointer" }}>Delete</button>
        </div>
      </div>
    </div>
  );
}
function Toast({ msg, type="success" }) {
  return (
    <div style={{ position:"fixed", bottom:24, right:24, background:type==="success"?T.green:T.red, color:"#fff", borderRadius:10, padding:"12px 20px", fontSize:13, fontWeight:700, zIndex:3000, animation:"slideUp .2s ease", boxShadow:"0 4px 24px #00000044" }}>
      {type==="success"?"✓":"✕"} {msg}
    </div>
  );
}

// ── YouTube Preview ──────────────────────────────────────
function YtPreview({ ytId }) {
  if (!ytId || ytId.length < 5) return null;
  return (
    <div style={{ marginTop:8, borderRadius:10, overflow:"hidden", border:`1px solid ${T.border}`, maxWidth:240 }}>
      <img src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`} style={{ width:"100%", display:"block" }} alt="YouTube thumbnail" onError={e=>e.target.style.display="none"}/>
      <div style={{ padding:"6px 10px", background:T.surface, fontSize:11, color:T.muted }}>🎬 youtube.com/watch?v={ytId}</div>
    </div>
  );
}

// ── Inline editable cell ─────────────────────────────────
function EditCell({ value, onSave, type="text", options=[] }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal]         = useState(value);
  const ref = useRef();
  useEffect(() => { if (editing) ref.current?.focus(); }, [editing]);
  useEffect(() => { setVal(value); }, [value]);
  function commit() { setEditing(false); if (val !== value) onSave(val); }

  if (!editing) return (
    <span onClick={() => setEditing(true)} title="Click to edit" style={{ cursor:"pointer", borderBottom:`1px dashed ${T.border}`, paddingBottom:1, color:T.text, fontSize:13, display:"inline-block" }}>
      {type==="bool" ? (value ? <Badge label="Yes" color={T.green}/> : <Badge label="No" color={T.muted}/>) : (value || <span style={{ color:T.muted, fontStyle:"italic" }}>—</span>)}
    </span>
  );

  if (type==="bool") return (
    <select ref={ref} value={val?"true":"false"} onChange={e=>setVal(e.target.value==="true")} onBlur={commit} style={{ background:T.surface, border:`1px solid ${T.cyan}`, borderRadius:6, padding:"4px 8px", color:T.text, fontSize:12 }}>
      <option value="true">Yes</option><option value="false">No</option>
    </select>
  );
  if (type==="select") return (
    <select ref={ref} value={val} onChange={e=>setVal(e.target.value)} onBlur={commit} style={{ background:T.surface, border:`1px solid ${T.cyan}`, borderRadius:6, padding:"4px 8px", color:T.text, fontSize:12 }}>
      {options.map(o=><option key={o} value={o}>{o}</option>)}
    </select>
  );
  if (type==="textarea") return (
    <textarea ref={ref} value={val} onChange={e=>setVal(e.target.value)} onBlur={commit} rows={3} style={{ background:T.surface, border:`1px solid ${T.cyan}`, borderRadius:6, padding:"6px 10px", color:T.text, fontSize:12, width:"100%", resize:"vertical" }}/>
  );
  return (
    <input ref={ref} value={val} onChange={e=>setVal(e.target.value)} onBlur={commit} onKeyDown={e=>e.key==="Enter"&&commit()} style={{ background:T.surface, border:`1px solid ${T.cyan}`, borderRadius:6, padding:"4px 10px", color:T.text, fontSize:12, width:type==="ytid"?"130px":"100%" }}/>
  );
}

// ── COURSES TAB ──────────────────────────────────────────
function CoursesTab({ admin, onUpdate, onToast }) {
  const [school,  setSchool]  = useState(Object.keys(SCHOOLS)[0]);
  const [dept,    setDept]    = useState("");
  const [career,  setCareer]  = useState("");
  const [confirm, setConfirm] = useState(null);

  const schoolData  = SCHOOLS[school];
  const deptList    = Object.keys(schoolData?.departments || {});
  const activeDept  = schoolData?.departments[dept];
  const careerList  = activeDept?.careers || [];
  const activeColor = activeDept?.color || T.cyan;

  function getCourses() { return career ? (admin.courses[career] || []) : []; }
  function updateCourses(list) {
    const updated = { ...admin, courses:{ ...admin.courses, [career]:list } };
    logActivity(updated, `Updated courses for "${career}"`);
    onUpdate(updated); onToast("Courses saved!");
  }
  function updateField(idx, field, val) {
    const list = [...getCourses()]; list[idx] = { ...list[idx], [field]:val }; updateCourses(list);
  }
  function addCourse() {
    const list = getCourses();
    updateCourses([...list, { id:uid(), title:"New Course", duration:"1h 00m", ytId:"", lab:false, desc:"Course description.", level:"Beginner" }]);
    onToast("Course added!");
  }
  function deleteCourse(idx) {
    setConfirm({ msg:"Delete this course permanently?", onYes:()=>{ const l=[...getCourses()]; l.splice(idx,1); updateCourses(l); setConfirm(null); onToast("Course deleted.","error"); }});
  }
  function moveUp(idx)   { if(idx===0) return; const l=[...getCourses()]; [l[idx-1],l[idx]]=[l[idx],l[idx-1]]; updateCourses(l); }
  function moveDown(idx) { const l=getCourses(); if(idx>=l.length-1) return; const a=[...l]; [a[idx],a[idx+1]]=[a[idx+1],a[idx]]; updateCourses(a); }

  const courses = getCourses();

  return (
    <div style={{ animation:"slideUp .2s ease" }}>
      {confirm && <Confirm {...confirm} onNo={() => setConfirm(null)}/>}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
        <div>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:20, fontWeight:800, color:T.text }}>Course Manager</h2>
          <p style={{ color:T.muted, fontSize:13, marginTop:4 }}>Add, edit, and reorder courses for any career path</p>
        </div>
        {career && <button onClick={addCourse} style={{ padding:"10px 20px", borderRadius:10, border:"none", background:T.cyan, color:T.bg, fontWeight:800, fontSize:13, cursor:"pointer" }}>+ Add Course</button>}
      </div>

      <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:24 }}>
        {[["School", school, setSchool, Object.keys(SCHOOLS).map(s=>({ v:s, l:`${SCHOOLS[s].icon} ${s}` })), ()=>{ setDept(""); setCareer(""); }],
          ["Department", dept, setDept, deptList.map(d=>({ v:d, l:d })), ()=>setCareer(""), !school],
          ["Career", career, setCareer, careerList.map(c=>({ v:c.id, l:`${c.title}` })), ()=>{}, !dept]
        ].map(([label, val, setter, opts, after, disabled]) => (
          <div key={label} style={{ flex:1, minWidth:160 }}>
            <label style={S.label}>{label}</label>
            <select value={val} onChange={e=>{ setter(e.target.value); after?.(); }} disabled={disabled} style={S.select}>
              {label!=="School" && <option value="">— Select —</option>}
              {opts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
            </select>
          </div>
        ))}
      </div>

      {!career && (
        <div style={{ background:T.card, borderRadius:14, padding:"40px", textAlign:"center", border:`1px dashed ${T.border}` }}>
          <div style={{ fontSize:36, marginBottom:12 }}>📚</div>
          <div style={{ color:T.muted, fontSize:14 }}>Select a school, department, and career to manage courses</div>
        </div>
      )}

      {career && courses.length === 0 && (
        <div style={{ background:T.card, borderRadius:14, padding:"40px", textAlign:"center", border:`1px dashed ${T.border}` }}>
          <div style={{ fontSize:36, marginBottom:12 }}>✨</div>
          <div style={{ color:T.text, fontSize:15, fontWeight:700, marginBottom:8 }}>No custom courses yet</div>
          <div style={{ color:T.muted, fontSize:13, marginBottom:20 }}>The default roadmap is active. Add courses here to override it.</div>
          <button onClick={addCourse} style={{ padding:"10px 24px", borderRadius:10, border:"none", background:activeColor, color:T.bg, fontWeight:800, cursor:"pointer" }}>+ Add First Course</button>
        </div>
      )}

      {career && courses.length > 0 && (
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {courses.map((c, idx) => (
            <div key={c.id} style={{ background:T.card, borderRadius:14, border:`1px solid ${T.border}`, overflow:"hidden" }}>
              <div style={{ background:T.surface, padding:"12px 18px", display:"flex", alignItems:"center", gap:12, borderBottom:`1px solid ${T.border}` }}>
                <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  <button onClick={() => moveUp(idx)}   disabled={idx===0}             style={S.arrowBtn}>↑</button>
                  <button onClick={() => moveDown(idx)} disabled={idx===courses.length-1} style={S.arrowBtn}>↓</button>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:11, color:T.muted, marginBottom:2 }}>COURSE #{idx+1}</div>
                  <div style={{ fontSize:14, fontWeight:700, color:T.text }}>{c.title}</div>
                </div>
                <Badge label={c.level||"Beginner"} color={c.level==="Advanced"?T.red:c.level==="Intermediate"?T.yellow:T.green}/>
                <button onClick={() => deleteCourse(idx)} style={{ background:"none", border:`1px solid ${T.red}44`, borderRadius:8, color:T.red, padding:"5px 10px", fontSize:12, cursor:"pointer", fontWeight:700 }}>Delete</button>
              </div>
              <div style={{ padding:"18px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px 24px" }}>
                <div style={{ gridColumn:"1/-1" }}>
                  <label style={S.label}>Course Title</label>
                  <EditCell value={c.title} onSave={v=>updateField(idx,"title",v)}/>
                </div>
                <div>
                  <label style={S.label}>Duration</label>
                  <EditCell value={c.duration} onSave={v=>updateField(idx,"duration",v)}/>
                </div>
                <div>
                  <label style={S.label}>Level</label>
                  <EditCell value={c.level||"Beginner"} onSave={v=>updateField(idx,"level",v)} type="select" options={["Beginner","Intermediate","Advanced","All Levels"]}/>
                </div>
                <div>
                  <label style={S.label}>Includes Lab?</label>
                  <EditCell value={!!c.lab} onSave={v=>updateField(idx,"lab",v)} type="bool"/>
                </div>
                <div>
                  <label style={S.label}>YouTube Video ID <span style={{ color:T.muted, fontWeight:400 }}>(e.g. dQw4w9WgXcQ)</span></label>
                  <EditCell value={c.ytId} onSave={v=>updateField(idx,"ytId",v)} type="ytid"/>
                  <YtPreview ytId={c.ytId}/>
                </div>
                <div style={{ gridColumn:"1/-1" }}>
                  <label style={S.label}>Description</label>
                  <EditCell value={c.desc} onSave={v=>updateField(idx,"desc",v)} type="textarea"/>
                </div>
              </div>
            </div>
          ))}
          <button onClick={addCourse} style={{ padding:"14px", borderRadius:12, border:`2px dashed ${T.border}`, background:"transparent", color:T.muted, fontWeight:700, fontSize:14, cursor:"pointer" }}>+ Add Another Course</button>
        </div>
      )}
    </div>
  );
}

// ── CAREERS TAB ──────────────────────────────────────────
function CareersTab({ admin, onUpdate, onToast }) {
  const [school,   setSchool]   = useState(Object.keys(SCHOOLS)[0]);
  const [dept,     setDept]     = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newIcon,  setNewIcon]  = useState("🎯");
  const [confirm,  setConfirm]  = useState(null);

  const schoolData = SCHOOLS[school];
  const deptList   = Object.keys(schoolData?.departments || {});
  const deptData   = schoolData?.departments[dept];

  function getCareers() {
    return [...(deptData?.careers||[]), ...(admin.careers?.[dept]||[])];
  }
  function addCareer() {
    if (!newTitle.trim() || !dept) return;
    const id   = newTitle.toLowerCase().replace(/[^a-z0-9]/g,"_").slice(0,20)+"_"+uid().slice(0,4);
    const entry = { id, title:newTitle.trim(), icon:newIcon, custom:true };
    const existing = admin.careers?.[dept] || [];
    const updated  = { ...admin, careers:{ ...(admin.careers||{}), [dept]:[...existing,entry] } };
    logActivity(updated, `Added career "${newTitle}" to ${dept}`);
    onUpdate(updated); setNewTitle(""); setNewIcon("🎯"); onToast(`Career "${newTitle}" added!`);
  }
  function deleteCustomCareer(id) {
    setConfirm({ msg:"Remove this custom career?", onYes:()=>{
      const list    = (admin.careers?.[dept]||[]).filter(c=>c.id!==id);
      const updated = { ...admin, careers:{ ...(admin.careers||{}), [dept]:list } };
      logActivity(updated, `Deleted career from ${dept}`);
      onUpdate(updated); setConfirm(null); onToast("Career removed.","error");
    }});
  }

  const careers    = getCareers();
  const deptColor  = deptData?.color || T.cyan;

  return (
    <div style={{ animation:"slideUp .2s ease" }}>
      {confirm && <Confirm {...confirm} onNo={() => setConfirm(null)}/>}
      <div style={{ marginBottom:24 }}>
        <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:20, fontWeight:800, color:T.text }}>Career Manager</h2>
        <p style={{ color:T.muted, fontSize:13, marginTop:4 }}>Add new career paths to any department</p>
      </div>
      <div style={{ display:"flex", gap:12, marginBottom:24, flexWrap:"wrap" }}>
        <div style={{ flex:1, minWidth:180 }}>
          <label style={S.label}>School</label>
          <select value={school} onChange={e=>{ setSchool(e.target.value); setDept(""); }} style={S.select}>
            {Object.keys(SCHOOLS).map(s=><option key={s} value={s}>{SCHOOLS[s].icon} {s}</option>)}
          </select>
        </div>
        <div style={{ flex:1, minWidth:180 }}>
          <label style={S.label}>Department</label>
          <select value={dept} onChange={e=>setDept(e.target.value)} style={S.select}>
            <option value="">— Select —</option>
            {deptList.map(d=><option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      {dept && (
        <>
          <div style={{ background:T.card, borderRadius:14, border:`1px solid ${T.border}`, overflow:"hidden", marginBottom:16 }}>
            <div style={{ padding:"14px 18px", borderBottom:`1px solid ${T.border}`, background:T.surface, display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:18 }}>{deptData?.icon}</span>
              <span style={{ fontWeight:700, color:T.text, fontSize:14 }}>{dept}</span>
              <Badge label={`${careers.length} careers`} color={deptColor}/>
            </div>
            {careers.map(c => (
              <div key={c.id} style={{ padding:"12px 18px", display:"flex", alignItems:"center", gap:12, borderBottom:`1px solid ${T.border}` }}>
                <span style={{ fontSize:20, flexShrink:0 }}>{c.icon}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:T.text }}>{c.title}</div>
                  <div style={{ fontSize:11, color:T.muted }}>{c.id}</div>
                </div>
                {c.custom ? <Badge label="Custom" color={T.yellow}/> : <Badge label="Built-in" color={T.muted}/>}
                {c.custom && (
                  <button onClick={() => deleteCustomCareer(c.id)} style={{ background:"none", border:`1px solid ${T.red}44`, borderRadius:7, color:T.red, padding:"4px 10px", fontSize:11, cursor:"pointer", fontWeight:700 }}>Remove</button>
                )}
              </div>
            ))}
          </div>

          <div style={{ background:T.card, borderRadius:14, border:`1px dashed ${deptColor}44`, padding:"20px" }}>
            <div style={{ fontSize:13, fontWeight:700, color:deptColor, marginBottom:16 }}>+ Add New Career to {dept}</div>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", alignItems:"flex-end" }}>
              <div style={{ flex:1, minWidth:200 }}>
                <label style={S.label}>Career Title</label>
                <input value={newTitle} onChange={e=>setNewTitle(e.target.value)} placeholder="e.g. UX Researcher" style={S.input} onKeyDown={e=>e.key==="Enter"&&addCareer()}/>
              </div>
              <div style={{ width:100 }}>
                <label style={S.label}>Icon</label>
                <input value={newIcon} onChange={e=>setNewIcon(e.target.value)} placeholder="🎯" style={{ ...S.input, textAlign:"center", fontSize:20 }}/>
              </div>
              <button onClick={addCareer} disabled={!newTitle.trim()} style={{ padding:"12px 24px", borderRadius:10, border:"none", background:newTitle.trim()?deptColor:T.border, color:newTitle.trim()?T.bg:T.muted, fontWeight:800, cursor:newTitle.trim()?"pointer":"not-allowed", marginBottom:1 }}>Add Career</button>
            </div>
          </div>
        </>
      )}

      {!dept && (
        <div style={{ background:T.card, borderRadius:14, padding:"40px", textAlign:"center", border:`1px dashed ${T.border}` }}>
          <div style={{ fontSize:36, marginBottom:12 }}>🎯</div>
          <div style={{ color:T.muted, fontSize:14 }}>Select a school and department to manage careers</div>
        </div>
      )}
    </div>
  );
}

// ── SETTINGS TAB ─────────────────────────────────────────
function SettingsTab({ admin, onUpdate, onToast }) {
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirm, setConfirm] = useState(null);

  function changePin() {
    if (oldPin !== getPin()) { onToast("Current PIN is incorrect.","error"); return; }
    if (newPin.length < 4)   { onToast("New PIN must be at least 4 digits.","error"); return; }
    setPin(newPin); setOldPin(""); setNewPin(""); onToast("PIN changed successfully!");
  }
  function exportData() {
    const blob = new Blob([JSON.stringify(admin,null,2)], { type:"application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a"); a.href=url; a.download="askmarcelo-admin.json"; a.click();
    onToast("Data exported!");
  }
  function importData(e) {
    const file = e.target.files?.[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try { const data=JSON.parse(ev.target.result); onUpdate(data); onToast("Data imported!"); }
      catch { onToast("Invalid JSON file.","error"); }
    };
    reader.readAsText(file);
  }
  function resetAll() {
    setConfirm({ msg:"Delete ALL custom courses, careers, and departments? This cannot be undone.", onYes:()=>{
      const empty = { courses:{}, careers:{}, departments:{}, activity:[] };
      onUpdate(empty); setConfirm(null); onToast("All custom data reset.","error");
    }});
  }

  const counts = totalCounts();
  return (
    <div style={{ animation:"slideUp .2s ease" }}>
      {confirm && <Confirm {...confirm} onNo={() => setConfirm(null)}/>}
      <div style={{ marginBottom:24 }}>
        <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:20, fontWeight:800, color:T.text }}>Settings</h2>
        <p style={{ color:T.muted, fontSize:13, marginTop:4 }}>Admin PIN, data management, and exports</p>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        {/* Stats */}
        <div style={{ background:T.card, borderRadius:14, border:`1px solid ${T.border}`, padding:"20px" }}>
          <div style={{ fontSize:13, fontWeight:700, color:T.dim, marginBottom:16, letterSpacing:".06em" }}>PLATFORM OVERVIEW</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
            {[{label:"Schools",value:counts.schools,color:T.cyan},{label:"Departments",value:counts.depts,color:T.violet},{label:"Career Paths",value:counts.careers,color:T.yellow}].map(s=>(
              <div key={s.label} style={{ textAlign:"center", padding:"16px", background:T.surface, borderRadius:10 }}>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:28, fontWeight:800, color:s.color, marginBottom:4 }}>{s.value}</div>
                <div style={{ fontSize:12, color:T.muted }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Change PIN */}
        <div style={{ background:T.card, borderRadius:14, border:`1px solid ${T.border}`, padding:"20px" }}>
          <div style={{ fontSize:13, fontWeight:700, color:T.dim, marginBottom:16, letterSpacing:".06em" }}>CHANGE ADMIN PIN</div>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap", alignItems:"flex-end" }}>
            <div><label style={S.label}>Current PIN</label><input type="password" value={oldPin} onChange={e=>setOldPin(e.target.value)} placeholder="••••" style={{ ...S.input, width:140 }}/></div>
            <div><label style={S.label}>New PIN</label><input type="password" value={newPin} onChange={e=>setNewPin(e.target.value)} placeholder="••••" style={{ ...S.input, width:140 }}/></div>
            <button onClick={changePin} style={{ padding:"12px 24px", borderRadius:10, border:"none", background:T.cyan, color:T.bg, fontWeight:800, cursor:"pointer", marginBottom:1 }}>Update PIN</button>
          </div>
          <div style={{ fontSize:12, color:T.muted, marginTop:8 }}>Default PIN: <strong>2580</strong></div>
        </div>

        {/* Export / Import */}
        <div style={{ background:T.card, borderRadius:14, border:`1px solid ${T.border}`, padding:"20px" }}>
          <div style={{ fontSize:13, fontWeight:700, color:T.dim, marginBottom:16, letterSpacing:".06em" }}>DATA MANAGEMENT</div>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <button onClick={exportData} style={{ padding:"12px 24px", borderRadius:10, border:`1px solid ${T.violet}`, background:`${T.violet}18`, color:T.violet, fontWeight:700, cursor:"pointer" }}>📥 Export JSON</button>
            <label style={{ padding:"12px 24px", borderRadius:10, border:`1px solid ${T.green}`, background:`${T.green}18`, color:T.green, fontWeight:700, cursor:"pointer" }}>
              📤 Import JSON<input type="file" accept=".json" onChange={importData} style={{ display:"none" }}/>
            </label>
          </div>
        </div>

        {/* Danger zone */}
        <div style={{ background:T.card, borderRadius:14, border:`1px solid ${T.red}33`, padding:"20px" }}>
          <div style={{ fontSize:13, fontWeight:700, color:T.red, marginBottom:12, letterSpacing:".06em" }}>⚠️ DANGER ZONE</div>
          <div style={{ fontSize:13, color:T.muted, marginBottom:16 }}>Resetting will permanently delete all custom courses, careers, and departments. Default data is not affected.</div>
          <button onClick={resetAll} style={{ padding:"12px 24px", borderRadius:10, border:`1px solid ${T.red}`, background:"transparent", color:T.red, fontWeight:700, cursor:"pointer" }}>Reset All Custom Data</button>
        </div>
      </div>
    </div>
  );
}

// ── DASHBOARD TAB ─────────────────────────────────────────
function DashboardTab({ admin, onTabSwitch }) {
  const counts = totalCounts();
  const customCourseCount = Object.values(admin.courses||{}).reduce((a,c)=>a+c.length,0);
  const customCareerCount = Object.values(admin.careers||{}).reduce((a,c)=>a+c.length,0);
  function timeAgo(ts) {
    const diff = Date.now()-ts;
    if (diff<60000) return "just now";
    if (diff<3600000) return `${Math.floor(diff/60000)}m ago`;
    if (diff<86400000) return `${Math.floor(diff/3600000)}h ago`;
    return new Date(ts).toLocaleDateString();
  }
  return (
    <div style={{ animation:"slideUp .2s ease" }}>
      <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:22, fontWeight:800, color:T.text, marginBottom:6 }}>Admin Dashboard</div>
      <div style={{ color:T.muted, fontSize:13, marginBottom:28 }}>Welcome back. Here's the state of <span style={{ color:T.cyan }}>AskMarcelo</span>.</div>

      <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:24 }}>
        <StatCard icon="🏫" label="Schools"       value={counts.schools}       color="#6C63FF"/>
        <StatCard icon="📚" label="Departments"   value={counts.depts}         color={T.violet}/>
        <StatCard icon="🎯" label="Career Paths"  value={counts.careers + customCareerCount} color={T.cyan}/>
        <StatCard icon="🎬" label="Custom Courses" value={customCourseCount}   color={T.yellow}/>
      </div>

      <div style={{ background:T.card, borderRadius:14, border:`1px solid ${T.border}`, padding:"20px", marginBottom:16 }}>
        <div style={{ fontSize:13, fontWeight:700, color:T.dim, marginBottom:14, letterSpacing:".06em" }}>QUICK ACTIONS</div>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          {[["🎬 Manage Courses","courses",T.cyan],["🎯 Add Career","careers",T.violet],["⚙️ Settings","settings",T.green]].map(([label,tab,color])=>(
            <button key={tab} onClick={()=>onTabSwitch(tab)} style={{ padding:"12px 20px", borderRadius:10, border:`1px solid ${color}44`, background:`${color}18`, color, fontWeight:700, fontSize:13, cursor:"pointer" }}>{label}</button>
          ))}
        </div>
      </div>

      <div style={{ background:T.card, borderRadius:14, border:`1px solid ${T.border}`, overflow:"hidden" }}>
        <div style={{ padding:"14px 18px", borderBottom:`1px solid ${T.border}`, background:T.surface }}>
          <div style={{ fontSize:13, fontWeight:700, color:T.text }}>Recent Activity</div>
        </div>
        {(admin.activity||[]).length === 0 && (
          <div style={{ padding:"28px", textAlign:"center", color:T.muted, fontSize:13 }}>No activity yet. Make your first change to see it here.</div>
        )}
        {(admin.activity||[]).map(a => (
          <div key={a.id} style={{ padding:"12px 18px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ fontSize:13, color:T.text }}>{a.action}</div>
            <div style={{ fontSize:11, color:T.muted, whiteSpace:"nowrap", marginLeft:16 }}>{timeAgo(a.time)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PIN GATE ──────────────────────────────────────────────
function PinGate({ onUnlock }) {
  const [pin,   setPin]   = useState("");
  const [shake, setShake] = useState(false);
  const [hint,  setHint]  = useState("");

  function tryPin() {
    if (pin === getPin()) { onUnlock(); }
    else { setShake(true); setHint("Incorrect PIN. Try again."); setTimeout(()=>setShake(false),500); setPin(""); }
  }

  return (
    <div style={{ minHeight:"100vh", background:T.bg, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ background:T.card, borderRadius:20, padding:"40px 36px", maxWidth:360, width:"100%", border:`1px solid ${T.border}`, textAlign:"center", animation:"slideUp .3s ease" }}>
        <div style={{ width:60, height:60, borderRadius:16, background:`${T.cyan}18`, border:`2px solid ${T.cyan}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, margin:"0 auto 20px" }}>🔐</div>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:22, fontWeight:800, color:T.text, marginBottom:4 }}>Admin Access</div>
        <div style={{ color:T.muted, fontSize:13, marginBottom:28 }}>Enter your admin PIN to continue</div>
        <input type="password" value={pin} onChange={e=>setPin(e.target.value)} onKeyDown={e=>e.key==="Enter"&&tryPin()} placeholder="Enter PIN" maxLength={8}
          style={{ ...S.input, textAlign:"center", fontSize:20, letterSpacing:8, marginBottom:0, transform:shake?"translateX(-6px)":"none", transition:"transform .1s" }}/>
        {hint && <div style={{ color:T.red, fontSize:12, marginTop:8 }}>{hint}</div>}
        <button onClick={tryPin} style={{ width:"100%", marginTop:16, padding:"14px", borderRadius:12, border:"none", background:T.cyan, color:T.bg, fontWeight:800, fontSize:15, cursor:"pointer" }}>Unlock →</button>
        <div style={{ marginTop:16, fontSize:12, color:T.muted }}>Default PIN: 2580</div>
      </div>
    </div>
  );
}

// ── MAIN ADMIN APP ────────────────────────────────────────
const NAV = [
  { key:"dashboard",   label:"Dashboard",   icon:"📊" },
  { key:"courses",     label:"Courses",     icon:"🎬" },
  { key:"careers",     label:"Careers",     icon:"🎯" },
  { key:"settings",    label:"Settings",    icon:"⚙️" },
];

function AdminApp() {
  const [unlocked, setUnlocked] = useState(false);
  const [tab,      setTab]      = useState("dashboard");
  const [admin,    setAdmin]    = useState(loadAdmin);
  const [toast,    setToast]    = useState(null);

  function handleUpdate(d) { setAdmin(d); saveAdmin(d); }
  function handleToast(msg, type="success") { setToast({ msg, type }); setTimeout(()=>setToast(null), 2800); }

  if (!unlocked) return <><FontLoader/><PinGate onUnlock={() => setUnlocked(true)}/></>;

  return (
    <>
      <FontLoader/>
      {toast && <Toast msg={toast.msg} type={toast.type}/>}
      <div style={{ minHeight:"100vh", background:T.bg, display:"flex" }}>
        {/* Sidebar */}
        <div style={{ width:220, background:T.surface, borderRight:`1px solid ${T.border}`, display:"flex", flexDirection:"column", position:"sticky", top:0, height:"100vh", flexShrink:0 }}>
          <div style={{ padding:"24px 20px 20px" }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:18, fontWeight:800, color:T.text, marginBottom:6 }}>Ask<span style={{ color:T.cyan }}>Marcelo</span></div>
            <div style={{ background:`${T.cyan}18`, color:T.cyan, borderRadius:6, padding:"2px 8px", fontSize:11, fontWeight:700, display:"inline-block" }}>Admin Panel</div>
          </div>
          <nav style={{ flex:1, padding:"8px 12px" }}>
            {NAV.map(item => (
              <button key={item.key} onClick={() => setTab(item.key)} style={{ width:"100%", display:"flex", alignItems:"center", gap:12, padding:"11px 12px", borderRadius:10, border:"none", background:tab===item.key?`${T.cyan}18`:"transparent", color:tab===item.key?T.cyan:T.muted, fontWeight:tab===item.key?700:500, fontSize:13, cursor:"pointer", marginBottom:4, textAlign:"left", transition:"all .15s" }}>
                <span style={{ fontSize:16 }}>{item.icon}</span>{item.label}
              </button>
            ))}
          </nav>
          <div style={{ padding:"16px 20px", borderTop:`1px solid ${T.border}` }}>
            <button onClick={() => setUnlocked(false)} style={{ width:"100%", padding:"9px", borderRadius:9, border:`1px solid ${T.border}`, background:"transparent", color:T.muted, fontSize:12, cursor:"pointer", fontWeight:600 }}>🔒 Lock Panel</button>
          </div>
        </div>
        {/* Content */}
        <div style={{ flex:1, padding:"32px 36px", overflowY:"auto", maxHeight:"100vh" }}>
          {tab==="dashboard" && <DashboardTab   admin={admin} onTabSwitch={setTab}/>}
          {tab==="courses"   && <CoursesTab     admin={admin} onUpdate={handleUpdate} onToast={handleToast}/>}
          {tab==="careers"   && <CareersTab     admin={admin} onUpdate={handleUpdate} onToast={handleToast}/>}
          {tab==="settings"  && <SettingsTab    admin={admin} onUpdate={handleUpdate} onToast={handleToast}/>}
        </div>
      </div>
    </>
  );
}

const S = {
  label:   { display:"block", fontSize:11, fontWeight:700, color:T.muted, marginBottom:6, letterSpacing:".06em" },
  input:   { width:"100%", background:T.surface, border:`1.5px solid ${T.border}`, borderRadius:10, padding:"11px 14px", color:T.text, fontSize:14, outline:"none", boxSizing:"border-box" },
  select:  { width:"100%", background:T.surface, border:`1.5px solid ${T.border}`, borderRadius:10, padding:"11px 14px", color:T.text, fontSize:13, outline:"none", cursor:"pointer", boxSizing:"border-box" },
  arrowBtn:{ width:24, height:20, borderRadius:5, border:`1px solid ${T.border}`, background:"transparent", color:T.muted, cursor:"pointer", fontSize:11, display:"flex", alignItems:"center", justifyContent:"center", padding:0 },
};

export default AdminApp;
