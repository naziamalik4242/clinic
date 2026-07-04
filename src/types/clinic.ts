export type AICopilotToneStyle = 'Empathetic & Professional' | 'Strictly Informational & Direct' | 'High-End Luxury Focus';

export interface ClinicGlobalConfig {
  id: 'global_config';
  clinicName: string;
  aiTone: AICopilotToneStyle;
  maxSlotsPerDay: number;
  restrictHumanOverride: boolean;
}

export interface OperatorProfile {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'OPERATOR';
  clinicId: string;
}