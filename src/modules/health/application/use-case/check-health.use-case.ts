import { Inject } from '@nestjs/common';
import { HealthReport } from '../../domain/entities/health-report';
import { PrismaHealthIndicator } from '../../infrastructure/health-indicators/prisma-health-indicator.health';
import { RedisHealthIndicator } from '../../infrastructure/health-indicators/redis-health-indicator.health';
import { IDiscordNotifier } from '@/shared/domain/providers/i-discord-notifier.provider';
import { HealthCheckStrategy } from '@/shared/infrastructure/providers/notifiers/strategies/check-health-strategy';

export class CheckHealthUseCase {
  constructor(
    private readonly redis: RedisHealthIndicator,
    private readonly prisma: PrismaHealthIndicator,
    @Inject(IDiscordNotifier)
    private readonly notifier: IDiscordNotifier,
  ) {}

  async execute(): Promise<HealthReport[]> {
    // Listas de CheckHealth da aplicação
    const reports: HealthReport[] = [];
    // Redis Health Check
    reports.push(await this.redis.check());
    // Prisma Health Check
    reports.push(await this.prisma.check());

    const unhealthy = reports.filter(r => !r.isHealthy());
    if (unhealthy.length > 0) {
      const strategy = new HealthCheckStrategy();
      await this.notifier.notify(strategy, unhealthy);
    }

    return reports;
  }
}
