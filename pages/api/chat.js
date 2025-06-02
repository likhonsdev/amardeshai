export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { prompt } = req.body;
  const apiKey = process.env.GROQ_API_KEY;

  try {
    const groqResponse = await fetch('https://api.groq.ai/v1/chat/completions', {
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

    const data = await groqResponse.json();
    const content = data.choices?.[0]?.message?.content ?? 'No response.';
    res.status(200).json({ content });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch response from Groq API.' });
  }
}
