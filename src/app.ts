import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { globalErrorMiddleware } from './middlewares/global-error.middleware';
import authRouter from './modules/auth/auth.routes';
import tourRouter from './modules/tours/tour.routes';
import { APIError } from './utils/api-error';

export const app = express();

app.set('query parser', 'extended'); // to parse nested query string objects

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/tours', tourRouter);
app.use('/auth', authRouter);

app.all('/{*splat}', (req, _res, next) => {
  next(
    new APIError(
      `The requested page (${req.originalUrl}) could not be found`,
      404,
    ),
  );
});

app.use(globalErrorMiddleware);
