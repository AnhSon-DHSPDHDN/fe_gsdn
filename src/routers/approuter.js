import React from 'react';

export const AppRouter = [
  {
    path: '/admin',
    component: React.lazy(() => import('../layouts/Admin')),
    exact: true
  },
  {
    path: '/admin/teacher',
    component: React.lazy(() => import('../components/admins/TeacherAdmin')),
    exact: true
  },
  {
    path: '/admin/customer',
    component: React.lazy(() => import('../components/admins/CustomerAdmin')),
    exact: true
  },
  {
    path: '/admin/news',
    component: React.lazy(() => import('../components/admins/NewsAdmin')),
    exact: true
  },
  {
    path: '/admin/users',
    component: React.lazy(() => import('../components/admins/UserAdmin')),
    exact: true
  },
  {
    path: '/admin/developer',
    component: React.lazy(() => import('../components/admins/DeveloperAdmin')),
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
  },
  {
    path: '/home/news',
    component: React.lazy(() => import('../layouts/News')),
    exact: true
  }
];