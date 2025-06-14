import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Chatbot from './Chatbot'

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
      <Chatbot/>
    </div>
  )
}

export default Layout
