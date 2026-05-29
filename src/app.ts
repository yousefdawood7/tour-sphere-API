import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import tourRouter from './modules/tours/tour.routes';

export const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/tours', tourRouter);
