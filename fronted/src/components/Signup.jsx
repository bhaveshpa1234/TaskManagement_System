import React from 'react';
import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import PhoneInput from 'react-phone-input-2';
import { Link } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css';

const Signup = () => {
  const [form] = Form.useForm();
  const [phone, setPhone] = useState('');

  const onFinish = (values) => {
    const data = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      phone: phone,
    };
    console.log('Signup Data:', data);
    
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-6">Signup</h2>

        <Form
          form={form}
          name="signupForm"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >

          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: 'Please enter your full name' }]}
          >
            <Input placeholder="Full Name" />
          </Form.Item>


          <Form.Item label="Mobile Number" required>
            <PhoneInput
              country={'in'}
              value={phone}
              onChange={setPhone}
              enableSearch
              inputStyle={{
                width: '100%',
                height: '38px',
                borderRadius: '0.375rem',
                border: '1px solid #d9d9d9',
              }}
              specialLabel=""
              containerStyle={{ width: '100%' }}
            />
          </Form.Item>


          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
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

          <Form.Item
            label="Confirm Password"
            name="confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              validatePasswords,
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

     
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Signup
            </Button>
          </Form.Item>

          <p className="text-sm text-center mt-4">
            Already registered?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
