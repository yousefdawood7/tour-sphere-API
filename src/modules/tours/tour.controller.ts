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

  getTourById = async (req: Request, res: Response) => {
    const tourId = req.params.id as string;

    const tour = await this.tourService.getTourById(tourId, req.query);

    return res.json({
      message: 'success',
      data: {
        tour,
      },
    });
  };

  getTourStats = async (_req: Request, res: Response) => {
    const stats = await this.tourService.tourStats();

    return res.json({
      message: 'success',
      data: {
        stats,
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
