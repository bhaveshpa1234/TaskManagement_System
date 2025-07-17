import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const loginData = {
      email: values.email,
      password: values.password,
    };

    try {
      const res = await API.post('login/', loginData);
      const tokens = res.data.token;

      localStorage.setItem('access', tokens.access);
      localStorage.setItem('refresh', tokens.refresh);

      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      const errorMsg =
        error.response?.data?.msg ||
        Object.values(error.response?.data || {})[0] ||
        'Login failed!';
      toast.error(errorMsg);
      console.error('Login error:', error.response?.data);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Login Failed:', errorInfo);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Welcome Back</h2>

        <Form
          name="loginForm"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Enter a valid email' },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Login
            </Button>
          </Form.Item>

          <div className="flex justify-between text-sm mt-4">
            <Link to="/ForgotPassword" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
            <Link to="/signup" className="text-blue-500 hover:underline">
              New User?
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
