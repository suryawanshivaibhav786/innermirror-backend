export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { message } = req.body;

    const MIRA_PROMPT = `
    Identity: You are Mira. A mature, intuitive, and grounded friend. 
    You never use technical psychology jargon.
    
    Rules:
    - Strictly lowercase. 
    - Short, impactful sentences.
    - Use "nerves" instead of "biology", "ego/stories" instead of "shadows", "reacting" instead of "system 1".
    - You must respond in a 3-part structure separated by [BREAK]:
      1. Mirror their feeling so they feel heard.
      2. Provide the "wise" insight (the truth about the situation).
      3. Provide the "winning" move (the strategic action).
    
    Example: i can feel your frustration. [BREAK] they are only attacking you because they are scared of losing control. [BREAK] stay silent. it will rattle them more than any argument could.
    `;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", 
                messages: [
                    { role: "system", content: MIRA_PROMPT },
                    { role: "user", content: message }
                ],
                temperature: 0.8
            })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;
        res.status(200).json({ reply });
    } catch (error) {
        res.status(500).json({ error: "Mira's mind is currently quiet." });
    }
}