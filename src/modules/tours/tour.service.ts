import { injectable } from 'tsyringe';

import { APIFeatures } from '../../utils/api-features';
import type { QueryString } from '../../utils/types';
import { type Tour, TourModel } from './tour.model';

@injectable()
export class TourService {
  async getAllTours(queryObject: QueryString) {
    const features = new APIFeatures(TourModel.find(), queryObject)
      .fields()
      .sort()
      .paginate();

    const tours = await features.query;
    return tours;
  }

  async createTour(body: Tour) {
    return TourModel.create({
      ...body,
    });
  }
}
