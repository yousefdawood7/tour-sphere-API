/* eslint-disable @typescript-eslint/no-explicit-any */

import { env } from '../lib/env';
import { APIError } from '../utils/api-error';

type CustomErrorTypes = {
  ValidationError: {
    _message: string;
    errors: {
      [key: string]: {
        message: string;
      };
    };
  };

  DuplicateEntriesError: {
    keyValue: {
      name: string;
    };
  };

  InvalidDocumentId: {
    message: string;
  };
};

export const handleCustomError = function (
  error: any,
): APIError | Error | undefined {
  if (error.name === 'ValidationError') return validationError(error);
  if (error.name === 'CastError') return invalidDocumentId();
  if (error.code === 11000) return duplicateEntriesError(error);

  if (env.APP_STAGE === 'production')
    return new Error('Unhandled Error Exception');
};

const validationError = function (error: CustomErrorTypes['ValidationError']) {
  const errorDetails: Record<string, unknown> = {};

  for (const key in error.errors) {
    errorDetails[key] = error.errors[key]?.message;
  }

  return new APIError(error['_message'], 400, errorDetails);
};

const invalidDocumentId = () => {
  return new APIError(
    'The provided document ID is invalid. Please provide a valid ObjectId.',
    400,
  );
};

const duplicateEntriesError = (
  error: CustomErrorTypes['DuplicateEntriesError'],
) => {
  return new APIError(
    `A document with the name "${error.keyValue.name}" already exists.`,
    409,
  );
};
