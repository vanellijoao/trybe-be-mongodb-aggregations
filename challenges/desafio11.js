db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      sumTrips: { $sum: 1 },
    },
  },
  {
    $project: { _id: 0, diaDaSemana: "$_id", total: "$sumTrips" },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
