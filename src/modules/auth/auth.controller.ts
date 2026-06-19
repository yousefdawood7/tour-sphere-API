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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __v, password, ...serializedUser } = newUser.user.toJSON();

    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      token: newUser.token,
      statusCode: 201,

      details: {
        user: serializedUser,
      },
    });
  };
}
