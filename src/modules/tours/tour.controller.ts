import type { Request, Response } from 'express';
import { injectable } from 'tsyringe';

import type { QueryFilter } from '../../schemas/query.schema';
import { TourService } from './tour.service';

@injectable()
export class TourController {
  constructor(private readonly tourService: TourService) {}

  getAllTours = async (
    req: Request<unknown, unknown, unknown, QueryFilter>,
    res: Response,
  ) => {
    const tours = await this.tourService.getAllTours(req.query);

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
