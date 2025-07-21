import { Controller, Get, Inject } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { prismaClient } from './shared/infrastructure/configs/prisma.config';

@Controller()
export class AppController {
  constructor(
    private health: HealthCheckService,
    private prisma: PrismaHealthIndicator,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  getHello() {
    return this.health.check([
      // () => this.http.pingCheck('nestjs-docs', 'http://docs.nestjs.com'),
      () => this.prisma.pingCheck('prisma-connection', prismaClient),
    ]);
  }
}
