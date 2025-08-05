const nodeFetch = require("node-fetch");

module.exports = async function handler(req, res) {
  const userText = req.query.text || "hi";

  // Optional input validation
  if (typeof userText !== "string" || userText.length > 200) {
    return res.status(400).json({ error: "Invalid input text." });
  }

  // Prompt for the girlfriend-style AI
  const prompt = `
You are a sweet, romantic, emotionally intelligent girlfriend. Reply to the following message in a caring, flirty, and human tone. You can use Hinglish or Hindi-English. Be expressive, casual, and playful, like you're chatting with your boyfriend.

Message: "${userText}"
  `.trim();

  try {
    // Step 1: Get AI reply
    const chatRes = await nodeFetch("https://stablediffusion.fr/gpt4/predict2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": "https://stablediffusion.fr"
      },
      body: JSON.stringify({ prompt })
    });

    const chatJson = await chatRes.json();
    const rawReply = chatJson.message || "Hehe I'm here, my love!";

    // Step 2: Sanitize response
    function sanitizeText(text) {
      return text
        .replace(/[\u200B-\u200D\uFEFF]/g, "") // invisible chars
        .replace(/[\uD83C-\uDBFF\uDC00-\uDFFF]+/g, "") // emoji surrogates
        .replace(/[\u2600-\u26FF]/g, ""); // misc symbols
    }

    const aiReply = sanitizeText(rawReply);

    // Step 3: Generate Basic Image URL
    const imagePrompt = encodeURIComponent(
      `an attractive adult woman only girls there should be strictly no boy in the picture, romantic, 20s, girlfriend, no children, no babies, realistic style, ${userText}`
    );
    const imageUrl = `https://text2img.hideme.eu.org/image?prompt=${imagePrompt}&model=flux`;

    // Step 4: Generate Premium Image
    const premiumRes = await nodeFetch(
      `https://death-image.ashlynn.workers.dev/generate?prompt=${imagePrompt}&image=2&dimensions=16:9&safety=false&steps=8`
    );

    const premiumJson = await premiumRes.json();
    const premiumImage =
      Array.isArray(premiumJson.images) && premiumJson.images.length > 0
        ? premiumJson.images[0]
        : null;

    // Step 5: Final response
    return res.status(200).json({
      text: aiReply,
      image: imageUrl,
      premium: premiumImage
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Failed to generate response." });
  }
};
