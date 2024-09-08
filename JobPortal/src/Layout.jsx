import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { useFetchJobs } from './customHooks/useFetchJobs'
import {CookiesProvider} from "react-cookie";
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";

const Layout = () => {
  return (
    <div className='bg-backGround h-auto font-google text-textColor'>
      {
        useFetchJobs()
        
      }
      <CookiesProvider>
    <Header/>
    <Outlet/>
    {
      injectStyle()
    }
    <Footer/>
    </CookiesProvider>
  </div>
  )
}

export default Layout
