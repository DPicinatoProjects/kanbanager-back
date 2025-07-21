import z from 'zod';

export const ENV = z
  .object({
    DATABASE_URL: z
      .string({ message: 'DATABASE_URL is required' })
      .url({ message: 'DATABASE_URL must be a valid URL' }),
  })
  .parse(process.env);
