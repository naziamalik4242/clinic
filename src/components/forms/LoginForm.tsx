'use client';

import React, { useState } from 'react';
import { KeyRound, ShieldAlert, ArrowRight } from 'lucide-react';

export default function LoginForm() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const executeSecurityVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.email === 'admin@auraclinic.com' && credentials.password === 'secure123') {
      setErrorStatus(null);
      console.log('Security Credentials Authenticated. Mounting Workspace.');
    } else {
      setErrorStatus('Invalid programmatic access token verification logs failed.');
    }
  };

  return (
    <div className="w-full max-w-sm bg-slate-950/40 border border-slate-900 rounded-2xl p-6 space-y-6 shadow-2xl backdrop-blur-md">
      <div className="text-center space-y-1.5">
        <div className="w-10 h-10 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-inner">
          <KeyRound className="w-4 h-4" />
        </div>
        <h2 className="text-base font-black text-white tracking-tight">Access Control Gate</h2>
        <p className="text-[10px] uppercase font-mono font-bold text-slate-500 tracking-wider">AuraClinic Management Core</p>
      </div>

      <form onSubmit={executeSecurityVerification} className="space-y-4">
        {errorStatus && (
          <div className="p-3 bg-rose-950/40 border border-rose-900/40 rounded-xl flex items-start gap-2 text-[11px] font-medium text-rose-400 leading-relaxed">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorStatus}</span>
          </div>
        )}

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[9px] uppercase font-mono font-bold text-slate-500 tracking-wide">Operator Email</label>
            <input 
              type="email" required placeholder="operator@auraclinic.com" value={credentials.email}
              onChange={e => setCredentials({...credentials, email: e.target.value})}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] uppercase font-mono font-bold text-slate-500 tracking-wide">Secure Token Pin</label>
            <input 
              type="password" required placeholder="••••••••" value={credentials.password}
              onChange={e => setCredentials({...credentials, password: e.target.value})}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-indigo-500 font-mono"
            />
          </div>
        </div>

        <button type="submit" className="w-full py-2.5 mt-2 bg-white hover:bg-slate-100 text-slate-950 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md">
          Decrypt Workspace <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
        </button>
      </form>
    </div>
  );
}