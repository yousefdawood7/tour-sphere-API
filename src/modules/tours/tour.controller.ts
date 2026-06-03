import type { Request, Response } from 'express';
import { injectable } from 'tsyringe';

import { TourModel } from './tour.model';
import { TourService } from './tour.service';

@injectable()
export class TourController {
  constructor(private readonly tourService: TourService) {}

  getAllTours = async (req: Request, res: Response) => {
    console.log(req.query);

    const tours = await TourModel.find();

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
