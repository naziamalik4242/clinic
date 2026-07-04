'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Authentication processing simulator 
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard'); // Login successful hone par dashboard bhejein
    }, 1500);
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome back</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Enter your credentials to manage clinic channels.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email Field Container */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input 
              required 
              type="email" 
              placeholder="name@clinic.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-indigo-500 text-slate-900 dark:text-white transition-colors"
            />
          </div>
        </div>

        {/* Password Field Container */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
            <Link href="/forgot-password" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input 
              required 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-indigo-500 text-slate-900 dark:text-white transition-colors"
            />
          </div>
        </div>

        {/* Submit Push Trigger */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold rounded-xl text-sm shadow-md shadow-indigo-600/10 flex items-center justify-center gap-1.5 transition-colors"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>

      <div className="text-center text-sm text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-4">
        New clinic account?{' '}
        <Link href="/register" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
          Create account
        </Link>
      </div>
    </div>
  );
}