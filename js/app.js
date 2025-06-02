const btn = document.getElementById('submitBtn');
const input = document.getElementById('promptInput');
const result = document.getElementById('result');

btn.addEventListener('click', async () => {
  const prompt = input.value.trim();
  if (!prompt) return alert('Please type something first.');

  result.textContent = 'Thinking... 🤔';

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    result.textContent = data.content || 'No response.';
  } catch (err) {
    result.textContent = 'Something went wrong 😵';
  }
});
