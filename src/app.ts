import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

export const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (_req, res) => {
  res.send('Welcome to the TourSphere API!');
});
