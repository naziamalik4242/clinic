import { messengerLib } from '@/lib/messenger';
import { logger } from '@/lib/logger';

export const messengerService = {
  async dispatchPageMessage(psid: string, text: string) {
    try {
      logger.info(`Meta Messenger connection stream emitting text frame directly to client id: ${psid}`);
      const payload = await messengerLib.sendPageMessage(psid, text);
      return { success: true, payload };
    } catch (error) {
      logger.error(`Messenger distribution interface error catch exception`, error);
      return { success: false, error };
    }
  }
};