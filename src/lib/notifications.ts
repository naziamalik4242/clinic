export const notificationsLib = {
  async triggerInternalSlackOrEmailAlert(title: string, message: string) {
    console.log(`[BROADCAST SYSTEM ALERT CHANNEL]: **${title}** -> ${message}`);
    return { dispatched: true };
  }
};