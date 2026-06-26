export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { imageData } = req.body;

  if (!imageData) {
    return res.status(400).json({ error: 'No image data provided' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: 'image/jpeg',
                  data: imageData
                }
              },
              {
                type: 'text',
                text: `Analyze this PC builder screenshot and extract the selected components.
                Return ONLY a valid JSON object with keys: cpu, gpu, ram, storage, case, cooling
                For each key, provide the exact component name as shown in the image.
                If a component is not visible, omit that key.
                Example: {"cpu": "AMD Ryzen 9 7950X", "gpu": "NVIDIA RTX 4090"}
                Return ONLY the JSON, no other text, no markdown formatting.`
              }
            ]
          }
        ]
      })
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Claude API error',
        details: result
      });
    }

    const content = result.content[0].text;
    const components = JSON.parse(content);

    return res.status(200).json(components);
  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json({
      error: 'Failed to analyze image',
      message: error.message
    });
  }
}
