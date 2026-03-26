<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mira</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Ibarra+Real+Nova:ital,wght@1,600;1,700&family=Nunito:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #130a06; 
  --gold: #e8a870;
  --amber: #c8783a;
  --cream: #f0e4d0;
  --border: rgba(200, 120, 58, 0.2);
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
  z-index: 2; transition: opacity 0.7s ease, transform 0.7s ease;
}
.screen.hidden { opacity: 0; pointer-events: none; transform: translateY(30px); }

/* --- HERO IMAGE FIX --- */
.mira-portrait-wrap {
  width: 210px; height: 210px;
  margin: 0 auto 30px;
  border-radius: 50%;
  border: 2px solid var(--gold);
  overflow: hidden;
  background: #2a1510; /* Fallback color */
  box-shadow: 0 15px 45px rgba(0,0,0,0.8), 0 0 30px rgba(200, 120, 58, 0.2);
  display: flex; align-items: center; justify-content: center;
}

.mira-portrait-wrap img, .h-avatar img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
}

.mira-name { 
  font-family: 'Ibarra Real Nova', serif; 
  font-style: italic; font-size: 68px; font-weight: 700;
  color: var(--gold); margin-bottom: 40px; letter-spacing: -3px;
}

.mcard {
  width: 100%; max-width: 380px; padding: 22px; border-radius: 16px;
  border: 1px solid var(--border);
  background: rgba(30, 15, 8, 0.85);
  cursor: pointer; margin-bottom: 14px;
  transition: all 0.4s ease;
  backdrop-filter: blur(15px);
  font-family: 'Ibarra Real Nova', serif;
  font-style: italic; font-size: 21px; color: #c8b49a;
  text-align: center;
}
.mcard:hover { border-color: var(--gold); background: rgba(45, 25, 15, 0.98); transform: translateY(-5px); }

/* --- CHAT UI --- */
#chatscreen { width: 100%; max-width: 700px; height: 100vh; display: flex; flex-direction: column; }
.chat-header {
  padding: 15px 25px; display: flex; align-items: center; justify-content: space-between;
  background: rgba(19, 10, 6, 0.98); border-bottom: 1px solid var(--border);
}
.h-identity { display: flex; align-items: center; gap: 15px; }
.h-avatar { width: 50px; height: 50px; border-radius: 50%; overflow: hidden; border: 1.5px solid var(--gold); background: #2a1510; }
.h-name { font-family: 'Ibarra Real Nova', serif; font-style: italic; font-size: 28px; color: var(--gold); }

.chat-area { flex: 1; overflow-y: auto; padding: 30px; display: flex; flex-direction: column; gap: 20px; }
.msg { display: flex; flex-direction: column; max-width: 82%; }
.msg.mira { align-self: flex-start; }
.msg.user { align-self: flex-end; align-items: flex-end; }
.bubble { padding: 16px 22px; border-radius: 22px; font-size: 16px; line-height: 1.6; }
.msg.mira .bubble { background: #261812; border: 1px solid rgba(200, 120, 58, 0.1); color: #c8b49a; border-top-left-radius: 4px; }
.msg.user .bubble { background: rgba(200, 120, 58, 0.22); color: var(--cream); border-top-right-radius: 4px; }

.input-section { padding: 20px 25px 35px; background: rgba(19, 10, 6, 0.98); border-top: 1px solid var(--border); }
.ibox { display: flex; gap: 15px; align-items: flex-end; background: #1a0d07; border: 1px solid var(--border); border-radius: 35px; padding: 12px 12px 12px 24px; }
textarea { flex: 1; background: transparent; border: none; outline: none; color: var(--cream); font-size: 16px; line-height: 1.5; resize: none; }
.btn-send { width: 46px; height: 46px; border-radius: 50%; background: var(--amber); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.btn-send svg { fill: white; width: 20px; height: 20px; }
</style>
</head>
<body>
<canvas id="bg"></canvas>

<div class="screen" id="welcome">
  <div class="mira-portrait-wrap">
    <img src="https://i.postimg.cc/jdTf7xsv/AZ0li-YNpf-4AE4-M0xzpg-AZ0li-YNp-A9D7Ih-Vp-Jdy4w.png" alt="Mira" onerror="this.src='https://www.w3schools.com/howto/img_avatar2.png'">
  </div>
  <h1 class="mira-name">mira</h1>
  <div class="mcard" onclick="startChat('talk')">talk</div>
  <div class="mcard" onclick="startChat('advice')">need advice</div>
  <div class="mcard" onclick="startChat('expert')">psychological insight</div>
</div>

<div class="screen hidden" id="chatscreen">
  <header class="chat-header">
    <div class="h-identity">
      <div class="h-avatar">
        <img src="https://i.postimg.cc/jdTf7xsv/AZ0li-YNpf-4AE4-M0xzpg-AZ0li-YNp-A9D7Ih-Vp-Jdy4w.png" alt="Mira">
      </div>
      <div class="h-name">mira</div>
    </div>
  </header>
  <main class="chat-area" id="chatArea"></main>
  <footer class="input-section">
    <div class="ibox">
      <textarea id="inp" placeholder="Message Mira..." rows="1"></textarea>
      <button class="btn-send" onclick="send()"><svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>
    </div>
  </footer>
</div>

<script>
/* STAR BACKGROUND */
(function(){
  const c=document.getElementById('bg'),ctx=c.getContext('2d');
  let W,H,stars=[];
  function init(){W=c.width=window.innerWidth;H=c.height=window.innerHeight;stars=Array.from({length:80},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*0.8+0.2,o:Math.random(),v:Math.random()*0.001+0.0005}));}
  function draw(){ctx.clearRect(0,0,W,H);stars.forEach(s=>{const a=0.1+Math.abs(Math.sin(Date.now()*s.v+s.o)*0.3);ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(240,225,200,${a})`;ctx.fill();});requestAnimationFrame(draw);}
  window.addEventListener('resize',init);init();draw();
})();

const SYSTEM = `You are Mira. You are a mature, grounded, and intuitive friend. You don't sound like a therapist or a textbook. strictly lowercase. short sentences. give a clear strategic move to handle the situation.`;

let history=[], busy=false;

function startChat(m){
  document.getElementById('welcome').classList.add('hidden');
  document.getElementById('chatscreen').classList.remove('hidden');
  renderMira("i'm listening. what's on your mind? ✨");
}

async function renderMira(text){
  const ca=document.getElementById('chatArea');
  const g=document.createElement('div'); g.className='msg mira';
  g.innerHTML=`<div class="bubble">${text.toLowerCase()}</div>`;
  ca.appendChild(g); ca.scrollTop=ca.scrollHeight;
}

async function send(){
  const inp=document.getElementById('inp'); const val=inp.value.trim();
  if(!val || busy) return;
  inp.value=''; busy=true;
  const g=document.createElement('div'); g.className='msg user';
  g.innerHTML=`<div class="bubble">${val}</div>`;
  document.getElementById('chatArea').appendChild(g);
  // Add your API fetch logic here as before
  busy=false;
}
</script>
</body>
</html>
