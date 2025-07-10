import React from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {

  const navigate = useNavigate()

  return (
    <>
    <div className='flex flex-col items-center min-h-96 bg-grey-100 justify-center px-4'>
        <h1 className='text-3xl font-bold text-blue-400 mb-6'>TaskPilot</h1>
        <p className='text-lg text-gray-700 mb-4 max-w-md'> Welcome to TaskPilot <br></br> Your personal workspace to manage Tasks,<br></br>Track progress and collobrate effectively.</p>
    </div>

    <div className="grid grid-cols-2 gap-6 justify-center mb-4">

    <button onClick={() => navigate('/signup')}
    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-fit justify-self-end"
    >Signup
    </button>

    <button onClick={() => navigate('/login')}
    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-fit justify-self-start">Login
    </button>

    </div>
    </>
  )
}

export default Home
