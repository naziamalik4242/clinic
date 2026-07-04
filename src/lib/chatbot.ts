export interface ChatReply {
  text: string;
  intent: 'BOOKING' | 'PRICING' | 'TREATMENT' | 'GENERAL';
}

export function generateAiReply(message: string, history: string[] = []): ChatReply {
  const lower = message.toLowerCase().trim();
  const recentContext = history.slice(-3).join(' ').toLowerCase();

  if (lower.includes('book') || lower.includes('appointment') || lower.includes('schedule')) {
    return {
      text: 'I can help you reserve a consultation. The next available time is tomorrow at 2:00 PM or Friday at 11:00 AM. Which option works best for you?',
      intent: 'BOOKING'
    };
  }

  if (lower.includes('price') || lower.includes('cost') || lower.includes('fee') || lower.includes('pricing')) {
    return {
      text: 'Our premium aesthetic consultations start from $150. I can also suggest the best treatment plan based on your goals if you share a little more detail.',
      intent: 'PRICING'
    };
  }

  if (lower.includes('laser') || lower.includes('botox') || lower.includes('filler') || lower.includes('treatment')) {
    return {
      text: 'That sounds like a great fit for our clinic. I can help you compare treatment options and recommend the most suitable plan for your goals.',
      intent: 'TREATMENT'
    };
  }

  if (recentContext.includes('book') || recentContext.includes('appointment')) {
    return {
      text: 'I can help you lock in a consultation slot. Tell me your preferred day and I will guide you through the next step.',
      intent: 'BOOKING'
    };
  }

  return {
    text: 'Thanks for reaching out. I can help with treatment details, pricing, and booking a consultation at AuraClinic. What would you like to explore first?',
    intent: 'GENERAL'
  };
}
