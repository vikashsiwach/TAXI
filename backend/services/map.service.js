const OSRM_URL = 'https://router.project-osrm.org'

async function getRoute(pickup, destination) {
  const { lat: lat1, lng: lng1 } = pickup
  const { lat: lat2, lng: lng2 } = destination

  const url = `${OSRM_URL}/route/v1/driving/${lng1},${lat1};${lng2},${lat2}?overview=full&geometries=geojson`

  const response = await fetch(url)
  if (!response.ok) throw new Error('Routing failed')

  const data = await response.json()
  if (data.code !== 'Ok' || !data.routes?.length) {
    throw new Error('No route found between these locations')
  }

  const route = data.routes[0]
  return {
    distance: Math.round((route.distance / 1000) * 100) / 100,
    duration: Math.round(route.duration / 60),
    coordinates: route.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
  }
}

module.exports = { getRoute }
