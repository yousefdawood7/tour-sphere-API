import { APIError } from '../utils/api-error';

type ErrorCodeKey = string | number;

type ErrorCodeValue = (
  errorMsg: string,
  details?: Record<string, unknown>,
) => APIError;

const codes = [
  [
    'ValidationError',
    (errorMsg, details) => new APIError(errorMsg, 400, details),
  ],
] as const satisfies [ErrorCodeKey, ErrorCodeValue][];

export const errorCodes = new Map<ErrorCodeKey, ErrorCodeValue>(codes);
