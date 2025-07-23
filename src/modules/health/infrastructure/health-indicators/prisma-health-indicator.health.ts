import { Logger } from '@nestjs/common';
import { HealthReport } from '../../domain/entities/health-report';
import { prismaClient } from '@/shared/infrastructure/configs/prisma.config';

export class PrismaHealthIndicator {
  constructor(
    private readonly logger = new Logger(PrismaHealthIndicator.name),
    private readonly key = 'prisma-connection',
  ) {}

  async check(): Promise<HealthReport> {
    const start = Date.now();

    try {
      await prismaClient.$queryRaw`SELECT 1`;
      const responseTime = Date.now() - start;

      return new HealthReport(this.key, 'up', responseTime);
    } catch (error) {
      const responseTime = Date.now() - start;
      this.logger.error(
        `Prisma Health check failed: ${error.message}`,
        error.stack,
      );

      return new HealthReport(this.key, 'down', responseTime, error.message);
    }
  }
}
