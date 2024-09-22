import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
const Home = () => {
  const { signin } = useSelector((state) => state.auth)

  useEffect(() => {
    if (signin.currentUser) {
      console.log(signin.currentUser)
    }
  }, [signin.currentUser])
  return (
    <div className="bg-[#f0f0f0]">
      <Header />
      <div className="pt-4 px-20 h-[1000px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Home
