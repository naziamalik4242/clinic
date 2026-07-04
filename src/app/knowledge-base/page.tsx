'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HelpCircle, Layers, ShieldCheck, Database, RefreshCw, ChevronRight, BrainCircuit, Sparkles, CheckCircle2 } from 'lucide-react';

interface SyncStatus {
  totalVectors: number;
  lastSynced: string;
  status: 'OPTIMIZED' | 'SYNCING' | 'OUTDATED';
}

export default function KnowledgeBaseHub() {
  const [syncMetrics, setSyncMetrics] = useState<SyncStatus>({
    totalVectors: 412,
    lastSynced: '2 hours ago',
    status: 'OPTIMIZED'
  });
  const [isSyncing, setIsSyncing] = useState(false);

  const handleForceSync = () => {
    setIsSyncing(true);
    // Simulating deep semantic indexing update loop
    setTimeout(() => {
      setIsSyncing(false);
      setSyncMetrics({
        totalVectors: 428,
        lastSynced: 'Just now',
        status: 'OPTIMIZED'
      });
    }, 2500);
  };

  const directoryCards = [
    {
      title: 'Patient FAQs Tuning',
      description: 'Manage answers regarding pricing, parking logistics, consultation delays, and clinic schedules.',
      href: '/knowledge-base/faq',
      icon: HelpCircle,
      badge: '12 Items',
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30'
    },
    {
      title: 'Clinical Services Data',
      description: 'Define specific machinery, equipment safety standards, downtime rules, and available procedures.',
      href: '/knowledge-base/treatments',
      icon: Layers,
      badge: '8 Methods',
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/30'
    },
    {
      title: 'Operational Rules Matrix',
      description: 'Configure conversational constraints, legal compliance rules, booking targets, and phone numbers entry regulations.',
      href: '/knowledge-base/policies',
      icon: ShieldCheck,
      badge: '3 Core Regs',
      color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/30'
    }
  ];

  return (
    <div className="p-6 space-y-8 max-w-[1400px] mx-auto animate-fade-in">
      
      {/* SECTION 1: HEADER & TELEMETRY CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">AI Agent Knowledge Vault</h1>
          <p className="text-sm text-slate-500 mt-1">
            Feed contextual clinical records to the virtual agent memory space for premium conversational precision.
          </p>
        </div>
        
        {/* Sync Trigger Action Button */}
        <button 
          onClick={handleForceSync}
          disabled={isSyncing}
          className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 disabled:opacity-50 px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm self-start md:self-center transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          {isSyncing ? 'Re-indexing Vector Stores...' : 'Sync Knowledge to LLM'}
        </button>
      </div>

      {/* SECTION 2: VECTOR EMBEDDING CLUSTER STATUS PANELS */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 p-4 rounded-xl flex items-center gap-4">
          <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Semantic Sync Status</p>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 inline" /> Operational Optimized
            </h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 p-4 rounded-xl flex items-center gap-4">
          <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Token Embeddings</p>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 font-mono">{syncMetrics.totalVectors} Vectors</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 p-4 rounded-xl flex items-center gap-4">
          <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Last Pipeline Refresh</p>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{syncMetrics.lastSynced}</h3>
          </div>
        </div>
      </div>

      {/* SECTION 3: DIRECTORY ROUTING SECTIONS LIST MAP */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Knowledge Context Frameworks</h2>
        
        <div className="grid gap-4 md:grid-cols-3">
          {directoryCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <Link 
                key={index} 
                href={card.href}
                className="group bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className={`p-2.5 rounded-xl ${card.color} border border-slate-100 dark:border-slate-800/50`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold bg-slate-50 dark:bg-slate-950 border text-slate-400 px-2 py-0.5 rounded-md">
                      {card.badge}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400 pt-3 border-t border-slate-50 dark:border-slate-800/50">
                  <span>Configure Settings</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* FOOTER AUTOMATION NOTICE NOTE */}
      <div className="bg-indigo-950 text-indigo-200 rounded-2xl p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between shadow-md relative overflow-hidden border border-indigo-900">
        <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 opacity-10 pointer-events-none">
          <BrainCircuit className="w-72 h-72 text-white" />
        </div>
        <div className="space-y-1 relative z-10">
          <h3 className="text-white text-sm font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" /> Automated Model Cross-Training Live
          </h3>
          <p className="text-xs text-indigo-300 max-w-2xl">
            Whenever any dataset item is saved or updated within these sub-folders, the background pipeline instantly re-compiles Vector Embeddings into the Pinecone/Supabase cluster DB automatically.
          </p>
        </div>
      </div>

    </div>
  );
}