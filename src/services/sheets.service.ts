import { googleSheetsLib } from '@/lib/googleSheets';
import { logger } from '@/lib/logger';

export const sheetsService = {
  async syncLeadToGlobalLedger(leadPayload: { name: string; phone: string; score: number; source: string }) {
    const backupSpreadsheetId = process.env.GOOGLE_BACKUP_SHEET_ID;
    if (!backupSpreadsheetId) {
      logger.info('Spreadsheet ID variable omitted inside configuration. Bypassing line records sync runtime hooks.');
      return { synced: false };
    }

    const compiledRow = [
      new Date().toISOString(),
      leadPayload.name,
      leadPayload.phone,
      leadPayload.source,
      `Score Matrix: ${leadPayload.score}`
    ];

    await googleSheetsLib.appendRowLog(backupSpreadsheetId, compiledRow);
    return { synced: true };
  }
};