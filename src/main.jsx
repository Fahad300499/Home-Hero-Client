import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './components/Home.jsx';
import Root from './layout/Root.jsx';
import Services from './components/Services.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import MyServices from './components/MyServices.jsx';
import ServiceDetails from './pages/ServiceDetails.jsx';
import AddService from './components/AddService.jsx';
import MyBookings from './components/MyBookings.jsx';
import Profile from './components/Profile.jsx';
import Update from './components/Update.jsx';
import Error from './components/Error.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: '/',
        Component: Home,
        loader: ()=> fetch('https://home-hero-server.onrender.com/services')
      },
    ]
  },
        {
        path: '/services',
        Component: Services,
        loader: ()=> fetch('https://home-hero-server.onrender.com/all-services')
      },
       {
        path: '/AddServices',
        Component: AddService,
        // loader: ()=> fetch('https://home-hero-server.onrender.com/services')
      },
      {
        path: '/my-services',
        Component: MyServices,
      },
      {
        path: '/servicesDetails/:id',
        element: <PrivateRoute><ServiceDetails></ServiceDetails></PrivateRoute>,
        loader:({params})=>fetch(`https://home-hero-server.onrender.com/services/${params.id}`)
      },
      {
        path: '/my-bookings',
        Component: MyBookings,
      },
      {
        path: '/my-profile',
        Component: Profile,
      },
      {
        path:'/update/:id',
        Component: Update,
        loader:({params})=>fetch(`https://home-hero-server.onrender.com/services/${params.id}`)
      },
      
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      },
    {
      path: '/*',
      Component: Error
    }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
