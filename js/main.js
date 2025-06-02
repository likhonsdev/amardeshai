document.getElementById('submitBtn').addEventListener('click', async () => {
  const prompt = document.getElementById('promptInput').value.trim();
  const resultDiv = document.getElementById('result');

  if (!prompt) {
    resultDiv.textContent = 'Please enter a prompt.';
    return;
  }

  resultDiv.textContent = 'Thinking... 🤔';

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    const content = data.content || 'No response.';
    resultDiv.innerHTML = renderResponse(content);
  } catch (error) {
    resultDiv.textContent = 'An error occurred while fetching the response.';
  }
});
