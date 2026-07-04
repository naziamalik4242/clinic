import React from 'react';
import { Loader2 } from 'lucide-react';

export default function GlobalLoadingState() {
  return (
    <div className="flex flex-col h-[85vh] w-full items-center justify-center gap-3 animate-fade-in">
      <div className="relative flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin z-10" />
        <div className="w-8 h-8 bg-indigo-500/10 rounded-full blur absolute scale-150" />
      </div>
      <p className="text-[11px] font-mono tracking-widest text-slate-500 uppercase font-bold">
        Compiling Server Stream Assets...
      </p>
    </div>
  );
}