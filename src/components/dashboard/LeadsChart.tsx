'use client';

import React from 'react';
import { Target } from 'lucide-react';

export default function LeadsChart() {
  const bars = [
    { scale: 'Qualified', count: 142, pct: 'w-[78%]', color: 'bg-indigo-500' },
    { scale: 'Nurturing', count: 45, pct: 'w-[28%]', color: 'bg-slate-700' },
    { scale: 'Converted', count: 34, pct: 'w-[18%]', color: 'bg-emerald-500' }
  ];

  return (
    <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 space-y-4">
      <h4 className="text-xs font-black tracking-wide uppercase text-white flex items-center gap-2">
        <Target className="w-3.5 h-3.5 text-indigo-400" /> Lead Pipeline Capture Distribution
      </h4>

      <div className="space-y-4 pt-2">
        {bars.map((bar, i) => (
          <div key={i} className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-slate-400">{bar.scale}</span>
              <span className="text-white font-mono">{bar.count} data files</span>
            </div>
            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-950">
              <div className={`h-full ${bar.color} ${bar.pct} rounded-full transition-all duration-1000 ease-out`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}