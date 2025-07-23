import z from 'zod';
import * as dotenv from 'dotenv';

dotenv.config();
export const ENV = z
  .object({
    DATABASE_URL: z
      .string({ message: 'DATABASE_URL is required' })
      .url({ message: 'DATABASE_URL must be a valid URL' }),

    REDIS_URL: z
      .string({ message: 'REDIS_URL is required' })
      .url({ message: 'REDIS_URL must be a valid URL' }),

    APP_URL: z
      .string({ message: 'APP_URL is required' })
      .url({ message: 'APP_URL must be a valid URL' }),

    DISCORD_WEBHOOK_URL: z
      .string({ message: 'APP_URL is required' })
      .url({ message: 'APP_URL must be a valid URL' }),
  })
  .parse(process.env);
