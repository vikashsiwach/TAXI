import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import MapView from '../components/MapView'
import { useRide } from '../context/RideContext'
import { getCurrentLocation } from '../services/mapService'
import { formatDistance } from '../utils/fare'

const CaptainRiding = () => {
  const { pickup, destination, route, captainLocation, setCaptainLocation } = useRide()
  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)

  useEffect(() => {
    const watchId = navigator.geolocation?.watchPosition(
      (position) => {
        setCaptainLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      () => {
        getCurrentLocation()
          .then((coords) => setCaptainLocation(coords))
          .catch(() => {})
      },
      { enableHighAccuracy: true }
    )
    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId)
    }
  }, [setCaptainLocation])

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, { transform: 'translateY(0)' })
      } else {
        gsap.to(finishRidePanelRef.current, { transform: 'translateY(100%)' })
      }
    },
    [finishRidePanel]
  )

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen z-20">
        <img className="w-16" src="/taxi_logo.png" alt="" />
        <Link
          to="/captain-login"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full shadow"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-4/5">
        <MapView
          pickup={pickup}
          destination={destination}
          route={route}
          captainLocation={captainLocation}
        />
      </div>

      <div
        onClick={() => setFinishRidePanel(true)}
        className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10"
      >
        <h5 className="p-1 text-center w-[93%] absolute top-0 left-1/2 -translate-x-1/2 cursor-pointer">
          <i className="text-3xl text-gray-600 ri-arrow-down-wide-line"></i>
        </h5>
        <h4 className="text-xl font-semibold">{formatDistance(route?.distance)} trip</h4>
        <button className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed w-full bottom-0 translate-y-full bg-white px-3 py-10 pt-12 z-30"
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  )
}

export default CaptainRiding
