import { instagramLib } from '@/lib/instagram';
import { logger } from '@/lib/logger';

export const instagramService = {
  async dispatchDirectMessage(igsid: string, text: string) {
    try {
      logger.info(`Instagram communication sequence routing token payload destination: ${igsid}`);
      const result = await instagramLib.sendDirectMessage(igsid, text);
      return { success: true, data: result };
    } catch (error) {
      logger.error(`Instagram API handshake integration down`, error);
      return { success: false, error };
    }
  }
};