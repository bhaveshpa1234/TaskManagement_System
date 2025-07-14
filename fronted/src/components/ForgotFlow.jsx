import React from 'react';
import  { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const ForgotFlow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (values) => {
    console.log('Email:', values.email);
    setEmail(values.email);
    
    message.success('OTP sent to your email');
    setStep(2);
  };

  const handleOtpSubmit = (values) => {
    console.log('OTP:', values.otp);
    if (values.otp === '123456') {
      message.success('OTP verified');
      navigate('/reset-password', { state: { email } });
    } else {
      message.error('Invalid OTP');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {step === 1 ? (
          <>
            <h2 className="text-xl font-semibold mb-6 text-center">Forgot Password</h2>
            <Form layout="vertical" onFinish={handleEmailSubmit}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Invalid email address' },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  Send OTP
                </Button>
              </Form.Item>
            </Form>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">Enter OTP</h2>
            <p className="text-sm text-gray-600 mb-6 text-center">
              We’ve sent a 6-digit OTP to <strong>{email}</strong>
            </p>
            <Form layout="vertical" onFinish={handleOtpSubmit}>
              <Form.Item
                label="OTP"
                name="otp"
                rules={[
                  { required: true, message: 'Please enter the OTP' },
                  { pattern: /^\d{6}$/, message: 'OTP must be 6 digits' },
                ]}
              >
                <Input placeholder="Enter OTP" maxLength={6} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  Verify OTP
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotFlow;
