import { lazy } from 'react';

import { IRoute } from '@router';

const routes: IRoute[] = [
  {
    path: 'dashboard',
    component: lazy(() => import('application/components/Dashboard/Dashboard')),
  },
];

export default routes;
