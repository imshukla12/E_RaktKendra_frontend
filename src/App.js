import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import FieldWorkerLogin from './FieldWorkerComponents/FieldWorkerLogin'
import FieldWorkerDashboard from './FieldWorkerComponents/FieldWorkerDashboard'
import UserLogin from './UserComponents/UserLogin'
import UserRegistration from './UserComponents/UserRegistration'
import UserDashboard from './UserComponents/UserDashboard'

const App = () => {
  return (
    <div className='font-serif'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element = {<HomePage/>} />

        {/* User */}
        <Route path='/userLogin' element = {<UserLogin/>} />
        <Route path = '/register' element = {<UserRegistration/>} />
        <Route path='/user' element = {<UserDashboard/>} />
        
        {/* FieldWorker */}
        <Route path='/fieldWorkerLogin' element = {<FieldWorkerLogin/>} />
        <Route path='/fieldWorker' element = {<FieldWorkerDashboard/>} />
       
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App