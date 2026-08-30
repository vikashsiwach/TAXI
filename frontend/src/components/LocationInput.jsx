import React, { useState, useEffect, useRef } from 'react'
import { searchLocations, getCurrentLocation, reverseGeocode } from '../services/mapService'

const LocationInput = ({
  placeholder,
  selectedLocation,
  onSelect,
  onClear,
  showCurrentLocation = false,
  onFocusChange,
}) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isLocating, setIsLocating] = useState(false)
  const debounceRef = useRef(null)

  useEffect(() => {
    if (!isFocused || !query || query.length < 3) {
      setResults([])
      return
    }

    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setIsSearching(true)
      try {
        const locations = await searchLocations(query)
        setResults(locations)
      } catch {
        setResults([])
      } finally {
        setIsSearching(false)
      }
    }, 500)

    return () => clearTimeout(debounceRef.current)
  }, [query, isFocused])

  const selectLocation = (location) => {
    onSelect({
      address: location.displayName,
      shortName: location.shortName,
      lat: location.lat,
      lng: location.lng,
    })
    setQuery(location.shortName || location.displayName)
    setResults([])
    setIsFocused(false)
    onFocusChange?.(false)
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

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    if (!value.trim()) {
      onClear?.()
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
    onFocusChange?.(true)
    setQuery(selectedLocation?.shortName || selectedLocation?.address || '')
  }

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false)
      onFocusChange?.(false)
      setResults([])
      if (!query.trim()) {
        setQuery('')
      }
    }, 200)
  }

  const displayValue = isFocused
    ? query
    : selectedLocation?.shortName || selectedLocation?.address || ''

  const showDropdown = isFocused && (showCurrentLocation || isSearching || results.length > 0 || query.length >= 3)

  return (
    <div className="relative">
      <input
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
        type="text"
        placeholder={placeholder}
        autoComplete="off"
      />

      {showDropdown && (
        <div className="absolute bottom-full left-0 right-0 mb-1 z-50 bg-white rounded-xl shadow-lg border border-gray-100 max-h-52 overflow-y-auto">
          {showCurrentLocation && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleUseCurrentLocation}
              disabled={isLocating}
              className="flex gap-3 p-3 items-center hover:bg-gray-50 w-full text-left border-b border-gray-100"
            >
              <span className="bg-blue-100 text-blue-600 h-8 w-8 flex items-center justify-center rounded-full shrink-0">
                <i className="ri-crosshair-2-line"></i>
              </span>
              <span className="font-medium text-blue-600 text-sm">
                {isLocating ? 'Getting location...' : 'Use current location'}
              </span>
            </button>
          )}

          {isSearching && (
            <p className="text-gray-500 text-sm p-3">Searching locations...</p>
          )}

          {!isSearching && query.length >= 3 && results.length === 0 && (
            <p className="text-gray-500 text-sm p-3">No locations found.</p>
          )}

          {results.map((location, idx) => (
            <button
              key={idx}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => selectLocation(location)}
              className="flex gap-3 p-3 items-center hover:bg-gray-50 w-full text-left border-b border-gray-50 last:border-0"
            >
              <span className="bg-[#eee] h-8 w-8 flex items-center justify-center rounded-full shrink-0">
                <i className="ri-map-pin-line"></i>
              </span>
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{location.shortName}</p>
                <p className="text-xs text-gray-500 truncate">{location.displayName}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LocationInput
