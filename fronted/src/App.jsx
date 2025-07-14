import React from 'react'
import Signup from './components/Signup'
import Login from './components/Login'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import ForgotPassword from './components/ForgotPassword'
import ForgotFlow from './components/ForgotFlow'
import ResetPassword from './components/ResetPassword'

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
       <Route path='/' element={<Home />} />
         <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/ForgotPassword' element={<ForgotPassword />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/forgotflow" element={<ForgotFlow />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}
        

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App