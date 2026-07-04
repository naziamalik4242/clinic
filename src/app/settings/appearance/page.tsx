'use client';

import React, { useState } from 'react';
import { Palette, ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';

export default function AppearancePage() {
  const [activeTheme, setActiveTheme] = useState('dark');

  const themes = [
    { id: 'light', name: 'Ambient Light', desc: 'Minimal clean interface design layouts.' },
    { id: 'dark', name: 'Luxury Cinematic', desc: 'Deep high-end obsidian interface mapping.' },
    { id: 'amoled', name: 'Onyx Matrix', desc: 'Pure black absolute contrast matrix canvas.' }
  ];

  return (
    <div className="p-6 max-w-[900px] mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-5">
        <Link href="/settings" className="p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl text-slate-500 hover:text-slate-800 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Interface Aesthetics</h1>
          <p className="text-xs text-slate-400 mt-0.5">Tailor background layout weights, luxury styles, and theme profiles.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {themes.map((theme) => (
          <div 
            key={theme.id} 
            onClick={() => setActiveTheme(theme.id)} 
            className={`border rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between h-36 bg-white dark:bg-slate-900 shadow-sm ${activeTheme === theme.id ? 'border-indigo-600 ring-2 ring-indigo-500/10' : 'border-slate-200 dark:border-slate-800'}`}
          >
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{theme.name}</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-normal">{theme.desc}</p>
            </div>
            {activeTheme === theme.id && (
              <div className="w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center self-end shadow-sm">
                <Check className="w-3 h-3" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}