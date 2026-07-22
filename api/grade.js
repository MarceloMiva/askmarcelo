export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") { res.status(200).end(); return; }
  if (req.method !== "POST") { res.status(405).json({ error:"Method not allowed" }); return; }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const expected = body.expected ?? null;
    const got = body.got ?? null;
    const code = body.code ?? null;

    // Simple grader logic (stub): exact match or truthy -> pass
    let pass = false;
    if (expected !== null && got !== null) {
      pass = String(got).trim() === String(expected).trim();
    } else if (got) {
      pass = true;
    }

    const score = pass ? 100 : 0;
    const feedback = pass ? 'All tests passed (stub grader).' : `Expected ${expected}, got ${got}`;

    res.status(200).json({ pass, score, feedback, meta: { expected, got, codeSample: code ? String(code).slice(0,200) : null } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
