import { Router } from 'express';
import { container } from 'tsyringe';

import { zodMiddleware } from '../../middlewares/zod-validation.middleware';
import { queryFilterSchema } from '../../schemas/query.schema';
import { TourController } from './tour.controller';
import { tourParamSchema, tourSchema } from './tour.schema';

const router = Router();

const tourController = container.resolve(TourController);

router
  .route('/')
  .get(zodMiddleware(queryFilterSchema, 'query'), tourController.getAllTours)
  .post(zodMiddleware(tourSchema), tourController.createTour);

router
  .route('/:id')
  .get(zodMiddleware(tourParamSchema), tourController.getTourById);

export default router;
