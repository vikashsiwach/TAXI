import React, { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Link } from 'react-router-dom'

import LocationInput from '../components/LocationInput'
import ConfirmRide from '../components/ConfirmRide'
import VehiclePanel from '../components/VehiclePanel'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import MapView from '../components/MapView'
import { useRide } from '../context/RideContext'
import { formatDistance, formatDuration } from '../utils/fare'

const Home = () => {
  const {
    pickup,
    setPickup,
    destination,
    setDestination,
    route,
    isCalculating,
    routeError,
  } = useRide()

  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [pickupFocused, setPickupFocused] = useState(false)
  const [destinationFocused, setDestinationFocused] = useState(false)
  const [logoDismissed, setLogoDismissed] = useState(false)

  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  const hideLogo = logoDismissed || pickupFocused || destinationFocused

  const dismissLogo = () => setLogoDismissed(true)

  useEffect(() => {
    if (pickup || destination) setLogoDismissed(true)
  }, [pickup, destination])

  const handlePickupSelect = (locationData) => {
    setPickup(locationData)
    dismissLogo()
    if (destination?.lat) setVehiclePanel(true)
  }

  const handleDestinationSelect = (locationData) => {
    setDestination(locationData)
    dismissLogo()
    if (pickup?.lat) setVehiclePanel(true)
  }

  const handlePickupClear = () => {
    setPickup(null)
    setVehiclePanel(false)
  }

  const handleDestinationClear = () => {
    setDestination(null)
    setVehiclePanel(false)
  }

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, { transform: 'translateY(0)' })
      } else {
        gsap.to(vehiclePanelRef.current, { transform: 'translateY(100%)' })
      }
    },
    [vehiclePanel]
  )

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, { transform: 'translateY(0)' })
      } else {
        gsap.to(confirmRidePanelRef.current, { transform: 'translateY(100%)' })
      }
    },
    [confirmRidePanel]
  )

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, { transform: 'translateY(0)' })
      } else {
        gsap.to(waitingForDriverRef.current, { transform: 'translateY(100%)' })
      }
    },
    [waitingForDriver]
  )

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, { transform: 'translateY(0)' })
      } else {
        gsap.to(vehicleFoundRef.current, { transform: 'translateY(100%)' })
      }
    },
    [vehicleFound]
  )

  return (
    <div className="h-screen relative">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen z-20">
        {!hideLogo && <img className="w-16" src="/taxi_logo.png" alt="" />}
        {hideLogo && <div />}
        <Link
          to="/users/logout"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full shadow ml-auto"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-screen w-screen">
        <MapView pickup={pickup} destination={destination} route={route} />
        {route && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg z-10 text-sm font-medium">
            {formatDistance(route.distance)} · {formatDuration(route.duration)}
          </div>
        )}
        {isCalculating && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg z-10 text-sm">
            Calculating route...
          </div>
        )}
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full pointer-events-none">
        <div className="p-5 bg-white relative pointer-events-auto">
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form className="relative py-3" onSubmit={(e) => e.preventDefault()}>
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <LocationInput
              placeholder="Add a pick-up location"
              selectedLocation={pickup}
              onSelect={handlePickupSelect}
              onClear={handlePickupClear}
              showCurrentLocation
              onFocusChange={(focused) => {
                setPickupFocused(focused)
                if (focused) dismissLogo()
              }}
            />
            <div className="mt-3">
              <LocationInput
                placeholder="Enter your destination"
                selectedLocation={destination}
                onSelect={handleDestinationSelect}
                onClear={handleDestinationClear}
                onFocusChange={(focused) => {
                  setDestinationFocused(focused)
                  if (focused) dismissLogo()
                }}
              />
            </div>
          </form>
          {routeError && <p className="text-red-500 text-sm">{routeError}</p>}
          {route && !vehiclePanel && (
            <button
              onClick={() => setVehiclePanel(true)}
              className="w-full bg-black text-white font-semibold py-3 rounded-lg mt-2"
            >
              Choose Vehicle · {formatDistance(route.distance)}
            </button>
          )}
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14"
      >
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14"
      >
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14"
      >
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-14"
      >
        <WaitingForDriver setwaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  )
}

export default Home
