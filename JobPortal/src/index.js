import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './Layout';
import LandingPage from './components/LandingPage';
import Registration from './components/Registration';
import {CookiesProvider} from "react-cookie";
import ProtectedRoute from './service/protectedRoute';
import JobWall from './components/JobWall';
import { store } from './redux/store';
import { Provider } from 'react-redux'
import Browse from './components/Browse';
import AppliedJobs from './components/AppliedJobs';
import JobDiscription from './components/JobDiscription';
import ListedCompany from './Recruiter Components/ListedCompany';
import CreateJob from './Recruiter Components/CreateJob';
import 'react-toastify/dist/ReactToastify.css';
import PostedJobs from './Recruiter Components/PostedJobs';
import ChangeStatus from './Recruiter Components/ChangeStatus';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path:"/",
        element:<LandingPage/>
      },
      {
        path:"/register",
        element:
        <Registration/>
      },
      {
        path:"/jobPosting",
        element:<JobWall/>
      },
      {
        path:"/browseJobs",
        element:<Browse/>
      },
      {
        path:"/appliedJobs",
        element:<AppliedJobs/>
      },
      {
        path:"/jobDiscription/:id",
        element:<JobDiscription/>
      },
      {
        path:"/listedCompany",
        element:<ListedCompany/>
      }
      ,
      {
        path:"/CreateJob",
        element:<CreateJob/>
      },
      {
        path:"/postedJob",
        element:<PostedJobs/>
      },
      {
        path:"/changeStatus/:id",
        element:<ChangeStatus/>
      }

    ]
  },
]);

root.render(
  <>
    <CookiesProvider>
    <Provider store={store}>

     <RouterProvider router={router} />
     </Provider>
     </CookiesProvider>
  </>
);
