import type { Query } from 'mongoose';

import { SPECIAL_QUERY_FILTERS } from '../config/constants.config';
import type { Tour } from '../modules/tours/tour.model';
import type { QueryString } from '../schemas/query.schema';

export class APIFeatures {
  private queryObject;

  constructor(
    private queryBuilder: Query<Tour[], Tour>,
    private queryString: QueryString,
  ) {
    this.queryObject = { ...queryString };
    SPECIAL_QUERY_FILTERS.forEach((query) => delete this.queryObject[query]);
  }

  sort() {
    if (this.queryString.sort)
      this.queryBuilder = this.queryBuilder.sort(
        this.queryString.sort.split(',').join(' '),
      );

    // prettier-ignore
    if (!this.queryString.sort)
      this.queryBuilder = this.queryBuilder.sort('-createdAt');

    return this.queryBuilder;
  }
}
