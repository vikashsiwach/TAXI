const NOMINATIM_URL = 'https://nominatim.openstreetmap.org'
const OSRM_URL = 'https://router.project-osrm.org'

export const DEFAULT_CENTER = [23.1815, 79.9864]

let lastSearchTime = 0

async function rateLimitedFetch(url, options = {}) {
  const now = Date.now()
  const wait = Math.max(0, 1100 - (now - lastSearchTime))
  if (wait > 0) await new Promise((r) => setTimeout(r, wait))
  lastSearchTime = Date.now()
  return fetch(url, options)
}

export async function searchLocations(query) {
  if (!query || query.length < 3) return []

  const params = new URLSearchParams({
    q: query,
    format: 'json',
    limit: '6',
    countrycodes: 'in',
    addressdetails: '1',
  })

  const response = await rateLimitedFetch(`${NOMINATIM_URL}/search?${params}`, {
    headers: { 'Accept-Language': 'en' },
  })

  if (!response.ok) throw new Error('Location search failed')

  const data = await response.json()
  return data.map((item) => ({
    displayName: item.display_name,
    lat: parseFloat(item.lat),
    lng: parseFloat(item.lon),
    shortName: item.name || item.display_name.split(',')[0],
  }))
}

export async function getRoute(pickup, destination) {
  const url = `${OSRM_URL}/route/v1/driving/${pickup.lng},${pickup.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`

  const response = await fetch(url)
  if (!response.ok) throw new Error('Routing failed')

  const data = await response.json()
  if (data.code !== 'Ok' || !data.routes?.length) {
    throw new Error('No route found between these locations')
  }

  const route = data.routes[0]
  return {
    distance: route.distance / 1000,
    duration: route.duration / 60,
    coordinates: route.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
  }
}

export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      (error) => reject(error),
      { enableHighAccuracy: true, timeout: 10000 }
    )
  })
}

export async function reverseGeocode(lat, lng) {
  const params = new URLSearchParams({
    lat: lat.toString(),
    lon: lng.toString(),
    format: 'json',
  })

  const response = await rateLimitedFetch(`${NOMINATIM_URL}/reverse?${params}`)
  if (!response.ok) throw new Error('Reverse geocoding failed')

  const data = await response.json()
  return {
    displayName: data.display_name,
    shortName: data.name || data.display_name?.split(',')[0] || 'Current Location',
  }
}
