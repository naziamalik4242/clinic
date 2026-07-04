'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Activity } from 'lucide-react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: 'Appointments', href: '/appointments' },
    { label: 'Patients CRM', href: '/patients' },
    { label: 'Leads Pipeline', href: '/leads' },
    { label: 'Analytics Insights', href: '/analytics' },
    { label: 'AI Knowledge', href: '/knowledge-base' },
    { label: 'System Settings', href: '/settings' },
  ];

  return (
    <div className="md:hidden">
      {/* Absolute Trigger Button Hook */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 border border-slate-800 bg-slate-900 text-slate-400 rounded-xl hover:text-white fixed bottom-4 right-4 z-50 shadow-xl"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Floating Menu Overlay Sheet Layer Drawer */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-xl z-40 flex flex-col p-6 space-y-6 animate-fade-in">
          
          <div className="flex items-center gap-2.5 border-b border-slate-900 pb-5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-black tracking-wide uppercase text-white">AuraClinic</h2>
              <p className="text-[10px] font-bold text-indigo-400 tracking-wider uppercase -mt-0.5">Mobile Control Hub</p>
            </div>
          </div>

          {/* Navigation Links Overlay Cards */}
          <nav className="flex flex-col gap-2">
            {menuItems.map((item, index) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link 
                  key={index}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-bold tracking-tight transition-all ${
                    isActive 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-slate-400 bg-slate-900/50 border border-slate-900 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

        </div>
      )}
    </div>
  );
}