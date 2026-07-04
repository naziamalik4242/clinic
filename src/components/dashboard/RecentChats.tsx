'use client';

import React from 'react';
import { MessageSquare, ArrowUpRight } from 'lucide-react';

export default function RecentChats() {
  const feeds = [
    { id: 1, name: 'Zainab Malik', channel: 'WhatsApp', text: 'Laser hair removal slot booking details?', time: '2m ago' },
    { id: 2, name: 'Ali Khan', channel: 'Instagram', text: 'Anti-aging treatment packages pricing structure?', time: '14m ago' },
    { id: 3, name: 'Ayesha Ahmed', channel: 'Messenger', text: 'Tomorrow morning appointment adjustment confirmation.', time: '1h ago' }
  ];

  return (
    <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-black tracking-wide uppercase text-white flex items-center gap-2">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-400" /> Active Conversations
          </h4>
          <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider bg-slate-950 px-2 py-0.5 rounded border border-slate-900">
            Live Stream
          </span>
        </div>
        
        <div className="space-y-2 pt-1">
          {feeds.map((feed) => (
            <div key={feed.id} className="p-3 bg-slate-900/40 border border-slate-900/60 rounded-xl flex items-center justify-between gap-3 hover:bg-slate-900/80 transition-all">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white tracking-tight truncate">{feed.name}</span>
                  <span className="text-[8px] font-mono font-bold px-1 bg-indigo-950/50 text-indigo-400 rounded border border-indigo-900/30">
                    {feed.channel}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate pt-0.5">{feed.text}</p>
              </div>
              <span className="text-[10px] font-mono font-medium text-slate-500 whitespace-nowrap">{feed.time}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full mt-4 py-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-[11px] font-bold text-slate-300 rounded-xl transition-all flex items-center justify-center gap-1">
        Open Chat Core Portal <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
      </button>
    </div>
  );
}