import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { prisma } from '@db/client/src';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);
    if (!hasDatabaseUrl) {
      // Skip connecting if DATABASE_URL is not provided in dev
      return;
    }
    try {
      await prisma.$connect();
    } catch (err) {
      // In dev environments, allow API to boot even if DB is unavailable
      // so that non-DB endpoints (e.g., health) still work.
    }
  }

  async onModuleDestroy() {
    try {
      await prisma.$disconnect();
    } catch {
      // ignore
    }
  }
}
