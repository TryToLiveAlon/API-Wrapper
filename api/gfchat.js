import { ChatGPTAPI } from 'g4f';

export default async function handler(req, res) {
  const userInput = req.query.text || 'hi';
  
  try {
    // 1. Generate a girlfriend-style AI reply
    const g4f = new ChatGPTAPI();
    const aiText = await g4f.chatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a romantic girlfriend. Always reply lovingly and sweetly.'
        },
        {
          role: 'user',
          content: userInput
        }
      ]
    });

    // 2. Generate image prompt (same as userInput for now)
    const prompt = encodeURIComponent(`a girl ${userInput}`);
    const imageUrl = `https://text2img.hideme.eu.org/image?prompt=${prompt}&model=flux`;

    // 3. Return JSON response
    return res.status(200).json({
      text: aiText,
      image: imageUrl
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Something went wrong.'
    });
  }
}
