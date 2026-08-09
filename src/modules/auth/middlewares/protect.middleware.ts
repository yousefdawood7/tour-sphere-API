import type { NextFunction, Request, Response } from 'express';

import { APIError } from '../../../utils/api-error';
import { JwtToken, type UserJwtPayload } from '../../../utils/jwt-token';
import { UserModel } from '../auth.model';

export async function protect(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const bearerToken = req.headers.authorization;

  if (!bearerToken || !bearerToken.startsWith('Bearer '))
    throw new APIError('There is no valid authorization header', 401);

  const token = bearerToken.split(' ')[1]!;

  const decoded = JwtToken.verifyToken(token) as UserJwtPayload;

  const currentUser = await UserModel.findById(decoded.id);
  if (!currentUser)
    throw new APIError(
      'The user belonging to this token does no longer exist',
      401,
    );

  if (currentUser.isTokenExpired(decoded.iat!))
    throw new APIError(
      'User recently changed password! Please log in again.',
      401,
    );

  req.body.user = currentUser;
  next();
}
