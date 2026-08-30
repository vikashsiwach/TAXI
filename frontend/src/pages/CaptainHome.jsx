import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import MapView from '../components/MapView'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRide } from '../context/RideContext'
import { getCurrentLocation } from '../services/mapService'

const CaptainHome = () => {
  const { pickup, destination, route, captainLocation, setCaptainLocation } = useRide()
  const [ridePopupPanel, setRidePopupPanel] = useState(true)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)

  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

  useEffect(() => {
    getCurrentLocation()
      .then((coords) => setCaptainLocation(coords))
      .catch(() => {})
  }, [setCaptainLocation])

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, { transform: 'translateY(0)' })
      } else {
        gsap.to(ridePopupPanelRef.current, { transform: 'translateY(100%)' })
      }
    },
    [ridePopupPanel]
  )

  useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, { transform: 'translateY(0)' })
      } else {
        gsap.to(confirmRidePopupPanelRef.current, { transform: 'translateY(100%)' })
      }
    },
    [confirmRidePopupPanel]
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
      <div className="h-3/5">
        <MapView
          pickup={pickup}
          destination={destination}
          route={route}
          captainLocation={captainLocation}
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <RidePopUp
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full z-10 bottom-0 h-screen translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePopUp
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  )
}

export default CaptainHome
