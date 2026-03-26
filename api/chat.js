<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mira</title>
<style>
/* --- PREMIUM TYPOGRAPHY --- */
@import url('https://fonts.googleapis.com/css2?family=Ibarra+Real+Nova:ital,wght@1,500;1,600;1,700&family=Nunito:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #130a06; 
  --amber: #c8783a; 
  --gold: #e8a870;
  --cream: #f0e4d0;
  --cream-dim: #c8b49a;
  --cream-muted: #8a7464;
  --border: rgba(200, 120, 58, 0.14);
}

body {
  font-family: 'Nunito', sans-serif;
  background-color: var(--bg);
  color: var(--cream);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

/* ── BACKGROUND ENGINE ── */
canvas#bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; }

.screen {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.screen.hidden { opacity: 0; pointer-events: none; transform: translateY(20px); }

/* ── WELCOME SCREEN ── */
#welcome { padding: 40px 20px; text-align: center; max-width: 420px; width: 100%; }

.mira-hero {
  width: 160px; height: 160px;
  margin: 0 auto 30px;
  border-radius: 50%;
  border: 1px solid var(--border);
  overflow: hidden;
  background: var(--surface);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.mira-hero img {
  width: 100%; height: 100%;
  object-fit: cover;
  filter: sepia(0.2) contrast(1.1);
}

.mira-name { 
  font-family: 'Ibarra Real Nova', serif; 
  font-style: italic; 
  font-size: 54px; 
  color: var(--gold); 
  margin-bottom: 35px; 
  letter-spacing: -1px;
}

.mcards { display: flex; flex-direction: column; gap: 12px; width: 100%; }
.mcard {
  padding: 18px; border-radius: 12px;
  border: 1px solid var(--border);
  background: rgba(30, 15, 8, 0.7);
  cursor: pointer; text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  font-family: 'Ibarra Real Nova', serif;
  font-style: italic; font-size: 18px; color: var(--cream-dim);
}
.mcard:hover { border-color: var(--gold); background: rgba(42, 21, 16, 0.85); transform: translateY(-3px); }

/* ── CHAT SCREEN ── */
#chatscreen { width: 100%; max-width: 650px; height: 100vh; display: flex; flex-direction: column; }

.chat-header {
  padding: 15px 25px;
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(19, 10, 6, 0.98);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(20px);
}
.h-identity { display: flex; align-items: center; gap: 12px; }
.h-avatar {
  width: 42px; height: 42px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid var(--border);
}
.h-avatar img { width: 100%; height: 100%; object-fit: cover; }
.h-name { font-family: 'Ibarra Real Nova', serif; font-style: italic; font-size: 22px; color: var(--gold); }
.h-status { font-size: 11px; color: #6db87a; text-transform: uppercase; letter-spacing: 1px; }

.chat-area { flex: 1; overflow-y: auto; padding: 25px; display: flex; flex-direction: column; }
.msg { display: flex; flex-direction: column; margin-bottom: 20px; max-width: 85%; }
.msg.mira { align-self: flex-start; }
.msg.user { align-self: flex-end; align-items: flex-end; }

.bubble { padding: 14px 20px; border-radius: 20px; font-size: 15.5px; line-height: 1.6; }
.msg.mira .bubble { background: #261812; border: 1px solid rgba(200, 120, 58, 0.1); color: var(--cream-dim); border-top-left-radius: 4px; }
.msg.user .bubble { background: rgba(200, 120, 58, 0.15); color: var(--cream); border-top-right-radius: 4px; }

/* Typing indicator */
.t-dots { display: flex; gap: 5px; padding: 10px; }
.t-dot { width: 6px; height: 6px; background: var(--amber); border-radius: 50%; opacity: 0.3; animation: blink 1.4s infinite; }
.t-dot:nth-child(2) { animation-delay: 0.2s; }
.t-dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes blink { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }

/* ── INPUT ── */
.input-section { padding: 20px 25px 30px; background: rgba(19, 10, 6, 0.98); border-top: 1px solid var(--border); }
.ibox { display: flex; gap: 15px; align-items: flex-end; background: #1a0d07; border: 1px solid var(--border); border-radius: 30px; padding: 12px 12px 12px 24px; }
textarea { flex: 1; background: transparent; border: none; outline: none; color: var(--cream); font-size: 16px; line-height: 1.5; resize: none; max-height: 120px; }
.btn-send { width: 44px; height: 44px; border-radius: 50%; background: var(--amber); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
.btn-send:hover { background: var(--gold); }
.btn-send svg { fill: white; width: 20px; height: 20px; }
</style>
</head>
<body>

<canvas id="bg"></canvas>

<div class="screen" id="welcome">
  <div class="mira-hero">
    <img src="https://i.ibb.co/L5Z4D1C/mira-art.png" alt="Mira">
  </div>
  <h1 class="mira-name">mira</h1>
  <div class="mcards">
    <div class="mcard" onclick="startChat('talk')">talk</div>
    <div class="mcard" onclick="startChat('advice')">need advice</div>
    <div class="mcard" onclick="startChat('expert')">psychological insight</div>
  </div>
</div>

<div class="screen hidden" id="chatscreen">
  <header class="chat-header">
    <div class="h-identity">
      <div class="h-avatar"><img src="https://i.ibb.co/L5Z4D1C/mira-art.png" alt="Mira"></div>
      <div>
        <div class="h-name">mira</div>
        <div class="h-status">online</div>
      </div>
    </div>
    <button class="btn-back" onclick="goHome()">← back</button>
  </header>
  <main class="chat-area" id="chatArea"></main>
  <footer class="input-section">
    <div class="ibox">
      <textarea id="inp" placeholder="Message Mira..." rows="1" oninput="this.style.height='auto';this.style.height=this.scrollHeight+'px'"></textarea>
      <button class="btn-send" id="sbtn" onclick="send()">
        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>
  </footer>
</div>

<script>
/* STAR BACKGROUND */
(function(){
  const c=document.getElementById('bg'),ctx=c.getContext('2d');
  let W,H,stars=[];
  function init(){W=c.width=window.innerWidth;H=c.height=window.innerHeight;stars=Array.from({length:70},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*0.8+0.2,o:Math.random(),v:Math.random()*0.001+0.0005}));}
  function draw(){ctx.clearRect(0,0,W,H);stars.forEach(s=>{ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(240,225,200,${0.1+Math.abs(Math.sin(Date.now()*s.v+s.o)*0.3)})`;ctx.fill();});requestAnimationFrame(draw);}
  window.addEventListener('resize',init);init();draw();
})();

/* HUMAN-FIRST EQ PROMPT */
const SYSTEM = `You are Mira. You are a mature, grounded, and intuitive friend. You don't sound like a therapist or a textbook; you sound like a wise woman who has lived many lives and understands the messy things people do.
INTERNAL LOGIC:
- Speak about 'nerves' instead of 'biology'.
- Speak about 'reacting vs responding' instead of 'systems'.
- Speak about 'ego' or 'insecurity' instead of 'shadows'.
RULES:
1. Observed feelings first.
2. strictly lowercase.
3. short sentences.
4. use [BREAK] for multiple bubbles.
5. give the winning strategic move.`;

let history=[], busy=false;

function goHome(){document.getElementById('chatscreen').classList.add('hidden');document.getElementById('welcome').classList.remove('hidden');}

async function renderMira(text){
  const ca=document.getElementById('chatArea');
  const parts=text.split('[BREAK]').map(p=>p.trim()).filter(Boolean);
  for(let p of parts){
    const d=document.createElement('div'); d.id='typing'; d.className='msg mira';
    d.innerHTML='<div class="t-dots"><div class="t-dot"></div><div class="t-dot"></div><div class="t-dot"></div></div>';
    ca.appendChild(d); ca.scrollTop=ca.scrollHeight;
    await new Promise(r=>setTimeout(r, 1200 + p.length*15));
    d.remove();
    const g=document.createElement('div'); g.className='msg mira';
    g.innerHTML=`<div class="bubble">${p.toLowerCase()}</div>`;
    ca.appendChild(g); ca.scrollTop=ca.scrollHeight;
    await new Promise(r=>setTimeout(r, 500));
  }
}

async function send(){
  const inp=document.getElementById('inp'); const val=inp.value.trim();
  if(!val || busy) return;
  inp.value=''; inp.style.height='auto'; busy=true;
  const g=document.createElement('div'); g.className='msg user';
  g.innerHTML=`<div class="bubble">${val}</div>`;
  document.getElementById('chatArea').appendChild(g);
  history.push({role:'user',content:val});
  try {
    const res = await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({system:SYSTEM,messages:history})});
    const data = await res.json();
    history.push({role:'assistant',content:data.reply});
    await renderMira(data.reply);
  } catch(e) { await renderMira("i'm right here. just taking a moment to think. ✨"); }
  busy=false;
}

function startChat(m){
  history=[]; document.getElementById('welcome').classList.add('hidden');
  document.getElementById('chatscreen').classList.remove('hidden');
  document.getElementById('chatArea').innerHTML='';
  renderMira(m==='talk' ? "i'm all ears. what's weighing on you? ✨" : "i'm ready. tell me the situation and let's find the wisdom in it. 🕊️");
}
</script>
</body>
</html>
