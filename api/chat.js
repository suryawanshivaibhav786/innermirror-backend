<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>mira | human intelligence</title>

<style>
@import url('https://fonts.googleapis.com/css2?family=Ibarra+Real+Nova:ital,wght@1,600;1,700&family=Nunito:wght@300;400;500;600&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #0f0805; 
  --gold: #e8a870;
  --amber: #c8783a;
  --cream: #f0e4d0;
  --border: rgba(232, 168, 112, 0.12);
  --mira-bubble: #1a110c;
  --user-bubble: rgba(232, 168, 112, 0.1);
}

body {
  font-family: 'Nunito', sans-serif;
  background: var(--bg);
  color: var(--cream);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-transform: lowercase; /* Mira strictly speaks in lowercase */
}

/* MAIN CONTAINER */
.chat-container {
  width: 100%;
  max-width: 500px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  position: relative;
}

/* HEADER & AVATAR */
.chat-header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 25px 20px;
  border-bottom: 1px solid var(--border);
  background: rgba(15, 8, 5, 0.8);
  backdrop-filter: blur(10px);
  z-index: 10;
}

.avatar-container {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  border: 1px solid var(--gold);
  padding: 2px;
  background: linear-gradient(145deg, #1e0f08, #0f0805);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* SVG Line Art Woman Avatar */
.mira-avatar {
  width: 90%;
  height: 90%;
  stroke: var(--gold);
  stroke-width: 1.5;
  fill: none;
  opacity: 0.9;
}

.header-info h2 {
  font-family: 'Ibarra Real Nova', serif;
  font-style: italic;
  font-size: 24px;
  color: var(--gold);
  letter-spacing: -0.5px;
}

.status {
  font-size: 10px;
  color: var(--amber);
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.status::before {
  content: '';
  width: 6px;
  height: 6px;
  background: var(--amber);
  border-radius: 50%;
  display: inline-block;
}

/* CHAT AREA */
.chat-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  scroll-behavior: smooth;
}

/* SCROLLBAR */
.chat-area::-webkit-scrollbar { width: 4px; }
.chat-area::-webkit-scrollbar-thumb { background: var(--border); }

/* BUBBLES */
.msg {
  max-width: 85%;
  position: relative;
  animation: fadeIn 0.4s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.mira { align-self: flex-start; }
.user { align-self: flex-end; }

.bubble {
  padding: 14px 18px;
  border-radius: 20px;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 300;
}

.mira .bubble {
  background: var(--mira-bubble);
  color: var(--cream);
  border-bottom-left-radius: 4px;
  border: 1px solid var(--border);
}

.user .bubble {
  background: var(--user-bubble);
  color: var(--gold);
  border-bottom-right-radius: 4px;
  border: 1px solid rgba(232, 168, 112, 0.05);
}

/* INPUT SECTION */
.input-section {
  padding: 20px;
  background: var(--bg);
  display: flex;
  align-items: center;
  gap: 12px;
}

.input-wrapper {
  flex: 1;
  background: #1a110c;
  border-radius: 25px;
  padding: 10px 20px;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
}

textarea {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--cream);
  font-family: inherit;
  font-size: 15px;
  outline: none;
  resize: none;
  height: 24px;
  text-transform: lowercase;
}

textarea::placeholder { color: #554840; }

.send-btn {
  background: none;
  border: none;
  color: var(--gold);
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}

.send-btn:hover { transform: scale(1.1); color: var(--amber); }

/* TYPING INDICATOR */
.typing {
  font-size: 12px;
  color: var(--amber);
  margin-left: 10px;
  opacity: 0.7;
}

</style>
</head>
<body>

<div class="chat-container">
  
  <header class="chat-header">
    <div class="avatar-container">
      <!-- Outlined Woman Avatar SVG -->
      <svg class="mira-avatar" viewBox="0 0 100 100">
        <path d="M50,30 Q50,15 35,15 Q20,15 20,35 Q20,60 50,85 Q80,60 80,35 Q80,15 65,15 Q50,15 50,30" stroke-opacity="0.2"/>
        <path d="M30,40 C30,25 40,20 50,20 C60,20 70,25 70,40 C70,60 55,80 50,85 C45,80 30,60 30,40" />
        <path d="M40,35 Q50,32 60,35" />
        <path d="M45,45 Q50,48 55,45" />
        <circle cx="50" cy="40" r="25" />
        <path d="M28,60 Q50,55 72,60 Q75,85 75,95 L25,95 Q25,85 28,60" />
      </svg>
    </div>
    <div class="header-info">
      <h2>mira</h2>
      <div class="status">present</div>
    </div>
  </header>

  <div class="chat-area" id="chatArea">
    <!-- Messages appear here -->
  </div>

  <div id="typing" class="typing" style="display:none">mira is reflecting...</div>

  <div class="input-section">
    <div class="input-wrapper">
      <textarea id="inp" placeholder="tell me everything..." rows="1"></textarea>
      <button class="send-btn" onclick="send()">➤</button>
    </div>
  </div>

</div>

<script>
const chatArea = document.getElementById('chatArea');
const inp = document.getElementById('inp');
const typing = document.getElementById('typing');

// Initial Greeting in the "Mira Style"
window.onload = () => {
  setTimeout(() => {
    miraSpeak("i'm here.✨ [BREAK] tell me what's weighing on your heart today.");
  }, 500);
};

// Handle Enter Key
inp.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    send();
  }
});

function send() {
  const text = inp.value.trim();
  if (!text) return;

  // User Message
  renderMsg(text, 'user');
  inp.value = '';

  // Simulate Mira's Wisdom Process
  showTyping(true);
  
  // This is where you'd typically call your AI API
  // For now, I'm simulating her "Three Bubble" logic response
  setTimeout(() => {
    showTyping(false);
    
    // Example of how the [BREAK] logic works to create separate bubbles
    const response = "i can feel the static in your mind... it's heavy when you try to carry everyone else's expectations. ✨ [BREAK] look closer—the pressure you feel isn't yours, it's a story you've been told to believe. the truth is simpler: you are allowed to be unfinished. [BREAK] put your phone down for ten minutes. breathe into the quiet. that's where your power is hiding. 🕊️";
    
    miraSpeak(response);
  }, 1500);
}

function miraSpeak(fullText) {
  // Splits the text by [BREAK] to create the three-bubble wisdom effect
  const bubbles = fullText.split('[BREAK]');
  
  bubbles.forEach((text, index) => {
    setTimeout(() => {
      renderMsg(text.trim(), 'mira');
      chatArea.scrollTop = chatArea.scrollHeight;
    }, index * 800); // Slight delay between bubbles for "human" feel
  });
}

function renderMsg(text, sender) {
  const m = document.createElement('div');
  m.className = `msg ${sender}`;
  m.innerHTML = `<div class="bubble">${text.toLowerCase()}</div>`;
  chatArea.appendChild(m);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function showTyping(show) {
  typing.style.display = show ? 'block' : 'none';
  chatArea.scrollTop = chatArea.scrollHeight;
}
</script>

</body>
</html>
