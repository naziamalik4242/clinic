'use client';

import React, { useState, useEffect } from 'react';
import LeadsGrid from '../LeadsGrid';
import { Loader2 } from 'lucide-react';

export default function ConvertedLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConverted() {
      try {
        const res = await fetch('/api/leads');
        if (res.ok) {
          const data = await res.json();
          setLeads(data.filter((l: any) => l.status === 'CONVERTED' || l.status === 'BOOKED'));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchConverted();
  }, []);

  if (loading) return <div className="flex h-[80vh] items-center justify-center gap-2"><Loader2 className="w-5 h-5 text-indigo-600 animate-spin" /><span className="text-xs text-slate-400">Loading Acquisition History...</span></div>;

  return (
    <LeadsGrid 
      title="Successful Acquisitions"
      description="Archived history index of patients who completed booking scheduling loops successfully."
      leads={leads}
    />
  );
}