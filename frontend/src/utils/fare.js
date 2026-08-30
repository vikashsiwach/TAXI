export const VEHICLE_TYPES = {
  car: {
    id: 'car',
    name: 'UberGo',
    capacity: 4,
    baseFare: 40,
    perKm: 12,
    minFare: 50,
    description: 'Affordable, compact rides',
    image: 'https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg',
  },
  moto: {
    id: 'moto',
    name: 'Moto',
    capacity: 1,
    baseFare: 20,
    perKm: 5,
    minFare: 30,
    description: 'Affordable motorcycle rides',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVjRAoYVgWlss_HyVwOUPTcZdzRvnPNNUg7w&s',
  },
  auto: {
    id: 'auto',
    name: 'Auto',
    capacity: 3,
    baseFare: 25,
    perKm: 8,
    minFare: 35,
    description: 'Affordable Auto rides',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6o89EzpWQuyHlR4xcLXzYQ3W3nifSnCHsCA&s',
  },
}

export function calculateFare(vehicleType, distanceKm) {
  const vehicle = VEHICLE_TYPES[vehicleType]
  if (!vehicle || !distanceKm) return 0
  const fare = vehicle.baseFare + vehicle.perKm * distanceKm
  return Math.max(fare, vehicle.minFare)
}

export function calculateAllFares(distanceKm) {
  return Object.keys(VEHICLE_TYPES).reduce((acc, type) => {
    acc[type] = calculateFare(type, distanceKm)
    return acc
  }, {})
}

export function formatFare(amount) {
  if (!amount) return '₹0.00'
  return `₹${amount.toFixed(2)}`
}

export function formatDistance(km) {
  if (!km) return '0 KM'
  if (km < 1) return `${Math.round(km * 1000)} m`
  return `${km.toFixed(1)} KM`
}

export function formatDuration(minutes) {
  if (!minutes) return '0 mins'
  if (minutes < 1) return '< 1 min'
  return `${Math.round(minutes)} mins`
}
