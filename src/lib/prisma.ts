import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => new PrismaClient();

declare global {
  var __prismaClient: PrismaClient | undefined;
}

export function getPrismaClient() {
  if (!globalThis.__prismaClient) {
    globalThis.__prismaClient = prismaClientSingleton();
  }

  return globalThis.__prismaClient;
}

const prisma = globalThis.__prismaClient ?? getPrismaClient();

export default prisma;
