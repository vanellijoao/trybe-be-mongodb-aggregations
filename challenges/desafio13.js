db.trips.aggregate([{
  $match: {
    startTime: {
      $gte: ISODate("2016-03-10T00:00:00Z"),
      $lt: ISODate("2016-03-10T23:59:59Z"),
    },
  },
},
{
  $addFields: {
    duration: {
      $divide: [{
        $subtract: ["$stopTime", "$startTime"],
      }, 1000 * 60],
    },
  },
},
{
  $group: {
    _id: null,
    avgDuration: {
      $avg: "$duration",
    },
  },
},
{
  $project: {
    _id: 0,
    duracaoMediaEmMinutos: {
      $ceil: "$avgDuration",
    },
  },
},
]);
