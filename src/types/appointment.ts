export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface Appointment {
  id: string;
  patientId: string;
  procedure: string;
  date: string; // ISO String format
  time: string; // HH:MM format
  notes?: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentSlotAllocation {
  timeBlock: string;
  isAvailable: boolean;
  assignedAppointmentId?: string;
}