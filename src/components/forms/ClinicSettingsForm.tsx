'use client';

import React, { useState } from 'react';
import { Sliders, Shield, Sparkles } from 'lucide-react';

export default function ClinicSettingsForm() {
  const [settings, setSettings] = useState({
    clinicName: 'AuraClinic Core',
    aiTone: 'Empathetic & Professional',
    maxSlotsPerDay: 25,
    restrictHumanOverride: false
  });

  return (
    <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 space-y-5 max-w-xl">
      <div className="space-y-1">
        <h3 className="text-sm font-black text-white uppercase tracking-wider font-mono text-indigo-400">Operational Configurations</h3>
        <p className="text-[11px] text-slate-500">Tune deployment schemas, AI behavioral structures, and engine safety profiles.</p>
      </div>

      <div className="space-y-4 pt-1">
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-mono font-bold text-slate-400">Registered Brand Identity</label>
          <input 
            type="text" value={settings.clinicName}
            onChange={e => setSettings({...settings, clinicName: e.target.value})}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 font-medium"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-mono font-bold text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> LLM Copilot Behavioral Prompting Style
          </label>
          <select 
            value={settings.aiTone}
            onChange={e => setSettings({...settings, aiTone: e.target.value})}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 font-medium appearance-none"
          >
            <option>Empathetic & Professional</option>
            <option>Strictly Informational & Direct</option>
            <option>High-End Luxury Luxury Focus</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-mono font-bold text-slate-400">Daily Max Booking Cap threshold</label>
          <input 
            type="number" value={settings.maxSlotsPerDay}
            onChange={e => setSettings({...settings, maxSlotsPerDay: parseInt(e.target.value) || 0})}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 font-mono font-bold"
          />
        </div>

        <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-indigo-400" /> Enforce Autonomous Lockdown Mode
            </span>
            <p className="text-[10px] text-slate-500">Prevent agent interventions while conversational AI agent nodes are active.</p>
          </div>
          <input 
            type="checkbox" checked={settings.restrictHumanOverride}
            onChange={e => setSettings({...settings, restrictHumanOverride: e.target.checked})}
            className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-0 focus:ring-offset-0"
          />
        </div>
      </div>

      <button onClick={() => console.log('Syncing Cluster Settings Matrix:', settings)} className="w-full py-2.5 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 text-indigo-400 text-xs font-bold rounded-xl transition-all">
        Update Global Configurations
      </button>
    </div>
  );
}