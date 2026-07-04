export type MessageSenderRole = 'PATIENT' | 'AI' | 'HUMAN_AGENT';
export type CommunicationPlatform = 'WHATSAPP' | 'INSTAGRAM' | 'MESSENGER';

export interface ChatMessage {
  id: string;
  patientId: string;
  sender: MessageSenderRole;
  message: string;
  platform: CommunicationPlatform;
  createdAt: string;
}

export interface ChatThreadSummary {
  patientId: string;
  patientName: string;
  lastMessageText: string;
  platform: CommunicationPlatform;
  timeLabel: string;
  isUnread: boolean;
  isAiHandling: boolean;
}