<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mira</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Ibarra+Real+Nova:ital,wght@1,500;1,600;1,700&family=Nunito:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #130a06; 
  --amber: #c8783a; 
  --gold: #e8a870;
  --cream: #f0e4d0;
  --cream-dim: #c8b49a;
  --border: rgba(200, 120, 58, 0.18);
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
}

canvas#bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; }

.screen {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  z-index: 2; transition: opacity 0.6s ease, transform 0.6s ease;
}
.screen.hidden { opacity: 0; pointer-events: none; transform: translateY(20px); }

/* --- HERO SECTION --- */
#welcome { padding: 40px 20px; text-align: center; max-width: 420px; width: 100%; }

.mira-hero {
  width: 180px; height: 180px;
  margin: 0 auto 30px;
  border-radius: 50%;
  border: 1.5px solid var(--gold);
  overflow: hidden;
  background: #1e0f08;
  box-shadow: 0 0 25px rgba(200, 120, 58, 0.2);
}

.mira-hero img {
  width: 100%; height: 100%;
  object-fit: cover;
}

.mira-name { 
  font-family: 'Ibarra Real Nova', serif; 
  font-style: italic; font-size: 58px; font-weight: 600;
  color: var(--gold); margin-bottom: 40px; letter-spacing: -1px;
}

.mcard {
  width: 100%; padding: 20px; border-radius: 14px;
  border: 1px solid var(--border);
  background: rgba(30, 15, 8, 0.75);
  cursor: pointer; margin-bottom: 12px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  font-family: 'Ibarra Real Nova', serif;
  font-style: italic; font-size: 19px; color: var(--cream-dim);
}
.mcard:hover { border-color: var(--gold); background: rgba(45, 25, 15, 0.9); transform: translateY(-3px); }

/* --- CHAT SECTION --- */
#chatscreen { width: 100%; max-width: 650px; height: 100vh; display: flex; flex-direction: column; }
.chat-header {
  padding: 18px 25px; display: flex; align-items: center; justify-content: space-between;
  background: rgba(19, 10, 6, 0.98); border-bottom: 1px solid var(--border); backdrop-filter: blur(20px);
}
.h-identity { display: flex; align-items: center; gap: 14px; }
.h-avatar { width: 46px; height: 46px; border-radius: 50%; overflow: hidden; border: 1px solid var(--gold); }
.h-avatar img { width: 100%; height: 100%; object-fit: cover; }
.h-name { font-family: 'Ibarra Real Nova', serif; font-style: italic; font-size: 24px; color: var(--gold); }

