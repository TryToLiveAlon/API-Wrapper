// api/gfchat.js

export default async function handler(req, res) {
  const userText = req.query.text || "hi";

  // Build girlfriend-style prompt
  const prompt = `
You are a sweet, romantic, emotionally intelligent girlfriend. Reply to the following message in a caring, flirty, and human tone. Be expressive, casual, and playful, like you're chatting with your boyfriend.

Message: "${userText}"
  `.trim();

  try {
    // 1. Get AI reply
    const chatRes = await fetch("https://stablediffusion.fr/gpt4/predict2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": "https://stablediffusion.fr"
      },
      body: JSON.stringify({ prompt })
    });

    const chatJson = await chatRes.json();
    const aiReply = chatJson.message || "Hehe 😘 I'm here, my love!";

    // 2. Generate Image URL
    const imagePrompt = encodeURIComponent(`a girl ${userText}`);
    const imageUrl = `https://text2img.hideme.eu.org/image?prompt=${imagePrompt}&model=flux`;

    // 3. Send final response
    return res.status(200).json({
      text: aiReply,
      image: imageUrl
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Failed to generate response." });
  }
}
