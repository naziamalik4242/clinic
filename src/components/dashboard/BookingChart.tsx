'use client';

import React from 'react';
import { CalendarRange } from 'lucide-react';

export default function BookingChart() {
  const metrics = [
    { label: 'Consultations', count: 48, fill: 'w-[65%]' },
    { label: 'Procedures', count: 24, fill: 'w-[35%]' },
    { label: 'Follow-ups', count: 12, fill: 'w-[15%]' }
  ];

  return (
    <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 space-y-4">
      <h4 className="text-xs font-black tracking-wide uppercase text-white flex items-center gap-2">
        <CalendarRange className="w-3.5 h-3.5 text-indigo-400" /> Slot Booking Ratios
      </h4>

      <div className="space-y-4 pt-2">
        {metrics.map((metric, i) => (
          <div key={i} className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-slate-400">{metric.label}</span>
              <span className="text-white font-mono">{metric.count} slots</span>
            </div>
            <div className="h-1.5 w-full bg-slate-900 rounded-md overflow-hidden">
              <div className={`h-full bg-indigo-600/80 ${metric.fill} rounded-md`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}