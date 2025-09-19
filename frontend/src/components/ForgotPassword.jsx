import React from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import API from '../utils/api';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const onFinish = async ({ email }) => {
    try {
      await API.post('/account/send-reset-password-email/', { email });
      toast.success('Password reset link sent to your email');
      navigate('/forgotflow', { state: { email } });
    } catch (error) {
      const err = error.response?.data;
      const errorMsg =
        err?.msg || err?.error || Object.values(err || {})[0] || 'Failed to send reset link';
      toast.error(errorMsg);
      console.error('Send error:', err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen 
                    bg-gray-100 dark:bg-gray-900 
                    px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 
                      p-6 sm:p-8 rounded-2xl shadow-xl 
                      w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center 
                       text-gray-800 dark:text-white">
          Forgot Password
        </h2>

        <Form
          name="forgotForm"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label={<span className="text-gray-800 dark:text-gray-200">Email</span>}
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Invalid email address' },
            ]}
          >
            <Input placeholder="Enter your email" className="dark:bg-gray-700 dark:text-white" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 
                         dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
