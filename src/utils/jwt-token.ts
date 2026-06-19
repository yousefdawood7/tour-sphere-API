import jwt from 'jsonwebtoken';

import { env } from '../lib/env';

type Payload = {
  [key: string]: string;
};

export abstract class JwtToken {
  static async signToken(payload: Payload) {
    // @ts-expect-error: this env will always be valid expires in time
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
  }

  static async verifyToken(token: string) {
    return jwt.verify(token, env.JWT_SECRET);
  }
}
