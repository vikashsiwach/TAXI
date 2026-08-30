import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRide } from '../context/RideContext'
import { formatFare, formatDistance } from '../utils/fare'

const ConfirmRidePopUp = ({ setConfirmRidePopupPanel, setRidePopupPanel }) => {
  const [otp, setOtp] = useState('')
  const { pickup, destination, selectedFare, route } = useRide()

  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
        onClick={() => setConfirmRidePopupPanel(false)}
      >
        <i className="text-3xl text-gray-600 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="flex justify-center text-2xl font-semibold mb-5">Confirm Trip!</h3>

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
          <div className="mt-6 w-full">
            <form onSubmit={submitHandler}>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="bg-[#eee] px-6 py-4 font-mono mb-5 text-lg rounded-lg w-full mt-3"
                type="text"
                placeholder="Enter OTP"
              />
              <Link
                to="/captain-riding"
                className="bg-green-600 text-lg w-full block text-center text-white font-semibold p-2 px-10 rounded-lg"
              >
                Confirm
              </Link>
              <button
                type="button"
                onClick={() => {
                  setConfirmRidePopupPanel(false)
                  setRidePopupPanel(false)
                }}
                className="mt-2 w-full bg-red-600 text-white text-lg font-semibold p-2 px-10 rounded-lg"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmRidePopUp
