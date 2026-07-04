'use client';

import React, { useState } from 'react';
import { Search, MessageSquare, Sparkles } from 'lucide-react';

interface Conversation {
  id: string;
  patientName: string;
  lastMessage: string;
  platform: 'WhatsApp' | 'Instagram' | 'Messenger';
  time: string;
  unread: boolean;
  isAiHandling: boolean;
}

interface ConversationListProps {
  onSelect: (id: string) => void;
  activeId?: string;
}

export default function ConversationList({ onSelect, activeId }: ConversationListProps) {
  const [search, setSearch] = useState('');
  
  const [threads] = useState<Conversation[]>([
    { id: 'p1', patientName: 'Zainab Malik', lastMessage: 'Laser hair removal slot booking details?', platform: 'WhatsApp', time: '2m ago', unread: true, isAiHandling: true },
    { id: 'p2', patientName: 'Ali Khan', lastMessage: 'Anti-aging treatment packages pricing structure?', platform: 'Instagram', time: '14m ago', unread: false, isAiHandling: true },
    { id: 'p3', patientName: 'Ayesha Ahmed', lastMessage: 'Human override triggered for appointment swap.', platform: 'Messenger', time: '1h ago', unread: false, isAiHandling: false }
  ]);

  const filtered = threads.filter(t => t.patientName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="w-full md:w-80 border-r border-slate-900 bg-slate-950/40 h-full flex flex-col shrink-0">
      {/* Internal Filter Field */}
      <div className="p-4 border-b border-slate-900 space-y-3">
        <h3 className="text-xs font-black tracking-wider uppercase text-white flex items-center gap-2">
          <MessageSquare className="w-3.5 h-3.5 text-indigo-400" /> Inbox Channels
        </h3>
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search patient record..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs outline-none focus:border-indigo-500 text-white font-medium"
          />
        </div>
      </div>

      {/* Scrolling Stream Queue */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filtered.map((item) => {
          const isActive = item.id === activeId;
          return (
            <div 
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`p-3 rounded-xl cursor-pointer transition-all flex flex-col gap-1.5 border ${
                isActive 
                  ? 'bg-indigo-600/10 border-indigo-500/20 shadow-sm' 
                  : 'bg-transparent border-transparent hover:bg-slate-900/40'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className={`text-xs font-bold truncate ${isActive ? 'text-indigo-400' : 'text-white'}`}>
                    {item.patientName}
                  </span>
                  {item.unread && <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" />}
                </div>
                <span className="text-[9px] font-mono font-medium text-slate-500 whitespace-nowrap">{item.time}</span>
              </div>

              <p className="text-[11px] text-slate-400 truncate leading-relaxed">{item.lastMessage}</p>

              <div className="flex justify-between items-center pt-1">
                <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  item.platform === 'WhatsApp' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/30' : 'bg-pink-950/40 text-pink-400 border border-pink-900/30'
                }`}>
                  {item.platform}
                </span>
                {item.isAiHandling && (
                  <span className="text-[8px] font-mono font-extrabold text-indigo-400 bg-indigo-950/40 px-1 rounded border border-indigo-900/20 flex items-center gap-0.5 shadow-sm">
                    <Sparkles className="w-2 h-2 text-amber-400" /> AI AGENT
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}