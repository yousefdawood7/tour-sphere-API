export class APIError extends Error {
  public isOperational = true;
  public status: 'fail' | 'error';

  constructor(
    public readonly message: string,
    public readonly statusCode: number,
    public readonly details: Record<string, unknown> = {},
  ) {
    super(message);

    this.status = this.statusCode < 500 ? 'fail' : 'fail';
    Error.captureStackTrace(this, this.constructor);
  }
}
