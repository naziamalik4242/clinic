'use client';

import React, { useState } from 'react';
import { Building2, Save, ArrowLeft, Phone, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ClinicSettingsPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-6 max-w-[1000px] mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <Link href="/settings" className="p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Clinic Identity Profile</h1>
            <p className="text-xs text-slate-400 mt-0.5">Define metadata boundaries that the AI agent uses to verify workspace context.</p>
          </div>
        </div>
        <button onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1000); }} className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition-all">
          <Save className="w-4 h-4" /> {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm grid gap-6 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Clinic Name</label>
          <div className="relative">
            <Building2 className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input type="text" defaultValue="Premium Aesthetic Center" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-indigo-500 dark:text-white" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Contact Hot-Line Index</label>
          <div className="relative">
            <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input type="text" defaultValue="+92 300 1234567" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-indigo-500 dark:text-white" />
          </div>
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Physical Location Address</label>
          <div className="relative">
            <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input type="text" defaultValue="Phase 6, DHA, Lahore, Pakistan" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-indigo-500 dark:text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}