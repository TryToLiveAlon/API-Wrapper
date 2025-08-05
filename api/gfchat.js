const fetch = require("node-fetch");

module.exports = async function (req, res) {
  const userText = req.query.text || "hi";

  // Input validation
  if (typeof userText !== "string" || userText.length > 200) {
    return res.status(400).json({ error: "Invalid input text." });
  }

  // Girlfriend prompt
  const prompt = `
You are a sweet, romantic, emotionally intelligent girlfriend. Reply to the following message in a caring, flirty, and human tone. You can use Hinglish or Hindi-English. Be expressive, casual, and playful, like you're chatting with your boyfriend.

Message: "${userText}"
  `.trim();

  try {
    // AI Chat response
    const chatRes = await fetch("https://stablediffusion.fr/gpt4/predict2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": "https://stablediffusion.fr",
      },
      body: JSON.stringify({ prompt }),
    });

    const chatJson = await chatRes.json();
    const rawReply = chatJson.message || "Hehe I'm here, my love!";

    // Sanitize text
    function sanitizeText(text) {
      return text
        .replace(/[\u200B-\u200D\uFEFF]/g, "") // invisible chars
        .replace(/[\uD83C-\uDBFF\uDC00-\uDFFF]+/g, "") // emojis
        .replace(/[\u2600-\u26FF]/g, ""); // misc symbols
    }

    const aiReply = sanitizeText(rawReply);

    // Basic Image URL
    const imagePrompt = encodeURIComponent(
      `an attractive adult woman only girls there should be strictly no boy in the picture, romantic, 20s, girlfriend, no children, no babies, realistic style, ${userText}`
    );
    const imageUrl = `https://text2img.hideme.eu.org/image?prompt=${imagePrompt}&model=flux`;

    // Premium Image
    const premiumRes = await fetch(
      `https://death-image.ashlynn.workers.dev/generate?prompt=${imagePrompt}&image=2&dimensions=16:9&safety=false&steps=8`
    );
    const premiumJson = await premiumRes.json();
    const premiumImage =
      Array.isArray(premiumJson.images) && premiumJson.images.length > 0
        ? premiumJson.images[0]
        : null;

    return res.status(200).json({
      text: aiReply,
      image: imageUrl,
      premium: premiumImage,
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Failed to generate response." });
  }
};
