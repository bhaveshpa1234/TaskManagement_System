import React from 'react'
import Signup from './components/Signup'
import Login from './components/Login'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import PrivateRoute from './components/PrivateRoute'
import ForgotPassword from './components/ForgotPassword'
import ForgotFlow from './components/ForgotFlow'
import ResetPassword from './components/ResetPassword'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Boards from './pages/Boards'
import Group from './pages/Group'


function App() {
  

  return (
    <>
      
      <BrowserRouter>
      <Routes>
       <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/ForgotPassword' element={<ForgotPassword />} />
      
        <Route path="/forgotflow" element={<ForgotFlow />} />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
        
        <Route path='/board' element={<Boards />} />
         <Route path="/boards/:boardId" element={<Group />} />

      </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" style={{ position: 'fixed', top: 0, right: 0 }} />

    </>
  )
}

export default App