import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-6 py-16">
      <div className="flex flex-col md:flex-row items-center max-w-5xl w-full gap-10">
        
        
        <div className="text-center md:text-left space-y-6">
          <h1 className="text-5xl font-extrabold text-blue-600">
            Welcome to <span className="text-blue-400">TaskPilot</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Your personal workspace to manage tasks, track progress, and collaborate effectively.
          </p>
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <button
              onClick={() => navigate('/signup')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate('/login')}
              className="bg-white border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 shadow"
            >
              Login
            </button>
          </div>
        </div>

        
        <div className="max-w-md mx-auto">
          <img 
            src="https://cdn.undraw.co/illustrations/add-tasks_4qsy.svg" 
            alt="Add Tasks Illustration" 
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
