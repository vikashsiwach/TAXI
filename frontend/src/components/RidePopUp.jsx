import React from 'react'
import { useRide } from '../context/RideContext'
import { formatFare, formatDistance } from '../utils/fare'

const RidePopUp = ({ setRidePopupPanel, setConfirmRidePopupPanel }) => {
  const { pickup, destination, selectedFare, route } = useRide()

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
        onClick={() => setRidePopupPanel(false)}
      >
        <i className="text-3xl text-gray-600 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="flex justify-center text-2xl font-semibold mb-5">New Ride Available!</h3>

      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-12 rounded-full object-cover w-12"
            src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium">Passenger</h2>
        </div>
        <h5 className="text-lg font-semibold">{formatDistance(route?.distance)}</h5>
      </div>

      <div className="flex gap-2 justify-between flex-col items-center">
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
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
          <div className="mt-5 w-full">
            <button
              onClick={() => setConfirmRidePopupPanel(true)}
              className="bg-green-600 w-full text-white font-semibold p-2 px-10 rounded-lg"
            >
              Accept
            </button>
            <button
              onClick={() => setRidePopupPanel(false)}
              className="mt-2 w-full bg-gray-300 text-gray-700 font-semibold p-2 px-10 rounded-lg"
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RidePopUp
