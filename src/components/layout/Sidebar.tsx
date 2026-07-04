'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Calendar, 
  Users, 
  Layers, 
  BarChart3, 
  BrainCircuit, 
  Settings, 
  Activity 
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Appointments', href: '/appointments', icon: Calendar },
    { label: 'Patients CRM', href: '/patients', icon: Users },
    { label: 'Leads Pipeline', href: '/leads', icon: Layers },
    { label: 'Analytics Insights', href: '/analytics', icon: BarChart3 },
    { label: 'AI Knowledge', href: '/knowledge-base', icon: BrainCircuit },
    { label: 'System Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-slate-900 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between md:flex shrink-0 h-screen sticky top-0">
      <div className="p-6 space-y-7">
        
        {/* Brand Identity Branding logo */}
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Activity className="w-4 h-4 text-white animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-black tracking-wide uppercase text-white">AuraClinic</h2>
            <p className="text-[10px] font-bold text-indigo-400 tracking-wider uppercase -mt-0.5">AI Receptionist</p>
          </div>
        </div>

        {/* Navigation Routing Tree Links */}
        <nav className="space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link 
                key={index} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                  isActive 
                    ? 'text-white bg-indigo-600/10 border border-indigo-500/20 shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 transition-colors ${
                  isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-indigo-400'
                }`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Persistent Session Runtime Indicators */}
      <div className="p-4 border-t border-slate-900 bg-slate-950/20 text-center">
        <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/30">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" /> Engine v2.4 Online
        </span>
      </div>
    </aside>
  );
}