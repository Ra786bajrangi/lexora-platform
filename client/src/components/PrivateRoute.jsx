// PrivateRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Special handling for /dashboard route
  if (location.pathname === '/dashboard') {
    return user.role === 'admin' ? <Navigate to="/admin-dashboard" /> : <Navigate to="/user-dashboard" />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
