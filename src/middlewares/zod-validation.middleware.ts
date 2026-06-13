import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { ERROR_CONFIG } from '../config/error.config';
import { APIError } from '../utils/api-error';
import { handleZodErrors } from '../utils/zod-utils';

type ValidationType = 'body' | 'params' | 'query';

export function zodMiddleware(schema: z.ZodType, type: ValidationType) {
  return function (req: Request, res: Response, next: NextFunction) {
    const { error, data } = schema.safeParse(req[type]);

    if (error)
      return next(
        new APIError(
          ERROR_CONFIG.VALIDATION_ERROR.message,
          400,
          handleZodErrors(error),
        ),
      );

    // prettier-ignore
    if (type === 'body')
      req.body = data;

    next();
  };
}
