import type { Request, Response } from 'express';
import { injectable } from 'tsyringe';

@injectable()
export class AuthController {
  signup = (req: Request, res: Response) => {};
}
