import { ActionTagCategory } from './patient';

export type LeadSourceChannel = 'WHATSAPP' | 'INSTAGRAM' | 'MESSENGER' | 'ORGANIC_WEB' | 'MANUAL_INBOUND';

export interface Lead {
  id: string;
  name: string;
  email?: string;
  phone: string;
  source: LeadSourceChannel;
  intentScore: number;
  status: ActionTagCategory;
  createdAt: string;
}

export interface LeadCapturePayload {
  name: string;
  phone: string;
  email?: string;
  source: LeadSourceChannel;
}