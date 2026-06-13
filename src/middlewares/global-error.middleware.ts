import type { Request, Response } from 'express';

import { env } from '../lib/env';
import type { APIError } from '../utils/api-error';

export function globalErrorMiddleware(
  err: APIError,
  _req: Request,
  res: Response,
) {
  if (env.APP_STAGE === 'dev')
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      ...(Object.values(err.details).length && { details: err.details }),
      stack: err.stack,
    });

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    ...(Object.values(err.details).length && { details: err.details }),
  });
}
