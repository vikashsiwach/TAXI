import React from 'react'
import { useRide } from '../context/RideContext'
import { formatFare } from '../utils/fare'

const WaitingForDriver = ({ setwaitingForDriver }) => {
  const { pickup, destination, selectedFare } = useRide()

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
        onClick={() => setwaitingForDriver(false)}
      >
        <i className="text-3xl text-gray-600 ri-arrow-down-wide-line"></i>
      </h5>
      <div className="flex items-center justify-between">
        <img
          className="h-12"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
        <div className="text-right">
          <h2 className="text-lg font-medium">Driver</h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">On the way</h4>
          <p className="text-sm text-gray-600">Arriving soon</p>
        </div>
      </div>

      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill text-green-600"></i>
            <div>
              <h3 className="text-lg font-medium">{pickup?.shortName}</h3>
              <p className="text-sm -mt-1 text-gray-600 line-clamp-1">{pickup?.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-2-fill text-red-600"></i>
            <div>
              <h3 className="text-lg font-medium">{destination?.shortName}</h3>
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
    </div>
  )
}

export default WaitingForDriver
