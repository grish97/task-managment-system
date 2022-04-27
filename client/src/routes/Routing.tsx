import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';
import { Loader } from 'application/common';

// Routes containers
import PublicRoute from 'routes/PublicRoutes';
import PrivateRoute from 'routes/PrivateRoutes';

// User pages
import Dashboard from 'application/components/Dashboard/Dashboard';

// Authorization pages
const LoginPage = lazy(() => import('application/components/Auth/Login/Login'));

// Not found page
const NoFoundComponent = lazy(() => import('application/components/NotFound/NotFound'));

function Routing() {
  const isAuthenticated = false;

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/auth" element={<PublicRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/auth/login" element={<LoginPage />} />
          </Route>

          <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/" element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<NoFoundComponent />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default Routing;
