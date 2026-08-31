import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Riding from './pages/Riding'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserGuestWrapper from './pages/UserGuestWrapper'
import { UserLogout } from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainRiding from './pages/CaptainRiding'

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <UserGuestWrapper>
              <Start />
            </UserGuestWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <UserGuestWrapper>
              <UserLogin />
            </UserGuestWrapper>
          }
        />
        <Route
          path="/signup"
          element={
            <UserGuestWrapper>
              <UserSignup />
            </UserGuestWrapper>
          }
        />
        <Route path="/riding" element={<Riding />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/captain-home" element={<CaptainHome />} />
        <Route path="/captain-riding" element={<CaptainRiding />} />
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/users/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />
      </Routes>
    </div>
  )
}

export default App
