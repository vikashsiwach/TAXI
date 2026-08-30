const VEHICLE_TYPES = {
  car: { baseFare: 40, perKm: 12, minFare: 50 },
  moto: { baseFare: 20, perKm: 5, minFare: 30 },
  auto: { baseFare: 25, perKm: 8, minFare: 35 },
}

function calculateFare(vehicleType, distanceKm) {
  const vehicle = VEHICLE_TYPES[vehicleType]
  if (!vehicle || !distanceKm) return 0
  return Math.max(vehicle.baseFare + vehicle.perKm * distanceKm, vehicle.minFare)
}

function calculateAllFares(distanceKm) {
  return Object.keys(VEHICLE_TYPES).reduce((acc, type) => {
    acc[type] = Math.round(calculateFare(type, distanceKm) * 100) / 100
    return acc
  }, {})
}

module.exports = { calculateFare, calculateAllFares, VEHICLE_TYPES }
