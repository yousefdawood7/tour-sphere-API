import { z } from 'zod';

import { zodIssue } from '../../utils/zod-utils';

export const tourSchema = z.object(
  {
    name: z
      .string({
        error: zodIssue('Tour name is required', 'Tour name must be string'),
      })
      .min(1, {
        error: 'Tour name is required',
      }),

    price: z
      .number({ error: 'Price must be a number' })
      .min(10, { error: 'Price must be at least 10$' })
      .pipe(z.coerce.string<number>())
      .optional(),

    ratings: z
      .number({
        error: zodIssue(
          'You must provide a rating',
          'Ratings must be a number',
        ),
      })
      .min(1, { error: 'Rating must be at least 1 start' }),
  },
  { error: 'You must pass a body to the request' },
);
