import { Appointment } from './appointment';
import { ChatMessage } from './chat';

export type ActionTagCategory = 'HOT' | 'WARM' | 'COLD';

export interface Patient {
  id: string;
  name: string;
  phone: string; // E.164 standard format (+92...)
  email?: string;
  intentScore: number; // 0 to 100 metric scaler
  actionTag: ActionTagCategory;
  createdAt: string;
  updatedAt: string;
}

export interface DeepPatientProfile extends Patient {
  appointments: Appointment[];
  chatLogs: ChatMessage[];
}