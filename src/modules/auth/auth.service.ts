import { injectable } from 'tsyringe';

import { JwtToken } from '../../utils/jwt-token';
import { type User, UserModel } from './auth.model';

@injectable()
export class AuthService {
  signup = async (body: User) => {
    const isEmailAlreadyExist = (await UserModel.findOne({ email: body.email }))
      ?.email;

    // prettier-ignore
    if (isEmailAlreadyExist)
        return false;

    const newUser = await UserModel.create(body);

    const token = await JwtToken.signToken({ id: newUser.id });

    return { token, user: newUser };
  };
}
