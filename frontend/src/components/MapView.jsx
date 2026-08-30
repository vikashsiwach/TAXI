import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import { DEFAULT_CENTER } from '../services/mapService'
import 'leaflet/dist/leaflet.css'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const pickupIcon = L.divIcon({
  className: '',
  html: '<div style="background:#22c55e;width:14px;height:14px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

const destinationIcon = L.divIcon({
  className: '',
  html: '<div style="background:#ef4444;width:14px;height:14px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

const captainIcon = L.divIcon({
  className: '',
  html: '<div style="background:#3b82f6;width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})

function MapBounds({ pickup, destination, route, captainLocation }) {
  const map = useMap()

  useEffect(() => {
    const points = []
    if (pickup?.lat) points.push([pickup.lat, pickup.lng])
    if (destination?.lat) points.push([destination.lat, destination.lng])
    if (captainLocation?.lat) points.push([captainLocation.lat, captainLocation.lng])
    if (route?.coordinates?.length) points.push(...route.coordinates)

    if (points.length === 0) {
      map.setView(DEFAULT_CENTER, 13)
      return
    }
    if (points.length === 1) {
      map.setView(points[0], 15)
      return
    }
    map.fitBounds(points, { padding: [50, 50] })
  }, [map, pickup, destination, route, captainLocation])

  return null
}

const MapView = ({
  pickup,
  destination,
  route,
  captainLocation,
  className = 'h-full w-full',
  interactive = true,
}) => {
  const center = pickup?.lat ? [pickup.lat, pickup.lng] : DEFAULT_CENTER

  return (
    <div className={className}>
      <MapContainer
        center={center}
        zoom={13}
        className="h-full w-full z-0"
        zoomControl={interactive}
        dragging={interactive}
        scrollWheelZoom={interactive}
        doubleClickZoom={interactive}
        touchZoom={interactive}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapBounds
          pickup={pickup}
          destination={destination}
          route={route}
          captainLocation={captainLocation}
        />
        {pickup?.lat && <Marker position={[pickup.lat, pickup.lng]} icon={pickupIcon} />}
        {destination?.lat && (
          <Marker position={[destination.lat, destination.lng]} icon={destinationIcon} />
        )}
        {captainLocation?.lat && (
          <Marker position={[captainLocation.lat, captainLocation.lng]} icon={captainIcon} />
        )}
        {route?.coordinates?.length > 0 && (
          <Polyline positions={route.coordinates} color="#2563eb" weight={5} opacity={0.8} />
        )}
      </MapContainer>
    </div>
  )
}

export default MapView
