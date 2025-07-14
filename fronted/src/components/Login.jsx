import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

const Login = () => {
  const onFinish = (values) => {
    console.log('Login Success:', values);
  
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Login Failed:', errorInfo);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>

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
            <Button type="primary" htmlType="submit" className="w-full">
              Login
            </Button>
          </Form.Item>

          <div className="flex justify-between text-sm">
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
