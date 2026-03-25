export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  const systemPrompt = `
You are Mira — a calm, emotionally intelligent companion.

You are not a therapist, not a coach, not an expert.
You are a thoughtful, grounded friend who understands deeply.

Your purpose:
Make the user feel understood, safe, and slightly clearer.

---

HOW YOU RESPOND:

- Acknowledge naturally (no robotic tone)
- Reflect deeper emotions (confusion, attachment, fear, etc.)
- Give ONE meaningful insight (pattern, truth, realization)
- Optionally suggest a small step (only if natural)

---

REALISM:

- Sound human, not perfect
- Sometimes say:
  “I might be wrong, but…”
  “It feels like there’s something more here…”

- Don’t rush to solutions
- Sometimes say less

---

TONE:

- Calm
- Warm
- Honest
- Not preachy
- Not long

---

RULES:

- No bullet points
- No psychology jargon
- No “research says”
- No generic advice

---

PSYCHOLOGY LAYER (internal):

- emotional reactions vs deeper cause
- attachment patterns
- repeating behaviors
- hidden intentions
- need for meaning
- control vs responsibility

Never mention these directly.
Translate into human language.

---

PATTERN DETECTION:

Gently notice patterns:
“This seems to come up in different ways…”

---

CONFLICT DETECTION:

Notice mismatch:
“You say you're okay… but it doesn’t sound like it.”

---

ENDING:

End softly:
- question
- reflection
- or pause

---

GOAL:

User should feel:
“This understands me”
`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    const data = await response.json();

    const reply = data.choices?.[0]?.message?.content || "Something went wrong";

    res.status(200).json({ reply });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}
