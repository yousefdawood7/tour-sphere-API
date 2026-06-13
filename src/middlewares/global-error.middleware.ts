import type { NextFunction, Request, Response } from 'express';

import { env } from '../lib/env';
import type { APIError } from '../utils/api-error';

export function globalErrorMiddleware(
  err: APIError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  //! those default checks if we handled error is not an APIError instance
  const statusCode = err.statusCode || 500;
  const status = statusCode < 500 ? 'fail' : 'error';

  if (env.APP_STAGE === 'dev')
    return res.status(statusCode).json({
      status,
      message: err.message,

      //! for handling non APIError instance
      ...((err.details instanceof Object
        ? Object.values(err.details).length
        : false) && { details: err.details }),
      error: err,
      stack: err.stack,
    });

  res.status(statusCode).json({
    status,
    message: err.message,

    //! for handling non APIError instance
    ...((err.details instanceof Object
      ? Object.values(err.details).length
      : false) && { details: err.details }),
  });
}
