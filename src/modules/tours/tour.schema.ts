import { z } from 'zod';

import { zodIssue } from '../../utils/zod-utils';

export const tourSchema = z.object({
  name: z
    .string({
      error: zodIssue('Tour name is required', 'Tour name must be string'),
    })
    .min(1, {
      error: 'Tour name is required',
    }),

  price: z.coerce
    .number({ error: 'Price must be a number' })
    .min(10, { error: 'Price must be at least 10$' })
    .optional(),

  ratings: z
    .number({
      error: zodIssue('You must provide a rating', 'Ratings must be number'),
    })
    .min(1, { error: 'Rating must be at least 1 star' }),
});

export const tourIdParamSchema = z.object({
  id: z
    .string({
      error: 'Tour id is required',
    })
    .min(3, { error: 'Tour id must be at least 3 characters' }),
});

export const tourYearParamScheam = z.object({
  year: z.coerce
    .number({
      error: zodIssue('Tours year is required', 'Tours year is must be number'),
    })
    .int({ error: 'Year must be a whole number' })
    .min(1000, 'Year must be a 4-digit number')
    .max(9999, 'Year must be a valid calendar year'),
});
