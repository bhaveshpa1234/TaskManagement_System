import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center 
                    bg-gradient-to-br from-blue-50 to-white 
                    dark:from-gray-900 dark:to-gray-800 
                    px-6 py-16"
    >
      <div className="flex flex-col md:flex-row items-center max-w-6xl w-full gap-10">
        <div className="text-center md:text-left space-y-6 flex-1">
          <h1
            className="text-4xl sm:text-5xl font-extrabold 
                         text-blue-600 dark:text-blue-400"
          >
            Welcome to{" "}
            <span className="text-blue-400 dark:text-blue-300">TaskPilot</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Your personal workspace to manage tasks, track progress, and
            collaborate effectively.
          </p>
          <div className="flex justify-center md:justify-start gap-4 mt-4 flex-wrap">
            <button
              onClick={() => navigate("/signup")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow 
                         dark:bg-blue-500 dark:hover:bg-blue-600 transition"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-white border border-blue-600 text-blue-600 px-6 py-2 rounded-lg 
                         hover:bg-blue-50 shadow 
                         dark:bg-gray-800 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-gray-700 
                         transition"
            >
              Login
            </button>
          </div>
        </div>

        <div className="max-w-md mx-auto flex-1">
          <img
            src="https://cdn.undraw.co/illustrations/add-tasks_4qsy.svg"
            alt="Add Tasks Illustration"
            className="w-full h-auto drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
