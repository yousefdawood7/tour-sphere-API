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
  },

  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
