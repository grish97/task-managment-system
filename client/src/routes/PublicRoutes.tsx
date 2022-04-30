import { ReactNode } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

interface IPropType {
  isAuthenticated: boolean;
}

function PubliRoutes({ isAuthenticated }: IPropType) {
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
}

export default PubliRoutes;
