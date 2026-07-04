'use client';

import React from 'react';
import { DollarSign } from 'lucide-react';

export default function RevenueChart() {
  const chartData = [
    { label: 'Mon', val: 40 },
    { label: 'Tue', val: 55 },
    { label: 'Wed', val: 85 },
    { label: 'Thu', val: 65 },
    { label: 'Fri', val: 95 },
    { label: 'Sat', val: 70 }
  ];

  return (
    <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 space-y-5">
      <div className="flex justify-between items-center">
        <h4 className="text-xs font-black tracking-wide uppercase text-white flex items-center gap-2">
          <DollarSign className="w-3.5 h-3.5 text-indigo-400" /> Revenue Stream Vector
        </h4>
        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-900/20">
          +$14,240 gross
        </span>
      </div>

      <div className="h-40 flex items-end justify-between gap-2 pt-4 px-2">
        {chartData.map((data, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
            <div className="w-full bg-slate-900 rounded-t-lg relative overflow-hidden transition-all duration-500 group-hover:bg-slate-850" style={{ height: `${data.val}%` }}>
              <div className="absolute inset-0 bg-linear-to-t from-indigo-600/20 to-indigo-500/40 opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-indigo-400 shadow-md shadow-indigo-500" />
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-500 group-hover:text-slate-300 transition-colors">
              {data.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}