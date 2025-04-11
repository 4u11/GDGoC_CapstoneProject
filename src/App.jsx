
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ManageDestinations from './pages/Management/Destination';
import ManageVacations from './pages/Management/Vacations';
import ManageUsers from './pages/Management/Users';
import ManageBookings from './pages/Management/Bookings';


function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/manage-destinations" replace />} />
            <Route path="manage-destinations" element={<ManageDestinations />} />
            <Route path="manage-vacations" element={<ManageVacations />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="manage-bookings" element={<ManageBookings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}