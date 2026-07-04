import { whatsappLib } from '@/lib/whatsapp';
import { logger } from '@/lib/logger';

export const whatsappService = {
  async dispatchMessage(toPhone: string, messageBody: string) {
    try {
      logger.info(`WhatsApp outbox execution loop initialized for endpoint line: ${toPhone}`);
      const response = await whatsappLib.sendTextMessage(toPhone, messageBody);
      return { success: true, payload: response };
    } catch (error) {
      logger.error(`WhatsApp communication line down schema error fallback`, error);
      return { success: false, error };
    }
  }
};