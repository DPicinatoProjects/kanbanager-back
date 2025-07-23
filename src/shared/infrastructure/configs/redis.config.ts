import { ENV } from '@/configs/env.config';
import Redis from 'ioredis';

export const redisClient = new Redis(ENV.REDIS_URL, {
  retryStrategy(attempts) {
    const maxRetries = 5;

    if (attempts > maxRetries) {
      console.error(`❌ Redis: maximo de ${maxRetries} tentativas alcançadas`);
      return null;
    }

    // Tempo de espera antes da proxima tentativa
    const delay = attempts * 1000;
    console.warn(
      `⚠️ Tentando reconectar ao Redis (tenatativa ${attempts}) em ${delay}ms...`,
    );
    return delay;
  },
});
