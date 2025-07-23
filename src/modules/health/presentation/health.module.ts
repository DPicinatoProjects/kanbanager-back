import { Module } from '@nestjs/common';
import { RedisHealthIndicator } from '../infrastructure/health-indicators/redis-health-indicator.health';
import { PrismaHealthIndicator } from '../infrastructure/health-indicators/prisma-health-indicator.health';
import { DiscordNotifier } from '@/shared/infrastructure/providers/discord-notifier.provider';
import { IDiscordNotifier } from '@/shared/domain/providers/discord-notifier.provider';

@Module({
  providers: [
    RedisHealthIndicator,
    PrismaHealthIndicator,
    {
      provide: IDiscordNotifier,
      useClass: DiscordNotifier,
    },
  ],
  exports: [RedisHealthIndicator, PrismaHealthIndicator],
})
export class HealthModule {}
