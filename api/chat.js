export default async function handler(req, res) {

  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: body.message }
      ]
    })
  });

  const data = await response.json();

  res.status(
