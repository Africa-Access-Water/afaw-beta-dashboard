// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';
import Loadable from 'src/layouts/full/shared/loadable/Loadable';
import Donations from 'src/views/donations/Donations';
import Donors from 'src/views/donors/Donors';
import Posts from 'src/views/posts/Posts';
import Team from 'src/views/team/Team';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

// Dashboard
const Dashboard = Loadable(lazy(() => import('../views/dashboards/Dashboard')));

// authentication
const Login = Loadable(lazy(() => import('../views/auth/login/Login')));
const Register = Loadable(lazy(() => import('../views/auth/register/Register')));
const Error = Loadable(lazy(() => import('../views/auth/error/Error')));

const Router = [
   {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/', element: <Login /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/register', element: <Register /> },
      { path: '404', element: <Error /> },
      { path: '/auth/404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/donations', exact: true, element: <Donations /> },
      { path: '/donors', exact: true, element: <Donors /> },
      { path: '/team', exact: true, element: <Team /> },
      { path: '/posts', exact: true, element: <Posts /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
 
];

const router = createBrowserRouter(Router, { basename: '/MatDash' });
export default router;
