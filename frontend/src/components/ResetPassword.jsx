import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      await axios.post(
        `http://127.0.0.1:8000/account/reset-password/${uid}/${token}/`,
        {
          password: values.password,
          password2: values.confirm,
        }
      );

      toast.success('Password reset successfully');
      navigate('/login');
    } catch (error) {
      const err = error.response?.data;
      const errorMsg =
        err?.msg || err?.detail || Object.values(err || {})[0] || 'Something went wrong';
      toast.error(errorMsg);
      console.error('Reset error:', err);
    } finally {
      setLoading(false);
    }
  };

  const validatePasswords = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Passwords do not match'));
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen 
                    bg-gray-100 dark:bg-gray-900 
                    px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 
                      p-8 sm:p-10 rounded-2xl shadow-xl 
                      w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center 
                       text-gray-800 dark:text-white">
          Reset Your Password
        </h2>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={<span className="dark:text-gray-200">New Password</span>}
            name="password"
            rules={[{ required: true, message: 'Please enter your new password' }]}
          >
            <Input.Password
              placeholder="New Password"
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </Form.Item>

          <Form.Item
            label={<span className="dark:text-gray-200">Confirm Password</span>}
            name="confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              validatePasswords,
            ]}
          >
            <Input.Password
              placeholder="Confirm Password"
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              loading={loading}
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
