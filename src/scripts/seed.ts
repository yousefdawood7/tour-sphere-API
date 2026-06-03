import { readFileSync } from 'fs';
import mongoose from 'mongoose';
import path from 'path';

import { env } from '../lib/env';
import { type Tour, TourModel } from '../modules/tours/tour.model';

const toursData = readFileSync(
  path.join(import.meta.dirname, '../../dev-data/data/', 'tours-simple.json'),
  'utf-8',
);

async function main() {
  await mongoConnect();

  await TourModel.deleteMany();
  (await TourModel.create(JSON.parse(toursData))) satisfies Tour;

  console.log('Database seeded successfully ✅');

  process.exit(0);
}

async function mongoConnect() {
  await mongoose.connect(
    env.DATABASE_URL.replace(
      '<PASSWORD>',
      encodeURIComponent(env.DATABASE_PASSWORD),
    ),
    { dbName: 'tour-sphere' },
  );
  console.log('Database connected successfully 🔥');
}

main();
