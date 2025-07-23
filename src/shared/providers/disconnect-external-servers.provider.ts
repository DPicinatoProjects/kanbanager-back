import {
  Injectable,
  OnApplicationShutdown,
  OnModuleDestroy,
} from '@nestjs/common';
import { redisClient } from '../infrastructure/configs/redis.config';
import { prismaClient } from '../infrastructure/configs/prisma.config';

@Injectable()
export class DisconnectExternalServersProvider
  implements OnModuleDestroy, OnApplicationShutdown
{
  private disconnect() {
    redisClient.disconnect();
    void prismaClient.$disconnect();
  }

  onApplicationShutdown() {
    this.disconnect();
  }

  onModuleDestroy() {
    this.disconnect();
  }
}
