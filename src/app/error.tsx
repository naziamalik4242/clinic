'use client';

import React, { useEffect } from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Captured critical dashboard exception layout:', error);
  }, [error]);

  return (
    <div className="flex flex-col h-[80vh] items-center justify-center text-center p-6 space-y-4 max-w-md mx-auto animate-fade-in">
      <div className="p-3 bg-rose-950/50 border border-rose-900 text-rose-400 rounded-2xl shadow-inner">
        <AlertCircle className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h2 className="text-lg font-black text-white">Pipeline Context Faulted</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          An unhandled exception framework error disconnected the layout state stream.
        </p>
      </div>
      <button 
        onClick={() => reset()}
        className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm"
      >
        <RefreshCcw className="w-3.5 h-3.5" /> Re-sync Session States
      </button>
    </div>
  );
}