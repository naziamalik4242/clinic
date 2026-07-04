'use client';

import React from 'react';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  children: React.ReactNode;
}

export default function Badge({ variant = 'neutral', children }: BadgeProps) {
  const styles = {
    success: 'bg-emerald-950/40 text-emerald-400 border-emerald-900/30',
    warning: 'bg-amber-950/40 text-amber-400 border-amber-900/30',
    danger: 'bg-rose-950/40 text-rose-400 border-rose-900/30',
    info: 'bg-indigo-950/40 text-indigo-400 border-indigo-900/30',
    neutral: 'bg-slate-900 text-slate-400 border-slate-800'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${styles[variant]} shadow-sm`}>
      {children}
    </span>
  );
}