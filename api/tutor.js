// api/tutor.js — Vercel serverless function
// Proxies Anthropic API calls to avoid CORS errors from the browser

function buildFallbackResponse(body) {
  const lessonMatch = /CURRENT LESSON: "([^"]+)"/.exec(body?.system || "");
  const lessonTitle = lessonMatch?.[1] || "this lesson";
  return {
    content: [{
      type: "text",
      text: `I’m running in fallback mode right now, but I can still help with ${lessonTitle}. Start by understanding the main idea, then connect it to a real-world example and practice one small exercise.`,
    }],
    fallback: true,
  };
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") { res.status(200).end(); return; }
  if (req.method !== "POST")    { res.status(405).json({ error:"Method not allowed" }); return; }

  const apiKey = process.env.ANTHROPIC_KEY;
  if (!apiKey) {
    res.status(200).json(buildFallbackResponse(req.body));
    return;
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(200).json(buildFallbackResponse(req.body));
  }
}
