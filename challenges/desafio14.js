db.trips.aggregate([{
  $addFields: {
    tripDuration: {
      $divide: [{
        $subtract: ["$stopTime", "$startTime"],
      }, 1000 * 60],
    },
  },
},
{
  $group: {
    _id: "$bikeid",
    avgDuration: {
      $avg: "$tripDuration",
    },
  },
},
{
  $project: {
    _id: 0,
    bikeId: "$_id",
    duracaoMedia: {
      $ceil: ["$avgDuration"],
    },
  },
},
{
  $sort: {
    duracaoMedia: -1,
  },
},
{
  $limit: 5,
},
]);
