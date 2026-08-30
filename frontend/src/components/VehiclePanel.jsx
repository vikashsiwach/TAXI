import React from 'react'
import { useRide } from '../context/RideContext'
import { VEHICLE_TYPES, formatFare, formatDuration } from '../utils/fare'

const VehiclePanel = ({ setConfirmRidePanel, setVehiclePanel }) => {
  const { fares, route, setSelectedVehicle } = useRide()

  const selectVehicle = (type) => {
    setSelectedVehicle(type)
    setConfirmRidePanel(true)
  }

  return (
    <div className="relative">
      <h5
        className="p-1 text-center w-fit absolute -top-12 left-1/2 -translate-x-1/2 z-20"
        onClick={() => setVehiclePanel(false)}
      >
        <i className="text-3xl text-gray-600 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="flex items-center text-2xl font-semibold mb-2">Choose a Vehicle</h3>
      {route && (
        <p className="text-sm text-gray-500 mb-4">
          {route.distance.toFixed(1)} KM · {formatDuration(route.duration)} trip
        </p>
      )}

      {Object.values(VEHICLE_TYPES).map((vehicle) => (
        <div
          key={vehicle.id}
          onClick={() => selectVehicle(vehicle.id)}
          className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between cursor-pointer"
        >
          <img src={vehicle.image} alt="" className="h-10" />
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-base">
              {vehicle.name}{' '}
              <span>
                <i className="ri-group-line"></i>
                {vehicle.capacity}
              </span>
            </h4>
            <h5 className="font-medium text-sm">{formatDuration(route?.duration)} trip</h5>
            <p className="font-normal text-xs text-gray-600">{vehicle.description}</p>
          </div>
          <h2 className="text-lg font-semibold">{formatFare(fares[vehicle.id])}</h2>
        </div>
      ))}
    </div>
  )
}

export default VehiclePanel
