'use client';

import React from 'react';
import { Target, MessageCircle, Sparkles, User, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface Lead {
  id: string;
  name: string;
  contact: string;
  platform: string;
  score: number;
  status: string;
  treatmentInterest?: string;
}

interface LeadsGridProps {
  title: string;
  description: string;
  leads: Lead[];
}

export default function LeadsGrid({ title, description, leads }: LeadsGridProps) {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
        <p className="text-sm text-slate-500 mt-1">{description}</p>
      </div>

      {leads.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm border border-dashed rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          No pipeline leads matching this status criteria found.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {leads.map((lead) => (
            <div key={lead.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4 hover:border-indigo-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 border flex items-center justify-center">
                      <User className="w-4 h-4 text-slate-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">{lead.name}</h3>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">{lead.contact}</p>
                    </div>
                  </div>
                  <div className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-md text-[10px] font-extrabold flex items-center gap-1 border border-indigo-100/30">
                    <Sparkles className="w-3 h-3" /> AI:{lead.score}%
                  </div>
                </div>

                {lead.treatmentInterest && (
                  <div className="text-xs bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 font-medium">
                    🎯 Target: {lead.treatmentInterest}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs font-medium border-t border-slate-100 dark:border-slate-800/60 pt-3 mt-2">
                <span className="text-slate-400 capitalize flex items-center gap-1 text-[11px]">
                  <MessageCircle className="w-3.5 h-3.5 text-indigo-500" /> Source: {lead.platform.toLowerCase()}
                </span>
                <Link href={`/chat?id=${lead.id}`} className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                  Open Chat <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}