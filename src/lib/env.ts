import { createEnv } from '@t3-oss/env-core';
import dotenv from 'dotenv';
import z from 'zod';

const stage = process.env.APP_STAGE ?? 'dev';

export const isDevelopment = stage === 'dev';
export const isProduction = stage === 'production';

// prettier-ignore
if (isDevelopment)
    dotenv.config();

export const env = createEnv({
  server: {
    PORT: z.coerce.number().default(3000),
    APP_STAGE: z.enum(['dev', 'production']),
    NODE_ENV: z.enum(['development', 'production']),

    DATABASE_NAME: z.string().min(3).max(128),
    DATABASE_PASSWORD: z.string().min(3).max(128),
    DATABASE_URL: z.url(),

    BCRYPT_ROUNDS: z.coerce.number().min(12).max(31).default(12),
    JWT_SECRET: z.string().min(32).max(256),
    JWT_EXPIRES_IN: z.union([
      z.number().positive(), // Representing seconds (e.g., 3600 for 1 hour)
      z
        .string()
        .regex(/^\d+(s|m|h|d|w|y)$/)
        .default('1d'), // Representing timespan (e.g., "1h", "7d", "30m")
    ]),
  },

  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
