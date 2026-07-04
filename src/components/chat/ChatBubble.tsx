'use client';

import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface ChatBubbleProps {
  sender: 'PATIENT' | 'AI' | 'HUMAN_AGENT';
  text: string;
  timestamp: string;
}

export default function ChatBubble({ sender, text, timestamp }: ChatBubbleProps) {
  const isPatient = sender === 'PATIENT';
  const isAi = sender === 'AI';

  return (
    <div className={`flex flex-col max-w-[75%] ${isPatient ? 'self-start' : 'self-end ml-auto text-right'}`}>
      <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1 px-1 flex items-center gap-1 justify-start last:justify-end">
        {isAi && <><Sparkles className="w-2 h-2 text-amber-400" /> AI Agent</>}
        {sender === 'HUMAN_AGENT' && <><ShieldCheck className="w-2 h-2 text-indigo-400" /> Clinic Operator</>}
        {isPatient && 'Patient Account'}
      </span>

      <div className={`p-3.5 rounded-2xl text-xs font-medium leading-relaxed border ${
        isPatient 
          ? 'bg-slate-900 border-slate-800 text-slate-100 rounded-tl-none' 
          : isAi 
            ? 'bg-indigo-950/40 border-indigo-900 text-indigo-200 rounded-tr-none shadow-sm shadow-indigo-950/20'
            : 'bg-slate-100 border-slate-200 text-slate-950 rounded-tr-none'
      }`}>
        <p className="whitespace-pre-wrap">{text}</p>
      </div>
      <span className="text-[8px] font-mono font-medium text-slate-600 mt-1 px-1">{timestamp}</span>
    </div>
  );
}