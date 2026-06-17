/* eslint-disable @typescript-eslint/no-explicit-any */

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

  InvalidDocumentId: {
    message: string;
  };
};

export const handleCustomError = function (error: any): APIError | Error {
  if (error.name === 'ValidationError') return validationError(error);
  if (error.name === 'CastError') return invalidDocumentId();

  return new Error('Unhandled Error Exception');
};

const validationError = function (error: CustomErrorTypes['ValidationError']) {
  const errorDetails: Record<string, unknown> = {};

  for (const key in error.errors) {
    errorDetails[key] = error.errors[key]?.message;
  }

  return new APIError(error['_message'], 400, errorDetails);
};

const invalidDocumentId = function () {
  return new APIError(
    'The provided document ID is invalid. Please provide a valid ObjectId.',
    400,
  );
};
