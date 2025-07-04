import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [form, setform] = useState("")
  const [msg, setmsg] = useState("hi")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/tasks/token/', form)
      localStorage.setItem('token', response.data.access)
      localStorage.setItem('refresh', response.data.refresh)
      setmsg(response.data.msg)
      navigate('/dashboard')
    } catch (error) {
      setmsg(error.response.data.msg)
      setmsg("error")
    }
  }

  return (
    <div>
    <h1 className='text-3xl font-bold felx text-center'>Login</h1>
      <form onSubmit={handleSubmit}  className='flex flex-col items-center space-y-4 mt-7'>
        <input onChange={handleChange} className='w-80 border border-gray-400' type="username" name='username' placeholder='Username' />
        <input onChange={handleChange} className='w-80 border border-gray-400' type="email" name='email'
        placeholder='Email' />
        <input onChange={handleChange} className='w-80 border border-gray-400'type="password" name='password' placeholder='Password' />
        <button type='submit' className='w-80 border border-green-400'>Login</button>
        <p>{msg}</p>
      </form>
    </div>
  )
}

export default Login
