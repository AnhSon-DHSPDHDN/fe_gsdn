import React from 'react';

export const AppRouter = [
  {
    path: '/admin',
    component: React.lazy(() => import('../layouts/Admin')),
    exact: true
  },
  {
    path: '/landing-page',
    component: React.lazy(() => import('../layouts/App')),
    exact: true
  },
  {
    path: '/login',
    component: React.lazy(() => import('../layouts/Login')),
    exact: true
  },
  {
    path: '/register',
    component: React.lazy(() => import('../layouts/Register')),
    exact: true
  },
  {
    path: '/home',
    component: React.lazy(() => import('../layouts/Home')),
    exact: true
  },
  {
    path: '/home/me',
    component: React.lazy(() => import('../layouts/PersonalPage')),
    exact: true
  },
  {
    path: '/home/profile/:id',
    component: React.lazy(() => import('../layouts/PersonalPage')),
    exact: true
  },
  {
    path: '/home/messenger',
    component: React.lazy(() => import('../layouts/MessengerLayout')),
    exact: true
  }
];