import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Link } from 'react-router-dom'

import LocationSearchPanel from '../components/LocationSearchPanel'
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
    destination,
    route,
    isCalculating,
    routeError,
    setActiveField,
  } = useRide()

  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, { height: '70%', padding: 24 })
        gsap.to(panelCloseRef.current, { opacity: 1 })
      } else {
        gsap.to(panelRef.current, { height: '0%', padding: 0 })
        gsap.to(panelCloseRef.current, { opacity: 0 })
      }
    },
    [panelOpen]
  )

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

  const openSearch = (field) => {
    setActiveField(field)
    setSearchQuery(field === 'pickup' ? pickup?.address || '' : destination?.address || '')
    setPanelOpen(true)
  }

  return (
    <div className="h-screen relative">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen z-20">
        <img className="w-16" src="/taxi_logo.png" alt="" />
        <Link
          to="/users/logout"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full shadow"
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
        <div className="h-[30%] p-5 bg-white relative pointer-events-auto">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute opacity-0 right-6 top-6 text-2xl cursor-pointer"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form className="relative py-3">
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => openSearch('pickup')}
              readOnly
              value={pickup?.shortName || pickup?.address || ''}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full cursor-pointer"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => openSearch('destination')}
              readOnly
              value={destination?.shortName || destination?.address || ''}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3 cursor-pointer"
              type="text"
              placeholder="Enter your destination"
            />
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
        <div ref={panelRef} className="bg-white h-0 overflow-y-auto pointer-events-auto">
          <div className="px-6 pb-2">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#eee] px-4 py-3 text-base rounded-lg w-full"
              type="text"
              placeholder="Search for a location..."
            />
          </div>
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            searchQuery={searchQuery}
          />
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
