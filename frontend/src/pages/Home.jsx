import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import { getAdmin } from '../redux/api/admin'
import { getRecruiter } from '../redux/api/recruiter'
import { getCandidate } from '../redux/api/candidate'
const Home = () => {
  const { currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    if (currentUser) {
      // call api get info depend on role
      switch (currentUser.role) {
        case 'admin':
          getAdmin(currentUser.id, dispatch)
          break
        case 'recruiter':
          getRecruiter(currentUser.id, dispatch)
          break
        case 'candidate':
          getCandidate(currentUser.id, dispatch)
          break
        default:
          break
      }
    }
  }, [currentUser])
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
