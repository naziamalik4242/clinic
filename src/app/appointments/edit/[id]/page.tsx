'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Save, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface ParamsProps {
  id: string;
}

export default function EditAppointmentPage({ params }: { params: Promise<ParamsProps> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const appointmentId = resolvedParams.id;

  const [formData, setFormData] = useState({ name: '', date: '', time: '', treatment: '', status: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSlotData() {
      try {
        const res = await fetch(`/api/appointments?id=${appointmentId}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            name: data.patientName,
            date: data.date,
            time: data.time,
            treatment: data.procedure,
            status: data.status
          });
        }
      } catch (err) {
        setError("Could not parse operational slot payload.");
      } finally {
        setLoading(false);
      }
    }
    loadSlotData();
  }, [appointmentId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const res = await fetch(`/api/appointments?id=${appointmentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/appointments');
        router.refresh();
      } else {
        setError("Error compiled while mutating database layers.");
      }
    } catch (err) {
      setError("Network bypass execution dropped.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex h-[60vh] items-center justify-center"><Loader2 className="w-6 h-6 text-indigo-600 animate-spin" /></div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/appointments" className="p-2 border border-slate-200 bg-white rounded-xl text-slate-500 hover:text-slate-800 transition-colors"><ArrowLeft className="w-4 h-4" /></Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Modify Entry Profile</h1>
          <p className="text-xs text-slate-400 mt-0.5">Edit status variables or timing configurations manually.</p>
        </div>
      </div>

      {error && <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs font-semibold">{error}</div>}

      <form onSubmit={handleUpdate} className="bg-white dark:bg-slate-900 border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Patient Identifier (Read Only)</label>
          <input disabled type="text" className="w-full px-3 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed" value={formData.name} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Change Date</label>
            <input required type="date" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Change Time Slot</label>
            <input required type="time" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Target Procedure</label>
            <select className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" value={formData.treatment} onChange={e => setFormData({...formData, treatment: e.target.value})}>
              <option>Laser Hair Removal</option>
              <option>Aesthetic Skin Rejuvenation</option>
              <option>Anti-Aging Treatment</option>
              <option>Premium Medical Facial Evaluation</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Status Override Selector</label>
            <select className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
              <option value="PENDING">⚠️ PENDING EVALUATION</option>
              <option value="CONFIRMED">✅ CONFIRMED OPERATION</option>
              <option value="CANCELLED">❌ CANCELLED / REMOVED</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t mt-4"><button type="submit" disabled={saving} className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm">{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Save Changes</>}</button></div>
      </form>
    </div>
  );
}