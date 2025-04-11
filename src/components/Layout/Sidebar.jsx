import { NavLink } from 'react-router-dom';
import { BuildingOfficeIcon, CalendarIcon, UserIcon, TicketIcon } from '@heroicons/react/24/outline';

const navItems = [
  {
    name: 'Manage Destinations',
    path: '/manage-destinations',
    icon: <BuildingOfficeIcon className="h-5 w-5" />,
  },
  {
    name: 'Manage Vacation Plans',
    path: '/manage-vacations',
    icon: <CalendarIcon className="h-5 w-5" />,
  },
  {
    name: 'Manage Users',
    path: '/manage-users',
    icon: <UserIcon className="h-5 w-5" />,
  },
  {
    name: 'Manage Bookings',
    path: '/manage-bookings',
    icon: <TicketIcon className="h-5 w-5" />,
  },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md h-full fixed">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-gray-800">Travel Dashboard</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-md ${
                    isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}