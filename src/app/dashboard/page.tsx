"use client";

import React, { useState } from "react";

// Mock Data for Luxury Aesthetic Clinic Chats
const initialChats = [
  { id: "1", name: "Ayesha Khan", phone: "+92 300 1234567", lastMessage: "Can I book a HydraFacial session for tomorrow?", time: "10:42 AM", unread: true, status: "Active" },
  { id: "2", name: "Zainab Malik", phone: "+92 321 7654321", lastMessage: "The bot scheduled my appointment perfectly. Thank you!", time: "09:15 AM", unread: false, status: "Completed" },
  { id: "3", name: "Dr. Hamza", phone: "+92 333 9876543", lastMessage: "System Alert: Syncing new slot mappings to Google Calendar.", time: "Yesterday", unread: false, status: "System" }
];

const mockMessages = [
  { sender: "patient", text: "Hello, I wanted to inquire about premium skin rejuvenation therapies.", time: "10:40 AM" },
  { sender: "bot", text: "Welcome to AuraClinic. We offer specialized bespoke aesthetic procedures including Gold Laser Genesis and HydraFacial Luxe. Would you like to check available slots with our specialists?", time: "10:41 AM" },
  { sender: "patient", text: "Can I book a HydraFacial session for tomorrow?", time: "10:42 AM" }
];

export default function ChatbotDashboard() {
  const [chats] = useState(initialChats);
  const [activeChat, setActiveChat] = useState(initialChats[0]);
  const [messages, setMessages] = useState(mockMessages);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Append User Message
    const updatedMessages = [...messages, { sender: "patient", text: inputMessage, time: "Just now" }];
    setMessages(updatedMessages);
    setInputMessage("");

    // Simulate AI Agent Response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Processing your payload request via Gemini Core... Slot confirmed automatically via n8n pipeline.", time: "Just now" }
      ]);
    }, 1200);
  };

  return (
    <div className="flex h-screen bg-neutral-950 text-neutral-100 font-sans overflow-hidden">
      
      {/* 1. PRIMARY SIDEBAR (Global Navigation - Already customized in your layout) */}
      <aside className="w-64 border-r border-neutral-900 bg-neutral-950 p-6 flex flex-col justify-between md:flex">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-light tracking-widest text-lg uppercase text-amber-500">AURACLINIC</span>
          </div>
          
          <nav className="flex flex-col gap-1">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm bg-neutral-900 text-amber-500 font-medium border border-neutral-800/50">
              💬 Live Chat Portal
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-neutral-400 hover:bg-neutral-900/50 hover:text-neutral-200 transition-all text-left">
              📅 Appointments CRM
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-neutral-400 hover:bg-neutral-900/50 hover:text-neutral-200 transition-all text-left">
              ⚙️ System Settings
            </button>
          </nav>
        </div>
        
        <div className="p-4 bg-neutral-900/40 border border-neutral-900 rounded-xl flex items-center justify-between">
          <span className="text-xs font-mono text-neutral-500">v2.4 Online</span>
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
        </div>
      </aside>

      {/* 2. SECONDARY SIDEBAR (Active Patient Threads) */}
      <section className="w-80 border-r border-neutral-950 bg-neutral-950 flex flex-col h-full">
        <div className="p-5 border-b border-neutral-900 bg-neutral-950/50">
          <h2 className="text-lg font-light tracking-wide text-neutral-200">Conversations</h2>
          <p className="text-xs text-neutral-500 mt-1">Live AI routing queues</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex flex-col gap-2 border ${
                activeChat.id === chat.id
                  ? "bg-neutral-900/80 border-neutral-800 shadow-lg"
                  : "bg-transparent border-transparent hover:bg-neutral-900/30"
              }`}
            >
              <div className="flex justify-between items-start w-full">
                <span className={`text-sm font-medium ${activeChat.id === chat.id ? "text-amber-500" : "text-neutral-300"}`}>
                  {chat.name}
                </span>
                <span className="text-[10px] text-neutral-600 font-mono">{chat.time}</span>
              </div>
              <p className="text-xs text-neutral-400 truncate w-full line-clamp-1">{chat.lastMessage}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-950 text-neutral-500 border border-neutral-800">
                  {chat.status}
                </span>
                {chat.unread && <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. MAIN CONVERSATION WINDOW */}
      <section className="flex-1 flex flex-col h-full bg-neutral-950">
        {/* Chat Window Header */}
        <div className="p-5 border-b border-neutral-900 bg-neutral-950/50 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium text-neutral-200">{activeChat.name}</h3>
            <p className="text-xs text-neutral-500 font-mono mt-0.5">{activeChat.phone}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1 rounded-full bg-neutral-900 text-neutral-400 border border-neutral-800">
              🤖 AI Controlled
            </span>
          </div>
        </div>

        {/* Message Thread Area */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex flex-col max-w-[75%] ${msg.sender === "patient" ? "ml-auto items-end" : "mr-auto items-start"}`}>
              <div
                className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === "patient"
                    ? "bg-amber-600 text-neutral-950 font-medium rounded-tr-none"
                    : "bg-neutral-900 text-neutral-200 border border-neutral-800/80 rounded-tl-none shadow-xl"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[9px] font-mono text-neutral-600 mt-1 px-1">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Message Input Trigger Form */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-neutral-900 bg-neutral-950">
          <div className="flex gap-2 items-center bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 focus-within:border-amber-500/50 transition-all">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Send message to ${activeChat.name} or prompt fallback user...`}
              className="flex-1 bg-transparent border-none text-sm text-neutral-200 outline-none placeholder-neutral-600"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs px-4 py-2 rounded-lg font-medium transition-all"
            >
              Send
            </button>
          </div>
        </form>
      </section>

    </div>
  );
}