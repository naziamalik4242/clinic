'use client';

import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="flex flex-col space-y-1 self-start max-w-[50%] animate-fade-in">
      <span className="text-[9px] font-mono font-bold text-indigo-400/80 uppercase tracking-wider px-1">
        AI Processing Context...
      </span>
      <div className="bg-slate-900 border border-slate-800/80 p-3 rounded-2xl rounded-tl-none flex items-center gap-1.5 w-16 justify-center shadow-inner">
        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />
      </div>
    </div>
  );
}