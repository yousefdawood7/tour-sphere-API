import { type InferSchemaType, model, Schema } from 'mongoose';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const userSchema = new Schema({
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

  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    select: false,

    validate: {
      validator(this, passwordConfirm: string) {
        return this.password === passwordConfirm;
      },

      message: 'Passwords do not match',
    },
  },
});
export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model('User', userSchema);
