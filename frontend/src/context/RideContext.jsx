import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { getRoute } from '../services/mapService'
import { calculateAllFares } from '../utils/fare'

const RideContext = createContext(null)
const RIDE_STORAGE_KEY = 'taxi_ride_state'

export function RideProvider({ children }) {
  const [pickup, setPickup] = useState(null)
  const [destination, setDestination] = useState(null)
  const [route, setRoute] = useState(null)
  const [fares, setFares] = useState({})
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [activeField, setActiveField] = useState('pickup')
  const [captainLocation, setCaptainLocation] = useState(null)
  const [routeError, setRouteError] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem(RIDE_STORAGE_KEY)
    if (!saved) return
    try {
      const parsed = JSON.parse(saved)
      if (parsed.pickup) setPickup(parsed.pickup)
      if (parsed.destination) setDestination(parsed.destination)
      if (parsed.selectedVehicle) setSelectedVehicle(parsed.selectedVehicle)
      if (parsed.route) setRoute(parsed.route)
      if (parsed.fares) setFares(parsed.fares)
    } catch {
      localStorage.removeItem(RIDE_STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      RIDE_STORAGE_KEY,
      JSON.stringify({ pickup, destination, selectedVehicle, route, fares })
    )
  }, [pickup, destination, selectedVehicle, route, fares])

  const calculateRouteAndFares = useCallback(async () => {
    if (!pickup?.lat || !destination?.lat) {
      setRoute(null)
      setFares({})
      setRouteError(null)
      return
    }

    setIsCalculating(true)
    setRouteError(null)
    try {
      const routeData = await getRoute(pickup, destination)
      setRoute(routeData)
      setFares(calculateAllFares(routeData.distance))
    } catch (error) {
      setRoute(null)
      setFares({})
      setRouteError(error.message || 'Could not calculate route')
    } finally {
      setIsCalculating(false)
    }
  }, [pickup, destination])

  useEffect(() => {
    calculateRouteAndFares()
  }, [calculateRouteAndFares])

  const selectedFare = selectedVehicle ? fares[selectedVehicle] : null

  return (
    <RideContext.Provider
      value={{
        pickup,
        setPickup,
        destination,
        setDestination,
        route,
        fares,
        selectedVehicle,
        setSelectedVehicle,
        selectedFare,
        isCalculating,
        activeField,
        setActiveField,
        captainLocation,
        setCaptainLocation,
        routeError,
        calculateRouteAndFares,
      }}
    >
      {children}
    </RideContext.Provider>
  )
}

export function useRide() {
  const context = useContext(RideContext)
  if (!context) {
    throw new Error('useRide must be used within RideProvider')
  }
  return context
}
