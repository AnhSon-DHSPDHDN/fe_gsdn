import React from 'react';

export const AppRouter = [
  {
    path: '/admin',
    component: React.lazy(() => import('../layouts/Admin'))
  },
  {
    path: '/landing-page',
    component: React.lazy(() => import('../layouts/App'))
  },
  {
    path: '/login',
    component: React.lazy(() => import('../layouts/Login'))
  },
  {
    path: '/register',
    component: React.lazy(() => import('../layouts/Register'))
  },
  {
    path: '/home',
    component: React.lazy(() => import('../layouts/Home'))
  }
];