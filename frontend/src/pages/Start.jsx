import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='bg-cover bg-bottom bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen w-full pt-8 flex justify-between flex-col'>
      <img className='w-16 ml-8' src="/taxi_logo.png" alt="" />
      <div className='bg-white pb-8 py-8 px-4'>
        <h2 className='text-[30px] font-semibold'>Get Started With Uber</h2>
        <Link to='/login'className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
      </div>
    </div>
  )
}

export default Start
