/* eslint-disable @typescript-eslint/no-explicit-any */

import { APIError } from '../utils/api-error';

type ErrorCodeKey = string | number;

type ErrorCodeValue = <
  TCustomError extends CustomErrorTypes[keyof CustomErrorTypes],
>(
  error: TCustomError,
) => APIError;

type CustomErrorTypes = {
  ValidationError: {
    _message: string;
    errors: {
      [key: string]: {
        message: string;
      };
    };
  };
};

export const handleCustomError = function (error: any): APIError | Error {
  if (error.name === 'ValidationError')
    return validationError<CustomErrorTypes['ValidationError']>(error);

  return new Error('Unhandled Error Exception');
};

const validationError = function <
  TCustomError extends CustomErrorTypes['ValidationError'],
>(error: TCustomError) {
  const errorDetails: Record<string, unknown> = {};

  for (const key in error.errors) {
    errorDetails[key] = error.errors[key]?.message;
  }

  return new APIError(error['_message'], 400, errorDetails);
};

const codes = [['ValidationError', validationError]] as const satisfies [
  ErrorCodeKey,
  ErrorCodeValue,
][];

export const errorCodes = new Map<ErrorCodeKey, ErrorCodeValue>(codes);
