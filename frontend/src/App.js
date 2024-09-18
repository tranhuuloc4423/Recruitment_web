import { Routes, Route, useNavigate } from 'react-router-dom'
import paths from './utils/paths'
import { Home, Signin, Signup } from './pages'
import { useEffect } from 'react'
import { Bounce, ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { setCurrentUser } from './redux/slices/authSlice'

const { HOME, SIGNIN, SIGNUP } = paths

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.auth)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    if (user) {
      dispatch(setCurrentUser(user))
    }
    if (currentUser?.email === null && currentUser?.password === null) {
      navigate('/signin')
    } else {
      navigate('/home')
    }
  }, [currentUser])
  return (
    <div className="">
      <Routes>
        <Route path={SIGNIN} element={<Signin />} />
        <Route path={SIGNUP} element={<Signup />} />
        <Route path={HOME} element={<Home />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  )
}

export default App
