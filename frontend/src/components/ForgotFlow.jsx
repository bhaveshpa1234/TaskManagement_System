import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const ForgotFlow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      navigate('/forgot');
    }
  }, [location, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen 
                    bg-gray-100 dark:bg-gray-900 
                    px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 
                      p-6 sm:p-8 rounded-2xl shadow-xl 
                      w-full max-w-md text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 
                       text-gray-800 dark:text-white">
          Check Your Email
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm sm:text-base">
          We&apos;ve sent a password reset link to <strong>{email}</strong>.<br />
          Please check your inbox and follow the instructions to reset your password.
        </p>
        <Button
          type="primary"
          onClick={() => navigate('/login')}
          className="w-full bg-blue-600 hover:bg-blue-700 
                     dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default ForgotFlow;
