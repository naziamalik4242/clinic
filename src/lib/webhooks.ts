export interface UniformMessageEvent {
  senderId: string;
  text: string;
  platform: 'WHATSAPP' | 'INSTAGRAM' | 'MESSENGER';
}

export const webhooksLib = {
  normalizeWhatsAppEvent(body: any): UniformMessageEvent | null {
    const value = body?.entry?.[0]?.changes?.[0]?.value;
    const message = value?.messages?.[0];
    if (!message) return null;
    
    return {
      senderId: message.from,
      text: message.text?.body || '',
      platform: 'WHATSAPP'
    };
  }
};