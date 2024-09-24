import { Routes, Route, useNavigate } from 'react-router-dom'
import paths from './utils/paths'
import { Home, Signin, Signup, Settings, Posts, Info } from './pages'
import { useEffect } from 'react'
import { Bounce, ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { setCurrentUser } from './redux/slices/authSlice'

const {
  HOME,
  SIGNIN,
  SIGNUP,
  SETTINGS,
  ADMIN,
  RECRUITER,
  CANDIDATE,
  INFO,
  POSTS
} = paths

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.auth)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    if (user) {
      dispatch(setCurrentUser(user))
    }

    if (user === null) {
      navigate(SIGNIN)
    } else {
      switch (user?.role) {
        case ADMIN:
          navigate(HOME + '/' + ADMIN)
          break
        case RECRUITER:
          navigate(HOME + '/' + RECRUITER)
          break
        case CANDIDATE:
          navigate(HOME + '/' + CANDIDATE + '/' + POSTS)
        default:
          break
      }
    }
  }, [])

  return (
    <div className="">
      <Routes>
        <Route path={SIGNIN} element={<Signin />} />
        <Route path={SIGNUP} element={<Signup />} />
        <Route path={HOME} element={<Home />}>
          <Route path={ADMIN}>
            <Route path={POSTS} element={<Posts />} />
            <Route path={SETTINGS} element={<Settings />} />
            <Route path={INFO} element={<Info />} />
          </Route>
          <Route path={RECRUITER}>
            {/* <Route path={POSTS} element={<Settings />} /> */}
            {/* <Route path={SETTINGS} element={<Settings />} />
            <Route path={INFO} element={<Info />} /> */}
          </Route>
          <Route path={CANDIDATE}>
            <Route path={POSTS} element={<Posts />} />
            <Route path={SETTINGS} element={<Settings />} />
            <Route path={INFO} element={<Info />} />
          </Route>
        </Route>
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
