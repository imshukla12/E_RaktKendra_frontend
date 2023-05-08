import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
// import img from '../images/asd.png'

const HomePage = () => {

  const navigate = useNavigate()

  const handleFieldWorker = () => {
    navigate(`/fieldWorkerLogin`)
  }

  const handleUser = () => {
    navigate(`/userLogin`)
  }

  return (
    <div className='bg-red-50 h-screen'>
      <Navbar />
      <div className='flex flex-row items-center justify-evenly'>
        {/* <div className='w-1/2 h-1/6'>
          <img src={img} alt='image_homepage' className="h-1/6 max-w-full" />
        </div> */}
        <div className='flex flex-row w-1/2 justify-evenly space-x-6 items-center mt-6 p-4'>
          <button className='bg-red-600 text-white rounded-lg px-2 py-2' onClick={handleUser}>User</button>
          <button className='bg-red-600 text-white rounded-lg px-2 py-2' onClick={handleFieldWorker}>FieldWorker</button>
        </div>
      </div>
    </div>
  )
}

export default HomePage