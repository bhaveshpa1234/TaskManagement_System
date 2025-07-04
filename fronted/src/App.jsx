import React from 'react'
import Signup from './components/Signup'
import Login from './components/Login'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Dashboard from './components/Dashboard'

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
