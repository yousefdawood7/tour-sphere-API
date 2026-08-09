import bcrypt from 'bcryptjs';
import { type HydratedDocument, type Model, model, Schema } from 'mongoose';

import { env } from '../../lib/env';
import { ROLE_PERMISSIONS } from './permissions';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

type User = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  role: keyof typeof ROLE_PERMISSIONS;
  avatar?: string;
  changePasswordAt?: Date;

  __v?: number;
};

type UserMethods = {
  verifyPassword(
    enteredPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isTokenExpired(iat: number): boolean;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type UserModel = Model<User, {}, UserMethods>;

export const userSchema = new Schema<User, UserModel, UserMethods>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [emailRegex, 'Please provide a valid email address'],
    },

    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      lowercase: true,
      minLength: [3, 'Name must be at least 3 characters long'],
    },

    role: {
      type: String,
      enum: [...Object.keys(ROLE_PERMISSIONS)],
      default: 'user' as keyof typeof ROLE_PERMISSIONS,
    },

    avatar: String,

    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
      validate: {
        validator(password: string) {
          const errors: string[] = [];

          if (password.length < 8)
            errors.push('Password must be at least 8 characters long');

          if (!/[A-Z]/.test(password))
            errors.push('Password must contain at least one uppercase letter');

          if (!/[a-z]/.test(password))
            errors.push('Password must contain at least one lowercase letter');

          if (!/\d/.test(password))
            errors.push('Password must contain at least one number');

          // prettier-ignore
          if (errors.length)
            throw new Error(errors.join(', ')); //! We'll handle that separately in custom error handler

          return true;
        },
      },
    },

    confirmPassword: {
      type: String,
      required: [true, 'Please confirm your password'],
      select: false,

      validate: {
        validator(confirmPassword: string) {
          const doc = this as UserDocument;
          return doc.password === confirmPassword;
        },

        message: 'Passwords do not match',
      },
    },

    changePasswordAt: Date,

    __v: {
      type: Number,
      select: false,
    },
  },
  {
    methods: {
      verifyPassword: (enteredPassword: string, hashedPassword: string) =>
        bcrypt.compare(enteredPassword, hashedPassword),

      isTokenExpired: function (issuedAtToken: number) {
        // prettier-ignore
        if (!this.changePasswordAt)
          return false;

        return issuedAtToken < this.changePasswordAt.getTime() / 1000;
      },
    },
  },
);

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const hashedPassword = await bcrypt.hash(this.password, env.BCRYPT_ROUNDS);
    this.password = hashedPassword;

    // @ts-expect-error: this for mongoose cause if we add undefined for a property it won't be saved to the database
    this.confirmPassword = undefined;
  }
});

export type UserDocument = HydratedDocument<User, UserMethods>;

export const UserModel = model('User', userSchema);
