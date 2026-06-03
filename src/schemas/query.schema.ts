import { z } from 'zod';

import { DEFAULTS } from '../config/constants.config';

export const querySchema = z.object({
  page: z.coerce
    .number<number>({ error: 'Page must be a number' })
    .positive({ error: 'Page must be positive number' })
    .min(1, { error: 'Page must be at least 1' })
    .default(DEFAULTS.PAGE)
    .optional(),

  limit: z.coerce
    .number<number>({ error: 'Limit must be a number' })
    .positive({ error: 'Limit must be positive number' })
    .min(1, { error: 'Limit must be at least 1' })
    .default(DEFAULTS.LIMIT)
    .optional(),

  sort: z
    .string({ error: 'Sort must be string' })
    .min(3, { error: 'Sorting value must be at least 3 characters' })
    .optional(),

  fields: z
    .string({ error: 'Fields must be string' })
    .min(3, { error: 'Field value must be at least 3 characters' })
    .optional(),
});
