import React, { useState } from 'react'
import FieldWorkerNavbar from './FieldWorkerNavbar'
import BloodRequests from './BloodRequests'
import BloodDonationRequests from './BloodDonationRequests'

const FieldWorkerDashboard = () => {

  const [viewBloodRequests, setViewBloodRequests] = useState(false)
  const [viewBloodDonationRequests, setViewBloodDonationRequests] = useState(false)

  const handleToggleRequests = () => {
    setViewBloodRequests(!viewBloodRequests)
  }

  const handleToggleDonationRequests = () => {
    setViewBloodDonationRequests(!viewBloodDonationRequests)
  }

  return (
    <div className='flex flex-col bg-stone-200 h-screen'>
      <FieldWorkerNavbar />
      <div className='grid grid-cols-2 gap-6 w-full p-8'>
        {/* all blood requests records */}
        <div className='p-2 relative z-0 w-full group'>
          <div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={viewBloodRequests}
                onChange={handleToggleRequests}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-500"></div>
              <span className="ml-3 text-xl font-serif text-white dark:text-blue-950">
                View All Blood Requests
              </span>
            </label>
          </div>
          {viewBloodRequests && (
            <div>
              <BloodRequests />
            </div>
          )}
        </div>
        {/* all blood donation records */}
        <div className='p-2 relative z-0 w-full group'>
          <div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={viewBloodDonationRequests}
                onChange={handleToggleDonationRequests}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-500"></div>
              <span className="ml-3 text-xl font-serif text-white dark:text-blue-950">
                View All Blood Donation Requests
              </span>
            </label>
          </div>
          {viewBloodDonationRequests && (
            <div>
              <BloodDonationRequests />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FieldWorkerDashboard