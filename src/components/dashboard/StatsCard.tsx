'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
}

export default function StatsCard({ title, value, change, isPositive, icon: Icon }: StatsCardProps) {
  return (
    <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 hover:border-slate-800/80 transition-all shadow-sm group">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <p className="text-[10px] uppercase font-mono font-bold text-slate-500 tracking-wider group-hover:text-slate-400 transition-colors">
            {title}
          </p>
          <h3 className="text-2xl font-black tracking-tight text-white">{value}</h3>
        </div>
        <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-indigo-400 shadow-inner group-hover:bg-indigo-600/5 group-hover:border-indigo-500/10 transition-all">
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-4">
        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
          isPositive ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/30' : 'bg-rose-950/50 text-rose-400 border border-rose-900/30'
        }`}>
          {change}
        </span>
        <span className="text-[10px] text-slate-500 font-medium">vs past 7 days</span>
      </div>
    </div>
  );
}