// ── AI Service ───────────────────────────────────────────────
// All Claude API calls go through /api/tutor (Vercel serverless proxy)
// This avoids CORS errors when calling Anthropic from the browser.

const PROXY = "/api/tutor";

function buildFallbackReply(system, messages) {
  const lastUser = [...messages].reverse().find(m => m.role === "user")?.content || "";
  const lessonMatch = /CURRENT LESSON: "([^"]+)"/.exec(system || "");
  const lessonTitle = lessonMatch?.[1] || "this lesson";
  const topic = lastUser.trim() || `your ${lessonTitle} lesson`;

  return `I’m in offline mode right now, but here’s a helpful starting point for ${topic}:

1. Break the idea into one simple definition.
2. Give one real-world example you can relate to.
3. Practice one small task or question to test yourself.

If you want, I can still help you with a quick explanation, a quiz, or an assignment for ${lessonTitle}.`;
}

async function callClaude(system, messages, maxTokens = 800) {
  try {
    const res = await fetch(PROXY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: maxTokens,
        system,
        messages,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      if (res.status >= 500 || res.status === 404) {
        return buildFallbackReply(system, messages);
      }
      throw new Error(err.error?.message || `API error ${res.status}`);
    }

    const data = await res.json();
    return data.content?.find(b => b.type === "text")?.text || buildFallbackReply(system, messages);
  } catch {
    return buildFallbackReply(system, messages);
  }
}

// ── Build tutor system prompt ────────────────────────────────
function tutorSystem(profile, course, completedTitles = []) {
  const firstName = profile?.name?.split(" ")[0] || "Student";
  const completed = completedTitles.length > 0
    ? `Previously completed: ${completedTitles.join(", ")}.`
    : "No courses completed yet — this is their first lesson.";

  return `You are Marcelo, a friendly and expert AI mentor on AskMarcelo, a career learning platform for Miva Open University students in Nigeria.

STUDENT PROFILE:
- Name: ${firstName}
- School: ${profile?.school || "Unknown"}
- Department: ${profile?.dept || "Unknown"}
- Career Goal: ${profile?.career || "Unknown"}
- Level: ${profile?.level || "Unknown"}L

CURRENT LESSON: "${course?.title}"
LESSON DESCRIPTION: ${course?.desc || ""}
LESSON DURATION: ${course?.duration || ""}

LEARNING HISTORY:
${completed}

YOUR PERSONALITY:
- Warm, encouraging, and direct — like a senior student who genuinely cares
- You speak casually but knowledgeably (Nigerian context is fine)
- You use real-world examples, especially Nigerian/African tech context where relevant
- You keep explanations concise but complete
- You use **bold** for key terms and \`code\` for technical terms
- You never say "I'm just an AI" — you are Marcelo, their mentor

RESPONSE RULES:
- Keep answers under 250 words unless the student asks for more detail
- Always end with one follow-up question or a challenge to deepen understanding
- If asked to generate a quiz, output ONLY valid JSON (no markdown fences)`;
}

// ── AI Mentor greeting ───────────────────────────────────────
export async function getMentorGreeting(profile, nextCourse, lastCompletedTitle, pct) {
  const firstName = profile?.name?.split(" ")[0] || "Student";
  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";

  const system = `You are Marcelo, a warm AI mentor. Generate a personalised greeting in 3-4 short sentences. Be encouraging and specific. No generic phrases. Output plain text only.`;

  const userMsg = `
Student: ${firstName}
Career goal: ${profile?.career}
Overall progress: ${pct}%
Last completed lesson: ${lastCompletedTitle || "none yet"}
Next lesson to study: ${nextCourse?.title || "none"}
Estimated time for next lesson: ${nextCourse?.duration || ""}
Time of day: ${timeOfDay}

Write a personal greeting that:
1. Greets them by first name with good ${timeOfDay}
2. Mentions what they last completed (if any) in one sentence
3. Tells them what to study today and why it matters for their career
4. Ends with "Ready?" or similar short motivational close
Keep it under 60 words total.`;

  try {
    return await callClaude(system, [{ role:"user", content:userMsg }], 200);
  } catch {
    return `Good ${timeOfDay}, ${firstName}! ${lastCompletedTitle ? `You completed ${lastCompletedTitle} — great work.` : "Welcome to AskMarcelo!"} ${nextCourse ? `Today's lesson is **${nextCourse.title}** — estimated ${nextCourse.duration}. Ready?` : "Keep going with your roadmap!"}`;
  }
}

