
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BuildingOfficeIcon,
  CalendarIcon,
  UserIcon,
  TicketIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: 'Manage Destinations', path: '/manage-destinations', icon: <BuildingOfficeIcon className="h-5 w-5" /> },
    { name: 'Manage Vacation Plans', path: '/manage-vacations', icon: <CalendarIcon className="h-5 w-5" /> },
    { name: 'Manage Users', path: '/manage-users', icon: <UserIcon className="h-5 w-5" /> },
    { name: 'Manage Bookings', path: '/manage-bookings', icon: <TicketIcon className="h-5 w-5" /> },
  ];

  return (
    <div className={`flex flex-col h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      {/* Collapse Button */}
      <div className="flex justify-end p-2">
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {collapsed ? (
            <ChevronDoubleRightIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDoubleLeftIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center px-4 py-3 text-sm font-medium rounded-lg mx-2 ${
                isActive 
                  ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400' 
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`
            }
          >
            <span className="flex-shrink-0">
              {item.icon}
            </span>
            {!collapsed && (
              <span className="ml-3 truncate">
                {item.name}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}