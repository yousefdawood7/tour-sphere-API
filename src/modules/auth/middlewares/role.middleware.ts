import type { NextFunction, Request, Response } from 'express';

import { ROLE_PERMISSIONS } from '../permissions';

export function middleware(...roles: string[]) {
  return function (req: Request, _res: Response, _next: NextFunction) {
    const isAuthorized = roles.every((role) =>
      ROLE_PERMISSIONS[req.body.user].includes(role),
    );

    console.log(isAuthorized, req.body.user.role);
  };
}
