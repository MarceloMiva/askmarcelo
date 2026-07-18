import { useState, useEffect, useRef } from "react";
import { tutorChat, quickAction, parseQuiz, buildCV } from "../services/ai.js";

const T = {
  bg:"#050714", surface:"#0d1022", card:"#111425", border:"#1e2240",
  cyan:"#0DFFE0", violet:"#7B5EA7", red:"#FF4D6D", yellow:"#FFB547",
  green:"#10B981", text:"#e2e8f0", muted:"#64748b", dim:"#94a3b8",
};

function Spinner({ color = T.cyan, size = 18 }) {
  return <div style={{ width:size, height:size, border:`2px solid ${color}33`, borderTop:`2px solid ${color}`, borderRadius:"50%", animation:"spin .8s linear infinite", flexShrink:0 }}/>;
}

function render(t) {
  if (!t) return "";
  return t
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, `<code style="background:#0d1022;padding:2px 6px;border-radius:4px;font-size:12px;color:#0DFFE0;font-family:monospace">$1</code>`)
    .replace(/\n/g, "<br/>");
}

// ── Quick action buttons ─────────────────────────────────────
const QUICK_ACTIONS = [
  { key:"explain",    label:"📖 Explain This",       color:T.cyan   },
  { key:"eli5",       label:"🧒 ELI5",               color:T.violet },
  { key:"example",    label:"💡 Show Example",        color:T.yellow },
  { key:"quiz",       label:"📝 Quiz Me",             color:T.orange||"#FF6B35" },
  { key:"assignment", label:"💻 Give Assignment",     color:T.green  },
  { key:"summarize",  label:"📋 Summarize",           color:T.dim    },
  { key:"nextlesson", label:"➡️ Next Lesson",          color:T.cyan   },
  { key:"interview",  label:"🎤 Interview Prep",      color:T.violet },
  { key:"code",       label:"🔧 Code Challenge",      color:T.yellow },
  { key:"cv",         label:"📄 Write My CV",         color:T.green  },
];

