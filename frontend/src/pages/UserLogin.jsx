import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await api.post('/users/login', { email, password })

      if (response.status === 200) {
        const data = response.data
        setUser(data.user)
        sessionStorage.setItem('userSession', 'true')
        navigate('/home', { replace: true })
      }
    } catch (err) {
      const data = err.response?.data
      if (data?.message) {
        setError(data.message)
      } else if (data?.errors?.length) {
        setError(data.errors[0].msg)
      } else {
        setError('Something went wrong. Please try again.')
      }
    }
  }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className="w-16 mb-10" src="/taxi_logo.png" alt="" />
        <form
          onSubmit={(e) => {
            submitHandler(e)
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your Email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="password"
            placeholder="Password"
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button className="flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5">
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          New Here?{' '}
          <Link className=" px-1 text-blue-600" to="/signup">
            Create New Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base"
          to="/captain-login"
        >
          Login as Rider
        </Link>
      </div>
    </div>
  )
}

export default UserLogin
