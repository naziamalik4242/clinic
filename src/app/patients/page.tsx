'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Search, Phone, Calendar, ArrowRight, Loader2, Sparkles } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  phone: string;
  totalAppointments: number;
  lastVisit: string;
  aiClassification: string;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPatients() {
      try {
        const res = await fetch('/api/patients');
        if (res.ok) {
          const data = await res.json();
          setPatients(data);
        }
      } catch (err) {
        console.error("Patients collection fetch crash:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search)
  );

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Patient Registry</h1>
        <p className="text-sm text-slate-500 mt-1">Unified client CRM data automatically mapped from omni-channel intake streams.</p>
      </div>

      {/* Dynamic Filter Search Frame */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search patients by full name or active phone index..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-indigo-500 dark:text-white transition-colors"
        />
      </div>

      {loading ? (
        <div className="flex h-[40vh] items-center justify-center">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        </div>
      ) : filteredPatients.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm">No registered client profile matches your parameters.</div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="p-4 pl-6">Client Identity</th>
                  <th className="p-4">Phone Contact</th>
                  <th className="p-4">Total Bookings</th>
                  <th className="p-4">Last Event Date</th>
                  <th className="p-4">AI Insight Label</th>
                  <th className="p-4 pr-6 text-right">Profile Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm text-slate-700 dark:text-slate-300">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/10 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-slate-900 dark:text-white flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <User className="w-4 h-4 text-slate-400" />
                      </div>
                      {patient.name}
                    </td>
                    <td className="p-4 text-slate-500 font-mono text-xs">
                      <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" /> {patient.phone}</div>
                    </td>
                    <td className="p-4 font-medium pl-8">{patient.totalAppointments}</td>
                    <td className="p-4 text-slate-500">
                      <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {patient.lastVisit}</div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100/40">
                        <Sparkles className="w-3 h-3" /> {patient.aiClassification || 'High Value Client'}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <Link href={`/patients/${patient.id}`} className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                        View Dossier <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}