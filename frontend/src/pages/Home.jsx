import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import ChatBox from '../components/ChatBox'
const Home = () => {
  const { currentRole } = useSelector((state) => state.app)
  useEffect(() => {
    // if (currentRole) {
    //   // console.log(currentRole)
    // }
  }, [currentRole])
  return (
    <div className="bg-[#f0f0f0]">
      <Header />
      <div className="py-4 pb-8 px-4 md:px-20 lg:px-40 mx-auto min-h-screen">
        <Outlet />
        <ChatBox />
      </div>
      <Footer />
    </div>
  )
}

export default Home
