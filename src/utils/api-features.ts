import type { Query } from 'mongoose';

import { DEFAULTS, SPECIAL_QUERY_FILTERS } from '../config/constants.config';
import type { Tour } from '../modules/tours/tour.model';
import type { QueryString } from '../schemas/query.schema';
import { splitCommas } from './split-commas';

export class APIFeatures {
  private queryObject: Record<string, unknown>;

  constructor(
    private queryBuilder: Query<Tour[], Tour>,
    private queryString: QueryString,
  ) {
    this.queryObject = { ...queryString };
    SPECIAL_QUERY_FILTERS.forEach((query) => delete this.queryObject[query]);

    this.queryObject = JSON.parse(
      JSON.stringify(this.queryObject).replace(
        /\b(gt|gte|lt|lte)\b/g,
        (match) => `$${match}`,
      ),
    );

    // prettier-ignore
    if (!this.queryString.sort)
      this.queryBuilder = this.queryBuilder.sort('-createdAt');

    this.queryBuilder = this.queryBuilder.find(this.queryObject);
  }

  fields() {
    if (this.queryString.fields)
      this.queryBuilder.select(splitCommas(this.queryString.fields));

    return this;
  }

  sort() {
    if (this.queryString.sort)
      this.queryBuilder = this.queryBuilder.sort(
        splitCommas(this.queryString.sort),
      );

    return this;
  }

  paginate() {
    const page = this.queryString.page || DEFAULTS.PAGE;
    const limit = this.queryString.limit || DEFAULTS.LIMIT;
    const skip = (page - 1) * limit;

    this.queryBuilder = this.queryBuilder.skip(skip).limit(limit);

    return this;
  }

  get query() {
    return this.queryBuilder;
  }
}
