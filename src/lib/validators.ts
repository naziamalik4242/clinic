export const validators = {
  isValidE164Phone(phone: string): boolean {
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  },

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  parseInboundWebhook(body: any) {
    if (!body || !body.entry?.[0]?.changes?.[0]?.value) {
      throw new Error('Malformed inbound platform schema framework payload');
    }
    return body.entry[0].changes[0].value;
  }
};