import type { Request, Response } from 'express';
import { injectable } from 'tsyringe';

import { TourService } from './tour.service';

@injectable()
export class TourController {
  constructor(private readonly tourService: TourService) {}
  createTour = async (req: Request, res: Response) => {
    const createdTour = await this.tourService.createTour(req.body);
    return res.json({
      status: 'success',
      data: { tour: createdTour },
    });
  };
}
