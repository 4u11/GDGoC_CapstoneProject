import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      // Tampilkan loader sebelum redirect
      setShowLoader(true);
      const timer = setTimeout(() => setShowLoader(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentUser]);

  if (!currentUser) {
    return showLoader ? <div>Mengarahkan ke login...</div> : <Navigate to="/login" replace />;
  }

  return children;
}
