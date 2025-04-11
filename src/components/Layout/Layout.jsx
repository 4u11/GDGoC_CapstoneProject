import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import ProfileDropdown from './ProfileDropdown';

export default function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 flex justify-end">
          <ProfileDropdown />
        </header>
        <main className="p-6">
          <Outlet /> {/* This renders child routes */}
        </main>
      </div>
    </div>
  );
}