import React, { useState, useEffect, useRef } from 'react'
import { searchLocations, getCurrentLocation, reverseGeocode } from '../services/mapService'
import { useRide } from '../context/RideContext'

const LocationSearchPanel = ({ setPanelOpen, setVehiclePanel, searchQuery }) => {
  const { pickup, setPickup, destination, setDestination, activeField } = useRide()
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [isLocating, setIsLocating] = useState(false)
  const debounceRef = useRef(null)

  useEffect(() => {
    if (!searchQuery || searchQuery.length < 3) {
      setResults([])
      return
    }

    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setIsSearching(true)
      try {
        const locations = await searchLocations(searchQuery)
        setResults(locations)
      } catch {
        setResults([])
      } finally {
        setIsSearching(false)
      }
    }, 500)

    return () => clearTimeout(debounceRef.current)
  }, [searchQuery])

  const selectLocation = (location) => {
    const locationData = {
      address: location.displayName,
      shortName: location.shortName,
      lat: location.lat,
      lng: location.lng,
    }

    if (activeField === 'pickup') {
      setPickup(locationData)
    } else {
      setDestination(locationData)
    }

    setPanelOpen(false)

    const otherLocation = activeField === 'pickup' ? destination : pickup
    if (otherLocation?.lat) {
      setVehiclePanel(true)
    }
  }

  const handleUseCurrentLocation = async () => {
    setIsLocating(true)
    try {
      const coords = await getCurrentLocation()
      const address = await reverseGeocode(coords.lat, coords.lng)
      selectLocation({
        displayName: address.displayName,
        shortName: address.shortName,
        lat: coords.lat,
        lng: coords.lng,
      })
    } catch {
      alert('Could not get your location. Please allow location access or search manually.')
    } finally {
      setIsLocating(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleUseCurrentLocation}
        disabled={isLocating}
        className="flex gap-4 p-3 items-center hover:border-black border-2 border-gray-100 rounded-2xl my-2 justify-start w-full"
      >
        <h2 className="bg-blue-100 text-blue-600 h-8 flex items-center justify-center w-12 rounded-full">
          <i className="ri-crosshair-2-line"></i>
        </h2>
        <h4 className="font-medium text-blue-600">
          {isLocating ? 'Getting location...' : 'Use current location'}
        </h4>
      </button>

      {isSearching && (
        <p className="text-gray-500 text-sm py-2">Searching locations...</p>
      )}

      {!isSearching && searchQuery?.length >= 3 && results.length === 0 && (
        <p className="text-gray-500 text-sm py-2">No locations found. Try a different search.</p>
      )}

      {results.map((location, idx) => (
        <div
          key={idx}
          onClick={() => selectLocation(location)}
          className="flex gap-4 p-3 items-center hover:border-black border-2 border-gray-100 rounded-2xl my-2 justify-start cursor-pointer"
        >
          <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
            <i className="ri-map-pin-line"></i>
          </h2>
          <div>
            <h4 className="font-medium">{location.shortName}</h4>
            <p className="text-xs text-gray-500 line-clamp-1">{location.displayName}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LocationSearchPanel
