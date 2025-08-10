export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    // Manually parse JSON body from the request stream
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const data = Buffer.concat(buffers).toString();
    const { message, phrase } = JSON.parse(data);

    if (!message || !phrase) {
      res.status(400).json({ error: "Both message and phrase are required." });
      return;
    }

    const phrases = phrase.split(",").map(p => p.trim()).filter(p => p.length > 0);
    const lowerMessage = message.toLowerCase();
    const isMatch = phrases.some(p => lowerMessage.includes(p.toLowerCase()));

    res.status(200).json({ match: isMatch });
  } catch (error) {
    res.status(400).json({ error: "Invalid JSON body" });
  }
}
