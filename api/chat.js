```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Fish GBT</title>

<script src="https://cdn.auth0.com/js/auth0-spa-js/2.0/auth0-spa-js.production.js"></script>

<style>

body{
margin:0;
font-family:Arial, sans-serif;
background:#0f172a;
color:white;
display:flex;
height:100vh;
}

/* SIDEBAR */

#sidebar{
width:250px;
background:#020617;
padding:20px;
box-sizing:border-box;
border-right:1px solid #1e293b;
display:flex;
flex-direction:column;
}

#logo{
font-size:22px;
font-weight:bold;
margin-bottom:20px;
}

#loginButtons button{
margin-bottom:10px;
padding:10px;
border:none;
border-radius:6px;
background:#2563eb;
color:white;
cursor:pointer;
}

/* MAIN */

#main{
flex:1;
display:flex;
flex-direction:column;
}

/* MESSAGES */

#messages{
flex:1;
overflow-y:auto;
padding:20px;
}

/* CHAT BUBBLES */

.message{
padding:12px;
border-radius:10px;
margin-bottom:10px;
max-width:60%;
line-height:1.4;
}

.user{
background:#2563eb;
margin-left:auto;
}

.ai{
background:#1e293b;
}

/* INPUT */

#inputArea{
display:flex;
padding:15px;
background:#020617;
border-top:1px solid #1e293b;
}

#input{
flex:1;
padding:12px;
border:none;
border-radius:8px;
background:#1e293b;
color:white;
}

button{
margin-left:10px;
padding:12px 18px;
border:none;
border-radius:8px;
background:#22c55e;
color:white;
cursor:pointer;
}

</style>

</head>

<body>

<div id="sidebar">

<div id="logo">Fish GBT</div>

<div id="loginButtons">
<button onclick="login()">Login</button>
<button onclick="logout()">Logout</button>
</div>

<button onclick="newChat()">New Chat</button>

</div>

<div id="main">

<div id="messages"></div>

<div id="inputArea">
<input id="input" placeholder="Send a message">
<button onclick="send()">Send</button>
</div>

</div>

<script>

/* AUTH0 */

let auth0Client;

async function initAuth(){

auth0Client = await createAuth0Client({
domain: "DIN_DOMAIN",
clientId: "DIN_CLIENT_ID",
authorizationParams:{
redirect_uri: window.location.origin
}
})

}

initAuth()

async function login(){
await auth0Client.loginWithRedirect()
}

async function logout(){
auth0Client.logout({
logoutParams:{
returnTo: window.location.origin
}
})
}

/* CHAT */

let chatHistory=[]

async function send(){

const input=document.getElementById("input")
const msg=input.value.trim()

if(!msg) return

const messages=document.getElementById("messages")

messages.innerHTML+=`<div class="message user">${msg}</div>`

chatHistory.push({
role:"user",
content:msg
})

input.value=""

messages.scrollTop=messages.scrollHeight

const res=await fetch("/api/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
messages:chatHistory
})
})

const data=await res.json()

messages.innerHTML+=`<div class="message ai">${data.reply}</div>`

chatHistory.push({
role:"assistant",
content:data.reply
})

messages.scrollTop=messages.scrollHeight

}

function newChat(){
chatHistory=[]
document.getElementById("messages").innerHTML=""
}

document.getElementById("input").addEventListener("keydown",function(e){
if(e.key==="Enter"){
send()
}
})

</script>

</body>
</html>
```
