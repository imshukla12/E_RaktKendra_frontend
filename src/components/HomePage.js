import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import img from '../images/homepage.png'

const HomePage = () => {

  const navigate = useNavigate()

  const handleFieldWorker = () => {
    navigate(`/fieldWorkerLogin`)
  }

  const handleUser = () => {
    navigate(`/userLogin`)
  }

  return (
    <div className='bg-red-700'>
      <Navbar />
      <div className='flex flex-row items-center justify-evenly'>
        <div className='w-1/2 h-1/6'>
          <img src={img} alt='image_homepage' className="h-1/6 max-w-full" />
        </div>
        <div className='flex flex-col w-1/2 justify-center space-y-6 items-center p-4'>
          <div><p className='font-serif text-5xl text-white'>Welcome to E-RaktKendra</p></div>
          <div className='flex flex-row w-1/2 justify-evenly space-x-6 items-center mt-6 p-4'>
            <button className='bg-white text-red-600 rounded-lg px-4 py-2 transform transition duration-300 hover:bg-red-200 hover:scale-125' onClick={handleUser}>User</button>
            <button className='bg-white text-red-600 rounded-lg px-2 py-2 transform transition duration-300 hover:bg-red-200 hover:scale-125' onClick={handleFieldWorker}>FieldWorker</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage