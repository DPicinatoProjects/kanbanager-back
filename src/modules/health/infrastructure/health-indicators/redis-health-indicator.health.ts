import { Injectable, Logger } from '@nestjs/common';
import { HealthReport } from '../../domain/entities/health-report';
import { redisClient } from '@/shared/infrastructure/configs/redis.config';

@Injectable()
export class RedisHealthIndicator {
  private readonly logger = new Logger(RedisHealthIndicator.name);
  private readonly key = 'redis';

  async check(): Promise<HealthReport> {
    const start = Date.now();

    try {
      const result = await redisClient.ping();
      const responseTime = Date.now() - start;

      if (result !== 'PONG') {
        throw new Error(`Redis health check failed: ${result}`);
      }

      return new HealthReport(this.key, 'up', responseTime);
    } catch (error) {
      const responseTime = Date.now() - start;
      this.logger.error(
        `Redis Health check failed: ${error.message}`,
        error.stack,
      );

      return new HealthReport(this.key, 'down', responseTime, error.message);
    }
  }
}
