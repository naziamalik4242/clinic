'use client';
import React, { useState } from 'react';

export default function AppointmentForm() {
  const [formData, setFormData] = useState({ name: '', phone: '', date: '', time: '', treatment: 'Laser' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Operational checks logic
    const chosenDate = new Date(formData.date);
    if (chosenDate.getDay() === 0) {
      setError("Clinic is closed on Sundays! Please choose a date from Monday to Saturday.");
      return;
    }

    if (formData.time < "11:00" || formData.time > "20:00") {
      setError("Clinic hours error: Slots are only available between 11:00 AM and 8:00 PM.");
      return;
    }

    // Processing success simulation
    setSuccess(true);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 max-w-md space-y-4 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Create Direct Appointment</h3>
      
      {error && <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-semibold">{error}</div>}
      {success && <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-lg text-xs font-semibold">Booking saved and synced to Calendar!</div>}

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Patient Name</label>
        <input required type="text" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Date</label>
          <input required type="date" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Time</label>
          <input required type="time" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
        </div>
      </div>

      <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm shadow-sm transition-colors mt-2">
        Confirm Booking
      </button>
    </form>
  );
}