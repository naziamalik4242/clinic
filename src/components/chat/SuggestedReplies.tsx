'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface SuggestedRepliesProps {
  onSelect: (reply: string) => void;
}

export default function SuggestedReplies({ onSelect }: SuggestedRepliesProps) {
  const customChips = [
    "Lock tomorrow 2:00 PM slot?",
    "Laser packages start at $150",
    "Forwarding to clinical doctor"
  ];

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
        <Sparkles className="w-2.5 h-2.5 text-amber-400" /> Copilot Macro:
      </span>
      {customChips.map((chip, index) => (
        <button
          key={index}
          onClick={() => onSelect(chip)}
          className="text-[10px] font-bold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg px-2.5 py-1 transition-all shadow-sm"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}