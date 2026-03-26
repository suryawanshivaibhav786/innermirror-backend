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
.screen.hidden { opacity: 0; pointer-events: none; transform: translateY(25px); }

#welcome { padding: 40px 20px; text-align: center; max-width: 440px; width: 100%; }

.mira-portrait-frame {
  width: 230px; height: 230px;
  margin: 0 auto 30px;
  border-radius: 50%;
  border: 1.5px solid var(--gold);
  padding: 5px;
  background: #1e0f08;
  box-shadow: 0 20px 60px rgba(0,0,0,0.9), 0 0 30px rgba(232, 168, 112, 0.1);
  overflow: hidden;
}

.mira-portrait-frame img, .h-avatar img {
  width: 100%; height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.mira-name { 
  font-family: 'Ibarra Real Nova', serif; 
  font-style: italic; font-size: 78px; font-weight: 700;
  color: var(--gold); margin-bottom: 45px; letter-spacing: -4px;
}

.mcard {
  width: 100%; padding: 22px; border-radius: 18px;
  border: 1px solid var(--border);
  background: rgba(25, 12, 7, 0.85);
  cursor: pointer; margin-bottom: 15px;
  transition: all 0.4s ease;
  backdrop-filter: blur(20px);
  font-family: 'Ibarra Real Nova', serif;
  font-style: italic; font-size: 22px; color: var(--gold);
}
.mcard:hover { border-color: var(--gold); background: rgba(45, 25, 15, 0.98); transform: translateY(-5px); }

#chatscreen { width: 100%; max-width: 700px; height: 100vh; display: flex; flex-direction: column; }
.chat-header {
  padding: 15px 25px; display: flex; align-items: center; justify-content: space-between;
  background: rgba(15, 8, 5, 0.98); border-bottom: 1px solid var(--border);
}
.h-identity { display: flex; align-items: center; gap: 15px; }
.h-avatar { width: 52px; height: 52px; border-radius: 50%; overflow: hidden; border: 1px solid var(--gold); }
.h-name { font-family: 'Ibarra Real Nova', serif; font-style: italic; font-size: 28px; color: var(--gold); }

.chat-area { flex: 1; overflow-y: auto; padding: 30px; display: flex; flex-direction: column; gap: 20px; }
.msg { display: flex; flex-direction: column; max-width: 85%; }
.bubble { padding: 16px 22px; border-radius: 22px; font-size: 16px; line-height: 1.6; }
.msg.mira .bubble { background: #1e110b; color: #d6c4ae; border-top-left-radius: 4px; border: 1px solid rgba(232, 168, 112, 0.08); align-self: flex-start; }
.msg.user .bubble { background: rgba(232, 168, 112, 0.15); color: var(--cream); border-top-right-radius: 4px; align-self: flex-end; }

.input-section { padding: 20px 25px 40px; background: rgba(15, 8, 5, 0.98); border-top: 1px solid var(--border); }
.ibox { display: flex; gap: 15px; align-items: flex-end; background: #140a07; border: 1px solid var(--border); border-radius: 35px; padding: 12px 12px 12px 28px; }
textarea { flex: 1; background: transparent; border: none; outline: none; color: var(--cream); font-size: 16px; line-height: 1.5; resize: none; }
.btn-send { width: 48px; height: 48px; border-radius: 50%; background: var(--amber); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; }
</style>
</head>
<body>
<canvas id="bg"></canvas>

<div class="screen" id="welcome">
  <div class="mira-portrait-frame">
    <img src="https://i.postimg.cc/9F3Nv7ck/Gemini-Generated-Image-slx6cdslx6cdslx6.png" id="mainPic" alt="Mira">
  </div>
  <h1 class="mira-name">mira</h1>
  <div class="mcard" onclick="startChat()">talk</div>
  <div class="mcard" onclick="startChat()">need advice</div>
</div>

<div class="screen hidden" id="chatscreen">
  <header class="chat-header">
    <div class="h-identity">
      <div class="h-avatar">
        <img src="https://i.postimg.cc/9F3Nv7ck/Gemini-Generated-Image-slx6cdslx6cdslx6.png" id="avatarPic" alt="Mira">
      </div>
      <div>
        <div class="h-name">mira</div>
        <div style="font-size:10px; color:#6db87a; font-weight:700;">ONLINE</div>
      </div>
    </div>
  </header>
  <main class="chat-area" id="chatArea"></main>
  <footer class="input-section">
    <div class="ibox">
      <textarea id="inp" placeholder="Message Mira..." rows="1"></textarea>
      <button class="btn-send" onclick="send()"><svg viewBox="0 0 24 24" width="22" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>
    </div>
  </footer>
</div>

<script>
/* STAR BACKGROUND ENGINE */
(function(){
  const c=document.getElementById('bg'),ctx=c.getContext('2d');
  let W,H,stars=[];
  function init(){W=c.width=window.innerWidth;H=c.height=window.innerHeight;stars=Array.from({length:80},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*0.8+0.2,o:Math.random(),v:Math.random()*0.001+0.0005}));}
  function draw(){ctx.clearRect(0,0,W,H);stars.forEach(s=>{const a=0.1+Math.abs(Math.sin(Date.now()*s.v+s.o)*0.3);ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(240,225,200,${a})`;ctx.fill();});requestAnimationFrame(draw);}
  window.addEventListener('resize',init);init();draw();
})();

/* FORCED RE-RENDER SCRIPT */
window.onload = function() {
  const newImg = "https://i.ibb.co/L5Z4D1C/mira-art.png";
  document.getElementById('mainPic').src = newImg;
  document.getElementById('avatarPic').src = newImg;
};

function startChat(){
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
  if(!val) return;
  const g=document.createElement('div'); g.className='msg user';
  g.innerHTML=`<div class="bubble">${val}</div>`;
  document.getElementById('chatArea').appendChild(g);
  inp.value='';
}
</script>
</body>
</html>
