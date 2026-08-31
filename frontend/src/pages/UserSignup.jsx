import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../api/axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    setError('')

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    }

    try {
      const response = await api.post('/users/register', newUser)
      if (response.status === 201) {
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
          <h3 className="text-lg w-1/2 font-medium mb-2">What's your name</h3>
          <div className="mb-7 flex gap-4">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 text-lg placeholder:text-base"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
            />
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 text-lg placeholder:text-base"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
              }}
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's is your Email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
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
            Sign Up
          </button>
        </form>
        <p className="text-center mt-3">
          Already have a account?{' '}
          <Link className=" px-1 text-blue-600" to="/login">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[12px]">
          By continuing, you agree to calls, including by autodialer, WhatsApp, or texts from Uber
          and its affiliates.
        </p>
      </div>
    </div>
  )
}

export default UserSignup
