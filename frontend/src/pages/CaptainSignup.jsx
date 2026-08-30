/* eslint-disable no-unused-vars */
import React from 'react'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const CaptainSignup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [ vehicleColor, setVehicleColor ] = useState('')
  const [ vehiclePlate, setVehiclePlate ] = useState('')
  const [ vehicleCapacity, setVehicleCapacity ] = useState('')
  const [ vehicleType, setVehicleType ] = useState('')
 
  const { captain, setCaptain } = React.useContext(CaptainDataContext)

  const navigate = useNavigate()

  const submitHandler = async (e)=> {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }
  
    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
       <img className='w-16 mb-10' src="/taxi_logo.png" alt="" />
        <form onSubmit= {(e)=>{
          submitHandler(e)
        }}>
          
          <h3 className='text-lg w-1/2 font-medium mb-2'>What's your name</h3>
          <div className='mb-7 flex gap-4'>
            <input
            required
            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 text-lg placeholder:text-base'
            type="text"
            placeholder='First Name'
            value={firstName}
            onChange={(e)=>{
              setFirstName(e.target.value)
            }} />
            <input
            required
            className='bg-[#eeeeee] w-1/2 roundedlg px-4 py-2 text-lg placeholder:text-base'
            type="text"
            placeholder='Last Name'
            value={lastName}
            onChange={(e)=>{
              setLastName(e.target.value)
            }} />
          </div>

          <h3 className='text-lg font-medium mb-2'>What's is your Email</h3>
          <input
          required
          value={email}
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
          className= 'bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base' 
          type="email"
          placeholder='email@example.com' />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
          required
          value={password}
          onChange= {(e) =>{
            setPassword(e.target.value)
          }}
          className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'
          type="Password"
          placeholder='Password' />
          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Register</button>

        </form>
        <p className='text-center mt-3'>Already have a account? <Link className=' px-1 text-blue-600' to='/captain-login'>Login here</Link></p>
      </div>
      <div>
       <p className='text-[11px]'>To drive with Uber your vehicle must be 1995 or newer, and be a mid-size or full-size sedan that comfortably seats 4-8 passengers.</p>
      </div>
    </div>
  )
}

export default CaptainSignup
