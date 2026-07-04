'use client';

import React, { useState, useEffect } from 'react';
import LeadsGrid from '../LeadsGrid';
import { Loader2 } from 'lucide-react';

export default function QualifiedLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQualified() {
      try {
        const res = await fetch('/api/leads');
        if (res.ok) {
          const data = await res.json();
          // Filter out ONLY qualified statuses from endpoint data arrays
          setLeads(data.filter((l: any) => l.status === 'QUALIFIED'));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchQualified();
  }, []);

  if (loading) return <div className="flex h-[80vh] items-center justify-center gap-2"><Loader2 className="w-5 h-5 text-indigo-600 animate-spin" /><span className="text-xs text-slate-400">Loading Qualified Targets...</span></div>;

  return (
    <LeadsGrid 
      title="Qualified Intent Profiles"
      description="High priority leads classified with high purchase conversion marks via AI models."
      leads={leads}
    />
  );
}