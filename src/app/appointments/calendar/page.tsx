'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader2, Calendar as CalendarIcon, User } from 'lucide-react';
import Link from 'next/link';

interface CalendarAppointment {
  id: string;
  patientName: string;
  time: string;
  dateStr: string; // YYYY-MM-DD
}

export default function AppointmentsCalendarPage() {
  const [appointments, setAppointments] = useState<CalendarAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    async function loadCalendarSlots() {
      try {
        const res = await fetch('/api/appointments');
        if (res.ok) {
          const data = await res.json();
          // Map data logic parameters to match our calendar view
          setAppointments(data.map((a: any) => ({
            id: a.id,
            patientName: a.patientName,
            time: a.bookingTime || a.time,
            dateStr: a.date
          })));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadCalendarSlots();
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  if (loading) return <div className="flex h-[80vh] items-center justify-center"><Loader2 className="w-8 h-8 text-indigo-600 animate-spin" /></div>;

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 dark:bg-slate-900 border border-indigo-100/40 rounded-xl text-indigo-600"><CalendarIcon className="w-5 h-5" /></div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{monthNames[month]} {year}</h1>
            <p className="text-xs text-slate-400 mt-0.5">Visual representation framework of logged calendar streams.</p>
          </div>
        </div>
        <div className="flex gap-2 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
          <button onClick={handlePrevMonth} className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-600"><ChevronLeft className="w-4 h-4" /></button>
          <button onClick={handleNextMonth} className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-600"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Calendar Grid Wrapper */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-7 text-center font-bold text-xs uppercase tracking-wider text-slate-400 bg-slate-50/60 dark:bg-slate-950/40 border-b p-3">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => <div key={d}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 auto-rows-[120px] divide-x divide-y bg-slate-100/40 dark:bg-slate-950/10">
          {/* Empty blocks for padding calendar balance offset alignments */}
          {[...Array(firstDayIndex)].map((_, idx) => <div key={`empty-${idx}`} className="bg-slate-50/40 dark:bg-slate-950/20" />)}
          
          {/* Active Month Grid Rendering Elements */}
          {[...Array(daysInMonth)].map((_, dayIdx) => {
            const currentDayNum = dayIdx + 1;
            const currentDayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(currentDayNum).padStart(2, '0')}`;
            const daySlots = appointments.filter(a => a.dateStr === currentDayStr);

            return (
              <div key={currentDayNum} className="p-2 bg-white dark:bg-slate-900 space-y-1 overflow-y-auto flex flex-col">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-600 block mb-1">{currentDayNum}</span>
                {daySlots.map(slot => (
                  <Link key={slot.id} href={`/appointments/edit/${slot.id}`} className="block text-[10px] bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100 rounded p-1 font-semibold truncate transition-colors">
                    🕒 {slot.time} - {slot.patientName}
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}