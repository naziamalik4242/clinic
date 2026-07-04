'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Plus, Loader2, ArrowLeft, Layers } from 'lucide-react';
import Link from 'next/link';

interface TreatmentRecord {
  id: string;
  name: string;
  category: string;
  clinicalDetails: string;
}

export default function TreatmentsKnowledgePage() {
  const [treatments, setTreatments] = useState<TreatmentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTreatmentsInventory() {
      try {
        const res = await fetch('/api/knowledge-base?category=treatments');
        if (res.ok) {
          const data = await res.json();
          setTreatments(data);
        } else {
          setTreatments([
            { id: 't1', name: 'Premium Laser Hair Removal', category: 'Laser', clinicalDetails: 'Utilizes cooling gold-standard diode technology for minimized discomfort across skin phenotypes.' },
            { id: 't2', name: 'Anti-Aging Photorejuvenation', category: 'Anti-Aging', clinicalDetails: 'Non-invasive high frequency wavelengths to target fine curves, stimulate dynamic collagen structures.' },
            { id: 't3', name: 'Advanced Epidermal Skin Care', category: 'Skin Care', clinicalDetails: 'Custom specialized serum deployment matrix combined with precise medical micro-exfoliation.' }
          ]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadTreatmentsInventory();
  }, []);

  if (loading) return <div className="flex h-[80vh] items-center justify-center"><Loader2 className="w-6 h-6 text-indigo-600 animate-spin" /></div>;

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <Link href="/knowledge-base" className="p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Clinical Services Data</h1>
            <p className="text-xs text-slate-400 mt-0.5">Define equipment, technology parameters, and treatment spectrum lines.</p>
          </div>
        </div>
        <button className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm self-start">
          <Plus className="w-4 h-4" /> Add New Treatment
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {treatments.map(t => (
          <div key={t.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between hover:border-indigo-500/40 transition-colors">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-100/20">
                  {t.category}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base tracking-tight pt-1">{t.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t.clinicalDetails}</p>
            </div>
            
            <div className="text-[11px] font-medium text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> Synchronized to AI Logic Models
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}