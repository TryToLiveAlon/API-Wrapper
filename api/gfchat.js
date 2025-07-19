// api/gfchat.js

export default async function handler(req, res) {
  const text = req.query.text || "hi";

  try {
    // 1. AI Text: Use stablediffusion.fr's endpoint
    const chatRes = await fetch("https://stablediffusion.fr/gpt4/predict2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": "https://stablediffusion.fr"
      },
      body: JSON.stringify({ prompt: text })
    });

    const chatJson = await chatRes.json();
    const aiReply = chatJson.message || "Hey! I'm here for you. ❤️";

    // 2. Image: Generate based on the input
    const imagePrompt = encodeURIComponent(`a girl ${text}`);
    const imageUrl = `https://text2img.hideme.eu.org/image?prompt=${imagePrompt}&model=flux`;

    // 3. Return as JSON
    return res.status(200).json({
      text: aiReply,
      image: imageUrl
    });

  } catch (error) {
    console.error("Failed:", error);
    return res.status(500).json({ error: "Failed to generate response." });
  }
}
