import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { useFetchJobs } from './customHooks/useFetchJobs'

const Layout = () => {
  return (
    <div className='bg-backGround h-auto font-google text-textColor'>
      {
        useFetchJobs()
      }
    <Header/>
    <Outlet/>
    <Footer/>
  </div>
  )
}

export default Layout
