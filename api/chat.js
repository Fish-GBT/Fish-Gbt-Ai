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
        model: "llama3-8b-8192",
        messages: [
          { role: "user", content: body.message }
        ]
      })
    });

    const data = await response.json();

    let reply = "AI didn't respond.";

    if (data.choices && data.choices[0] && data.choices[0].message) {
      reply = data.choices[0].message.content;
    }

    res.status(200).json({ reply });

  } catch (error) {

    res.status(500).json({
      reply: "Server error: " + error.message
    });

  }

}
