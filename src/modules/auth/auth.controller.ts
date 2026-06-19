import type { NextFunction, Request, Response } from 'express';
import { injectable } from 'tsyringe';

import { APIError } from '../../utils/api-error';
import { AuthService } from './auth.service';

@injectable()
export class AuthController {
  constructor(private authService: AuthService) {}

  signup = async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await this.authService.signup(req.body);

    // prettier-ignore
    if (!newUser)
      return next(new APIError('Email already exist', 409));

    res.status(201).json({
      status: 'success',
      statusCode: 201,

      details: {
        user: newUser,
      },
    });
  };
}
