import React from 'react'
import { Link } from 'react-router-dom'
import MapView from '../components/MapView'
import { useRide } from '../context/RideContext'
import { VEHICLE_TYPES, formatFare } from '../utils/fare'

const Riding = () => {
  const { pickup, destination, route, selectedVehicle, selectedFare, captainLocation } =
    useRide()
  const vehicle = VEHICLE_TYPES[selectedVehicle]

  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full z-20 shadow"
      >
        <i className="text-lg font-medium ri-home-5-line"></i>
      </Link>
      <div className="h-1/2">
        <MapView
          pickup={pickup}
          destination={destination}
          route={route}
          captainLocation={captainLocation}
        />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-12"
            src={vehicle?.image || 'https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg'}
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">Your Driver</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">On the way</h4>
            <p className="text-sm text-gray-600">{vehicle?.name || 'Vehicle'}</p>
          </div>
        </div>

        <div className="flex gap-2 justify-between flex-col items-center">
          <div className="w-full mt-5">
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
                <p className="text-sm -mt-1 text-gray-600">Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full bg-green-600 text-white font-semibold p-2 rounded-lg mt-5">
          Make a payment
        </button>
      </div>
    </div>
  )
}

export default Riding
