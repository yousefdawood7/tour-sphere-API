import mongoose from 'mongoose';

import { env } from '../lib/env';

export async function mongoConnect() {
  await mongoose.connect(
    env.DATABASE_URL.replace(
      '<PASSWORD>',
      encodeURIComponent(env.DATABASE_PASSWORD),
    ),
    { dbName: 'tour-sphere' },
  );
  console.log('Database connected successfully');
}
