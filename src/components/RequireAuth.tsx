import { useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

interface RequireAuthProps {
  allowedRole: string;
}

const RequireAuth = ({ allowedRole }: RequireAuthProps) => {
  const { currentUser } = useAuth();
  const { handleToast } = useToast();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser) {
      handleToast({
        message: 'You need to be logged in to access this page',
        color: 'warning',
      });
    } else if (currentUser?.role !== allowedRole) {
      handleToast({
        message: 'You are not authorized to access this page',
        color: 'warning',
      });
    }
  }, [handleToast, currentUser, allowedRole]);

  return currentUser?.role === allowedRole ? (
    <Outlet />
  ) : currentUser ? (
    <Navigate to='/' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default RequireAuth;
