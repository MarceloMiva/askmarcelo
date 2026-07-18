import { useState, useEffect, createContext, useContext } from "react";
import { sb, loadSession, saveSession, loadProfile, saveProfile } from "./services/supabase.js";
import { SCHOOLS, ALL_DEPTS } from "./data/schools.js";
import { ROADMAPS, defaultRoadmap } from "./data/roadmaps.js";
import Dashboard    from "./components/Dashboard.jsx";
import RoadmapPage  from "./pages/RoadmapPage.jsx";

/* ─── THEME ─────────────────────────────────────────────── */
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
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
    @keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    @keyframes spin{to{transform:rotate(360deg)}}
  `}</style>
);

/* ─── AUTH CONTEXT ──────────────────────────────────────── */
const AuthCtx = createContext(null);
function useAuth() { return useContext(AuthCtx); }

function AuthProvider({ children }) {
  const [session, setSession] = useState(loadSession);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verify() {
      if (!session?.access_token) { setLoading(false); return; }
      try {
        const user = await sb.getUser(session.access_token);
        if (user?.id) { setLoading(false); return; }
        setSession(null); saveSession(null);
      } catch {}
      setLoading(false);
    }
    verify();
  }, []);

  async function signUp(email, password, meta) {
    const data = await sb.signUp(email, password, meta);
    if (data?.error) return { error: data.error.message || data.error };
    if (data?.id) return signIn(email, password);
    return { ok:true, message:"Check your email to confirm your account." };
  }
  async function signIn(email, password) {
    const data = await sb.signIn(email, password);
    if (data?.error) return { error: data.error_description || data.error };
    if (data?.access_token) {
      const sess = { access_token:data.access_token, user:data.user };
      setSession(sess); saveSession(sess); return { ok:true };
    }
    return { error:"Sign in failed. Check your credentials." };
  }
  async function signOut() {
    if (session?.access_token) await sb.signOut(session.access_token).catch(() => {});
    setSession(null); saveSession(null);
  }
  async function resetPassword(email) {
    await sb.resetPassword(email); return { ok:true };
  }

  return (
    <AuthCtx.Provider value={{ session, loading, signUp, signIn, signOut, resetPassword }}>
      {children}
    </AuthCtx.Provider>
  );
}

/* ─── SMALL COMPONENTS ──────────────────────────────────── */
function Spinner({ color = T.cyan }) {
  return <div style={{ width:20,height:20,border:`2px solid ${color}33`,borderTop:`2px solid ${color}`,borderRadius:"50%",animation:"spin .8s linear infinite" }}/>;
}

function Toast({ msg, type = "success", onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, []);
  return (
    <div style={{ position:"fixed",bottom:24,right:24,background:type==="success"?T.green:T.red,color:"#fff",borderRadius:10,padding:"12px 20px",fontSize:13,fontWeight:700,zIndex:9999,animation:"slideUp .2s ease",boxShadow:"0 4px 24px #00000055",display:"flex",alignItems:"center",gap:8 }}>
      {type==="success"?"✓":"✕"} {msg}
    </div>
  );
}

/* ─── AUTH SCREEN ───────────────────────────────────────── */
const S = {
  label: { display:"block",fontSize:11,fontWeight:700,color:T.muted,marginBottom:6,letterSpacing:".06em" },
  input: { width:"100%",background:T.surface,border:`1.5px solid ${T.border}`,borderRadius:10,padding:"12px 14px",color:T.text,fontSize:14,marginBottom:16,outline:"none",boxSizing:"border-box" },
  btn:   (color,disabled=false) => ({ width:"100%",padding:"14px",borderRadius:12,border:"none",background:disabled?T.border:color,color:disabled?T.muted:(color===T.cyan?T.bg:"#fff"),fontWeight:800,fontSize:15,cursor:disabled?"not-allowed":"pointer",transition:"all .2s",fontFamily:"'Inter',sans-serif" }),
};

function AuthScreen({ onAuth, onBoarded }) {
  const { signIn, signUp, resetPassword } = useAuth();
  const [mode,    setMode]    = useState("login");
  const [form,    setForm]    = useState({ name:"",email:"",password:"",confirm:"" });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState("");

  function set(k,v) { setForm(f=>({...f,[k]:v})); setError(""); }
  const isLogin  = mode==="login";
  const isForgot = mode==="forgot";

  async function handleLogin() {
    if (!form.email||!form.password) { setError("Fill in all fields."); return; }
    setLoading(true);
    const res = await signIn(form.email, form.password);
    setLoading(false);
    if (res.error) { setError(res.error); return; }
    onAuth();
  }
  async function handleRegister() {
    if (!form.name||!form.email||!form.password) { setError("Fill in all fields."); return; }
    if (form.password.length<8) { setError("Password must be at least 8 characters."); return; }
    if (form.password!==form.confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    const res = await signUp(form.email, form.password, { full_name:form.name });
    setLoading(false);
    if (res.error) { setError(res.error); return; }
    if (res.message) { setSuccess(res.message); return; }
    onAuth();
  }
  async function handleReset() {
    if (!form.email) { setError("Enter your email address."); return; }
    setLoading(true);
    await resetPassword(form.email);
    setLoading(false);
    setSuccess("Password reset link sent! Check your inbox.");
  }

  return (
    <div style={{ minHeight:"100vh",background:T.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:"24px 16px" }}>
      <div style={{ width:"100%",maxWidth:420,animation:"slideUp .3s ease" }}>
        <div style={{ textAlign:"center",marginBottom:36 }}>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:44,fontWeight:800,color:T.text,letterSpacing:"-.02em",lineHeight:1 }}>
            Ask<span style={{ color:T.cyan }}>Marcelo</span>
          </div>
          <div style={{ color:T.muted,fontSize:13,marginTop:6 }}>University Career Learning Platform · Miva</div>
        </div>
        <div style={{ background:T.card,borderRadius:20,padding:"32px",border:`1px solid ${T.border}` }}>
          {!isForgot && (
            <div style={{ display:"flex",gap:4,background:T.surface,padding:4,borderRadius:12,marginBottom:28 }}>
              {[["login","Sign In"],["register","Create Account"]].map(([key,label])=>(
                <button key={key} onClick={()=>{setMode(key);setError("");setSuccess("");}} style={{ flex:1,padding:"9px",borderRadius:9,border:"none",background:mode===key?T.cyan:"transparent",color:mode===key?T.bg:T.muted,fontWeight:700,fontSize:13,cursor:"pointer",transition:"all .2s" }}>{label}</button>
              ))}
            </div>
          )}
          {isForgot && (
            <div style={{ marginBottom:24 }}>
              <button onClick={()=>{setMode("login");setError("");setSuccess("");}} style={{ background:"none",border:"none",color:T.muted,cursor:"pointer",fontSize:13 }}>← Back</button>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:18,fontWeight:800,color:T.text,marginTop:12 }}>Reset Password</div>
            </div>
          )}
          {success && <div style={{ background:`${T.green}18`,border:`1px solid ${T.green}44`,borderRadius:10,padding:"12px 16px",marginBottom:20,color:T.green,fontSize:13 }}>✓ {success}</div>}
          {error   && <div style={{ background:`${T.red}18`,border:`1px solid ${T.red}44`,borderRadius:10,padding:"12px 16px",marginBottom:20,color:T.red,fontSize:13 }}>✕ {error}</div>}
          {mode==="register" && (<><label style={S.label}>Full Name</label><input style={S.input} placeholder="e.g. Fashipe Marcelo" value={form.name} onChange={e=>set("name",e.target.value)}/></>)}
          <label style={S.label}>Email Address</label>
          <input style={S.input} type="email" placeholder="you@miva.edu.ng" value={form.email} onChange={e=>set("email",e.target.value)}/>
          {!isForgot && (<><label style={S.label}>Password</label><input style={S.input} type="password" placeholder={isLogin?"••••••••":"Min. 8 characters"} value={form.password} onChange={e=>set("password",e.target.value)} onKeyDown={e=>e.key==="Enter"&&isLogin&&handleLogin()}/></>)}
          {mode==="register" && (<><label style={S.label}>Confirm Password</label><input style={S.input} type="password" placeholder="Repeat your password" value={form.confirm} onChange={e=>set("confirm",e.target.value)}/></>)}
          {isLogin && <div style={{ textAlign:"right",marginTop:-8,marginBottom:20 }}><button onClick={()=>{setMode("forgot");setError("");setSuccess("");}} style={{ background:"none",border:"none",color:T.muted,cursor:"pointer",fontSize:12,textDecoration:"underline" }}>Forgot password?</button></div>}
          <button onClick={isLogin?handleLogin:isForgot?handleReset:handleRegister} disabled={loading} style={{ ...S.btn(T.cyan,loading),display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginTop:4 }}>
            {loading?<><Spinner color={T.bg}/> Please wait…</>:isForgot?"Send Reset Link":isLogin?"Sign In →":"Create Account →"}
          </button>
          {!isForgot && (
            <div style={{ marginTop:20,textAlign:"center" }}>
              <div style={{ color:T.muted,fontSize:12,marginBottom:12 }}>— or —</div>
              <button onClick={onBoarded} style={{ background:"none",border:`1px solid ${T.border}`,borderRadius:10,padding:"10px 20px",color:T.dim,fontSize:13,cursor:"pointer",fontWeight:600 }}>Continue as Guest</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── ONBOARDING ─────────────────────────────────────────── */
function StepBar({ n, of, color }) {
  return (
    <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:28 }}>
      {Array.from({length:of},(_,i)=><div key={i} style={{ height:4,flex:i+1<=n?2:1,borderRadius:99,background:i+1<=n?(color||T.cyan):T.border,transition:"all .3s" }}/>)}
      <span style={{ fontSize:11,color:T.muted,whiteSpace:"nowrap" }}>{n}/{of}</span>
    </div>
  );
}

function Onboarding({ userName, onComplete }) {
  const { session } = useAuth();
  const [step,   setStep]   = useState(0);
  const [form,   setForm]   = useState({ level:"100",school:"",dept:"",career:"" });
  const [saving, setSaving] = useState(false);
  const [vis,    setVis]    = useState(true);

  function go(n) { setVis(false); setTimeout(()=>{ setStep(n); setVis(true); },180); }
  function set(k,v) { setForm(f=>({...f,[k]:v})); }

  const schoolData  = SCHOOLS[form.school];
  const deptData    = schoolData?.departments[form.dept];
  const activeColor = deptData?.color || schoolData?.color || T.cyan;

  async function finish() {
    setSaving(true);
    const profile = { user_id:session?.user?.id||"guest", name:userName, level:form.level, school:form.school, dept:form.dept, career:form.career };
    if (session?.access_token) await sb.upsertProfile(session.access_token, profile);
    onComplete({ ...profile });
    setSaving(false);
  }

  const steps = [
    <div key="0" style={{ textAlign:"center",maxWidth:480,margin:"0 auto" }}>
      <div style={{ fontSize:52,marginBottom:16 }}>👋</div>
      <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:24,fontWeight:800,color:T.text,marginBottom:8 }}>Welcome, {userName?.split(" ")[0]||"Student"}!</div>
      <div style={{ color:T.muted,fontSize:14,lineHeight:1.7,marginBottom:32 }}>Let's set up your career learning profile. It takes less than a minute and personalises everything for you.</div>
      <button onClick={()=>go(1)} style={S.btn(T.cyan)}>Set Up Profile →</button>
    </div>,

    <div key="1" style={{ maxWidth:420,margin:"0 auto" }}>
      <StepBar n={1} of={3} color={T.cyan}/>
      <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:22,fontWeight:800,color:T.text,marginBottom:24 }}>What level are you?</h2>
      <div style={{ display:"flex",gap:10,marginBottom:28 }}>
        {["100","200","300","400"].map(l=>(
          <button key={l} onClick={()=>set("level",l)} style={{ flex:1,padding:"16px 0",borderRadius:12,border:form.level===l?`2px solid ${T.cyan}`:`2px solid ${T.border}`,background:form.level===l?`${T.cyan}18`:T.surface,color:form.level===l?T.cyan:T.muted,fontWeight:800,cursor:"pointer",fontSize:15 }}>{l}L</button>
        ))}
      </div>
      <button onClick={()=>go(2)} style={S.btn(T.cyan)}>Continue →</button>
    </div>,

    <div key="2" style={{ maxWidth:640,margin:"0 auto" }}>
      <StepBar n={2} of={3} color={schoolData?.color||T.cyan}/>
      <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:22,fontWeight:800,color:T.text,marginBottom:24 }}>Your school & department</h2>
      <div style={{ display:"flex",flexDirection:"column",gap:8,marginBottom:20 }}>
        {Object.entries(SCHOOLS).map(([name,sd])=>(
          <button key={name} onClick={()=>{ set("school",name); set("dept",""); set("career",""); }} style={{ textAlign:"left",padding:"14px 18px",borderRadius:12,border:form.school===name?`2px solid ${sd.color}`:`2px solid ${T.border}`,background:form.school===name?`${sd.color}18`:T.surface,cursor:"pointer",display:"flex",alignItems:"center",gap:14,transition:"all .2s" }}>
            <span style={{ fontSize:24 }}>{sd.icon}</span>
            <div>
              <div style={{ fontSize:13,fontWeight:700,color:form.school===name?sd.color:T.text }}>{name}</div>
              <div style={{ fontSize:11,color:T.muted,marginTop:2 }}>{Object.keys(sd.departments).length} departments</div>
            </div>
          </button>
        ))}
      </div>
      {form.school && (
        <>
          <div style={{ color:T.dim,fontSize:12,fontWeight:700,letterSpacing:".06em",marginBottom:10 }}>CHOOSE YOUR DEPARTMENT</div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:20 }}>
            {Object.entries(schoolData?.departments||{}).map(([name,d])=>(
              <button key={name} onClick={()=>{ set("dept",name); set("career",""); }} style={{ textAlign:"left",padding:"12px 14px",borderRadius:11,border:form.dept===name?`2px solid ${d.color}`:`2px solid ${T.border}`,background:form.dept===name?`${d.color}18`:T.card,cursor:"pointer",transition:"all .2s" }}>
                <div style={{ fontSize:20,marginBottom:6 }}>{d.icon}</div>
                <div style={{ fontSize:11,fontWeight:700,color:form.dept===name?d.color:T.dim,lineHeight:1.4 }}>{d.degree} {name}</div>
              </button>
            ))}
          </div>
        </>
      )}
      <button disabled={!form.dept} onClick={()=>go(3)} style={S.btn(activeColor,!form.dept)}>Continue →</button>
    </div>,

    <div key="3" style={{ maxWidth:640,margin:"0 auto" }}>
      <StepBar n={3} of={3} color={activeColor}/>
      <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:22,fontWeight:800,color:T.text,marginBottom:8 }}>Choose your career path</h2>
      <p style={{ color:T.muted,fontSize:13,marginBottom:20 }}>Your roadmap, certifications, and AI mentor are built around this</p>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,maxHeight:380,overflowY:"auto",padding:"2px",marginBottom:24 }}>
        {deptData?.careers.map(c=>(
          <button key={c.id} onClick={()=>set("career",c.id)} style={{ textAlign:"left",padding:"14px 16px",borderRadius:12,border:form.career===c.id?`2px solid ${activeColor}`:`2px solid ${T.border}`,background:form.career===c.id?`${activeColor}18`:T.surface,cursor:"pointer",display:"flex",alignItems:"center",gap:12,transition:"all .2s" }}>
            <span style={{ fontSize:22,flexShrink:0 }}>{c.icon}</span>
            <span style={{ fontSize:12,fontWeight:600,color:form.career===c.id?activeColor:T.dim,lineHeight:1.4 }}>{c.title}</span>
          </button>
        ))}
      </div>
      <button disabled={!form.career||saving} onClick={finish} style={S.btn(activeColor,!form.career||saving)}>
        {saving?<span style={{ display:"flex",alignItems:"center",gap:8,justifyContent:"center" }}><Spinner color={T.bg}/>Saving…</span>:"🚀 Start Learning"}
      </button>
    </div>,
  ];

  return (
    <div style={{ minHeight:"100vh",background:T.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:"24px 16px" }}>
      <div style={{ width:"100%",opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(10px)",transition:"all .2s" }}>{steps[step]}</div>
    </div>
  );
}

/* ─── EXPLORE PAGE ───────────────────────────────────────── */
function ExplorePage() {
  const [selSchool, setSelSchool] = useState(Object.keys(SCHOOLS)[0]);
  const school = SCHOOLS[selSchool];
  return (
    <div style={{ animation:"slideUp .25s ease" }}>
      <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:20,fontWeight:800,color:T.text,marginBottom:6 }}>Explore All Careers</h2>
      <p style={{ color:T.muted,fontSize:13,marginBottom:20 }}>Browse every career path across all 5 schools</p>
      <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:24 }}>
        {Object.entries(SCHOOLS).map(([name,sd])=>(
          <button key={name} onClick={()=>setSelSchool(name)} style={{ padding:"7px 14px",borderRadius:99,border:selSchool===name?`1.5px solid ${sd.color}`:`1.5px solid ${T.border}`,background:selSchool===name?`${sd.color}18`:T.surface,color:selSchool===name?sd.color:T.muted,fontWeight:600,fontSize:12,cursor:"pointer" }}>{sd.icon} {sd.short}</button>
        ))}
      </div>
      {Object.entries(school.departments).map(([deptName,dept])=>(
        <div key={deptName} style={{ marginBottom:24 }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:12 }}>
            <div style={{ width:32,height:32,borderRadius:9,background:`${dept.color}22`,border:`1px solid ${dept.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16 }}>{dept.icon}</div>
            <div>
              <div style={{ fontSize:13,fontWeight:700,color:T.text }}>{dept.degree} {deptName}</div>
              <div style={{ fontSize:11,color:T.muted }}>{dept.careers.length} career paths</div>
            </div>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginLeft:42 }}>
            {dept.careers.map(c=>(
              <div key={c.id} style={{ background:T.card,borderRadius:10,padding:"10px 14px",border:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:8 }}>
                <span style={{ fontSize:16,flexShrink:0 }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize:12,fontWeight:600,color:T.text,lineHeight:1.4 }}>{c.title}</div>
                  {ROADMAPS[c.id] && <div style={{ fontSize:10,color:dept.color,fontWeight:600,marginTop:2 }}>✓ Full roadmap</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── PROFILE PAGE ───────────────────────────────────────── */
function ProfilePage({ profile, completed, allCourses, pct, deptColor, quizScores }) {
  const { session } = useAuth();
  const deptData = ALL_DEPTS[profile.dept];
  const career   = deptData?.careers.find(c=>c.id===profile.career);
  const done     = allCourses.filter(c=>completed[c.id]).length;
  const quizCount = Object.keys(quizScores||{}).length;
  const avgScore  = quizCount>0 ? Math.round(Object.values(quizScores).reduce((a,q)=>a+(q.score/q.total)*100,0)/quizCount) : 0;

  return (
    <div style={{ animation:"slideUp .25s ease" }}>
      <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:20,fontWeight:800,color:T.text,marginBottom:20 }}>My Profile</h2>
      <div style={{ background:T.card,borderRadius:16,padding:"24px",border:`1px solid ${T.border}`,marginBottom:16,display:"flex",alignItems:"center",gap:20,flexWrap:"wrap" }}>
        <div style={{ width:64,height:64,borderRadius:"50%",background:`${deptColor}22`,border:`2px solid ${deptColor}44`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Space Grotesk',sans-serif",fontSize:26,fontWeight:800,color:deptColor,flexShrink:0 }}>
          {profile.name?.charAt(0).toUpperCase()}
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:20,fontWeight:800,color:T.text,marginBottom:4 }}>{profile.name}</div>
          <div style={{ color:T.muted,fontSize:13 }}>{session?.user?.email||"Guest account"}</div>
          <div style={{ marginTop:6,display:"flex",gap:8,flexWrap:"wrap" }}>
            <span style={{ background:`${deptColor}18`,color:deptColor,borderRadius:6,padding:"2px 8px",fontSize:11,fontWeight:700 }}>{deptData?.degree} {profile.dept}</span>
            <span style={{ background:`${T.violet}18`,color:T.violet,borderRadius:6,padding:"2px 8px",fontSize:11,fontWeight:700 }}>{profile.level}L</span>
            {session && <span style={{ background:`${T.green}18`,color:T.green,borderRadius:6,padding:"2px 8px",fontSize:11,fontWeight:700 }}>✓ Authenticated</span>}
          </div>
        </div>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:16 }}>
        {[
          { label:"Career Path",  value:career?.title||"—",              color:deptColor, icon:career?.icon||"🎯" },
          { label:"Courses Done", value:`${done}/${allCourses.length}`,  color:T.yellow,  icon:"✅"               },
          { label:"Quiz Average", value:`${avgScore}%`,                  color:T.violet,  icon:"📝"               },
        ].map(s=>(
          <div key={s.label} style={{ background:T.card,borderRadius:14,padding:"16px",border:`1px solid ${T.border}`,textAlign:"center" }}>
            <div style={{ fontSize:22,marginBottom:6 }}>{s.icon}</div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:s.value.length>8?13:20,fontWeight:800,color:s.color,marginBottom:4,wordBreak:"break-word" }}>{s.value}</div>
            <div style={{ fontSize:11,color:T.muted }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background:T.card,borderRadius:14,padding:"20px",border:`1px solid ${T.border}` }}>
        <div style={{ display:"flex",justifyContent:"space-between",marginBottom:10 }}>
          <span style={{ fontSize:13,fontWeight:700,color:T.text }}>Overall Progress</span>
          <span style={{ fontSize:13,fontWeight:700,color:deptColor }}>{pct}%</span>
        </div>
        <div style={{ background:"#1e2235",borderRadius:99,height:6,overflow:"hidden" }}>
          <div style={{ width:`${pct}%`,background:deptColor,height:"100%",borderRadius:99,transition:"width .5s" }}/>
        </div>
        <div style={{ marginTop:12,color:T.muted,fontSize:12 }}>
          {pct===0  && "Start your first course 🚀"}
          {pct>0&&pct<33  && "Building foundations 💪"}
          {pct>=33&&pct<66 && "You're building real skills 🔥"}
          {pct>=66&&pct<100 && "Almost job-ready ⚡"}
          {pct===100 && "🎉 Roadmap complete! You're ready for the industry."}
        </div>
        {!session && (
          <div style={{ marginTop:14,background:`${T.yellow}18`,border:`1px solid ${T.yellow}33`,borderRadius:10,padding:"10px 14px",fontSize:12,color:T.yellow }}>
            ⚠️ Guest mode — create an account to save your progress across devices.
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── APP SHELL ──────────────────────────────────────────── */
function AppShell({ profile, onSignOut }) {
  const { session } = useAuth();
  const [view,            setView]            = useState("dashboard");
  const [completed,       setCompleted]       = useState({});
  const [quizScores,      setQuizScores]      = useState({});
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [syncing,         setSyncing]         = useState(false);
  const [toast,           setToast]           = useState(null);

  const deptData   = ALL_DEPTS[profile.dept];
  const deptColor  = deptData?.color || T.cyan;
  const career     = deptData?.careers.find(c=>c.id===profile.career);
  const roadmap    = ROADMAPS[profile.career] || defaultRoadmap(career?.title||profile.career);
  const allCourses = roadmap.stages.flatMap(s=>s.courses);
  const pct        = allCourses.length ? Math.round((allCourses.filter(c=>completed[c.id]).length/allCourses.length)*100) : 0;

  useEffect(()=>{
    async function load() {
      if (session?.access_token && session?.user?.id) {
        const [prog, quiz] = await Promise.all([
          sb.getProgress(session.access_token, session.user.id, profile.career),
          sb.getQuizScores(session.access_token, session.user.id),
        ]);
        setCompleted(prog||{});
        setQuizScores(quiz||{});
      }
      setLoadingProgress(false);
    }
    load();
  }, [profile.career]);

  async function handleToggle(courseId, val) {
    setCompleted(p=>({...p,[courseId]:val}));
    if (session?.access_token && session?.user?.id) {
      setSyncing(true);
      await sb.upsertProgress(session.access_token, session.user.id, profile.career, courseId, val);
      setSyncing(false);
    }
    // Record streak activity
    try {
      const key = "askmarcelo_streaks_v1";
      const streaks = JSON.parse(localStorage.getItem(key)||"{}");
      const userId  = session?.user?.id || "guest";
      const td      = new Date().toISOString().slice(0,10);
      const user    = streaks[userId] || { streak:0, lastDate:"", best:0, totalDays:0, log:[] };
      const yest    = new Date(); yest.setDate(yest.getDate()-1);
      const yd      = yest.toISOString().slice(0,10);
      if (user.lastDate !== td) {
        const ns = user.lastDate===yd ? user.streak+1 : 1;
        streaks[userId] = { streak:ns, lastDate:td, best:Math.max(user.best||0,ns), totalDays:(user.totalDays||0)+1, log:[...(user.log||[]).slice(-60),td] };
        localStorage.setItem(key, JSON.stringify(streaks));
      }
    } catch {}
  }

  async function handleQuizComplete(courseId, score, total) {
    setQuizScores(q=>({...q,[courseId]:{ score, total }}));
    if (session?.access_token && session?.user?.id) {
      await sb.saveQuizScore(session.access_token, session.user.id, courseId, score, total);
    }
    const pct = Math.round((score/total)*100);
    setToast({ msg:`Quiz complete! Score: ${score}/${total} (${pct}%)`, type: pct>=60?"success":"error" });
  }

  async function handleSignOut() {
    await onSignOut();
    setToast({ msg:"Signed out successfully.", type:"success" });
  }

  const NAV = [
    { key:"dashboard", label:"🏠 Home"     },
    { key:"roadmap",   label:"🗺️ Path"     },
    { key:"explore",   label:"🔭 Explore"  },
    { key:"profile",   label:"👤 Profile"  },
  ];

  return (
    <div style={{ minHeight:"100vh",background:T.bg,display:"flex",flexDirection:"column" }}>
      {toast && <Toast msg={toast.msg} type={toast.type} onDone={()=>setToast(null)}/>}

      {/* Topbar */}
      <div style={{ background:T.surface,borderBottom:`1px solid ${T.border}`,padding:"12px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50 }}>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:20,fontWeight:800,color:T.text }}>Ask<span style={{ color:T.cyan }}>Marcelo</span></div>
          <div style={{ width:1,height:20,background:T.border }}/>
          <div style={{ fontSize:11,color:T.muted }}>{SCHOOLS[profile.school]?.icon} {SCHOOLS[profile.school]?.short}</div>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ background:`${deptColor}18`,border:`1px solid ${deptColor}33`,borderRadius:99,padding:"4px 12px",display:"flex",alignItems:"center",gap:6 }}>
            <div style={{ width:6,height:6,borderRadius:"50%",background:deptColor }}/>
            <span style={{ fontSize:12,fontWeight:700,color:deptColor }}>{pct}%</span>
          </div>
          {session
            ? <div style={{ width:28,height:28,borderRadius:"50%",background:`${T.cyan}22`,border:`1px solid ${T.cyan}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:T.cyan }}>{profile.name?.charAt(0).toUpperCase()}</div>
            : <span style={{ fontSize:11,background:`${T.yellow}18`,color:T.yellow,border:`1px solid ${T.yellow}33`,borderRadius:6,padding:"3px 8px",fontWeight:700 }}>Guest</span>
          }
          <button onClick={handleSignOut} style={{ background:"none",border:`1px solid ${T.border}`,borderRadius:8,color:T.muted,padding:"5px 10px",fontSize:11,cursor:"pointer" }}>{session?"Sign out":"Exit"}</button>
        </div>
      </div>

      {/* Tab nav */}
      <div style={{ background:T.surface,borderBottom:`1px solid ${T.border}`,padding:"0 24px",display:"flex" }}>
        {NAV.map(t=>(
          <button key={t.key} onClick={()=>setView(t.key)} style={{ padding:"13px 18px",border:"none",borderBottom:view===t.key?`2px solid ${deptColor}`:"2px solid transparent",background:"transparent",color:view===t.key?T.text:T.muted,fontWeight:view===t.key?700:500,fontSize:13,cursor:"pointer",marginBottom:-1 }}>{t.label}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth:860,margin:"0 auto",width:"100%",padding:"28px 20px 60px" }}>
        {loadingProgress && (
          <div style={{ display:"flex",alignItems:"center",gap:10,color:T.muted,fontSize:13,padding:"40px 0",justifyContent:"center" }}>
            <Spinner/> Loading your progress…
          </div>
        )}
        {!loadingProgress && view==="dashboard" && (
          <Dashboard
            profile={profile}
            roadmap={roadmap}
            completed={completed}
            quizScores={quizScores}
            deptColor={deptColor}
            onNavigate={setView}
          />
        )}
        {!loadingProgress && view==="roadmap" && (
          <RoadmapPage
            profile={profile}
            roadmap={roadmap}
            completed={completed}
            quizScores={quizScores}
            deptColor={deptColor}
            syncing={syncing}
            onToggle={handleToggle}
            onQuizComplete={handleQuizComplete}
          />
        )}
        {!loadingProgress && view==="explore" && <ExplorePage/>}
        {!loadingProgress && view==="profile" && (
          <ProfilePage
            profile={profile}
            completed={completed}
            allCourses={allCourses}
            pct={pct}
            deptColor={deptColor}
            quizScores={quizScores}
          />
        )}
      </div>
    </div>
  );
}

/* ─── ROOT ───────────────────────────────────────────────── */
function Root() {
  const { session, loading, signOut } = useAuth();
  const [profile,   setProfile]   = useState(loadProfile);
  const [guestMode, setGuestMode] = useState(false);

  useEffect(()=>{
    if (!session?.access_token||!session?.user?.id) return;
    sb.getProfile(session.access_token, session.user.id).then(p=>{ if(p){ setProfile(p); saveProfile(p); } });
  }, [session?.user?.id]);

  function handleProfileComplete(p) { setProfile(p); saveProfile(p); setGuestMode(false); }
  async function handleSignOut()    { await signOut(); setProfile(null); saveProfile(null); setGuestMode(false); }

  if (loading) return (
    <div style={{ minHeight:"100vh",background:T.bg,display:"flex",alignItems:"center",justifyContent:"center",gap:12,color:T.muted,fontSize:14 }}>
      <Spinner/> Loading AskMarcelo…
    </div>
  );

  if (!session && !guestMode) return <AuthScreen onAuth={()=>{}} onBoarded={()=>setGuestMode(true)}/>;

  const userName = session?.user?.user_metadata?.full_name || session?.user?.email?.split("@")[0] || "Student";
  if (!profile) return <Onboarding userName={userName} onComplete={handleProfileComplete}/>;

  return <AppShell profile={profile} onSignOut={handleSignOut}/>;
}

export default function StudentApp() {
  return (
    <AuthProvider>
      <FontLoader/>
      <Root/>
    </AuthProvider>
  );
}
