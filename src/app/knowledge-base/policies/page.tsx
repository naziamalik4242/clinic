'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert, ArrowLeft, Loader2, Save, FileText } from 'lucide-react';
import Link from 'next/link';

interface PolicyBlock {
  id: string;
  title: string;
  content: string;
}

export default function PoliciesKnowledgePage() {
  const [policies, setPolicies] = useState<PolicyBlock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPoliciesDataset() {
      try {
        const res = await fetch('/api/knowledge-base?category=policies');
        if (res.ok) {
          const data = await res.json();
          setPolicies(data);
        } else {
          setPolicies([
            { id: 'p1', title: 'Operational Hours Matrix', content: 'Operating hours are Monday to Saturday from 11:00 AM to 8:00 PM. Strictly reject or reschedule any Sunday appointment requests.' },
            { id: 'p2', title: 'Cancellation / Reschedule Delay Rules', content: 'Patients must initiate any cancellation or schedule mutations at least 24 hours prior to the confirmed slot entry.' },
            { id: 'p3', title: 'Patient Data Intake Protocols', content: 'The virtual receptionist must collect and validate the Patient Name, Phone Index, and Specific Service interest parameters before locking the database slots.' }
          ]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadPoliciesDataset();
  }, []);

  if (loading) return <div className="flex h-[80vh] items-center justify-center"><Loader2 className="w-6 h-6 text-indigo-600 animate-spin" /></div>;

  return (
    <div className="p-6 max-w-[1000px] mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-5">
        <Link href="/knowledge-base" className="p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl text-slate-500 hover:text-slate-800 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Operational Rules Matrix</h1>
          <p className="text-xs text-slate-400 mt-0.5">Control legal boundaries, timing limits, and constraints rules for AI compliance.</p>
        </div>
      </div>

      <div className="space-y-4">
        {policies.map(policy => (
          <div key={policy.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <FileText className="w-4 h-4 text-indigo-500 shrink-0" />
              <h3 className="font-bold text-sm uppercase tracking-wider">{policy.title}</h3>
            </div>
            <textarea 
              defaultValue={policy.content}
              rows={3}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm text-slate-600 dark:text-slate-400 focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
            />
            <div className="flex justify-end pt-1">
              <button className="inline-flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm">
                <Save className="w-3.5 h-3.5" /> Sync Regulation Block
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}