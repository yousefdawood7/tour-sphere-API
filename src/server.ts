import './config/db.config';
import 'reflect-metadata';

import { app } from './app';
import { mongoConnect } from './config/db.config';
import { env } from './lib/env';

async function bootstrap() {
  await mongoConnect();

  const server = app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
  });

  process.on('unhandledRejection', (err) => {
    console.error('🚨 Unhandled Rejection at:', err);

    server.close(() => {
      process.exit(1);
    });
  });
}

void bootstrap();
