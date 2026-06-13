export class APIError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 500,
    public readonly details: Record<string, unknown> = {},
    public readonly status: 'fail' | 'error' = statusCode < 500
      ? 'fail'
      : 'error',
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}
