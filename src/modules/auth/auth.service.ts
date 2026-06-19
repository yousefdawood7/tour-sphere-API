import { injectable } from 'tsyringe';

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

    return newUser;
  };
}
