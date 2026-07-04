'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle, Loader2, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="space-y-4 text-center py-4">
        <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mx-auto border border-emerald-100/40">
          <CheckCircle className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Check your email</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            We sent a secure validation recovery link to <span className="font-semibold text-slate-800 dark:text-slate-200">{email}</span>.
          </p>
        </div>
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Return to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Reset link</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Lost recovery key? Enter verification mail index points.</p>
      </div>

      <form onSubmit={handleReset} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input required type="email" placeholder="name@clinic.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-indigo-500 text-slate-900 dark:text-white" />
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold rounded-xl text-sm shadow-md flex items-center justify-center">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Recovery Magic Link'}
        </button>
      </form>

      <div className="text-center pt-2">
        <Link href="/login" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to credentials gate
        </Link>
      </div>
    </div>
  );
}