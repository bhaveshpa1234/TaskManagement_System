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
      navigate('/forgot'); // If email not found, redirect back
    }
  }, [location, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-xl font-semibold mb-4">Check Your Email</h2>
        <p className="text-gray-700 mb-6">
          We've sent a password reset link to <strong>{email}</strong>. <br />
          Please check your inbox and follow the instructions to reset your password.
        </p>
        <Button type="primary" onClick={() => navigate('/login')} className="w-full">
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default ForgotFlow;
