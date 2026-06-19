import bcrypt from 'bcryptjs';
import {
  type HydratedDocument,
  type InferSchemaType,
  model,
  Schema,
} from 'mongoose';

import { handleCustomError } from '../../config/error-codes.config';
import { env } from '../../lib/env';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const userSchema = new Schema(
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

    avatar: String,

    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
      validate: {
        validator(password: string) {
          const errors: string[] = [];

          if (password.length < 8) {
            errors.push('Password must be at least 8 characters long');
          }

          if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
          }

          if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
          }

          if (!/\d/.test(password)) {
            errors.push('Password must contain at least one number');
          }

          if (errors.length) {
            throw new Error(errors.join(', ')); //! We'll handle that separately in custom error handler
          }

          return true;
        },
      },
    },

    confirmPassword: {
      type: String,
      required: [true, 'Please confirm your password'],
      select: false,

      validate: {
        validator(this, confirmPassword: string) {
          return this.password === confirmPassword;
        },

        message: 'Passwords do not match',
      },
    },

    __v: {
      type: String,
      select: false,
    },
  },
  {
    methods: {
      verifyPassword: (enteredPassword: string, hashedPassword: string) =>
        bcrypt.compare(enteredPassword, hashedPassword),
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

userSchema.post(
  /^(find|save)/,
  { errorHandler: true },
  function (error, _doc, next) {
    const apiError = handleCustomError(error);
    next(apiError);
  },
);

export type User = InferSchemaType<typeof userSchema>;
export type UserDocument = HydratedDocument<User>;

export const UserModel = model('User', userSchema);
