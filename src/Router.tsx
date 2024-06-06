import { lazy } from 'react';
import { createBrowserRouter, } from 'react-router-dom';

import Root from '@apps/Shared/Layout/Root';

const Router = createBrowserRouter(
  [
    {
      id: 'root',
      path: '',
      element: <Root/>,
      children: [
        {
          id: 'main',
          path: '',
          Component: lazy(() => import('./apps/Main/pages/Home/Home')),
        },
        {
          id: 'profile-settings',
          path: 'profile-settings',
          Component: lazy(() => import('./apps/Main/pages/ProfileSettings/ProfileSettings')),
        },
      ]
    },
    {
      id: 'notFound',
      path: '*',
      Component: lazy(() => import('./apps/NotFound/NotFound'))
    }
  ]
);

export default Router;