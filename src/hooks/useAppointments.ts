'use client';

import { useState, useEffect } from 'react';

interface Appointment {
  id: string;
  patientName: string;
  procedure: string;
  date: string;
  time: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED';
}

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sync active slots baseline record
    const fetchAppointments = async () => {
      setLoading(true);
      setAppointments([
        { id: 'app-1', patientName: 'Zainab Malik', procedure: 'Laser Hair Removal', date: '2026-07-05', time: '14:00', status: 'CONFIRMED' },
        { id: 'app-2', patientName: 'Ali Khan', procedure: 'Anti-Aging Therapy', date: '2026-07-06', time: '11:30', status: 'PENDING' }
      ]);
      setLoading(false);
    };

    fetchAppointments();
  }, []);

  const createAppointment = async (newSlot: Omit<Appointment, 'id' | 'status'>) => {
    const freshRecord: Appointment = {
      ...newSlot,
      id: `manual_id_${Date.now()}`,
      status: 'PENDING'
    };
    setAppointments((prev) => [freshRecord, ...prev]);
    return { success: true, record: freshRecord };
  };

  const updateStatus = async (id: string, nextStatus: Appointment['status']) => {
    setAppointments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: nextStatus } : item))
    );
  };

  return { appointments, loading, createAppointment, updateStatus };
}