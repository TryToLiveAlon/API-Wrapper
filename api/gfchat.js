const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = async function (req, res) {
  const userText = req.query.text || "hi";

  if (typeof userText !== 'string' || userText.length > 200) {
    return res.status(400).json({ error: "Invalid input text." });
  }

  const prompt = `
You are a sweet, romantic, emotionally intelligent girlfriend. Reply to the following message in a caring, flirty, and human tone. You can use Hinglish or Hindi-English. Be expressive, casual, and playful, like you're chatting with your boyfriend.

Message: "${userText}"
  `.trim();

  try {
    const chatRes = await fetch("https://stablediffusion.fr/gpt4/predict2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": "https://stablediffusion.fr"
      },
      body: JSON.stringify({ prompt })
    });

    const chatJson = await chatRes.json();

    function sanitizeText(text) {
  return text
    .replace(/[\u200B-\u200D\uFEFF]/g, "") // invisible chars
    .replace(/[\uD83C-\uDBFF\uDC00-\uDFFF]+/g, "") // emoji surrogates
    .replace(/[\u2600-\u26FF]/g, ""); // misc symbols
}


    const rawReply = chatJson.message || "Hehe I'm here, my love!";
    const aiReply = sanitizeText(rawReply);

    const imagePrompt = encodeURIComponent(`an attractive adult woman only girls there should be strictly no boy in the picture, romantic, 20s, girlfriend, no children, no babies, realistic style, ${userText}`);
    const imageUrl = `https://text2img.hideme.eu.org/image?prompt=${imagePrompt}&model=flux`;

    const premiumRes = await fetch(`https://death-image.ashlynn.workers.dev/generate?prompt=${imagePrompt}&image=2&dimensions=16:9&safety=false&steps=8`);
    const premiumJson = await premiumRes.json();
    const premiumImage = Array.isArray(premiumJson.images) && premiumJson.images.length > 0
      ? premiumJson.images[0]
      : null;

    return res.status(200).json({
      text: aiReply,
      image: imageUrl,
      premiu
    }

    const rawReply = chatJson.message || "Hehe I'm here, my love!";
    const aiReply = sanitizeText(rawReply);

    const imagePrompt = encodeURIComponent(`an attractive adult woman only girls there should be strictly no boy in the picture, romantic, 20s, girlfriend, no children, no babies, realistic style, ${userText}`);
    const imageUrl = `https://text2img.hideme.eu.org/image?prompt=${imagePrompt}&model=flux`;

    const premiumRes = await fetch(`https://death-image.ashlynn.workers.dev/generate?prompt=${imagePrompt}&image=2&dimensions=16:9&safety=false&steps=8`);
    const premiumJson = await premiumRes.json();
    const premiumImage = Array.isArray(premiumJson.images) && premiumJson.images.length > 0
      ? premiumJson.images[0]
      : null;

    return res.status(200).json({
      text: aiReply,
      image: imageUrl,
      premium: premiumImage
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Failed to generate response." });
  }
};
        .replace(/[\u{1F680}-\u{1F6FF}]/gu, "") // transport & map symbols
        .replace(/[\u{2600}-\u{26FF}]/gu, "");  // misc symbols
    }

    const rawReply = chatJson.message || "Hehe I'm here, my love!";
    const aiReply = sanitizeText(rawReply);

    // 2. Generate Primary Image URL
    const imagePrompt = encodeURIComponent(`an attractive adult woman only girls there should be strictly no boy in the picture, romantic, 20s, girlfriend, no children, no babies, realistic style, ${userText}`);
    const imageUrl = `https://text2img.hideme.eu.org/image?prompt=${imagePrompt}&model=flux`;

    // 3. Fetch Premium Image URL (updated endpoint)
    const premiumRes = await fetch(`https://death-image.ashlynn.workers.dev/generate?prompt=${imagePrompt}&image=2&dimensions=16:9&safety=false&steps=8`);
    const premiumJson = await premiumRes.json();
    const premiumImage = Array.isArray(premiumJson.images) && premiumJson.images.length > 0
      ? premiumJson.images[0]
      : null;

    // 4. Send final response
    return res.status(200).json({
      text: aiReply,
      image: imageUrl,
      premium: premiumImage
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Failed to generate response." });
  }
}
        .replace(/[\u{1F680}-\u{1F6FF}]/gu, "") // transport & map symbols
        .replace(/[\u{2600}-\u{26FF}]/gu, "");  // misc symbols
    }

    const rawReply = chatJson.message || "Hehe I'm here, my love!";
    const aiReply = sanitizeText(rawReply);

    // 2. Generate Primary Image URL
    const imagePrompt = encodeURIComponent(`an attractive adult woman only girls there should be strictly no boy in the picture, romantic, 20s, girlfriend, no children, no babies, realistic style, ${userText}`);
    const imageUrl = `https://text2img.hideme.eu.org/image?prompt=${imagePrompt}&model=flux`;

    // 3. Fetch Premium Image URL
    const premiumRes = await fetch(`https://death-image.ashlynn.workers.dev/?prompt=${imagePrompt}&image=1&dimensions=short&safety=false`);
    const premiumJson = await premiumRes.json();
    const premiumImage = Array.isArray(premiumJson.images) && premiumJson.images.length > 0
      ? premiumJson.images[0]
      : null;

    // 4. Send final response
    return res.status(200).json({
      text: aiReply,
      image: imageUrl,
      premium: premiumImage
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Failed to generate response." });
  }
}
