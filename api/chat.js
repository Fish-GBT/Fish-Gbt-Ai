export default async function handler(req, res) {

  try {

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "user", content: body.message }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        reply: JSON.stringify(data)
      });
    }

    const reply = data.choices?.[0]?.message?.content || "No reply from AI.";

    res.status(200).json({ reply });

  } catch (error) {

    res.status(500).json({
      reply: "Server error: " + error.message
    });

  }

}
