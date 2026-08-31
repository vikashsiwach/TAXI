import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

const UserGuestWrapper = ({ children }) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    api
      .get('/users/profile')
      .then(() => {
        navigate('/home', { replace: true })
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [navigate])

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    )
  }

  return children
}

export default UserGuestWrapper
