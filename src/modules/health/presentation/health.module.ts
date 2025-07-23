import { Module } from '@nestjs/common';
import { RedisHealthIndicator } from '../infrastructure/health-indicators/redis-health-indicator.health';
import { PrismaHealthIndicator } from '../infrastructure/health-indicators/prisma-health-indicator.health';

@Module({
  providers: [RedisHealthIndicator, PrismaHealthIndicator],
  exports: [RedisHealthIndicator, PrismaHealthIndicator],
})
export class HealthModule {}
