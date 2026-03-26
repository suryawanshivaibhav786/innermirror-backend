<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mira</title>
<style>
/* --- TYPOGRAPHY --- */
@import url('https://fonts.googleapis.com/css2?family=Ibarra+Real+Nova:ital,wght@1,600;1,700&family=Nunito:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #0f0805; 
  --gold: #e8a870;
  --amber: #c8783a;
  --cream: #f0e4d0;
  --border: rgba(232, 168, 112, 0.15);
}

body {
  font-family: 'Nunito', sans-serif;
  background-color: var(--bg);
  color: var(--cream);
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}

canvas#bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; }

.screen {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  z-index: 2; transition: opacity 0.8s ease, transform 0.8s ease;
}
.screen.hidden { opacity: 0; pointer-events: none; transform: translateY(20px); }

/* --- LANDING UI --- */
#welcome { padding: 40px 20px; text-align: center; max-width: 440px; width: 100%; }

.mira-portrait-frame {
  width: 220px; height: 220px;
  margin: 0 auto 35px;
  border-radius: 50%;
  border: 1.5px solid var(--gold);
  padding: 5px;
  background: linear-gradient(45deg, var(--bg), #1e0f08);
  box-shadow: 0 20px 50px rgba(0,0,0,0.9), 0 0 30px rgba(232, 168, 112, 0.1);
}

.mira-portrait-frame img {
  width: 100%; height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.mira-name { 
  font-family: 'Ibarra Real Nova', serif; 
  font-style: italic; font-size: 72px; font-weight: 700;
  color: var(--gold); margin-bottom: 45px; letter-spacing: -4px;
  text-shadow: 0 10px 20px rgba(0,0,0,0.4);
}

.mcard {
  width: 100%; padding: 22px; border-radius: 18px;
  border: 1px solid var(--border);
  background: rgba(25, 12, 7, 0.8);
  cursor: pointer; margin-bottom: 15px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  backdrop-filter: blur(20px);
  font-family: 'Ibarra Real Nova', serif;
  font-style: italic; font-size: 22px; color: var(--gold);
  opacity: 0.9;
}
.mcard:hover { border-color: var(--gold); background: rgba(45, 25, 15, 0.95); transform: translateY(-5px); opacity: 1; }

/* --- CHAT UI --- */
#chatscreen { width: 100%; max-width: 700px; height: 100vh; display: flex; flex-direction: column; }
.chat-header {
  padding: 15px 25px; display: flex; align-items: center; justify-content: space-between;
  background: rgba(15, 8, 5, 0.98); border-bottom: 1px solid var(--border); backdrop-filter: blur(20px);
}
.h-identity { display: flex; align-items: center; gap: 15px; }
.h-avatar { width: 48px; height: 48px; border-radius: 50%; overflow: hidden; border: 1px solid var(--gold); }
.h-avatar img { width: 100%; height: 100%; object-fit: cover; }
.h-name { font-family: 'Ibarra Real Nova', serif; font-style: italic; font-size: 28px; color: var(--gold); }

.chat-area { flex: 1; overflow-y: auto; padding: 30px; display: flex; flex-direction: column; gap: 20px; }
.msg { display: flex; flex-direction: column; max-width: 85%; }
.msg.mira { align-self: flex-start; }
.msg.user { align-self: flex-end; align-items: flex-end; }
.bubble { padding: 16px 22px; border-radius: 22px; font-size: 16px; line-height: 1.6; }
.msg.mira .bubble { background: #1e110b; border: 1px solid rgba(232, 168, 112, 0.08); color: #d6c4ae; border-top-left-radius: 4px; }
.msg.user .bubble { background: rgba(232, 168, 112, 0.15); color: var(--cream); border-top-right-radius: 4px; }

.input-section { padding: 20px 25px 40px; background: rgba(15, 8, 5, 0.98); border-top: 1px solid var(--border); }
.ibox { display: flex; gap: 15px; align-items: flex-end; background: #140a07; border: 1px solid var(--border); border-radius: 35px; padding: 12px 12px 12px 28px; }
textarea { flex: 1; background: transparent; border: none; outline: none; color: var(--cream); font-size: 16px; line-height: 1.5; resize: none; max-height: 150px; }
.btn-send { width: 48px; height: 48px; border-radius: 50%; background: var(--amber); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
.btn-send svg { fill: white; width: 22px; height: 22px; }
.btn-back { background: transparent; border: 1px solid var(--border); color: #8a7464; padding: 8px 18px; border-radius: 20px; font-size: 11px; cursor: pointer; }
</style>
</head>
<body>
<canvas id="bg"></canvas>

<div class="screen" id="welcome">
  <div class="mira-portrait-frame">
    <img src="https://i.postimg.cc/jdTf7xsv/AZ0li-YNpf-4AE4-M0xzpg-AZ0li-YNp-A9D7Ih-Vp-Jdy4w.png" alt="Mira Portrait">
  </div>
  <h1 class="mira-name">mira</h1>
  <div class="mcard" onclick="startChat('talk')">talk</div>
  <div class="mcard" onclick="startChat('advice')">need advice</div>
  <div class="mcard" onclick="startChat('expert')">psychological insight</div>
</div>

<div class="screen hidden" id="chatscreen">
  <header class="chat-header">
    <div class="h-identity">
      <div class="h-avatar"><img src="https://i.postimg.cc/jdTf7xsv/AZ0li-YNpf-4AE4-M0xzpg-AZ0li-YNp-A9D7Ih-Vp-Jdy4w.png" alt="Mira"></div>
      <div><div class="h-name">mira</div><div style="font-size:10px; color:#6db87a; font-weight:700;">ONLINE</div></div>
    </div>
    <button class="btn-back" onclick="goHome()">BACK</button>
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
  function init(){W=c.width=window.innerWidth;H=c.height=window.innerHeight;stars=Array.from({length:80},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*0.8+0.2,o:Math.random(),v:Math.random()*0.001+0.0005}));}
  function draw(){ctx.clearRect(0,0,W,H);stars.forEach(s=>{const a=0.1+Math.abs(Math.sin(Date.now()*s.v+s.o)*0.3);ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(240,225,200,${a})`;ctx.fill();});requestAnimationFrame(draw);}
  window.addEventListener('resize',init);init();draw();
})();

const SYSTEM = `You are Mira. You are a mature, grounded, and intuitive friend. You don't sound like a therapist or a textbook; you sound like a wise woman who has lived many lives and understands the messy things people do.
INTERNAL LOGIC:
- Speak about 'nerves' instead of 'biology'.
- Speak about 'reacting vs responding' instead of 'systems'.
- Speak about 'ego' or 'insecurity' instead of 'shadow motives'.
RULES:
1. Mirror their feeling first.
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
    d.innerHTML='<div style="display:flex; gap:5px; padding:10px;"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>';
    ca.appendChild(d); ca.scrollTop=ca.scrollHeight;
    await new Promise(r=>setTimeout(r, 1500));
    d.remove();
    const g=document.createElement('div'); g.className='msg mira';
    g.innerHTML=`<div class="bubble">${p.toLowerCase()}</div>`;
    ca.appendChild(g); ca.scrollTop=ca.scrollHeight;
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
  renderMira(m==='talk' ? "i'm all ears. what's happening? ✨" : "i'm here. tell me the situation. 🕊️");
}
</script>
</body>
</html>
