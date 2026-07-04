export const logger = {
  info(message: string, telemetryPayload?: any) {
    console.log(`[INFO] [${new Date().toISOString()}] ${message}`, telemetryPayload ? JSON.stringify(telemetryPayload) : '');
  },
  error(message: string, errorInstance?: any) {
    console.error(`[CRITICAL EXCEPTION Fault] [${new Date().toISOString()}] ${message}`, errorInstance || '');
  }
};