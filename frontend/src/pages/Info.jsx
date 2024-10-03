import { useSelector } from 'react-redux'
import Nav from '../components/Nav'
import paths from '../utils/paths'
import { Outlet } from 'react-router-dom'

const { INFO } = paths

const candidateNavInfo = [
  {
    name: 'Hồ sơ',
    path: '/' + INFO + '/',
    active: true,
    id: 0
  },
  {
    name: 'CV',
    path: '/' + INFO + '/cv',
    active: false,
    id: 1
  },
  {
    name: 'Tiêu chí',
    path: '/' + INFO + '/targets',
    active: false,
    id: 2
  }
]

const Info = () => {
  const { currentUser } = useSelector((state) => state.auth)

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
