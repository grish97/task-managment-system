import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface IPropType {
  isAuthenticated: boolean;
}

function PrivateRoutes({ isAuthenticated }: IPropType) {
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
}

export default PrivateRoutes;
