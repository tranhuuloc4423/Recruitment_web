import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
const Home = () => {
  const { currentRole } = useSelector((state) => state.app)
  useEffect(() => {
    if (currentRole) {
      console.log(currentRole)
    }
  }, [currentRole])
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
