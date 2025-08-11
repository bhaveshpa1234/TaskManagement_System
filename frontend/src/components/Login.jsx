import React from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    const loginData = {
      email: values.email,
      password: values.password,
    };

    try {
      const res = await API.post("account/login/", loginData);
      const tokens = res.data.token;

      localStorage.setItem("access", tokens.access);
      localStorage.setItem("refresh", tokens.refresh);

      toast.success("Login successful!");
      navigate("/board");
    } catch (error) {
      const errorMsg =
        error.response?.data?.msg ||
        Object.values(error.response?.data || {})[0] ||
        "Login failed!";
      toast.error(errorMsg);
      console.error("Login error:", error.response?.data);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Login Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center min-h-screen 
                    bg-gradient-to-br from-blue-100 via-blue-50 to-white px-4
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                    transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-xl 
                      w-full max-w-md transition-colors duration-300">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center 
                       text-blue-600 dark:text-blue-400">
          Welcome Back
        </h2>

        <Form
          name="loginForm"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={<span className="dark:text-gray-200">Email</span>}
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="Email" className="dark:bg-gray-700 dark:text-white" />
          </Form.Item>

          <Form.Item
            label={<span className="dark:text-gray-200">Password</span>}
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Password" className="dark:bg-gray-700 dark:text-white" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Login
            </Button>
          </Form.Item>

          <div className="flex flex-col sm:flex-row justify-between text-sm mt-4 gap-3 sm:gap-0">
            <Link
              to="/ForgotPassword"
              className="text-blue-500 hover:underline dark:text-blue-400"
            >
              Forgot Password?
            </Link>
            <Link
              to="/signup"
              className="text-blue-500 hover:underline dark:text-blue-400"
            >
              New User?
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
