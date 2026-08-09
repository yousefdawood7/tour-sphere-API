import type { NextFunction, Request, Response } from 'express';

import { handleCustomError } from '../config/error-codes.config';
import { env } from '../lib/env';
import type { APIError } from '../utils/api-error';

export function globalErrorMiddleware(
  err: APIError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  //! those default checks if we handled error is not an APIError instance
  const catchedError = handleCustomError(err) || err;

  const statusCode = catchedError.statusCode || 500;
  const status = statusCode < 500 ? 'fail' : 'error';

  if (env.APP_STAGE === 'dev')
    return res.status(statusCode).json({
      status,
      message: catchedError.message || 'Something went wrong',

      //! for handling non APIError instance
      ...((catchedError.details instanceof Object
        ? Object.values(catchedError.details).length
        : false) && { details: catchedError.details }),
      error: catchedError,
      stack: catchedError.stack,
    });

  if (catchedError.isOperational)
    return res.status(statusCode).json({
      status,
      message: catchedError.message,

      ...(Object.values(catchedError.details).length && {
        details: catchedError.details,
      }),
    });

  //! because non operational errors won't have any status or status code so we pre-define it
  res.status(500).json({
    status: 'error',
    statusCode: 500,

    message: catchedError.message || 'Something went wrong',
  });
}
