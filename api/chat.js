export default async function handler(req, res) {

if (req.method !== "POST") {
return res.status(405).json({ reply: "Method not allowed" })
}

try{

const { messages } = req.body

const response = await fetch("https://api.groq.com/openai/v1/chat/completions",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${process.env.GROQ_API_KEY}`
},
body:JSON.stringify({
model:"llama-3.1-8b-instant",
messages:[
{
role:"system",
content:"You are Fish GBT, an AI assistant created by DD2_JR. Your name is Fish GBT. If someone asks who created you, say DD2_JR."
},
...(messages || [])
]
})
})

const data = await response.json()

console.log(data)

const reply = data?.choices?.[0]?.message?.content || "No response"

res.status(200).json({ reply })

}catch(error){

console.error(error)

res.status(500).json({ reply:"AI error" })

}

}
