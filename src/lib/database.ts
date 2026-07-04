import { prisma } from './prisma';

export const databaseDriver = {
  async testConnectivity(): Promise<boolean> {
    try {
      await prisma.$executeRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }
};