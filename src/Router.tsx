import { lazy } from 'react';
import { createBrowserRouter, } from 'react-router-dom';

import RootLayout from '@apps/Shared/Layout/Root';
import VerificationLayout from '@apps/Main/pages/Verification/Layout/Verification';

const Router = createBrowserRouter(
  [
    {
      id: 'root',
      path: '',
      element: <RootLayout/>,
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
        {
          id: 'verifications',
          path: 'verify',
          element: <VerificationLayout/>,
          children: [
            {
              id: 'email',
              path: 'email',
              Component: lazy(() => import('./apps/Main/pages/Verification/EmailVerification')),
            },
            {
              id: 'phone',
              path: 'phone',
              Component: lazy(() => import('./apps/Main/pages/Verification/PhoneVerification')),
            },
          ]
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