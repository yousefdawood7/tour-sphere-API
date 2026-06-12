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

  summary: z
    .string({
      error: zodIssue(
        'Tour must have a summary',
        'Tour summary must be string',
      ),
    })
    .min(1, {
      error: 'Tour summary is required',
    }),

  description: z
    .string({
      error: 'Tour description must be string',
    })
    .min(10, {
      error: 'Tour description must be at least 10 character',
    })
    .optional(),

  price: z.coerce
    .number({ error: 'Price must be a number' })
    .min(10, { error: 'Price must be at least 10$' })
    .positive({ error: 'Price must be a positive number' })
    .optional(),

  priceDiscount: z.coerce
    .number({ error: 'Discount must be a number' })
    .min(1, { error: 'Discount must be at least 1$' })
    .optional(),

  duration: z.coerce
    .number({
      error: zodIssue('Tour must have a duration', 'Duration must be a number'),
    })
    .positive({ error: 'Duration must be a positive number' }),

  maxGroupSize: z.coerce
    .number({
      error: zodIssue(
        'Tour must have a maximum group size',
        'Maximum group size must be a number',
      ),
    })
    .positive({ error: 'Maximum group size must be a positive number' }),

  difficulty: z.string({
    error: zodIssue(
      'Tour must have a difficulty',
      'Difficulty must be a string',
    ),
  }),

  ratingsAverage: z.coerce
    .number({
      error: 'Ratings average must be a number',
    })
    .min(1, { error: 'Ratings average must be above 1.0' })
    .max(5, { error: 'Ratings average must be below 5.0' })
    .positive({ error: 'Duration must be a positive number' })
    .default(4.5),

  ratingsQuantity: z.coerce
    .number({
      error: 'Ratings quantity must be a number',
    })
    .int({ error: 'Ratings quantity must be a whole number' })
    .positive({ error: 'Ratings quantity must be a positive number' })
    .default(0),

  ratings: z
    .number({
      error: zodIssue('You must provide a rating', 'Ratings must be number'),
    })
    .min(1, { error: 'Rating must be at least 1 star' }),

  imageCover: z.string({
    error: zodIssue(
      'Tour must have a cover image',
      'Tour url must be a string',
    ),
  }),

  images: z
    .array(z.string({ error: 'Tour url must be a string' }), {
      error: 'Images must be an array',
    })
    .optional(),

  startDates: z
    .array(z.coerce.date({ error: 'Tour start date must be a valid date' }), {
      error: 'Start dates must be an array',
    })
    .optional(),
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
