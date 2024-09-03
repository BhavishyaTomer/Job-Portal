import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

const Layout = () => {
  return (
    <div className='bg-backGround h-auto font-google text-textColor'>
    <Header/>
    <Outlet/>
    <Footer/>
  </div>
  )
}

export default Layout
