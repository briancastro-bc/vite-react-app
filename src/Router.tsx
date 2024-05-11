import { lazy } from 'react';
import { createBrowserRouter, } from 'react-router-dom';

const Router = createBrowserRouter(
  [
    {
      id: 'main',

    },
    {
      id: 'notFound',
      path: '*',
      Component: lazy(() => import('./apps/NotFound/NotFound'))
    }
  ]
);

export default Router;