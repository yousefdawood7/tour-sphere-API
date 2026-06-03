import type { Query } from 'mongoose';

import { SPECIAL_QUERY_FILTERS } from '../config/constants.config';
import type { Tour } from '../modules/tours/tour.model';
import type { QueryString } from '../schemas/query.schema';
import { splitCommas } from './split-commas';

export class APIFeatures {
  private queryObject;

  constructor(
    private queryBuilder: Query<Tour[], Tour>,
    private queryString: QueryString,
  ) {
    this.queryObject = { ...queryString };
    SPECIAL_QUERY_FILTERS.forEach((query) => delete this.queryObject[query]);

    // prettier-ignore
    if (!this.queryString.sort)
      this.queryBuilder = this.queryBuilder.sort('-createdAt');
  }

  fields() {
    if (this.queryString.fields)
      this.queryBuilder.select(splitCommas(this.queryString.fields));

    return this.queryBuilder;
  }

  sort() {
    if (this.queryString.sort)
      this.queryBuilder = this.queryBuilder.sort(
        splitCommas(this.queryString.sort),
      );

    return this.queryBuilder;
  }
}
