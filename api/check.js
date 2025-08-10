export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, phrase } = req.body;

  if (!message || !phrase) {
    return res.status(400).json({ error: "Both message and phrase are required." });
  }

  const phrases = phrase.split(",").map(p => p.trim()).filter(p => p.length > 0);
  const lowerMessage = message.toLowerCase();
  const isMatch = phrases.some(p => lowerMessage.includes(p.toLowerCase()));

  res.status(200).json({ match: isMatch });
}
