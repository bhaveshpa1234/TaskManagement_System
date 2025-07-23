import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // ✅ Using plain axios
import { toast } from 'react-toastify';

const Signup = () => {
  const [form] = Form.useForm();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (!phone || phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    const data = {
      name: values.name,
      email: values.email,
      phone: phone,
      password: values.password,
      password2: values.password2,
    };

    try {
      setLoading(true);
      const res = await axios.post('http://127.0.0.1:8000/account/register/', data); // ✅ Updated
      const tokens = res.data.token;

      localStorage.setItem('access', tokens.access);
      localStorage.setItem('refresh', tokens.refresh);

      toast.success('Account created! Redirecting to dashboard...');
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error.response?.data);
      console.error('Signup error full:', error);

      let errorMsg = 'Registration failed!';
      const errData = error.response?.data;

      if (errData) {
        if (errData.detail) errorMsg = errData.detail;
        else {
          const firstError = Object.values(errData)[0];
          if (Array.isArray(firstError)) errorMsg = firstError[0];
          else if (typeof firstError === 'string') errorMsg = firstError;
        }
      }

      toast.error(errorMsg);
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Create Account</h2>

        <Form
          form={form}
          name="signupForm"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
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
            name="password2"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              validatePasswords,
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              loading={loading}
            >
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
