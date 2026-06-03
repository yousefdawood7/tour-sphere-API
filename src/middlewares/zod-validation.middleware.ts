import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { ERROR_CONFIG } from '../config/error.config';
import { handleResposeError } from '../utils/handle-response';
import { handleZodErrors } from '../utils/zod-utils';

type ValidationType = 'body' | 'query';

export function zodMiddleware(
  schema: z.ZodType,
  type: ValidationType = 'body',
) {
  return function (req: Request, res: Response, next: NextFunction) {
    const { error, data } = schema.safeParse(req[type]);

    if (error)
      return res.status(400).json(
        handleResposeError(400, {
          ...ERROR_CONFIG.VALIDATION_ERROR,
          details: { ...handleZodErrors(error) },
        }),
      );

    req.body = data;
    next();
  };
}
