import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { UserDataContext } from '../context/UserContext'

export const UserLogout = () => {
  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)

  useEffect(() => {
    api
      .get('/users/logout')
      .finally(() => {
        sessionStorage.removeItem('userSession')
        setUser({
          email: '',
          fullName: { firstName: '', lastName: '' },
        })
        navigate('/login', { replace: true })
      })
  }, [navigate, setUser])

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-lg text-gray-600">Logging out...</p>
    </div>
  )
}

export default UserLogout
