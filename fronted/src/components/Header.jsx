import React from 'react';
import { Calendar, Button, Dropdown } from 'antd';
import { toast } from 'react-toastify';
import useDarkMode from './useDarkMode';
import { Sun, Moon } from 'react-feather'; 

const calendarDropdown = {
  menu: {
    items: [
      {
        key: 'calendar',
        label: (
          <div className="p-2">
            <Calendar fullscreen={false} />
          </div>
        ),
      },
    ],
  },
};

const Header = () => {
  const [theme, toggleTheme] = useDarkMode();

  const handleLogout = () => {
    localStorage.removeItem('access');
    window.location.href = './login';
    toast.success('Logout successful!');
  };

  return (
    <div className="bg-blue-100 dark:bg-gray-900 w-full px-6 h-16 flex items-center justify-between border-b border-blue-200 dark:border-gray-700 shadow-sm transition-colors">
      
     
      <div className="flex items-center space-x-2">
        <img
          src="https://e7.pngegg.com/pngimages/215/344/png-clipart-computer-icons-task-management-action-item-compliance-icon-angle-text.png"
          alt="Logo"
          className="h-10 w-10 rounded-full"
        />
        <h3 className="text-blue-800 dark:text-white text-xl font-semibold">Task Pilot</h3>
      </div>

    
      <Dropdown menu={calendarDropdown.menu} placement="bottom" trigger={['click']}>
        <Button className="bg-white dark:bg-gray-800 dark:text-white hover:bg-blue-50 dark:hover:bg-gray-700 border border-blue-300 dark:border-gray-600">
          Calendar
        </Button>
      </Dropdown>

      <div className="flex items-center space-x-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 border border-blue-300 dark:border-gray-600 transition"
          title="Toggle Dark Mode"
        >
          {theme === 'dark' ? <Sun color="white" size={18} /> : <Moon color="#1e3a8a" size={18} />}
        </button>

        <button
          onClick={handleLogout}
          className="bg-white dark:bg-gray-800 dark:text-white border border-blue-300 dark:border-gray-600 px-4 py-1 rounded hover:bg-blue-50 dark:hover:bg-gray-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
