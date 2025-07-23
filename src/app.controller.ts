import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { prismaClient } from './shared/infrastructure/configs/prisma.config';
import { ENV } from './configs/env.config';
import { RedisHealthIndicator } from './modules/health/infrastructure/health-indicators/redis-health-indicator.health';
import { DiscordNotifier } from './modules/health/infrastructure/providers/discord-notifier.provider';
import { CheckHealthUseCase } from './modules/health/application/use-case/check-health.use-case';
import { PrismaHealthIndicator } from './modules/health/infrastructure/health-indicators/prisma-health-indicator.health';

@Controller()
export class AppController {
  private readonly useCase: CheckHealthUseCase;

  constructor(
    private redis: RedisHealthIndicator,
    private prisma: PrismaHealthIndicator,
  ) {
    const notifier = new DiscordNotifier();
    this.useCase = new CheckHealthUseCase(redis, prisma, notifier);
  }

  @Get()
  async handle() {
    const result = await this.useCase.execute();
    const isHealthy = result.every(r => r.isHealthy());

    return {
      status: isHealthy ? 'up' : 'down',
      services: result,
    };
  }
}
