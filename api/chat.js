<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mira</title>

<style>
@import url('https://fonts.googleapis.com/css2?family=Ibarra+Real+Nova:ital,wght@1,600;1,700&family=Nunito:wght@300;400;500;600&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #0f0805; 
  --gold: #e8a870;
  --amber: #c8783a;
  --cream: #f0e4d0;
  --border: rgba(232, 168, 112, 0.15);
}

body {
  font-family: 'Nunito', sans-serif;
  background: var(--bg);
  color: var(--cream);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 🔥 AI CARD */
.ai-card {
  width: 240px;
  height: 240px;
  border-radius: 24px;
  background: linear-gradient(145deg, #1e0f08, #140804);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.9);
  position: relative;
}

.ai-core {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--gold), transparent 70%);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.2); opacity: 0.4; }
  100% { transform: scale(1); opacity: 0.8; }
}

.mira-name {
  font-family: 'Ibarra Real Nova', serif;
  font-style: italic;
  font-size: 70px;
  color: var(--gold);
  margin-bottom: 40px;
}

.screen {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.6s;
}

.hidden { opacity: 0; pointer-events: none; }

.mcard {
  width: 280px;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid var(--border);
  text-align: center;
  margin-bottom: 15px;
  cursor: pointer;
}

.mcard:hover {
  border-color: var(--gold);
  transform: translateY(-3px);
}

/* CHAT */
.chat-header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border-bottom: 1px solid var(--border);
}

.h-avatar {
  width: 50px;
  height: 50px;
}

.h-avatar .ai-core {
  width: 100%;
  height: 100%;
}

.chat-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.msg { margin-bottom: 15px; }

.bubble {
  padding: 12px 18px;
  border-radius: 18px;
  max-width: 70%;
}

.mira { text-align: left; }
.user { text-align: right; }

.mira .bubble { background: #1e110b; }
.user .bubble { background: rgba(232,168,112,0.2); }

.input-section {
  padding: 15px;
  border-top: 1px solid var(--border);
  display: flex;
}

textarea {
  flex: 1;
  background: transparent;
  border: none;
  color: white;
}

button {
  background: var(--amber);
  border: none;
  border-radius: 50%;
  width: 40px;
}
</style>
</head>

<body>

<!-- WELCOME -->
<div class="screen" id="welcome">

  <div class="ai-card">
    <div class="ai-core"></div>
  </div>

  <div class="mira-name">mira</div>

  <div class="mcard" onclick="startChat()">talk</div>
  <div class="mcard" onclick="startChat()">need advice</div>

</div>

<!-- CHAT -->
<div class="screen hidden" id="chat">

  <div class="chat-header">
    <div class="h-avatar">
      <div class="ai-core"></div>
    </div>
    <div>
      <div class="mira-name" style="font-size:22px;">mira</div>
      <div style="font-size:10px;color:#6db87a;">ONLINE</div>
    </div>
  </div>

  <div class="chat-area" id="chatArea"></div>

  <div class="input-section">
    <textarea id="inp"></textarea>
    <button onclick="send()">➤</button>
  </div>

</div>

<script>
function startChat(){
  document.getElementById('welcome').classList.add('hidden');
  document.getElementById('chat').classList.remove('hidden');
  reply("i'm here. tell me what's going on.");
}

function reply(text){
  const c=document.getElementById('chatArea');
  const m=document.createElement('div');
  m.className='msg mira';
  m.innerHTML=`<div class="bubble">${text}</div>`;
  c.appendChild(m);
}

function send(){
  const inp=document.getElementById('inp');
  if(!inp.value) return;

  const c=document.getElementById('chatArea');
  const m=document.createElement('div');
  m.className='msg user';
  m.innerHTML=`<div class="bubble">${inp.value}</div>`;
  c.appendChild(m);

  inp.value='';
}
</script>

</body>
</html>
