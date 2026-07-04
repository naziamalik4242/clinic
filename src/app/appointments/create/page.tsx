'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import Link from 'next/link';

export default function CreateAppointmentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', phone: '', date: '', time: '', treatment: 'Laser Hair Removal' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Dynamic constraint validations (Sun closed, 11 AM - 8 PM rules)
    const chosenDate = new Date(formData.date);
    if (chosenDate.getDay() === 0) {
      setError("Clinic is closed on Sundays! Please select Mon-Sat.");
      setLoading(false);
      return;
    }
    if (formData.time < "11:00" || formData.time > "20:00") {
      setError("Operating hours breach. Please choose a slot between 11:00 AM and 8:00 PM.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/appointments');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to log slot.");
      }
    } catch (err) {
      setError("Network or API compilation error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/appointments" className="p-2 border border-slate-200 dark:border-slate-800 bg-white rounded-xl text-slate-500 hover:text-slate-800 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Create Slot Entry</h1>
          <p className="text-xs text-slate-400 mt-0.5">Manually force an override appointment into the database.</p>
        </div>
      </div>

      {error && <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-semibold">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Patient Full Name</label>
            <input required type="text" className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 rounded-xl text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Zainab Malik" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Contact Phone Index</label>
            <input required type="tel" className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 rounded-xl text-sm" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="e.g. +923001234567" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Desired Date</label>
            <input required type="date" className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 rounded-xl text-sm" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Time Slot Select</label>
            <input required type="time" className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 rounded-xl text-sm" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Clinical Service / Procedure</label>
          <select className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500" value={formData.treatment} onChange={e => setFormData({...formData, treatment: e.target.value})}>
            <option>Laser Hair Removal</option>
            <option>Aesthetic Skin Rejuvenation</option>
            <option>Anti-Aging Treatment</option>
            <option>Premium Medical Facial Evaluation</option>
          </select>
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800 mt-4">
          <button type="submit" disabled={loading} className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Save Appointment</>}
          </button>
        </div>
      </form>
    </div>
  );
}