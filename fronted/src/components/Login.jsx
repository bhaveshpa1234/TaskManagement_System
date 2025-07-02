import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [form, setform] = useState("")
  const [msg, setmsg] = useState("")
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
      const response = await axios.post('http://localhost:8000/users', form)
      setmsg(response.data.msg)
      navigate('/home')
    } catch (error) {
      setmsg(error.response.data.msg)
    }
  }

  return (
    <div>
    <h1 className='text-3xl font-bold felx text-center'>Login</h1>
      <form className='flex flex-col items-center space-y-4 mt-7'>
        <input className='w-80 border border-gray-400' type="email" placeholder='Email' />
        <input className='w-80 border border-gray-400'type="password" placeholder='Password' />
        <button type='submit' className='w-80 border border-green-400'>Login</button>
      </form>
    </div>
  )
}

export default Login
