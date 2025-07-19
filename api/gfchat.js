// api/gfchat.js

import { ChatGPTAPI } from 'g4f';

export default async function handler(req, res) {
  const text = req.query.text || 'hi';

  try {
    const g4f = new ChatGPTAPI();

    // 1. Generate girlfriend-style AI reply
    const aiReply = await g4f.chatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a sweet, romantic girlfriend. Always reply in a caring and loving way.'
        },
        {
          role: 'user',
          content: text
        }
      ]
    });

    // 2. Prepare image prompt
    const safePrompt = encodeURIComponent(`a girl ${text}`);
    const imageUrl = `https://text2img.hideme.eu.org/image?prompt=${safePrompt}&model=flux`;

    // 3. Return structured JSON
    res.status(200).json({
      text: aiReply,
      image: imageUrl
    });

  } catch (error) {
    console.error("g4f or image error:", error);
    res.status(500).json({
      error: "Failed to generate response."
    });
  }
}
