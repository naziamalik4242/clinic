'use client';

import React from 'react';
import { Layers } from 'lucide-react';

export default function PlatformChart() {
  const channels = [
    { name: 'WhatsApp Cloud API', share: '58%', allocation: 'w-[58%]', color: 'bg-emerald-500' },
    { name: 'Instagram Direct Message', share: '31%', allocation: 'w-[31%]', color: 'bg-pink-500' },
    { name: 'Facebook Messenger Node', share: '11%', allocation: 'w-[11%]', color: 'bg-blue-500' }
  ];

  return (
    <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 space-y-4">
      <h4 className="text-xs font-black tracking-wide uppercase text-white flex items-center gap-2">
        <Layers className="w-3.5 h-3.5 text-indigo-400" /> Channel Ingestion Load
      </h4>

      {/* Stacked bar structure representation profile mapping */}
      <div className="h-3.5 w-full bg-slate-900 rounded-xl overflow-hidden flex p-0.5 border border-slate-950 mt-2">
        {channels.map((chan, i) => (
          <div key={i} className={`h-full ${chan.color} ${chan.allocation} first:rounded-l-lg last:rounded-r-lg opacity-85 hover:opacity-100 transition-opacity`} />
        ))}
      </div>

      <div className="space-y-2 pt-2">
        {channels.map((chan, i) => (
          <div key={i} className="flex items-center justify-between text-[11px] font-bold">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${chan.color}`} />
              <span className="text-slate-400">{chan.name}</span>
            </div>
            <span className="text-white font-mono">{chan.share}</span>
          </div>
        ))}
      </div>
    </div>
  );
}