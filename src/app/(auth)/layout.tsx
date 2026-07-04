import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-slate-50 dark:bg-slate-950 font-sans antialiased">
      {/* LEFT SIDE: Premium Clinic Visual Billboard (Visible on Large Screens) */}
      <div className="hidden lg:flex lg:col-span-5 bg-slate-900 border-r border-slate-800 relative flex-col justify-between p-12 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />

        {/* Top Header Identity */}
        <div className="flex items-center gap-2.5 relative z-10">
          <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-600/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide leading-none">AI Receptionist</h2>
            <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase mt-1 block">
              Aesthetic Medical Ecosystem
            </span>
          </div>
        </div>

        {/* Central Brand Narrative */}
        <div className="space-y-4 relative z-10 max-w-sm">
          <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Next-Gen AI Co-Pilot
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
            Automate your patient inquiries flawlessly.
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            Connect WhatsApp, Instagram, and Messenger pipelines directly with clinical intelligence routers.
          </p>
        </div>

        {/* Bottom Platform Indicators */}
        <div className="text-xs text-slate-600 font-medium relative z-10 tracking-wide border-t border-slate-800/80 pt-6">
          Premium System Panel Frame • Secure Session v1.0
        </div>
      </div>

      {/* RIGHT SIDE: Dynamic Form Wrapper Container */}
      <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-6 sm:p-12 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md space-y-6 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm shadow-slate-200/50 dark:shadow-none">
          {children}
        </div>
      </div>
    </div>
  );
}