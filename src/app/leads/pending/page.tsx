'use client';

import React, { useState, useEffect } from 'react';
import LeadsGrid from '../LeadsGrid';
import { Loader2 } from 'lucide-react';

export default function PendingLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPending() {
      try {
        const res = await fetch('/api/leads');
        if (res.ok) {
          const data = await res.json();
          setLeads(data.filter((l: any) => l.status === 'PENDING' || l.status === 'RAW'));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPending();
  }, []);

  if (loading) return <div className="flex h-[80vh] items-center justify-center gap-2"><Loader2 className="w-5 h-5 text-indigo-600 animate-spin" /><span className="text-xs text-slate-400">Filtering Nurturing Feed...</span></div>;

  return (
    <LeadsGrid 
      title="Nurturing / Pending Leads"
      description="Active social inquiries currently under conversational validation and assessment loops."
      leads={leads}
    />
  );
}