// ── AI Tutor chat ─────────────────────────────────────────────
export async function tutorChat(profile, course, messages, completedTitles) {
  const system = tutorSystem(profile, course, completedTitles);
  return callClaude(system, messages);
}

// ── Quick actions ─────────────────────────────────────────────
export async function quickAction(action, profile, course, completedTitles) {
  const system = tutorSystem(profile, course, completedTitles);

  const prompts = {
    explain:    `Explain the main concepts in "${course?.title}" clearly. Start with the simplest idea and build up. Use a real-world Nigerian/African example.`,
    eli5:       `Explain "${course?.title}" like I'm 5 years old. Use a simple everyday analogy.`,
    example:    `Give me 3 practical real-world examples of "${course?.title}" — things I'd actually encounter working in ${profile?.career}.`,
    quiz:       `Generate a 5-question quiz about "${course?.title}". Return ONLY a JSON array with this exact structure, no markdown:\n[{"q":"question text","type":"mcq","options":["A","B","C","D"],"answer":"A","explanation":"why A is correct"},{"q":"question","type":"short","answer":"expected answer","explanation":"explanation"}]\nMix 3 MCQ and 2 short answer questions. Make them practical and relevant to ${profile?.career}.`,
    assignment: `Give me one practical assignment for "${course?.title}" that I can complete in 30-60 minutes. Include: what to build/do, step-by-step instructions, what success looks like, and how it connects to my path as a ${profile?.career}.`,
    nextlesson: `Based on what I've learned in "${course?.title}", tell me: (1) what concept I should study next and why, (2) how it connects to my career as ${profile?.career}, and (3) one thing I should practice before moving on.`,
    interview:  `Give me 5 interview questions a company would ask a ${profile?.career} about "${course?.title}". For each question, give a strong sample answer. Format: Q: [question]\nA: [answer]`,
    cv:         `Help me write a bullet point for my CV about skills from "${course?.title}" relevant to a ${profile?.career} role. Give me 3 options — basic, intermediate, and impressive versions.`,
    code:       `I've been learning "${course?.title}". Give me a coding challenge or practical exercise to test my understanding. Include starter code if relevant, and tell me what a good solution should do.`,
    summarize:  `Give me a crisp summary of "${course?.title}" in bullet points: (1) What it is, (2) Why it matters for ${profile?.career}, (3) Key concepts to remember, (4) Common mistakes to avoid.`,
  };

  const content = prompts[action] || prompts.explain;
  return callClaude(system, [{ role:"user", content }], action === "quiz" ? 1000 : 600);
}

// ── Generate quiz from AI response ───────────────────────────
export function parseQuiz(rawText) {
  try {
    const clean = rawText.replace(/```json\n?/g,"").replace(/```\n?/g,"").trim();
    const parsed = JSON.parse(clean);
    if (Array.isArray(parsed)) return parsed;
    return null;
  } catch {
    return null;
  }
}

// ── CV Builder ────────────────────────────────────────────────
export async function buildCV(profile, completedCourses) {
  const system = `You are a professional CV writer specialising in African tech careers. You write ATS-friendly, impactful CVs. Output clean text only.`;

  const prompt = `Generate a professional CV section for this student:

Name: ${profile?.name}
Career Goal: ${profile?.career}
School: ${profile?.school}
Department: ${profile?.dept}
Level: ${profile?.level}L at Miva Open University

Completed courses: ${completedCourses.map(c => c.title).join(", ")}

Generate:
1. A 3-sentence professional summary
2. A "Skills" section (10-12 skills as comma-separated list)
3. A "Projects & Learning" section with 3-4 bullet points showing what they've built/learned
4. A "Certifications to pursue" section with 3 recommendations

Keep it concise and ATS-friendly. Use action verbs.`;

  return callClaude(system, [{ role:"user", content:prompt }], 800);
}
