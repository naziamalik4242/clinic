'use client';

import React, { useState } from 'react';
import { BellRing, ArrowLeft, ToggleLeft, ToggleRight } from 'lucide-react';
import Link from 'next/link';

export default function NotificationsPage() {
  const [settings, setSettings] = useState({ booking: true, fallback: false, daily: true });

  return (
    <div className="p-6 max-w-[900px] mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-5">
        <Link href="/settings" className="p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl text-slate-500 hover:text-slate-800 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Alert Routing Controls</h1>
          <p className="text-xs text-slate-400 mt-0.5">Configure internal telemetry dispatch endpoints for instant booking updates.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl divide-y divide-slate-100 dark:divide-slate-800/60 shadow-sm overflow-hidden">
        {/* Toggle Line 1 */}
        <div className="p-5 flex items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Instant Booking Conversion Triggers</h4>
            <p className="text-xs text-slate-400 max-w-md mt-0.5">Send desktop toast signals instantly when a customer completes their slots locking cycle.</p>
          </div>
          <button onClick={() => setSettings({ ...settings, booking: !settings.booking })}>
            {settings.booking ? <ToggleRight className="w-9 h-9 text-indigo-600" /> : <ToggleLeft className="w-9 h-9 text-slate-300" />}
          </button>
        </div>

        {/* Toggle Line 2 */}
        <div className="p-5 flex items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Human Agent Bypass Hand-off Notifications</h4>
            <p className="text-xs text-slate-400 max-w-md mt-0.5">Dispatch warning signals if the automated response script fails or flags an exception loop.</p>
          </div>
          <button onClick={() => setSettings({ ...settings, fallback: !settings.fallback })}>
            {settings.fallback ? <ToggleRight className="w-9 h-9 text-indigo-600" /> : <ToggleLeft className="w-9 h-9 text-slate-300" />}
          </button>
        </div>
      </div>
    </div>
  );
}