import { Router } from 'express';
import { container } from 'tsyringe';

import { zodMiddleware } from '../../middlewares/zod-validation.middleware';
import { TourController } from './tour.controller';
import { tourSchema } from './tour.schema';

const router = Router();

const tourController = container.resolve(TourController);

router.route('/').post(zodMiddleware(tourSchema), tourController.createTour);

export default router;
