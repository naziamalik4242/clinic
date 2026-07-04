'use client';

import React, { useState } from 'react';
import { Cpu, ArrowLeft, Key, Link2, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function IntegrationsPage() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="p-6 max-w-[1000px] mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-5">
        <Link href="/settings" className="p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl text-slate-500 hover:text-slate-800 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">API Integrations Engine</h1>
          <p className="text-xs text-slate-400 mt-0.5">Manage live environment tokens, WhatsApp endpoints, and backend automation triggers.</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* API Token Box */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-indigo-500" />
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800 dark:text-slate-200">WhatsApp Cloud Token</h3>
            </div>
            <span className="text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-500 px-2 py-0.5 rounded border border-emerald-100/20">CONNECTED</span>
          </div>
          <div className="flex gap-2">
            <input type={visible ? 'text' : 'password'} defaultValue="EAAGNO428zaB0BAO7iZB3023sghfksjdhfksjhfksjd" disabled className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs font-mono outline-none text-slate-400" />
            <button onClick={() => setVisible(!visible)} className="bg-slate-900 text-white dark:bg-slate-800 px-4 py-2 rounded-xl text-xs font-semibold">{visible ? 'Hide' : 'Reveal'}</button>
          </div>
        </div>

        {/* Webhook Listener Endpoints */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-indigo-500" />
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800 dark:text-slate-200">Meta Webhook Listener Cords</h3>
          </div>
          <input type="text" defaultValue="https://api.ai-receptionist.internal/v1/webhooks/whatsapp" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs font-mono outline-none dark:text-white" />
        </div>
      </div>
    </div>
  );
}