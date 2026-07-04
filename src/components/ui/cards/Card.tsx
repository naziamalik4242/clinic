'use client';

import React from 'react';

export default function Card({ title, description, children, action }: {
  title?: string;
  description?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 hover:border-slate-800/60 transition-all shadow-sm">
      {(title || description || action) && (
        <div className="flex justify-between items-start gap-4 mb-4 pb-1">
          <div className="space-y-0.5">
            {title && <h3 className="text-xs font-black tracking-wide uppercase text-white">{title}</h3>}
            {description && <p className="text-[11px] text-slate-500">{description}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}