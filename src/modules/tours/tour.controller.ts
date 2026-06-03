import type { Request, Response } from 'express';
import { injectable } from 'tsyringe';

import type { QueryString } from '../../schemas/query.schema';
import { APIFeatures } from '../../utils/api-features';
import { TourModel } from './tour.model';
import { TourService } from './tour.service';

@injectable()
export class TourController {
  constructor(private readonly tourService: TourService) {}

  getAllTours = async (
    req: Request<unknown, unknown, unknown, QueryString>,
    res: Response,
  ) => {
    const query = new APIFeatures(TourModel.find(), req.query).sort();
    const tours = await query;

    res.json({
      message: 'success',
      data: {
        tours,
      },
    });
  };

  createTour = async (req: Request, res: Response) => {
    const createdTour = await this.tourService.createTour(req.body);
    return res.status(201).json({
      status: 'success',
      data: { tour: createdTour },
    });
  };
}
