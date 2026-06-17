import type { Query } from 'mongoose';
import { type InferSchemaType, model, Schema } from 'mongoose';
import slugify from 'slugify';

import { handleCustomError } from '../../config/error-codes.config';

const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Tour name is required'],
      unique: true,
      trim: true,
    },

    slug: String,

    summary: {
      type: String,
      trim: true,
      required: [true, 'Tour must have a summary'],
    },

    description: {
      type: String,
      trim: true,
    },

    secret: {
      type: Boolean,
      default: false,
    },

    price: {
      type: Number,
      min: [10, 'Price must be at least 10$'],
    },

    priceDiscount: {
      type: Number,
      min: [1, 'Discount must be at least 1$'],

      validate: {
        validator: function (this, val: number) {
          return (this.price as number) > val;
        },
        message: 'Price discount ({VALUE}) must be less than the price',
      },
    },

    duration: {
      type: Number,
      required: [true, 'Tour must have a duration'],
    },

    maxGroupSize: {
      type: Number,
      required: [true, 'Tour must have a group size'],
    },

    difficulty: {
      type: String,
      required: [true, 'Tour must have a difficulty'],
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    ratings: {
      type: Number,
      default: 4,
      min: [1, 'Rating must be at least 1 star'],
      max: [5, 'Rating must be below 5 stars'],
    },

    imageCover: {
      type: String,
      required: [true, 'Tour must have a cover image'],
    },

    images: [String],

    createdAt: {
      type: Date,
      select: false,
    },

    startDates: [Date],

    // Just to exclude the __v special property
    __v: {
      type: String,
      select: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },

    toObject: {
      virtuals: true,
    },

    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  },
);

tourSchema.virtual('durationWeeks').get(function () {
  // prettier-ignore
  if (this.duration)
    return Math.floor(this.duration / 7);
});

tourSchema.pre('save', function () {
  this.slug = slugify(this.name, { lower: true });
});

tourSchema.pre(/^find/, function (this: Query<Tour, Tour[]>) {
  this.where({ secret: { $ne: true } });
});

tourSchema.pre('aggregate', function () {
  this.pipeline().unshift({
    $match: {
      secret: { $ne: true },
    },
  });
});

tourSchema.post(
  /^find|save/,
  { errorHandler: true },
  function (error, _doc, next) {
    const apiError = handleCustomError(error);
    next(apiError);
  },
);

export type Tour = InferSchemaType<typeof tourSchema>;

export const TourModel = model('Tour', tourSchema);
