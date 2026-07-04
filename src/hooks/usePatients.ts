'use client';

import { useState, useEffect } from 'react';

interface Patient {
  id: string;
  name: string;
  phone: string;
  actionTag: 'HOT' | 'WARM' | 'COLD';
  createdAt: string;
}

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncPatientsTable = async () => {
      setPatients([
        { id: 'p1', name: 'Zainab Malik', phone: '+923001112233', actionTag: 'HOT', createdAt: '2026-06-25' },
        { id: 'p2', name: 'Ali Khan', phone: '+923214445566', actionTag: 'WARM', createdAt: '2026-06-28' },
        { id: 'p3', name: 'Ayesha Ahmed', phone: '+923339998877', actionTag: 'COLD', createdAt: '2026-07-01' }
      ]);
      setLoading(false);
    };
    syncPatientsTable();
  }, []);

  const mutateActionTag = (id: string, newTag: Patient['actionTag']) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, actionTag: newTag } : p))
    );
  };

  return { patients, loading, mutateActionTag };
}