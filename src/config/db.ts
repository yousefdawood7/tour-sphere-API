import mongoose from 'mongoose';

import { env } from '../lib/env';

async function main() {
  await mongoose.connect(
    env.DATABASE_URL.replace(
      '<PASSWORD>',
      encodeURIComponent(env.DATABASE_PASSWORD),
    ),
  );

  console.log('Database connected successfully');
}

void main().catch((err) => {
  console.log('Something went wrong: ', err);
});
