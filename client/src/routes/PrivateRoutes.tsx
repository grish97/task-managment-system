import { Navigate, Outlet } from 'react-router-dom';
import Layout from 'application/components/Layout/Layout';

interface IPropType {
  isAuthenticated: boolean;
}

function PrivateRoutes({ isAuthenticated }: IPropType) {
  return isAuthenticated ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/auth/signin" />
  );
}

export default PrivateRoutes;
