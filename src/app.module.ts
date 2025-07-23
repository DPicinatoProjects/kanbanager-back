import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthCheckService, TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { DisconnectExternalServersProvider } from './shared/providers/disconnect-external-servers.provider';
import { RedisHealthIndicator } from './modules/health/infrastructure/health-indicators/redis-health-indicator.health';
import { PrismaHealthIndicator } from './modules/health/infrastructure/health-indicators/prisma-health-indicator.health';
import { HealthModule } from './modules/health/presentation/health.module';

@Module({
  imports: [TerminusModule, HttpModule, HealthModule],
  controllers: [AppController],
  providers: [DisconnectExternalServersProvider],
})
export class AppModule {}
