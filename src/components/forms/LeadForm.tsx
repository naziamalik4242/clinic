'use client';

import React, { useState } from 'react';
import { Mail, Phone, User, Globe } from 'lucide-react';

export default function LeadForm() {
  const [lead, setLead] = useState({ name: '', email: '', phone: '', source: 'Instagram' });

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Ingesting Lead File:', lead);
  };

  return (
    <form onSubmit={handleLeadSubmit} className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 space-y-4 max-w-lg">
      <div className="space-y-1">
        <h3 className="text-sm font-black text-white uppercase tracking-wider font-mono text-indigo-400">Ingest Lead Node</h3>
        <p className="text-[11px] text-slate-500">Inject pipeline lead profiles for target workflow execution.</p>
      </div>

      <div className="space-y-3 pt-1">
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-mono font-bold text-slate-400">Lead Identity</label>
          <div className="relative">
            <User className="w-3.5 h-3.5 absolute left-3 top-3.5 text-slate-500" />
            <input 
              type="text" required placeholder="Full Name" value={lead.name}
              onChange={e => setLead({...lead, name: e.target.value})}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-mono font-bold text-slate-400">Electronic Address</label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 absolute left-3 top-3.5 text-slate-500" />
              <input 
                type="email" required placeholder="name@domain.com" value={lead.email}
                onChange={e => setLead({...lead, email: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 font-medium"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-mono font-bold text-slate-400">Phone Network Line</label>
            <div className="relative">
              <Phone className="w-3.5 h-3.5 absolute left-3 top-3.5 text-slate-500" />
              <input 
                type="tel" required placeholder="+92 300 0000000" value={lead.phone}
                onChange={e => setLead({...lead, phone: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 font-medium"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-mono font-bold text-slate-400">Acquisition Channel Channel</label>
          <div className="relative">
            <Globe className="w-3.5 h-3.5 absolute left-3 top-3.5 text-slate-500" />
            <select 
              value={lead.source}
              onChange={e => setLead({...lead, source: e.target.value})}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 font-medium appearance-none"
            >
              <option>Instagram DM</option>
              <option>WhatsApp Cloud API</option>
              <option>Facebook Campaign</option>
              <option>Organic Referral</option>
            </select>
          </div>
        </div>
      </div>

      <button type="submit" className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-950 text-xs font-bold rounded-xl transition-colors shadow-sm">
        Inject Into Funnel
      </button>
    </form>
  );
}