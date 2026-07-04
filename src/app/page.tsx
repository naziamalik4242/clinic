'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, BrainCircuit, Activity, Zap } from 'lucide-react';

export default function RootIndexPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] p-6 text-center max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="inline-flex items-center gap-1.5 bg-indigo-950/60 border border-indigo-900 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold shadow-inner">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Conversational Orchestration Cloud
      </div>
      
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-none">
          Autonomous Clinical AI Receptionist Engine
        </h1>
        <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto leading-relaxed pt-2">
          Sync multi-channel social webhooks directly into internal Google Calendar sequences and clinical record clusters instantaneously.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center pt-4">
        <Link href="/appointments" className="inline-flex items-center gap-1.5 bg-white text-slate-950 hover:bg-slate-100 px-5 py-2.5 rounded-xl text-xs font-black shadow-lg transition-all">
          Enter Admin Core Portal <ArrowRight className="w-4 h-4" />
        </Link>
        <Link href="/settings/prompts" className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 px-5 py-2.5 rounded-xl text-xs font-bold transition-all">
          <BrainCircuit className="w-4 h-4" /> Tune Prompts System
        </Link>
      </div>
    </div>
  );
}