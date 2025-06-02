export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { prompt } = req.body;
  const apiKey = process.env.GROQ_API_KEY;

  try {
    const groqRes = await fetch('https://api.groq.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 512,
      }),
    });

    const data = await groqRes.json();
    const content = data.choices?.[0]?.message?.content ?? 'No response.';

    res.status(200).json({ content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
