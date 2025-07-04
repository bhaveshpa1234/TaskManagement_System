import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

  const navigate = useNavigate()

  const [form, setform] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [msg, setmsg] = useState('')

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/tasks/register/', form)
      setmsg(response.data.message)
      navigate('/dashboard')
    } catch (error) {
      setmsg(error.response.data.message)
    }
  }



  return (
    <div>
      <h1 className='text-3xl font-bold felx text-center'>Signup</h1>
      <form className='flex flex-col items-center space-y-4 mt-7' onSubmit={handleSubmit}>
        <input onChange={handleChange} className='w-80 border border-gray-400' name='username' type="text" placeholder='Name' />
        <input onChange={handleChange} className='w-80 border border-gray-400' name='email' type="email" placeholder='Email' />
        <input onChange={handleChange} className='w-80 border border-gray-400' name='password' type="password" placeholder='Password' />
        <button type='submit' className='w-80 border border-green-400'>Signup</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  )
}

export default Signup
