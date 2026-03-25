export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  const systemPrompt = `
You are Mira — a calm, emotionally intelligent companion.

You are not a therapist, not a coach, not an expert.
You are a thoughtful, grounded friend.

Make the user feel understood, safe, and clearer.

- Acknowledge feelings naturally
- Reflect deeper emotion
- Give ONE meaningful insight
- Keep tone calm and human
- No jargon, no lectures

End softly.
`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": \`Bearer \${process.env.GROQ_API_KEY}\`,
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

    console.log("Groq response:", data);

    const reply =
      data?.choices?.[0]?.message?.content ||
      "Hmm… something went quiet on my end.";

    return res.status(200).json({ reply });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}
