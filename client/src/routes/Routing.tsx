import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loader } from 'application/common';

import { IRootStore } from '@redux-store';

// Routes containers
import PublicRoute from 'routes/PublicRoutes';
import PrivateRoute from 'routes/PrivateRoutes';

// User pages
import Dashboard from 'application/components/Dashboard/Dashboard';
import { auth } from 'services';

// Authorization pages
const LoginPage = lazy(() => import('application/components/Auth/Login/Login'));

// Not found page
const NoFoundComponent = lazy(() => import('application/components/NotFound/NotFound'));

function Routing() {
  const authStore = useSelector((store: IRootStore) => store.auth);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/auth" element={<PublicRoute isAuthenticated={authStore.isLogged} />}>
            <Route path="/auth/signin" element={<LoginPage />} />
          </Route>

          <Route path="/" element={<PrivateRoute isAuthenticated={authStore.isLogged} />}>
            <Route path="" element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<NoFoundComponent />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default Routing;
