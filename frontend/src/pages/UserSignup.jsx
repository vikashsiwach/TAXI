/* eslint-disable no-unused-vars */
import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useState, useContext } from 'react'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'


const UserSignup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate();
  const {user, setUser} = React.useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
       fullname:{
        firstname:firstName,
        lastname:lastName
      },
      email:email,
      password:password
    }
    // newUser down is sent as the request body
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
    console.log(response)
    if(response.status === 201){
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }

    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
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
            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 text-lg placeholder:text-base'
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
          <button className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Sign Up</button>
        </form>
        <p className='text-center mt-3'>Already have a account? <Link className=' px-1 text-blue-600' to='/login'>Login here</Link></p>
      </div>
      <div>
       <p className='text-[12px]'>By continuing, you agree to calls, including by autodialer, WhatsApp, or texts from Uber and its affiliates.</p>
      </div>
    </div>
  )
}

export default UserSignup
