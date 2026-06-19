import { z } from 'zod';

import { zodIssue } from '../../utils/zod-utils';

export const signupSchema = z
  .object({
    email: z
      .string({
        error: zodIssue('Email is required', 'Email should be string'),
      })
      .min(1, { error: 'Email is required' })
      .pipe(z.email({ error: 'Please provide a valid email address' })),

    name: z
      .string({
        error: zodIssue('Name is required', 'Name should be string'),
      })
      .min(3, { error: 'Name must be at least 3 characters long' }),

    avatar: z.url({ error: 'Avatar url should be string' }).optional(),

    password: z
      .string({
        error: zodIssue('Password is required', 'Password must be string'),
      })
      .min(1, { error: 'Password is required' })
      .min(8, { error: 'Password must be at least 8 characters long' })
      .regex(/[A-Z]/, {
        error: 'Password must contain at least one uppercase letter',
      })
      .regex(/[a-z]/, {
        error: 'Password must contain at least one lowercase letter',
      })
      .regex(/\d/, {
        error: 'Password must contain at least one number',
      }),

    confirmPassword: z.coerce
      .string({ error: 'Please confirm your password' })
      .min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match",
  });
