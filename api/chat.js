export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const messages = body.messages || [];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are Fish GBT created by DD2_JR."
          },
          ...messages
        ]
      })
    });

    const data = await response.json();

    if (!data || !data.choices) {
      console.log("Groq error:", data);
      return res.status(500).json({ reply: "AI error" });
    }

    res.status(200).json({
      reply: data.choices[0].message.content
    });

  } catch (err) {
    console.log("Server error:", err);
    res.status(500).json({ reply: "AI error" });
  }

}
