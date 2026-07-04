'use client';

import { useState, useEffect } from 'react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  intentScore: number;
}

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ingestLeadsStream = async () => {
      setLeads([
        { id: 'lead-1', name: 'Zainab Malik', email: 'zainab@domain.com', phone: '+923001112233', source: 'Instagram DM', intentScore: 85 },
        { id: 'lead-2', name: 'Ali Khan', email: 'ali@domain.com', phone: '+923214445566', source: 'WhatsApp API', intentScore: 45 }
      ]);
      setLoading(false);
    };
    ingestLeadsStream();
  }, []);

  const injectLead = (freshLead: Omit<Lead, 'id' | 'intentScore'>) => {
    const leadNode: Lead = {
      ...freshLead,
      id: `lead_node_${Date.now()}`,
      intentScore: 20 // baseline start score logic
    };
    setLeads((prev) => [leadNode, ...prev]);
  };

  return { leads, loading, injectLead };
}