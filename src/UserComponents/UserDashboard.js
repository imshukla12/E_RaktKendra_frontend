import React from 'react'
import UserNavbar from './UserNavbar'
import UserRequests from './UserRequests'

const UserDashboard = () => {
  return (
    <div className='items-center flex flex-col justify-center'>
        <UserNavbar/>
        <div className='w-4/5 flex justify-center items-center'>
          <UserRequests/>
        </div>
    </div>
  )
}

export default UserDashboard