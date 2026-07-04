'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useChat } from '@/hooks/useChat';
import { Send, Loader2, MessageCircle, Smartphone, ShieldCheck, Sparkles, User } from 'lucide-react';

interface Message {
  id: string;
  sender: 'PATIENT' | 'AI' | 'HUMAN_AGENT';
  text: string;
  timestamp: string;
}

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryId = searchParams.get('id');

  const { conversations, loading: listLoading, activeId, setActiveId, sendAgentMessage, messages: chatMessages, isTyping } = useChat() as any;
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesLoading, setMessagesLoading] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (queryId && queryId !== activeId) {
      setActiveId(queryId);
    }
  }, [queryId, activeId, setActiveId]);

  useEffect(() => {
    if (!activeId) return;
    setMessages(chatMessages);
    router.replace(`/chat?id=${activeId}`, { scroll: false });
  }, [activeId, chatMessages, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeId || isSending) return;

    try {
      setIsSending(true);
      const tempText = inputText;
      setInputText('');

      const optimisticMsg: Message = {
        id: Math.random().toString(),
        sender: 'HUMAN_AGENT',
        text: tempText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, optimisticMsg]);
      await sendAgentMessage(activeId, tempText);
    } catch (err) {
      console.error('Message could not be sent:', err);
    } finally {
      setIsSending(false);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'WHATSAPP': return <MessageCircle className="w-4 h-4 text-emerald-500" />;
      case 'INSTAGRAM': return <MessageCircle className="w-4 h-4 text-pink-500" />;
      default: return <Smartphone className="w-4 h-4 text-blue-500" />;
    }
  };

  const activeChat = conversations.find((c: { id: string }) => c.id === activeId);

  return (
    <div className="flex h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white border-l border-slate-800">
      <div className="w-80 border-r border-slate-800 flex flex-col bg-slate-900/70">
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-indigo-400">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">AI Concierge</span>
          </div>
          <h2 className="text-xl font-bold mt-2">Live Inbox</h2>
          <p className="text-xs text-slate-400 mt-1">Respond to patients with an AI-assisted experience.</p>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {listLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
            </div>
          ) : conversations.length === 0 ? (
            <p className="text-center text-xs text-slate-500 py-8">No conversations available yet.</p>
          ) : (
            conversations.map((chat: { id: string; platform: string; patientName: string; lastMessage: string }) => (
              <button
                key={chat.id}
                onClick={() => setActiveId(chat.id)}
                className={`w-full text-left flex items-start gap-3 p-3 rounded-xl transition-all ${
                  chat.id === activeId
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20'
                    : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <div className={`p-2 rounded-lg ${chat.id === activeId ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300'}`}>
                  {getPlatformIcon(chat.platform)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${chat.id === activeId ? 'text-white' : 'text-slate-100'}`}>{chat.patientName}</p>
                  <p className={`text-xs truncate mt-0.5 ${chat.id === activeId ? 'text-indigo-100' : 'text-slate-400'}`}>{chat.lastMessage}</p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-slate-950/40">
        {activeChat ? (
          <>
            <div className="h-16 border-b border-slate-800 px-6 flex items-center justify-between bg-slate-900/70">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                  <User className="w-4 h-4 text-slate-300" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{activeChat.patientName}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {getPlatformIcon(activeChat.platform)}
                    <span className="text-[10px] text-slate-400 capitalize">{activeChat.platform.toLowerCase()} channel</span>
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full text-xs font-semibold border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" /> AI active
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.12),transparent_35%)]">
              {messagesLoading ? (
                <div className="flex h-full items-center justify-center">
                  <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
                </div>
              ) : (
                messages.map((msg: Message) => {
                  const isAgent = msg.sender === 'HUMAN_AGENT' || msg.sender === 'AI';
                  return (
                    <div key={msg.id} className={`flex ${isAgent ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[72%] rounded-2xl p-3.5 shadow-sm border ${
                        isAgent
                          ? msg.sender === 'AI'
                            ? 'bg-indigo-500/10 border-indigo-500/30 text-slate-100'
                            : 'bg-indigo-600 border-indigo-500 text-white'
                          : 'bg-slate-900/90 border-slate-800 text-slate-100'
                      }`}>
                        {msg.sender === 'AI' && (
                          <span className="text-[9px] font-extrabold uppercase tracking-wider text-indigo-300 block mb-1">🤖 AI concierge</span>
                        )}
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                        <span className={`text-[10px] block text-right mt-1.5 ${isAgent && msg.sender !== 'AI' ? 'text-indigo-100' : 'text-slate-400'}`}>{msg.timestamp}</span>
                      </div>
                    </div>
                  );
                })
              )}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 px-3.5 py-3 text-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                    AI is crafting a response...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-slate-900/80 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about treatments, pricing, or booking..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500 text-white"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isSending}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-4 rounded-xl flex items-center justify-center transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <Smartphone className="w-12 h-12 stroke-[1.2] mb-2 text-slate-500" />
            <p className="text-sm font-medium">Select a conversation to begin chatting with the AI concierge.</p>
          </div>
        )}
      </div>
    </div>
  );
}