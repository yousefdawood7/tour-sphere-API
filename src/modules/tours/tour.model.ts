import { type InferSchemaType, model, Schema } from 'mongoose';

export const tourSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Tour name is required'],
    unique: true,
  },

  ratings: {
    type: Number,
    required: [true, 'You must provide a rating'],
  },

  price: Number,
});

export type Tour = InferSchemaType<typeof tourSchema>;

export const TourModel = model('Tour', tourSchema);
