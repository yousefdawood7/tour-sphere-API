import { injectable } from 'tsyringe';

import { type Tour, TourModel } from './tour.model';

@injectable()
export class TourService {
  async createTour(body: Tour) {
    return TourModel.create({
      ...body,
    });
  }
}
