import { Routes, Route, useNavigate } from 'react-router-dom'
import paths from './utils/paths'
import { Home, Signin, Signup } from './pages'
import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'

const { HOME, SIGNIN, SIGNUP } = paths

function App() {
  const navigate = useNavigate()
  // const dispatch = useDispatch()
  useEffect(() => {
    navigate('/signin')
  }, [])
  return (
    <div className="">
      <Routes>
        <Route path={SIGNIN} element={<Signin />} />
        <Route path={SIGNUP} element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
