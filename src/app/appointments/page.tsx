'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar as CalendarIcon, User, Clock, CheckCircle, AlertCircle, Loader2, Plus, Edit2 } from 'lucide-react';

interface Appointment {
  id: string;
  patientName: string;
  procedure: string;
  date: string;
  time: string;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const res = await fetch('/api/appointments');
        if (res.ok) {
          const data = await res.json();
          setAppointments(data);
        }
      } catch (err) {
        console.error("Appointments fetch fail:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Appointments</h1>
          <p className="text-sm text-slate-500 mt-1">Live booking scheduling automatically logged from user chats or added manually.</p>
        </div>
        <div className="flex gap-2 self-start">
          <Link href="/appointments/calendar" className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm hover:bg-slate-50">
            View Calendar
          </Link>
          <Link href="/appointments/create" className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> Create Appointment
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm">No scheduled slots found.</div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="p-4 pl-6">Patient</th>
                  <th className="p-4">Procedure Interested</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Time Slot</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm text-slate-700 dark:text-slate-300">
                {appointments.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/10 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-slate-900 dark:text-white flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center"><User className="w-3.5 h-3.5 text-slate-400" /></div>
                      {app.patientName}
                    </td>
                    <td className="p-4 font-medium">{app.procedure}</td>
                    <td className="p-4"><div className="flex items-center gap-1.5"><CalendarIcon className="w-4 h-4 text-slate-400" /> {app.date}</div></td>
                    <td className="p-4"><div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> {app.time}</div></td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        app.status === 'CONFIRMED' ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400' :
                        app.status === 'PENDING' ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400' :
                        'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400'
                      }`}>
                        {app.status === 'CONFIRMED' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <Link href={`/appointments/edit/${app.id}`} className="inline-flex p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-50 transition-colors">
                        <Edit2 className="w-4 h-4" />
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