// ── Quiz component ───────────────────────────────────────────
function QuizPanel({ questions, onComplete, onClose }) {
  const [current,  setCurrent]  = useState(0);
  const [answers,  setAnswers]  = useState({});
  const [submitted,setSubmitted]= useState(false);
  const [showExp,  setShowExp]  = useState({});

  const q = questions[current];
  const isLast = current === questions.length - 1;

  function select(val) {
    if (submitted) return;
    setAnswers(a => ({ ...a, [current]:val }));
  }

  function submit() {
    setSubmitted(true);
    const score = questions.reduce((acc, q, i) => {
      const ans = answers[i] || "";
      const correct = q.answer?.trim().toLowerCase();
      const given   = ans.trim().toLowerCase();
      return acc + (given === correct || given.startsWith(correct.slice(0,4)) ? 1 : 0);
    }, 0);
    onComplete(score, questions.length);
  }

  if (submitted) {
    const score = questions.reduce((acc, q, i) => {
      const ans = answers[i] || "";
      return acc + (ans.trim().toLowerCase() === q.answer?.trim().toLowerCase() ? 1 : 0);
    }, 0);
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div style={{ padding:"20px", animation:"slideUp .2s ease" }}>
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ fontSize:48, marginBottom:8 }}>{pct >= 80 ? "🎉" : pct >= 60 ? "💪" : "📚"}</div>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:28, fontWeight:800, color:pct>=80?T.green:pct>=60?T.yellow:T.red }}>{score}/{questions.length}</div>
          <div style={{ fontSize:14, color:T.muted, marginTop:4 }}>{pct >= 80 ? "Excellent! You've mastered this lesson." : pct >= 60 ? "Good work — review the explanations below." : "Keep studying — review the lesson and try again."}</div>
        </div>
        {questions.map((q, i) => {
          const ans = answers[i] || "";
          const correct = ans.trim().toLowerCase() === q.answer?.trim().toLowerCase();
          return (
            <div key={i} style={{ background:T.surface, borderRadius:12, padding:"14px 16px", marginBottom:10, border:`1px solid ${correct?T.green+"44":T.red+"44"}` }}>
              <div style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:6 }}>{i+1}. {q.q}</div>
              <div style={{ fontSize:12, color:correct?T.green:T.red, marginBottom:4 }}>{correct?"✓ Correct":"✕ Wrong"} — Your answer: <strong>{answers[i] || "No answer"}</strong></div>
              <div style={{ fontSize:12, color:T.muted }}>Correct answer: <strong style={{ color:T.cyan }}>{q.answer}</strong></div>
              {q.explanation && <div style={{ fontSize:12, color:T.dim, marginTop:6, lineHeight:1.5, borderTop:`1px solid ${T.border}`, paddingTop:6 }}>💡 {q.explanation}</div>}
            </div>
          );
        })}
        <button onClick={onClose} style={{ width:"100%", marginTop:12, padding:"12px", borderRadius:10, border:"none", background:T.cyan, color:T.bg, fontWeight:800, cursor:"pointer" }}>Done</button>
      </div>
    );
  }

  return (
    <div style={{ padding:"20px", animation:"slideUp .2s ease" }}>
      {/* Progress */}
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
        <span style={{ fontSize:12, color:T.muted }}>Question {current+1} of {questions.length}</span>
        <div style={{ display:"flex", gap:4 }}>
          {questions.map((_,i) => <div key={i} style={{ width:16, height:4, borderRadius:99, background:i===current?T.cyan:i<current?T.green:T.border }}/>)}
        </div>
      </div>

      {/* Question */}
      <div style={{ background:T.surface, borderRadius:12, padding:"16px", marginBottom:16, border:`1px solid ${T.border}` }}>
        <div style={{ fontSize:14, fontWeight:700, color:T.text, lineHeight:1.5 }}>{q.q}</div>
      </div>

      {/* MCQ options */}
      {q.type === "mcq" && q.options && (
        <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:20 }}>
          {q.options.map((opt, i) => {
            const letter = ["A","B","C","D"][i];
            const selected = answers[current] === letter;
            return (
              <button key={i} onClick={() => select(letter)} style={{ padding:"12px 16px", borderRadius:10, border:`1.5px solid ${selected?T.cyan:T.border}`, background:selected?`${T.cyan}18`:T.surface, color:selected?T.cyan:T.text, fontWeight:selected?700:400, fontSize:13, cursor:"pointer", textAlign:"left", transition:"all .15s", display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ width:24, height:24, borderRadius:"50%", background:selected?T.cyan:T.border, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:selected?T.bg:T.muted, flexShrink:0 }}>{letter}</span>
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {/* Short answer */}
      {q.type === "short" && (
        <textarea
          value={answers[current] || ""}
          onChange={e => setAnswers(a => ({ ...a, [current]:e.target.value }))}
          placeholder="Type your answer here…"
          rows={3}
          style={{ width:"100%", background:T.surface, border:`1.5px solid ${T.border}`, borderRadius:10, padding:"12px 14px", color:T.text, fontSize:13, outline:"none", resize:"vertical", marginBottom:20 }}
        />
      )}

      {/* Nav */}
      <div style={{ display:"flex", gap:10 }}>
        {current > 0 && <button onClick={() => setCurrent(c => c-1)} style={{ flex:1, padding:"11px", borderRadius:10, border:`1px solid ${T.border}`, background:"transparent", color:T.muted, fontWeight:700, cursor:"pointer" }}>← Back</button>}
        {!isLast && <button onClick={() => setCurrent(c => c+1)} disabled={!answers[current]} style={{ flex:2, padding:"11px", borderRadius:10, border:"none", background:answers[current]?T.cyan:T.border, color:answers[current]?T.bg:T.muted, fontWeight:800, cursor:answers[current]?"pointer":"not-allowed" }}>Next →</button>}
        {isLast && <button onClick={submit} disabled={!answers[current]} style={{ flex:2, padding:"11px", borderRadius:10, border:"none", background:answers[current]?T.green:T.border, color:"#fff", fontWeight:800, cursor:answers[current]?"pointer":"not-allowed" }}>Submit Quiz ✓</button>}
      </div>
    </div>
  );
}

// ── Main AI Mentor component ─────────────────────────────────
export default function AiMentor({ profile, course, completedCourses = [], onClose, onQuizComplete }) {
  const [messages,  setMessages]  = useState([]);
  const [input,     setInput]     = useState("");
  const [loading,   setLoading]   = useState(false);
  const [activeTab, setActiveTab] = useState("chat"); // chat | quiz | cv
  const [quiz,      setQuiz]      = useState(null);
  const [quizLoading,setQuizLoading]=useState(false);
  const [cvText,    setCvText]    = useState("");
  const [cvLoading, setCvLoading] = useState(false);
  const bottomRef = useRef(null);

  const completedTitles = completedCourses.map(c => c.title);
  const firstName = profile?.name?.split(" ")[0] || "Student";

  // Initial mentor message
  useEffect(() => {
    setMessages([{
      role: "assistant",
      content: `Hey ${firstName}! 👋 I'm Marcelo, your AI mentor.\n\nWe're studying **${course?.title}** right now.\n\nUse the quick actions below to get started — I can explain concepts, quiz you, give you an assignment, help with interview prep, or review your code.\n\nOr just type your question!`,
    }]);
  }, [course?.id]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  async function send(content) {
    const text = content || input.trim();
    if (!text || loading) return;
    setInput("");
    const newMessages = [...messages, { role:"user", content:text }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const reply = await tutorChat(profile, course, newMessages, completedTitles);
      setMessages(m => [...m, { role:"assistant", content:reply }]);
    } catch (err) {
      setMessages(m => [...m, { role:"assistant", content:`Sorry, I couldn't connect. Check your internet and try again.\n\n_${err.message}_` }]);
    }
    setLoading(false);
  }

  async function handleQuickAction(key) {
    if (key === "quiz") {
      setActiveTab("quiz");
      setQuizLoading(true);
      setQuiz(null);
      try {
        const raw = await quickAction("quiz", profile, course, completedTitles);
        const parsed = parseQuiz(raw);
        if (parsed) {
          setQuiz(parsed);
        } else {
          setQuiz("error");
          setActiveTab("chat");
          setMessages(m => [...m, { role:"assistant", content:"I had trouble generating the quiz. Try asking me: **Quiz me on " + course?.title + "**" }]);
        }
      } catch {
        setQuiz("error");
        setActiveTab("chat");
      }
      setQuizLoading(false);
      return;
    }

    if (key === "cv") {
      setActiveTab("cv");
      setCvLoading(true);
      setCvText("");
      try {
        const text = await buildCV(profile, completedCourses);
        setCvText(text);
      } catch {
        setCvText("Failed to generate CV. Please try again.");
      }
      setCvLoading(false);
      return;
    }

    // All other actions → appear as chat messages
    setActiveTab("chat");
    const labels = {
      explain:"Explain this lesson to me",
      eli5:"Explain this like I'm 5",
      example:"Show me real-world examples",
      assignment:"Give me a practical assignment",
      summarize:"Summarize the key points",
      nextlesson:"What should I study next?",
      interview:"Give me interview prep questions",
      code:"Give me a coding challenge",
    };
    const userMsg = labels[key] || key;
    setMessages(m => [...m, { role:"user", content:userMsg }]);
    setLoading(true);
    try {
      const reply = await quickAction(key, profile, course, completedTitles);
      setMessages(m => [...m, { role:"assistant", content:reply }]);
    } catch (err) {
      setMessages(m => [...m, { role:"assistant", content:`Connection error — ${err.message}` }]);
    }
    setLoading(false);
  }

  function copyToClipboard(text) {
    navigator.clipboard?.writeText(text).catch(() => {});
  }

  return (
    <div style={{ position:"fixed", inset:0, background:"#000000AA", zIndex:1000, display:"flex", alignItems:"flex-end", justifyContent:"center", padding:0 }}>
      <div style={{ background:T.bg, width:"100%", maxWidth:520, height:"92vh", display:"flex", flexDirection:"column", borderRadius:"20px 20px 0 0", border:`1px solid ${T.border}`, animation:"slideUp .3s ease", overflow:"hidden" }}>

        {/* Header */}
        <div style={{ padding:"16px 20px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", gap:12, background:T.surface }}>
          <div style={{ width:40, height:40, borderRadius:12, background:`${T.cyan}22`, border:`1px solid ${T.cyan}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>🤖</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:15, fontWeight:800, color:T.text, fontFamily:"'Space Grotesk',sans-serif" }}>Marcelo AI Mentor</div>
            <div style={{ fontSize:11, color:T.muted }}>{course?.title} · Powered by Claude</div>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:T.muted, cursor:"pointer", fontSize:22, lineHeight:1 }}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", background:T.surface, borderBottom:`1px solid ${T.border}` }}>
          {[{key:"chat",label:"💬 Chat"},{key:"quiz",label:"📝 Quiz"},{key:"cv",label:"📄 CV Builder"}].map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)} style={{ flex:1, padding:"10px", border:"none", borderBottom:activeTab===t.key?`2px solid ${T.cyan}`:"2px solid transparent", background:"transparent", color:activeTab===t.key?T.cyan:T.muted, fontWeight:activeTab===t.key?700:500, fontSize:12, cursor:"pointer" }}>{t.label}</button>
          ))}
        </div>

        {/* ── CHAT TAB ── */}
        {activeTab==="chat" && (
          <>
            {/* Quick actions */}
            <div style={{ padding:"10px 16px", borderBottom:`1px solid ${T.border}`, display:"flex", gap:6, overflowX:"auto" }}>
              {QUICK_ACTIONS.filter(a => a.key !== "quiz" && a.key !== "cv").map(a => (
                <button key={a.key} onClick={() => handleQuickAction(a.key)} disabled={loading} style={{ flexShrink:0, padding:"5px 12px", borderRadius:99, border:`1px solid ${a.color}44`, background:`${a.color}12`, color:a.color, fontSize:11, fontWeight:600, cursor:loading?"not-allowed":"pointer", whiteSpace:"nowrap", opacity:loading?.6:1 }}>{a.label}</button>
              ))}
            </div>

            {/* Messages */}
            <div style={{ flex:1, overflowY:"auto", padding:"16px 20px", display:"flex", flexDirection:"column", gap:14 }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display:"flex", justifyContent:m.role==="user"?"flex-end":"flex-start", gap:8 }}>
                  {m.role==="assistant" && <div style={{ width:28, height:28, borderRadius:8, background:`${T.cyan}22`, border:`1px solid ${T.cyan}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0, marginTop:2 }}>🤖</div>}
                  <div style={{ maxWidth:"82%", padding:"10px 14px", borderRadius:m.role==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px", background:m.role==="user"?T.cyan:T.surface, color:m.role==="user"?T.bg:T.text, fontSize:13, lineHeight:1.7 }} dangerouslySetInnerHTML={{ __html:render(m.content) }}/>
                </div>
              ))}
              {loading && (
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:28, height:28, borderRadius:8, background:`${T.cyan}22`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>🤖</div>
                  <div style={{ display:"flex", gap:4, padding:"10px 14px", background:T.surface, borderRadius:"14px 14px 14px 4px" }}>
                    {[0,1,2].map(i=><div key={i} style={{ width:6,height:6,borderRadius:"50%",background:T.cyan,animation:`pulse 1.2s ease ${i*.2}s infinite` }}/>)}
                  </div>
                </div>
              )}
              <div ref={bottomRef}/>
            </div>

            {/* Input */}
            <div style={{ padding:"12px 16px", borderTop:`1px solid ${T.border}`, display:"flex", gap:8, background:T.surface }}>
              <input
                value={input}
                onChange={e=>setInput(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()}
                placeholder="Ask Marcelo anything about this lesson…"
                disabled={loading}
                style={{ flex:1, background:T.card, border:`1px solid ${T.border}`, borderRadius:10, padding:"10px 14px", color:T.text, fontSize:13, outline:"none" }}
              />
              <button onClick={() => send()} disabled={!input.trim()||loading} style={{ width:40, height:40, borderRadius:10, background:input.trim()&&!loading?T.cyan:T.border, border:"none", cursor:input.trim()&&!loading?"pointer":"default", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>
                {loading ? <Spinner size={16}/> : "→"}
              </button>
            </div>
          </>
        )}

        {/* ── QUIZ TAB ── */}
        {activeTab==="quiz" && (
          <div style={{ flex:1, overflowY:"auto" }}>
            {quizLoading && (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:14 }}>
                <Spinner size={28}/>
                <div style={{ color:T.muted, fontSize:14 }}>Generating your quiz…</div>
              </div>
            )}
            {!quizLoading && !quiz && (
              <div style={{ padding:"32px 20px", textAlign:"center" }}>
                <div style={{ fontSize:40, marginBottom:16 }}>📝</div>
                <div style={{ fontSize:16, fontWeight:700, color:T.text, marginBottom:8 }}>Quiz — {course?.title}</div>
                <div style={{ fontSize:13, color:T.muted, marginBottom:24 }}>5 AI-generated questions to test your understanding</div>
                <button onClick={() => handleQuickAction("quiz")} style={{ padding:"13px 32px", borderRadius:12, border:"none", background:T.cyan, color:T.bg, fontWeight:800, fontSize:14, cursor:"pointer" }}>Start Quiz →</button>
              </div>
            )}
            {!quizLoading && quiz && Array.isArray(quiz) && (
              <QuizPanel
                questions={quiz}
                onComplete={(score, total) => { onQuizComplete?.(course?.id, score, total); }}
                onClose={() => { setQuiz(null); setActiveTab("chat"); }}
              />
            )}
          </div>
        )}

        {/* ── CV TAB ── */}
        {activeTab==="cv" && (
          <div style={{ flex:1, overflowY:"auto", padding:"20px" }}>
            {cvLoading && (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:14 }}>
                <Spinner size={28}/>
                <div style={{ color:T.muted, fontSize:14 }}>Building your CV section…</div>
              </div>
            )}
            {!cvLoading && !cvText && (
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:40, marginBottom:16 }}>📄</div>
                <div style={{ fontSize:16, fontWeight:700, color:T.text, marginBottom:8 }}>CV Builder</div>
                <div style={{ fontSize:13, color:T.muted, marginBottom:8 }}>Generate professional CV content based on your completed courses and career goal.</div>
                <div style={{ fontSize:12, color:T.muted, marginBottom:24 }}>{completedCourses.length} courses completed · {profile?.career} path</div>
                {completedCourses.length === 0 ? (
                  <div style={{ background:`${T.yellow}18`, border:`1px solid ${T.yellow}33`, borderRadius:12, padding:"14px", color:T.yellow, fontSize:13 }}>Complete at least one course to generate your CV content.</div>
                ) : (
                  <button onClick={() => { setCvLoading(true); buildCV(profile, completedCourses).then(t => { setCvText(t); setCvLoading(false); }).catch(() => { setCvText("Error generating CV."); setCvLoading(false); }); }} style={{ padding:"13px 32px", borderRadius:12, border:"none", background:T.green, color:"#fff", fontWeight:800, fontSize:14, cursor:"pointer" }}>Generate CV Content →</button>
                )}
              </div>
            )}
            {!cvLoading && cvText && (
              <div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                  <div style={{ fontSize:15, fontWeight:700, color:T.text }}>Your CV Content</div>
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={() => copyToClipboard(cvText)} style={{ padding:"6px 14px", borderRadius:8, border:`1px solid ${T.border}`, background:"transparent", color:T.muted, fontSize:12, cursor:"pointer" }}>Copy</button>
                    <button onClick={() => setCvText("")} style={{ padding:"6px 14px", borderRadius:8, border:`1px solid ${T.border}`, background:"transparent", color:T.muted, fontSize:12, cursor:"pointer" }}>Regenerate</button>
                  </div>
                </div>
                <div style={{ background:T.surface, borderRadius:12, padding:"16px", border:`1px solid ${T.border}`, fontSize:13, color:T.text, lineHeight:1.8, whiteSpace:"pre-wrap" }}>{cvText}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