.chat-area { flex: 1; overflow-y: auto; padding: 30px 25px; display: flex; flex-direction: column; }
.msg { display: flex; flex-direction: column; margin-bottom: 22px; max-width: 85%; }
.msg.mira { align-self: flex-start; }
.msg.user { align-self: flex-end; align-items: flex-end; }
.bubble { padding: 15px 20px; border-radius: 22px; font-size: 16px; line-height: 1.6; }
.msg.mira .bubble { background: #261812; border: 1px solid rgba(200, 120, 58, 0.1); color: var(--cream-dim); border-top-left-radius: 4px; }
.msg.user .bubble { background: rgba(200, 120, 58, 0.18); color: var(--cream); border-top-right-radius: 4px; }

/* Typing indicator */
.t-dots { display: flex; gap: 5px; padding: 12px; }
.t-dot { width: 6px; height: 6px; background: var(--gold); border-radius: 50%; opacity: 0.3; animation: blink 1.4s infinite; }
.t-dot:nth-child(2) { animation-delay: 0.2s; } .t-dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes blink { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }

.input-section { padding: 20px 25px 35px; background: rgba(19, 10, 6, 0.98); border-top: 1px solid var(--border); }
.ibox { display: flex; gap: 15px; align-items: flex-end; background: #1a0d07; border: 1px solid var(--border); border-radius: 30px; padding: 12px 12px 12px 24px; }
textarea { flex: 1; background: transparent; border: none; outline: none; color: var(--cream); font-size: 16px; line-height: 1.5; resize: none; max-height: 120px; }
.btn-send { width: 44px; height: 44px; border-radius: 50%; background: var(--amber); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
.btn-send svg { fill: white; width: 20px; height: 20px; }
.btn-back { background: transparent; border: 1px solid var(--border); color: var(--cream-muted); padding: 6px 14px; border-radius: 20px; font-size: 11px; cursor: pointer; }
</style>
</head>
<body>
<canvas id="bg"></canvas>

<div class="screen" id="welcome">
  <div class="mira-hero">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#2a1510" />
          <stop offset="100%" style="stop-color:#130a06" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#grad)"/>
      <g fill="none" stroke="#e8a870" stroke-width="1.2" stroke-linecap="round">
        <path d="M52 22 C42 22 38 35 38 50 C38 65 42 75 52 82 M52 82 Q55 88 54 95" />
        <path d="M52 22 C68 22 75 40 72 65 C70 75 62 82 52 82" stroke="#c8783a" stroke-width="0.8"/>
        <circle cx="62" cy="45" r="1.5" fill="#e8a870" stroke="none" />
        <path d="M62 48 L62 52 M60 50 L64 50" stroke-width="0.8" opacity="0.8"/>
        <path d="M52 22 Q75 25 78 50 Q80 75 65 85 Q60 90 75 98" opacity="0.4"/>
      </g>
    </svg>
  </div>
  <h1 class="mira-name">mira</h1>
  <div class="mcards">
    <div onclick="startChat('talk')" class="mcard">talk</div>
    <div onclick="startChat('advice')" class="mcard">need advice</div>
    <div onclick="startChat('expert')" class="mcard">psychological insight</div>
  </div>
</div>

<div class="screen hidden" id="chatscreen">
  <header class="chat-header">
    <div class="h-identity">
      <div class="h-avatar">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#1e0f08"/>
          <path d="M45 30 Q35 45 40 65 Q45 80 55 85" stroke="#e8a870" stroke-width="4" fill="none"/>
        </svg>
      </div>
      <div><div class="h-name">mira</div><div style="font-size:10px; color:#6db87a;">ONLINE</div></div>
    </div>
    <button class="btn-back" onclick="goHome()">← BACK</button>
  </header>
  <main class="chat-area" id="chatArea"></main>
  <footer class="input-section">
    <div class="ibox">
      <textarea id="inp" placeholder="Message Mira..." rows="1" oninput="this.style.height='auto';this.style.height=this.scrollHeight+'px'"></textarea>
      <button class="btn-send" onclick="send()"><svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>
    </div>
  </footer>
</div>

<script>
(function(){
  const c=document.getElementById('bg'),ctx=c.getContext('2d');
  let W,H,stars=[];
  function init(){W=c.width=window.innerWidth;H=c.height=window.innerHeight;stars=Array.from({length:70},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*0.8+0.2,o:Math.random(),v:Math.random()*0.001+0.0005}));}
  function draw(){ctx.clearRect(0,0,W,H);stars.forEach(s=>{const a=0.1+Math.abs(Math.sin(Date.now()*s.v+s.o)*0.3);ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(240,225,200,${a})`;ctx.fill();});requestAnimationFrame(draw);}
  window.addEventListener('resize',init);init();draw();
})();

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
  } catch(e) { await renderMira("i'm right here. just taking a breath. ✨"); }
  busy=false;
}

function startChat(m){
  history=[]; document.getElementById('welcome').classList.add('hidden');
  document.getElementById('chatscreen').classList.remove('hidden');
  document.getElementById('chatArea').innerHTML='';
  renderMira(m==='talk' ? "i'm listening. what's happening? ✨" : "i'm ready. tell me the situation. 🕊️");
}
</script>
</body>
</html>
