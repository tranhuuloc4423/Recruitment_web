import { useSelector } from 'react-redux'
import Nav from '../components/Nav'
import { Outlet } from 'react-router-dom'
import { candidateNavInfo } from '../utils/nav'
import { useEffect } from 'react'
const Info = () => {
  const { currentUser } = useSelector((state) => state.auth)
  const { currentRole } = useSelector((state) => state.app)

  useEffect(() => {}, [currentRole])

  return (
    <div className="flex flex-col gap-4">
      {currentUser.role === 'candidate' && <Nav data={candidateNavInfo} />}
      <div className="flex flex-row gap-4">
        <Outlet />
      </div>
    </div>
  )
}

export default Info
