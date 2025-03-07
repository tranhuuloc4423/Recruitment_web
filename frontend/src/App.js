import { Routes, Route, useNavigate } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
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
  CheckPosts,
  RecentPosts,
  SavedPosts,
  AppliedPosts,
  Recruiter
} from './pages'
import { useEffect } from 'react'
import { Bounce, ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { setCurrentUser } from './redux/slices/authSlice'
import { getAddress, getById, getSkills } from './redux/api/app'
import { CreatePost } from './components'
import ManagePostApplied from './pages/ManagePostApplied'
import CustomToast from './components/CustomToast'

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
  POSTED,
  SAVEDPOSTS,
  RECENTPOSTS,
  APPLIEDPOSTS,
  COMPANY,
  MANAGEAPPLIED
} = paths

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.auth)

  const handleBack = () => alert('Quay lại')
  const handleConfirm = () => alert('Xác nhận')

  const fetchRoleData = async (user) => {
    if (user) {
      await getById(user._id, dispatch, user.role)
    }
    await getAddress(dispatch)
    await getSkills(dispatch)
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    if (user) {
      dispatch(setCurrentUser(user))
    }

    if (user === null) {
      // navigate(SIGNIN)
      navigate(HOME + '/' + POSTS)
    } else {
      navigate(HOME + '/' + POSTS)
    }
    fetchRoleData(user)
  }, [])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        <Route path={SIGNIN} element={<Signin />} />
        <Route path={SIGNUP} element={<Signup />} />
        <Route path={HOME} element={<Home />}>
          <Route path={POSTS} element={<Main />} />
          <Route path={SETTINGS} element={<Settings />} />
          <Route path={`${COMPANY}/:type/:id`} element={<Recruiter />} />
          <Route path={INFO} element={<Info />}>
            <Route path={''} element={<InfoProfile />} />
            <Route path={CV} element={<CVprofile />} />
            <Route path={TARGET} element={<Target />} />
          </Route>
          <Route path={MANAGEAPPLIED} element={<ManagePostApplied />} />
          <Route path={MANAGE} element={<Manage />}>
            <Route
              path={''}
              element={
                currentUser === 'candidate' ? <SavedPosts /> : <Posteds />
              }
            />
            <Route path={CONFIRMPOST} element={<ConfirmedPosts />} />
            <Route path={CHECKPOST} element={<CheckPosts />} />
            <Route path={CREATEPOST} element={<CreatePost />} />
            <Route path={APPLIEDPOSTS} element={<AppliedPosts />} />
            <Route path={RECENTPOSTS} element={<RecentPosts />} />
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
    </LocalizationProvider>
  )
}

export default App
