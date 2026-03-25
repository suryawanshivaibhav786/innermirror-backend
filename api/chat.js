"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useChat } from 'ai/react';

export default function InnerMirror() {
  const [mode, setMode] = useState<'reflect' | 'decode' | 'words'>('reflect');
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: { mode },
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      {/* Animated Star Field */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="stars-animation"></div>
      </div>

      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-12 pb-24 h-screen flex flex-col">
        {/* Header */}
        <header className="text-center mb-8 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-b from-indigo-400 to-purple-600 blur-[2px] shadow-[0_0_30px_rgba(99,102,241,0.5)] mb-4 animate-pulse"></div>
          <h1 className="text-3xl font-serif tracking-widest text-white mb-2">INNERMIRROR</h1>
          <p className="text-sm text-slate-400 tracking-wider">A quiet space for clarity.</p>
        </header>

        {/* Mode Selectors */}
        <div className="flex justify-center gap-3 mb-8">
          {['reflect', 'decode', 'words'].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m as any)}
              className={`px-4 py-2 rounded-full text-xs tracking-widest transition-all border ${
                mode === m ? 'bg-indigo-600/20 border-indigo-400 text-indigo-200' : 'bg-transparent border-slate-800 text-slate-500 hover:border-slate-600'
              }`}
            >
              {m.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
          {messages.length === 0 && (
            <div className="text-center py-20 opacity-50 space-y-4">
              <p className="italic font-serif">"Tell me what's on your mind. I'm listening."</p>
              <div className="flex flex-wrap justify-center gap-2 max-w-sm mx-auto">
                {["I feel stuck...", "Why did they say that?", "How do I say no?"].map(t => (
                   <button key={t} className="text-[10px] border border-slate-800 rounded px-2 py-1 hover:border-indigo-500 transition-colors cursor-default">{t}</button>
                ))}
              </div>
            </div>
          )}
          
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-5 py-4 rounded-2xl leading-relaxed ${
                m.role === 'user' 
                ? 'bg-slate-800/40 text-slate-200 border border-slate-700/50' 
                : 'bg-indigo-950/20 text-indigo-50 border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.05)]'
              }`}>
                {m.content}
              </div>
            </div>
          ))}
          {isLoading && <div className="text-xs text-indigo-400 animate-pulse ml-2 font-serif">InnerMirror is reflecting...</div>}
        </div>

        {/* Input Field */}
        <form onSubmit={handleSubmit} className="mt-6 relative">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder={mode === 'words' ? "What conversation are you dreading?" : "Speak your truth..."}
            className="w-full bg-[#0d1117]/80 backdrop-blur-md border border-slate-800 rounded-full py-4 px-6 pr-16 focus:outline-none focus:border-indigo-500 transition-all text-slate-200 placeholder:text-slate-600"
          />
          <button 
            type="submit"
            className="absolute right-3 top-2 bottom-2 w-10 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
          >
            →
          </button>
        </form>
      </main>

      <style jsx global>{`
        .stars-animation {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0)),
                      radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)),
                      radial-gradient(1.5px 1.5px at 100px 150px, #7c3aed, rgba(0,0,0,0));
          background-size: 200px 200px;
          animation: movement 120s linear infinite;
        }
        @keyframes movement { from { background-position: 0 0; } to { background-position: 1000px 1000px; } }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
      `}</style>
    </div>
  );
}
