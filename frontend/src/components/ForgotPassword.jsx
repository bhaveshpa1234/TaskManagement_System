import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api'; 
import { toast } from 'react-toastify';
import axios from 'axios';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const onFinish = async ({ email }) => {
    try {
      await axios.post('http://localhost:8000/account/send-reset-password-email/', { email });
      toast.success('sent to your email');
      navigate('/forgotflow', { state: { email } });
    } catch (error) {
      const err = error.response?.data;
      const errorMsg = err?.msg || err?.error || Object.values(err || {})[0] || 'Failed to send ';
      toast.error(errorMsg);
      console.error('Send  error:', err);
      console.log(error.response)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-6 text-center">Forgot Password</h2>

        <Form name="forgotForm" layout="vertical" onFinish={onFinish} autoComplete="off">
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
              Send 
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
