import React from 'react'
import { useRide } from '../context/RideContext'
import { VEHICLE_TYPES, formatFare } from '../utils/fare'

const ConfirmRide = ({ setConfirmRidePanel, setVehicleFound }) => {
  const { pickup, destination, selectedVehicle, selectedFare } = useRide()
  const vehicle = VEHICLE_TYPES[selectedVehicle]

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
        onClick={() => setConfirmRidePanel(false)}
      >
        <i className="text-3xl text-gray-600 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="flex justify-center text-2xl font-semibold mb-5">Confirm your Ride</h3>

      <div className="flex gap-2 justify-between flex-col items-center">
        {vehicle && <img className="h-20" src={vehicle.image} alt="" />}
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill text-green-600"></i>
            <div>
              <h3 className="text-lg font-medium">{pickup?.shortName || 'Pickup'}</h3>
              <p className="text-sm -mt-1 text-gray-600 line-clamp-1">{pickup?.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-2-fill text-red-600"></i>
            <div>
              <h3 className="text-lg font-medium">{destination?.shortName || 'Destination'}</h3>
              <p className="text-sm -mt-1 text-gray-600 line-clamp-1">{destination?.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className="text-lg font-medium">{formatFare(selectedFare)}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {vehicle?.name || 'Vehicle'} · Cash
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setVehicleFound(true)
              setConfirmRidePanel(false)
            }}
            className="w-full bg-green-600 text-white font-semibold p-2 rounded-lg mt-5"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmRide
