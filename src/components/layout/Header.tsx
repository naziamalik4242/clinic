'use client';

import React from 'react';
import { User, Bell, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 border-b border-slate-900 bg-slate-950/20 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40 w-full">
      
      {/* Search / Operational Metadata Indicators */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase font-extrabold bg-slate-900 text-slate-400 border border-slate-800 px-2 py-0.5 rounded-md flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-indigo-400" /> Instance Context Live
        </span>
      </div>

      {/* Profile session status and alerts triggers indicators */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-900 transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute w-1.5 h-1.5 bg-indigo-500 rounded-full top-2.5 right-2.5" />
        </button>
        
        <div className="w-px h-5 bg-slate-800" />

        {/* User Identity Session Details Card */}
        <div className="flex items-center gap-3 pl-1">
          <div className="text-right hidden sm:block">
            <h4 className="text-xs font-bold text-white">Nazia Malik</h4>
            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">System Admin</p>
          </div>
          <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shadow-inner">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>

    </header>
  );
}