import { injectable } from 'tsyringe';

import { APIFeatures } from '../../utils/api-features';
import type { QueryString } from '../../utils/types';
import { type Tour, TourModel } from './tour.model';

@injectable()
export class TourService {
  async getAllTours(queryObject: QueryString) {
    const features = new APIFeatures(TourModel.find(), queryObject)
      .limit()
      .fields()
      .sort()
      .paginate();

    const tours = await features.query;
    return tours;
  }

  async getTourById(tourId: string, queryObject: QueryString) {
    const features = new APIFeatures(
      TourModel.find({ _id: tourId }),
      queryObject,
    ).fields();

    const tour = (await features.query)[0];

    return tour;
  }

  async tourStats() {
    const tourStats = await TourModel.aggregate([
      {
        $group: {
          _id: null,
          numberOfTours: { $sum: 1 },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
          avgPrice: { $avg: '$price' },
          avgRatings: { $avg: '$ratingsAverage' },
          numRatings: { $sum: '$ratingsQuantity' },
        },
      },
      {
        $sort: {
          price: 1,
        },
      },
    ]);

    return tourStats;
  }

  async createTour(body: Tour) {
    return TourModel.create({
      ...body,
    });
  }
}
