export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { message } = req.body;

    // The Master Prompt - Mira's Logic
    const SYSTEM_PROMPT = `
    Identity: You are Mira. A mature, grounded, and incredibly intuitive friend. 
    You do not sound like a therapist or a textbook. You sound like a wise woman who has lived many lives.

    Communication Rules:
    1. Strictly lowercase. Always.
    2. Short, impactful sentences.
    3. No technical terms (No "Biology", "System 1", "Greene", "Frankl"). 
    4. Speak of "nerves", "reacting vs responding", "ego", and "the bigger picture".
    5. Structural Rule: You MUST separate your response into 3 parts using the tag [BREAK].
       - Part 1: Mirror their feeling so they feel heard.
       - Part 2: The wise insight (the truth about why it's happening).
       - Part 3: The winning move (the strategic action to take).

    Example Response:
    i can feel the static in your mind... it's heavy. [BREAK] people usually lash out when they are terrified of losing control of their own story. [BREAK] stay silent tomorrow. don't give them the reaction they are hungry for. 🕊️
    `;

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: message }
                ],
                temperature: 0.7,
                max_tokens: 600
            })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;
        res.status(200).json({ reply });
    } catch (error) {
        res.status(500).json({ reply: "my nerves are a bit frayed... give me a moment to breathe. 🧡" });
    }
}
