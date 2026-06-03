import { type InferSchemaType, model, Schema } from 'mongoose';

const tourSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Tour name is required'],
    unique: true,
    trim: true,
  },

  summary: {
    type: String,
    trim: true,
    required: [true, 'Tour must have a description'],
  },

  description: {
    type: String,
    trim: true,
  },

  price: Number,

  priceDiscount: Number,

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
    required: [true, 'You must provide a rating'],
  },

  imageCover: {
    type: String,
    required: [true, 'Tour must have a cover image'],
  },

  images: [String],

  startDates: [Date],

  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

export type Tour = InferSchemaType<typeof tourSchema>;

export const TourModel = model('Tour', tourSchema);
