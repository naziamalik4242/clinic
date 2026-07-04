'use client';

import React, { useState, useEffect, use } from 'react';
import { ArrowLeft, User, Phone, Calendar, MessageSquare, History, Loader2, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

interface PatientProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  onboardingDate: string;
  historyLogs: { id: string; date: string; procedure: string; status: string }[];
}

interface ParamsProps {
  id: string;
}

export default function PatientDossierPage({ params }: { params: Promise<ParamsProps> }) {
  const resolvedParams = use(params);
  const patientId = resolvedParams.id;

  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfileDossier() {
      try {
        const res = await fetch(`/api/patients?id=${patientId}`);
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        console.error("Failed loading patient record matrix:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProfileDossier();
  }, [patientId]);

  if (loading) return <div className="flex h-[80vh] items-center justify-center"><Loader2 className="w-8 h-8 text-indigo-600 animate-spin" /></div>;
  if (!profile) return <div className="flex h-[60vh] flex-col items-center justify-center text-slate-400 gap-2"><ShieldAlert className="w-10 h-10 text-rose-500" /><p className="text-sm font-medium">Requested profile index dropped or broken.</p></div>;

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6 animate-fade-in">
      {/* Header Back Navigation Bar */}
      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-5">
        <Link href="/patients" className="p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl text-slate-500 hover:text-slate-800 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Patient Dossier</h1>
          <p className="text-xs text-slate-400 mt-0.5">Central specialized CRM parameters block framework.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT SIDEBAR: Personal Core Card Attributes */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5 h-fit">
          <div className="flex flex-col items-center text-center pb-4 border-b border-slate-100 dark:border-slate-800/60">
            <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 rounded-full flex items-center justify-center mb-3">
              <User className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="font-bold text-lg text-slate-900 dark:text-white">{profile.name}</h2>
            <span className="text-[10px] uppercase font-bold text-slate-400 mt-0.5 tracking-wider">Clinical Account User</span>
          </div>

          <div className="space-y-3.5 text-sm">
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Phone Vector</span>
              <p className="font-mono text-xs text-slate-700 dark:text-slate-300 mt-0.5 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" /> {profile.phone}</p>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Email Index Address</span>
              <p className="text-slate-700 dark:text-slate-300 mt-0.5 break-all">{profile.email || 'N/A'}</p>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">First Inflow Onboarding</span>
              <p className="text-slate-500 mt-0.5 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {profile.onboardingDate}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60">
            <Link href={`/chat?id=${profile.id}`} className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs transition-colors shadow-sm">
              <MessageSquare className="w-3.5 h-3.5" /> Jump to Chat Inbox
            </Link>
          </div>
        </div>

        {/* RIGHT SIDEBAR: Historical Treatment Logs List */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <History className="w-4 h-4 text-indigo-500" />
            <h3 className="font-bold text-slate-900 dark:text-white">Clinical Treatment History Logs</h3>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
            {profile.historyLogs?.length === 0 ? (
              <p className="text-slate-400 text-xs py-6 text-center">No operations registered under this file sequence yet.</p>
            ) : (
              profile.historyLogs?.map((log) => (
                <div key={log.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{log.procedure}</h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5"><Calendar className="w-3 h-3" /> Event Log Date: {log.date}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                    log.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {log.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}