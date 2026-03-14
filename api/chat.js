export default async function handler(req, res) {

  try {

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: body.message
        })
      }
    );

    const data = await response.json();

    let reply = "No response";

    if (Array.isArray(data) && data[0]?.generated_text) {
      reply = data[0].generated_text;
    }

    res.status(200).json({ reply });

  } catch (error) {

    res.status(500).json({
      reply: "Server error: " + error.message
    });

  }

}
