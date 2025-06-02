function renderResponse(content) {
  // Render LaTeX expressions enclosed in <math> tags
  content = content.replace(/<math>(.*?)<\/math>/g, (match, expr) => {
    try {
      return katex.renderToString(expr, { throwOnError: false });
    } catch {
      return expr;
    }
  });

  // Render code blocks with metadata
  content = content.replace(/```(\w+)(.*?)\n([\s\S]*?)```/g, (match, lang, meta, code) => {
    const metadata = parseMetadata(meta);
    return `<pre><code class="language-${lang}" data-meta='${JSON.stringify(metadata)}'>${escapeHtml(code)}</code></pre>`;
  });

  // Render custom components
  content = content.replace(/<LinearProcessFlow \/>/g, renderLinearProcessFlow());
  content = content.replace(/<Quiz \/>/g, renderQuiz());

  // Remove <Thinking> tags
  content = content.replace(/<Thinking>([\s\S]*?)<\/Thinking>/g, '');

  return content;
}

function parseMetadata(metaString) {
  const metadata = {};
  const regex = /(\w+)="([^"]*)"/g;
  let match;
  while ((match = regex.exec(metaString)) !== null) {
    metadata[match[1]] = match[2];
  }
  return metadata;
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
