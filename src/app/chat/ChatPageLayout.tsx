'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader2, User, ShieldCheck } from 'lucide-react';

interface ChatPageLayoutProps {
  platformName: string;
  icon: React.ReactNode;
  filteredConversations: any[];
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  sendAgentMessage: (id: string, text: string) => Promise<void>;
}

export default function ChatPageLayout({
  platformName, icon, filteredConversations, activeId, setActiveId, sendAgentMessage
}: ChatPageLayoutProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeId) return;
    async function loadMsg() {
      try {
        setMessagesLoading(true);
        const res = await fetch(`/api/chat?conversationId=${activeId}`);
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setMessagesLoading(false);
      }
    }
    loadMsg();
  }, [activeId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeId) return;

    const temp = input;
    setInput('');
    setMessages(p => [...p, { id: Math.random().toString(), sender: 'HUMAN_AGENT', text: temp, timestamp: 'Just Now' }]);
    await sendAgentMessage(activeId, temp);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-slate-950 border-l border-slate-100 dark:border-slate-900">
      {/* Sidebar Channels List */}
      <div className="w-80 border-r border-slate-100 dark:border-slate-900 flex flex-col bg-slate-50/50">
        <div className="p-4 border-b border-slate-100 flex items-center gap-2">
          {icon}
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">{platformName}</h2>
            <p className="text-[10px] text-slate-400">Isolated channel scope pipelines</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredConversations.length === 0 ? (
            <p className="text-center text-xs text-slate-400 py-8">No active chats here.</p>
          ) : (
            filteredConversations.map(chat => (
              <button 
                key={chat.id} 
                onClick={() => setActiveId(chat.id)}
                className={`w-full text-left p-3 rounded-xl transition-all text-sm ${chat.id === activeId ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-100'}`}
              >
                <p className="font-semibold truncate">{chat.patientName}</p>
                <p className={`text-xs truncate mt-0.5 ${chat.id === activeId ? 'text-indigo-100' : 'text-slate-400'}`}>{chat.lastMessage}</p>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Messages Terminal Workspace */}
      <div className="flex-1 flex flex-col bg-slate-50/30">
        {activeId && filteredConversations.find(c => c.id === activeId) ? (
          <>
            <div className="h-16 border-b border-slate-100 px-6 flex items-center justify-between bg-white dark:bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"><User className="w-4 h-4 text-slate-400" /></div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{filteredConversations.find(c => c.id === activeId)?.patientName}</h3>
              </div>
              <div className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs font-semibold"><ShieldCheck className="w-3.5 h-3.5" /> Synchronized Channel</div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messagesLoading ? (
                <div className="flex h-full items-center justify-center"><Loader2 className="w-5 h-5 text-indigo-600 animate-spin" /></div>
              ) : (
                messages.map(m => {
                  const isAgent = m.sender === 'HUMAN_AGENT' || m.sender === 'AI';
                  return (
                    <div key={m.id} className={`flex ${isAgent ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] rounded-xl p-3 text-sm ${isAgent ? 'bg-indigo-600 text-white' : 'bg-white border text-slate-900'}`}>
                        <p>{m.text}</p>
                        <span className="text-[9px] block text-right mt-1 opacity-70">{m.timestamp}</span>
                      </div>
                    </div>
                  )
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 bg-white border-t flex gap-2">
              <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Type human override reply..." className="flex-1 bg-slate-50 border rounded-xl px-4 py-2 text-sm outline-none" />
              <button type="submit" className="bg-indigo-600 px-4 rounded-xl text-white"><Send className="w-4 h-4" /></button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">Select a pipeline record to take control.</div>
        )}
      </div>
    </div>
  );
}