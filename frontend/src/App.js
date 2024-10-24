import { Routes, Route, useNavigate } from 'react-router-dom'
import paths from './utils/paths'
import {
  Home,
  Signin,
  Signup,
  Settings,
  Main,
  Info,
  CVprofile,
  Target,
  InfoProfile,
  Manage,
  Posteds,
  ConfirmedPosts,
  CheckPosts
} from './pages'
import { useEffect } from 'react'
import { Bounce, ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { setCurrentUser } from './redux/slices/authSlice'
import { getAddress, getById } from './redux/api/app'
import { CreatePost } from './components'

const {
  HOME,
  SIGNIN,
  SIGNUP,
  SETTINGS,
  INFO,
  POSTS,
  CV,
  TARGET,
  MANAGE,
  CREATEPOST,
  CONFIRMPOST,
  CHECKPOST,
  POSTED
} = paths

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const { currentUser } = useSelector((state) => state.auth)

  const fetchRoleData = async (user) => {
    await getById(user._id, dispatch, user.role)
    await getAddress(dispatch)
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    if (user) {
      dispatch(setCurrentUser(user))
    }

    if (user === null) {
      navigate(SIGNIN)
    } else {
      fetchRoleData(user)
      navigate(HOME + '/' + POSTS)
    }
  }, [])

  return (
    <div className="">
      <Routes>
        <Route path={SIGNIN} element={<Signin />} />
        <Route path={SIGNUP} element={<Signup />} />
        <Route path={HOME} element={<Home />}>
          <Route path={POSTS} element={<Main />} />
          <Route path={SETTINGS} element={<Settings />} />
          <Route path={INFO} element={<Info />}>
            <Route path={''} element={<InfoProfile />} />
            <Route path={CV} element={<CVprofile />} />
            <Route path={TARGET} element={<Target />} />
          </Route>
          <Route path={MANAGE} element={<Manage />}>
            <Route path={''} element={<Posteds />} />
            <Route path={CONFIRMPOST} element={<ConfirmedPosts />} />
            <Route path={CHECKPOST} element={<CheckPosts />} />
            <Route path={CREATEPOST} element={<CreatePost />} />
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
