export class APIError extends Error {
  private status: 'fail' | 'error';
  private statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    this.status = statusCode < 500 ? 'fail' : 'error';
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
