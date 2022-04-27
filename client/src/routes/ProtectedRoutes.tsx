import { ReactNode, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from './routes';
import { Loader } from 'application/common';

import { IRoute } from '@router';

interface IPropType {}

function ProtectedRoutes(props: IPropType) {
  return (
    <Routes>
      <Suspense fallback={<Loader />}>
        {routes.map(({ component: Component, path }: IRoute) => (
          <Route path={path} key={path}>
            <Component />
          </Route>
        ))}
      </Suspense>
    </Routes>
  );
}

export default ProtectedRoutes;
