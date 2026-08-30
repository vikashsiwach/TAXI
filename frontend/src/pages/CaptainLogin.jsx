import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {CaptainDataContext} from '../context/CaptainContext'

const CaptainLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const {setCaptain} = React.useContext(CaptainDataContext)
  const navigate = useNavigate();
  

  const submitHandler = async (e)=> {
    e.preventDefault();
    const captain = {
      email: email,
      password: password
    }
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

  if(response.status === 200){
    const data = response.data

    setCaptain(data.captain)
    localStorage.setItem('token' ,data.token)
    navigate('/captain-home')
  }

    setEmail('');
    setPassword('');
  }

  
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
       <img className='w-16 mb-10' src="/taxi_logo.png" alt="" />
        <form onSubmit= {(e)=>{
          submitHandler(e)
        }}>
          <h3 className='text-lg font-medium mb-2'>What's your Email</h3>
          <input
          required
          value={email}
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
          className= 'bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base' 
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
          <button className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Login</button>
        </form>
        <p className='text-center mt-3'>Join the fleet! <Link className=' px-1 text-blue-600' to='/captain-signup'>Register as a Rider</Link></p>
      </div>
      <div>
        <Link className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base' to='/login'>Login as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin
