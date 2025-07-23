import { HealthReport } from '../../domain/entities/health-report';
import { PrismaHealthIndicator } from '../../infrastructure/health-indicators/prisma-health-indicator.health';
import { RedisHealthIndicator } from '../../infrastructure/health-indicators/redis-health-indicator.health';
import { DiscordNotifier } from '../../infrastructure/providers/discord-notifier.provider';

export class CheckHealthUseCase {
  constructor(
    private readonly redis: RedisHealthIndicator,
    private readonly prisma: PrismaHealthIndicator,
    private readonly notifier: DiscordNotifier,
  ) {}

  async execute(): Promise<HealthReport[]> {
    // Listas de CheckHealth da aplicação
    const reports: HealthReport[] = [];

    // Redis Health Check
    const redisHealth = await this.redis.check();
    reports.push(redisHealth);

    // Prisma Health Check
    const prismaHealth = await this.prisma.check();
    reports.push(prismaHealth);

    const unhealthy = reports.filter(r => !r.isHealthy());
    if (unhealthy.length > 0) {
      await this.notifier.notify(unhealthy);
    }

    return reports;
  }
}
