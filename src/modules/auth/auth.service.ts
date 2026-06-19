import { injectable } from 'tsyringe';

import { JwtToken } from '../../utils/jwt-token';
import { type User, UserModel } from './auth.model';
import type { LoginSchema } from './auth.schema';

@injectable()
export class AuthService {
  findUser = (email: string) => UserModel.findOne({ email });

  signup = async (body: User) => {
    const email = (await this.findUser(body.email))?.email;

    // prettier-ignore
    if (email)
        return false;

    const newUser = await UserModel.create(body);

    const token = JwtToken.signToken({ id: newUser.id });

    return { token, user: newUser };
  };

  login = async (body: LoginSchema) => {
    const user = await this.findUser(body.email).select('+password');

    if (
      !user?.email ||
      !(await user.verifyPassword(body.password, user?.password))
    )
      return {
        error: true,
        statusCode: 401,
        message: 'Invalid email or password',
      };

    return {
      error: false,
      statusCode: 200,
      message: "You're logged in successfully",
      token: JwtToken.signToken({ id: user.id }),
    };
  };
}
