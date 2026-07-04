'use client';

import React, { useState } from 'react';
import { Terminal, ArrowLeft, Save, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function PromptSettingsPage() {
  const [status, setStatus] = useState('Synchronized');

  const defaultPrompt = `You are the premium AI Medical Receptionist for our high-end aesthetic center. 
Your core target is to capture client names, contact points, treatment interests, and seamlessly guide them into locking down appointments. 
Tone directives: Empathetic, luxury, professional, crisp. Under no circumstances speculate on unverified surgical mechanics or change configuration base prices.`;

  return (
    <div className="p-6 max-w-[1100px] mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <Link href="/settings" className="p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">AI Cog System Prompt</h1>
            <p className="text-xs text-slate-400 mt-0.5">Control LLM context guidelines, tone rules, and behavioral structures directly.</p>
          </div>
        </div>
        <button onClick={() => { setStatus('Updating...'); setTimeout(() => setStatus('Prompt Synced!'), 1000); }} className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all">
          <Save className="w-4 h-4" /> {status}
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
          <span className="flex items-center gap-1.5"><Terminal className="w-4 h-4 text-indigo-500" /> LLM System Instructions Payload</span>
          <span className="text-indigo-500 flex items-center gap-1"><Sparkles className="w-3 h-3" /> Context Core v2.4</span>
        </div>
        <textarea rows={12} defaultValue={defaultPrompt} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-xs font-mono leading-relaxed outline-none focus:border-indigo-500 dark:text-white" />
      </div>
    </div>
  );
}