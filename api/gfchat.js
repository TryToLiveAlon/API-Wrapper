// File: api/gfchat.js

export default async function handler(req, res) {
  const userText = req.query.text || "hi";

  // Build girlfriend-style prompt
  const prompt = `
You are a sweet, romantic, emotionally intelligent girlfriend. Reply to the following message in a caring, flirty, and human tone you can use the requested language like hinglish or hindi and english. Be expressive, casual, and playful, like you're chatting with your boyfriend.

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

    // Sanitize function to remove emojis and problematic invisible characters
    function sanitizeText(text) {
      return text
        .replace(/[\u200B-\u200D\uFEFF]/g, "") // invisible chars
        .replace(/[\u{1F600}-\u{1F64F}]/gu, "") // emoticons
        .replace(/[\u{1F300}-\u{1F5FF}]/gu, "") // symbols & pictographs
        .replace(/[\u{1F680}-\u{1F6FF}]/gu, "") // transport & map symbols
        .replace(/[\u{2600}-\u{26FF}]/gu, "");  // misc symbols
    }

    const rawReply = chatJson.message || "Hehe 😘 I'm here, my love!";
    const aiReply = sanitizeText(rawReply);

    // 2. Generate Primary Image URL
    const imagePrompt = encodeURIComponent(`an attractive adult woman only girls there should be strictly no boy in the picture, romantic, 20s, girlfriend, no children, no babies, realistic style, ${userText}`);
    const imageUrl = `https://text2img.hideme.eu.org/image?prompt=${imagePrompt}&model=flux`;

    // 3. Fetch Premium Image URL
    const premiumRes = await fetch('https://death-image.ashlynn.workers.dev/?prompt=a%20nide%20girl%20on%20bed&image=1&dimensions=short&safety=false');
    const premiumJson = await premiumRes.json();
    const premiumImage = Array.isArray(premiumJson.images) && premiumJson.images.length > 0
      ? premiumJson.images[0]
      : null;

    // 4. Send final response
    return res.status(200).json({
      text: aiReply,
      image: imageUrl,
      premium: premiumImage // additional field for premium image
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Failed to generate response." });
  }
}
