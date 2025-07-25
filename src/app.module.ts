import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HttpModule } from '@nestjs/axios';
import { DisconnectExternalServersProvider } from '@/shared/providers/disconnect-external-servers.provider';
import { HealthModule } from '@/modules/health/presentation/health.module';

@Module({
  imports: [HttpModule, HealthModule],
  controllers: [AppController],
  providers: [DisconnectExternalServersProvider],
})
export class AppModule {}
