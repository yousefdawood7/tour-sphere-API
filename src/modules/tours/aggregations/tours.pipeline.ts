export const toursSummaryPipeline = [
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
] as const;

export const busiestToursPipeline = (year: number) =>
  [
    {
      $unwind: {
        path: '$startDates',
      },
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: {
          month: {
            $month: '$startDates',
          },
        },
        numberOfTours: {
          $sum: 1,
        },
        tours: {
          $push: '$name',
        },
      },
    },
    {
      $set: {
        month: '$_id.month',
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        month: -1,
      },
    },
  ] as const;
