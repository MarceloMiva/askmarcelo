import { useState, useRef, useEffect } from "react";
import { sb, loadSession } from "../services/supabase.js";

const T = {
  bg:"#050714", surface:"#0d1022", card:"#111425", border:"#1e2240",
  cyan:"#0DFFE0", violet:"#7B5EA7", red:"#FF4D6D", yellow:"#FFB547",
  green:"#10B981", text:"#e2e8f0", muted:"#64748b", dim:"#94a3b8",
};

export default function LabPage({ lab, profile, onBack }) {
  const [view, setView] = useState(lab ? "lab" : "catalog");
  const [selected, setSelected] = useState(lab || null);

  const samples = [
    { id:"allied-health-1", title:"Virtual Hospital — Paediatric Case", school:"Allied Health", desc:"Simulated ward rounds and treatment planning for a 6-year-old with asthma exacerbation.", type:"simulation" },
    { id:"business-1", title:"Marketing Campaign Simulation", school:"Business", desc:"Allocate budget across channels, run campaigns, and measure ROI over 12 weeks.", type:"simulation" },
    { id:"data-1", title:"ML Notebook — Titanic Model", school:"Data Science", desc:"Train a small classifier on a sample dataset and evaluate metrics.", type:"notebook" },
  ];

  function startLab(l) {
    setSelected(l);
    setView("lab");
  }

  // --- Code runner / grader state ---
  const iframeRef = useRef(null);
  const [code, setCode] = useState("// Write JavaScript here\nconsole.log('Hello world')");
  const [logs, setLogs] = useState([]);
  const [grade, setGrade] = useState(null);
  const [monacoLoaded, setMonacoLoaded] = useState(false);
  const monacoContainerRef = useRef(null);
  const monacoEditorRef = useRef(null);

  useEffect(() => {
    function onMsg(e) {
      const d = e.data || {};
      if (d?.type === 'console') {
        setLogs(l => [...l, String(d.message)]);
      }
      if (d?.type === 'grader') {
        // send to serverless grader for authoritative scoring
        (async () => {
          try {
            const payload = { expected: d.result?.expected ?? null, got: d.result?.got ?? null, code };
            const r = await fetch('/api/grade', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            const jr = await r.json();
            setGrade(jr);
          } catch (err) {
            setGrade({ error: err.message, raw: d.result });
          }
        })();
      }
    }
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);

  function runCodeAndGrade() {
    setLogs([]); setGrade(null);
    const userCode = code;
    // basic runner iframe srcdoc that intercepts console.log and posts messages
    const selectedId = selected?.id || '';
    const src = `<!doctype html><html><body><script>
      (function(){
        function postConsole(msg){ parent.postMessage({ type:'console', message: String(msg) }, '*'); }
        console.log = function(){ window.__last = Array.from(arguments).map(a=>String(a)).join(' '); Array.from(arguments).forEach(postConsole); };
        console.error = function(){ Array.from(arguments).forEach(postConsole); };
        // grader definition depending on lab id
        window.__runGrader = function(){
          try{
            if ('${selectedId}' === 'data-1'){
              return { pass: window.__last === '42', expected: '42', got: window.__last };
            }
            return { pass: !!window.__last, got: window.__last };
          }catch(e){ return { error: e.message }; }
        };
        try{\n${userCode.replace(/</g,'\\u003c')}\n}catch(e){ parent.postMessage({ type:'console', message: 'Error: '+e.message }, '*'); }
        // run grader after code executes
        try{ const res = window.__runGrader(); parent.postMessage({ type:'grader', result: res }, '*'); }catch(e){ parent.postMessage({ type:'console', message: 'Grader error: '+e.message }, '*'); }
      })();</script></body></html>`;
    if (iframeRef.current) {
      iframeRef.current.srcdoc = src;
    }
  }

  // Monaco loader (CDN) — optional; creates editor in container
  function loadMonacoEditor() {
    if (monacoLoaded) return;
    const loaderUrl = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.33.0/min/vs/loader.js';
    const s = document.createElement('script'); s.src = loaderUrl; s.onload = () => {
      // @ts-ignore
      require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.33.0/min/vs' } });
      // @ts-ignore
      require(['vs/editor/editor.main'], function() {
        // @ts-ignore
        monacoEditorRef.current = monaco.editor.create(monacoContainerRef.current, { value: code, language: 'javascript', theme: 'vs-dark', automaticLayout:true });
        monacoEditorRef.current.onDidChangeModelContent(()=>{ setCode(monacoEditorRef.current.getValue()); });
        setMonacoLoaded(true);
      });
    };
    document.body.appendChild(s);
  }

  // persist grade when grade result received
  useEffect(() => {
    if (!grade || !selected) return;
    // save submission using Supabase if session exists
    try {
      const sess = loadSession();
      const token = sess?.access_token;
      const userId = sess?.user?.id || null;
      if (userId) {
        sb.saveLabSubmission(token, userId, selected.id, { code, grade, logs });
      }
    } catch (e) {}
  }, [grade]);

  return (
    <div style={{ animation:"slideUp .25s ease" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
        <div>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:20, fontWeight:800, color:T.text }}>Labs</div>
          <div style={{ color:T.muted, fontSize:13 }}>{profile?.dept || "All Departments"} · Practical, hands-on simulations and assignments</div>
        </div>
        <div>
          <button onClick={onBack} style={{ background:"none", border:`1px solid ${T.border}`, borderRadius:8, padding:"8px 12px", color:T.muted, cursor:"pointer" }}>← Back</button>
        </div>
      </div>

      {view === "catalog" && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
          {samples.map(s => (
            <div key={s.id} style={{ background:T.card, borderRadius:12, padding:16, border:`1px solid ${T.border}` }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                <div style={{ fontSize:13, fontWeight:800, color:T.text }}>{s.title}</div>
                <div style={{ color:T.muted, fontSize:12 }}>{s.school}</div>
              </div>
              <div style={{ color:T.dim, fontSize:13, marginBottom:12 }}>{s.desc}</div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={() => startLab(s)} style={{ padding:"8px 12px", borderRadius:8, border:"none", background:T.cyan, color:T.bg, fontWeight:800, cursor:"pointer" }}>Start Lab</button>
                <button onClick={() => setSelected(s)} style={{ padding:"8px 12px", borderRadius:8, border:`1px solid ${T.border}`, background:"transparent", color:T.muted, cursor:"pointer" }}>Preview</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === "lab" && selected && (
        <div style={{ marginTop:12 }}>
          <div style={{ background:T.card, borderRadius:12, padding:16, border:`1px solid ${T.border}` }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
              <div>
                <div style={{ fontSize:18, fontWeight:800, color:T.text }}>{selected.title}</div>
                <div style={{ color:T.muted, fontSize:13 }}>{selected.school} · {selected.type}</div>
              </div>
              <div>
                <button onClick={() => setView("catalog")} style={{ background:"none", border:`1px solid ${T.border}`, borderRadius:8, padding:"8px 12px", color:T.muted, cursor:"pointer" }}>← Back to catalog</button>
              </div>
            </div>

            <div style={{ display:"flex", gap:12 }}>
              <div style={{ flex:1 }}>
                <div style={{ color:T.dim, marginBottom:12 }}>{selected.desc}</div>
                <div style={{ marginTop:8 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:8 }}>Instructions</div>
                  <ol style={{ color:T.muted, marginLeft:16 }}>
                    <li>Read the scenario.</li>
                    <li>Make decisions in the simulator or complete the coding task.</li>
                    <li>Submit your work for auto-grading or instructor review.</li>
                  </ol>
                </div>
                <div style={{ marginTop:14 }}>
                      {selected.type === 'notebook' && (
                    <div>
                      {selected.id === 'data-1' ? (
                        <div>
                          <div style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:8 }}>JupyterLite Notebook</div>
                          <iframe id="jlite" src="https://jupyterlite.github.io/demo/" style={{ width:'100%', height:480, border:'1px solid '+T.border, borderRadius:8 }} title="jupyter-lite"/>
                          <div style={{ display:'flex', gap:8, marginTop:8 }}>
                            <button onClick={async () => {
                                try {
                                  const sess = loadSession();
                                  const token = sess?.access_token;
                                  const userId = sess?.user?.id || null;
                                  if (!userId) { alert('Sign in to save notebooks.'); return; }
                                  await sb.saveLabSubmission(token, userId, selected.id, { type:'notebook', note:'Saved notebook snapshot (placeholder)', saved_at: new Date().toISOString() });
                                  alert('Notebook saved.');
                                } catch (e) { alert('Save failed.'); }
                              }} style={{ padding:'8px 12px', borderRadius:8, border:'none', background:T.cyan, color:T.bg }}>Save Notebook</button>
                            <a href="https://colab.research.google.com/" target="_blank" rel="noreferrer" style={{ padding:'8px 12px', borderRadius:8, background:'transparent', border:`1px solid ${T.border}`, color:T.muted, textDecoration:'none' }}>Open in Colab</a>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div style={{ marginBottom:8, fontSize:13, color:T.muted }}>Code Editor (JavaScript)</div>
                          {!monacoLoaded && <div style={{ marginBottom:8 }}><button onClick={loadMonacoEditor} style={{ padding:'8px 12px', borderRadius:8, border:'none', background:T.violet, color:'#fff' }}>Enable Monaco Editor</button></div>}
                          <div ref={monacoContainerRef} style={{ display: monacoLoaded ? 'block' : 'none', width:'100%', minHeight:160 }} />
                          {!monacoLoaded && <textarea value={code} onChange={e=>setCode(e.target.value)} style={{ width:"100%", minHeight:160, background:T.surface, color:T.text, border:`1px solid ${T.border}`, borderRadius:8, padding:12, fontFamily:"monospace", fontSize:13 }} />}
                          <div style={{ display:"flex", gap:8, marginTop:8 }}>
                            <button onClick={runCodeAndGrade} style={{ padding:"10px 14px", borderRadius:8, border:"none", background:T.cyan, color:T.bg, fontWeight:800, cursor:"pointer" }}>Run & Grade</button>
                            <button onClick={() => { setCode("console.log('42')"); setLogs([]); setGrade(null); }} style={{ padding:"10px 14px", borderRadius:8, border:`1px solid ${T.border}`, background:"transparent", color:T.muted, cursor:"pointer" }}>Reset</button>
                          </div>
                          <div style={{ marginTop:10 }}>
                            <div style={{ fontSize:13, fontWeight:700, color:T.text }}>Output</div>
                            <div style={{ background:"#070815", border:`1px solid ${T.border}`, borderRadius:8, padding:10, minHeight:60, color:T.dim }}>{logs.length?logs.map((l,i)=>(<div key={i}>{l}</div>)):'(no output)'}</div>
                            <div style={{ marginTop:8 }}>
                              <div style={{ fontSize:13, fontWeight:700, color:T.text }}>Grader</div>
                              <div style={{ background:T.bg, border:`1px dashed ${T.border}`, borderRadius:8, padding:10, color:T.muted }}>{grade?JSON.stringify(grade):'No grade yet'}</div>
                            </div>
                          </div>
                          <iframe ref={iframeRef} title="runner" sandbox="allow-scripts" style={{ width:"100%", height:0, border:"none" }}/>
                        </div>
                      )}
                    </div>
                  )}

                  {selected.id.startsWith('allied-health') && (
                    <AlliedHealthSim />
                  )}

                  {selected.id.startsWith('business') && (
                    <BusinessSim />
                  )}

                  {selected.type === 'simulation' && !selected.id.startsWith('allied-health') && (
                    <div>
                      <div style={{ color:T.muted }}>Simulation placeholder — detailed simulator coming next.</div>
                      <button onClick={() => alert('Run simulation (placeholder)')} style={{ marginTop:8, padding:"10px 14px", borderRadius:8, border:"none", background:T.cyan, color:T.bg }}>Run Simulation</button>
                    </div>
                  )}
                </div>
              </div>
              <div style={{ width:320 }}>
                <div style={{ background:"#070815", border:`1px solid ${T.border}`, borderRadius:10, padding:12, color:T.dim }}>Lab preview and resources</div>
                <div style={{ marginTop:8, background:T.bg, borderRadius:8, padding:10, border:`1px dashed ${T.border}`, color:T.muted }}>Resources: starter files, dataset, rubric.</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AlliedHealthSim() {
  const initialVitals = { hr:110, rr:30, spo2:90, sbp:95 }; // mildly abnormal
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0); // seconds since start
  const [vitals, setVitals] = useState(initialVitals);
  const [timeline, setTimeline] = useState([]);
  const [score, setScore] = useState(0);
  const [actions, setActions] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setTime(t => t + 5);
        // natural deterioration if no oxygen started
        setVitals(v => {
          // if oxygen in actions, improve; else worsen slowly
          const usedO2 = actions.some(a => a.type === 'oxygen');
          const delta = usedO2 ? { hr:-2, rr:-1, spo2:+2, sbp:+1 } : { hr:+3, rr:+2, spo2:-2, sbp:-1 };
          return {
            hr: Math.max(40, v.hr + delta.hr),
            rr: Math.max(8, v.rr + delta.rr),
            spo2: Math.min(100, Math.max(40, v.spo2 + delta.spo2)),
            sbp: Math.max(50, v.sbp + delta.sbp),
          };
        });
        // add automatic timeline event
        setTimeline(t => [...t, { t: Date.now(), type: 'auto', note: 'Patient status changed' }]);
      }, 5000);
    }
    return () => clearInterval(timerRef.current);
  }, [running, actions]);

  function addAction(action) {
    setActions(a => [...a, action]);
    setTimeline(t => [...t, { t: Date.now(), type: 'action', note: action.label }]);
    // apply immediate effect
    setVitals(v => {
      switch (action.type) {
        case 'nebulizer': return { ...v, hr: Math.max(40, v.hr - 8), rr: Math.max(8, v.rr - 6), spo2: Math.min(100, v.spo2 + 4) };
        case 'oxygen': return { ...v, spo2: Math.min(100, v.spo2 + 10), hr: Math.max(40, v.hr - 4) };
        case 'steroid': return { ...v, sno: v.spo2, hr: Math.max(40, v.hr - 2) };
        case 'antibiotic': return { ...v, sbp: Math.min(140, v.sbp + 2) };
        case 'admit': return { ...v };
        case 'icu': return { ...v, hr: Math.max(30, v.hr - 15), rr: Math.max(6, v.rr - 10), spo2: Math.min(100, v.spo2 + 15), sbp: Math.min(140, v.sbp + 8) };
        default: return v;
      }
    });
    // scoring heuristics
    if (action.type === 'nebulizer') setScore(s => s + 2);
    if (action.type === 'oxygen') setScore(s => s + 2);
    if (action.type === 'icu') setScore(s => s + 3);
  }

  function startCase() {
    setRunning(true); setTime(0); setVitals(initialVitals); setTimeline([{ t: Date.now(), type: 'start', note: 'Case started' }]); setActions([]); setScore(0);
  }

  function resetCase() {
    setRunning(false); setTime(0); setVitals(initialVitals); setTimeline([]); setActions([]); setScore(0); clearInterval(timerRef.current);
  }

  async function submitCase() {
    const sess = loadSession();
    const token = sess?.access_token;
    const userId = sess?.user?.id || null;
    const payload = { type: 'allied-health', score, time, vitals, timeline, actions };
    if (userId) {
      try { await sb.saveLabSubmission(token, userId, 'allied-health-1', payload); setTimeline(t => [...t, { t: Date.now(), type: 'system', note: 'Submission saved' }]); } catch(e){ setTimeline(t=>[...t,{t:Date.now(), type:'error', note: 'Save failed'}]); }
    } else {
      setTimeline(t => [...t, { t: Date.now(), type: 'warn', note: 'Not logged in — submission not persisted' }]);
    }
  }

  function formatTime(ts){ const d = new Date(ts); return d.toLocaleTimeString(); }

  return (
    <div>
      <div style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:8 }}>Virtual Hospital — Paediatric Asthma Case</div>
      <div style={{ display:'flex', gap:12 }}>
        <div style={{ flex:1 }}>
          <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:10, padding:12 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
              <div style={{ fontWeight:800, color:T.text }}>Patient: Aisha, 6 years</div>
              <div style={{ color:T.muted }}>Time: {time}s</div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              <div style={{ padding:8, borderRadius:8, background:'#06101a', color:T.text }}>
                <div style={{ fontSize:12, color:T.muted, marginBottom:6 }}>Heart Rate</div>
                <div style={{ fontSize:20, fontWeight:800 }}>{vitals.hr} bpm</div>
                <div style={{ height:8, background:'#021018', borderRadius:4, marginTop:8 }}><div style={{ width: Math.min(100, vitals.hr)+ '%', height:'100%', background:T.red, borderRadius:4 }} /></div>
              </div>

              <div style={{ padding:8, borderRadius:8, background:'#06101a', color:T.text }}>
                <div style={{ fontSize:12, color:T.muted, marginBottom:6 }}>Respiratory Rate</div>
                <div style={{ fontSize:20, fontWeight:800 }}>{vitals.rr} /min</div>
                <div style={{ height:8, background:'#021018', borderRadius:4, marginTop:8 }}><div style={{ width: Math.min(100, vitals.rr*2)+ '%', height:'100%', background:T.yellow, borderRadius:4 }} /></div>
              </div>

              <div style={{ padding:8, borderRadius:8, background:'#06101a', color:T.text }}>
                <div style={{ fontSize:12, color:T.muted, marginBottom:6 }}>SpO₂</div>
                <div style={{ fontSize:20, fontWeight:800 }}>{vitals.spo2}%</div>
                <div style={{ height:8, background:'#021018', borderRadius:4, marginTop:8 }}><div style={{ width: vitals.spo2+ '%', height:'100%', background:T.cyan, borderRadius:4 }} /></div>
              </div>

              <div style={{ padding:8, borderRadius:8, background:'#06101a', color:T.text }}>
                <div style={{ fontSize:12, color:T.muted, marginBottom:6 }}>Systolic BP</div>
                <div style={{ fontSize:20, fontWeight:800 }}>{vitals.sbp} mmHg</div>
                <div style={{ height:8, background:'#021018', borderRadius:4, marginTop:8 }}><div style={{ width: Math.min(100, vitals.sbp/1.5)+ '%', height:'100%', background:T.green, borderRadius:4 }} /></div>
              </div>
            </div>

            <div style={{ marginTop:12, display:'flex', gap:8, flexWrap:'wrap' }}>
              <button onClick={() => addAction({ type:'nebulizer', label:'Administer salbutamol nebulizer' })} style={{ padding:'8px 12px', borderRadius:8, border:'none', background:T.violet, color:'#fff' }}>Give Nebulizer</button>
              <button onClick={() => addAction({ type:'oxygen', label:'Start oxygen via mask' })} style={{ padding:'8px 12px', borderRadius:8, border:'none', background:T.cyan, color:'#001' }}>Start Oxygen</button>
              <button onClick={() => addAction({ type:'steroid', label:'Give systemic steroid' })} style={{ padding:'8px 12px', borderRadius:8, border:`1px solid ${T.border}`, background:'transparent', color:T.muted }}>Give Steroid</button>
              <button onClick={() => addAction({ type:'antibiotic', label:'Start antibiotics' })} style={{ padding:'8px 12px', borderRadius:8, border:`1px solid ${T.border}`, background:'transparent', color:T.muted }}>Start Antibiotics</button>
              <button onClick={() => addAction({ type:'icu', label:'Escalate to ICU' })} style={{ padding:'8px 12px', borderRadius:8, border:'none', background:T.red, color:'#fff' }}>Escalate to ICU</button>
            </div>

            <div style={{ marginTop:12, display:'flex', gap:8 }}>
              {!running ? (
                <button onClick={startCase} style={{ padding:'8px 12px', borderRadius:8, border:'none', background:T.cyan }}>Start Case</button>
              ) : (
                <button onClick={() => setRunning(false)} style={{ padding:'8px 12px', borderRadius:8, border:`1px solid ${T.border}`, background:'transparent', color:T.muted }}>Pause</button>
              )}
              <button onClick={resetCase} style={{ padding:'8px 12px', borderRadius:8, border:`1px solid ${T.border}`, background:'transparent', color:T.muted }}>Reset</button>
              <button onClick={submitCase} style={{ padding:'8px 12px', borderRadius:8, border:'none', background:T.green, color:'#001' }}>Submit Case</button>
            </div>
          </div>

          <div style={{ marginTop:12 }}>
            <div style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:6 }}>Timeline</div>
            <div style={{ background:'#070815', border:`1px solid ${T.border}`, borderRadius:8, padding:10, maxHeight:200, overflow:'auto', color:T.muted }}>
              {timeline.length ? timeline.slice().reverse().map((ev,idx)=>(
                <div key={idx} style={{ padding:'6px 0', borderBottom: idx<timeline.length-1?`1px dashed ${T.border}`:'none' }}>
                  <div style={{ fontSize:12, color:T.dim }}>{formatTime(ev.t)}</div>
                  <div style={{ fontSize:13 }}>{ev.note}</div>
                </div>
              )) : <div style={{ color:T.dim }}>No events yet. Start the case and take actions.</div>}
            </div>
          </div>
        </div>

        <div style={{ width:320 }}>
          <div style={{ background:T.bg, borderRadius:8, padding:12, color:T.muted }}>
            <div style={{ fontSize:13, fontWeight:700, color:T.text }}>Case Summary</div>
            <div style={{ marginTop:8 }}>Score: <strong style={{ color:T.green }}>{score}</strong></div>
            <div style={{ marginTop:6 }}>Actions taken: {actions.length}</div>
            <div style={{ marginTop:8 }}>
              <div style={{ fontSize:12, color:T.dim }}>Quick assessment</div>
              <div style={{ marginTop:6 }}>
                <div>HR: {vitals.hr} · RR: {vitals.rr} · SpO₂: {vitals.spo2}% · SBP: {vitals.sbp}</div>
              </div>
            </div>
            <div style={{ marginTop:12 }}>
              <div style={{ fontSize:12, color:T.dim }}>Submission</div>
              <div style={{ marginTop:6 }}>
                <div style={{ color:T.muted }}>Click <strong>Submit Case</strong> to save your run to the database for instructor review.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BusinessSim() {
  const [budget, setBudget] = useState({ social:30, search:40, email:30 });
  const [result, setResult] = useState(null);

  function simulate() {
    // Simple deterministic model: ROI = sum(channelBudget * efficiency)
    const eff = { social: 0.8, search: 1.2, email: 0.6 };
    const roi = Math.round((budget.social*eff.social + budget.search*eff.search + budget.email*eff.email)/10);
    setResult({ roi, revenue: roi*1000, spend: budget.social+budget.search+budget.email });
  }

  return (
    <div>
      <div style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:8 }}>Marketing Budget Simulator</div>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {['social','search','email'].map(k=> (
          <div key={k} style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:80, textTransform:'capitalize', color:T.muted }}>{k}</div>
            <input type="range" min={0} max={100} value={budget[k]} onChange={e=>setBudget(b=>({...b,[k]:Number(e.target.value)}))} />
            <div style={{ width:40, textAlign:'right', color:T.text }}>{budget[k]}</div>
          </div>
        ))}
        <div style={{ display:'flex', gap:8, marginTop:8 }}>
          <button onClick={simulate} style={{ padding:'8px 12px', borderRadius:8, border:'none', background:T.cyan, color:T.bg }}>Simulate</button>
          <button onClick={() => setBudget({ social:30, search:40, email:30 })} style={{ padding:'8px 12px', borderRadius:8, border:`1px solid ${T.border}`, background:'transparent', color:T.muted }}>Reset</button>
        </div>
        {result && (
          <div style={{ marginTop:8, background:T.bg, border:`1px dashed ${T.border}`, borderRadius:8, padding:10, color:T.muted }}>
            <div>Estimated ROI: <strong style={{ color:T.green }}>{result.roi}%</strong></div>
            <div>Estimated Revenue: <strong style={{ color:T.text }}>₦{result.revenue.toLocaleString()}</strong></div>
            <div>Total Spend: <strong style={{ color:T.text }}>{result.spend}</strong></div>
          </div>
        )}
      </div>
    </div>
  );
}
