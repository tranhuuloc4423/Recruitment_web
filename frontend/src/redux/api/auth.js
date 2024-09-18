import axios from '../../axios'
import {
  signinFailed,
  signinSuccess,
  signinStart,
  signupFailed,
  signupSuccess,
  signupStart,
  setCurrentUser
} from '../slices/authSlice'
import { toast } from 'react-toastify'

export const signinUser = async (user, dispatch, navigate) => {
  dispatch(signinStart())
  try {
    const res = await axios.post('/user/signin', user)
    dispatch(signinSuccess(res.data))
    dispatch(signinSuccess(user))
    // console.log(res.data.)
    // dispatch(setCurrentUser(res.data.user))
    toast.success('Sign in Success!')
    localStorage.setItem('currentUser', JSON.stringify(res.data))
    navigate('/home/')
  } catch (error) {
    toast.error('Sign in Failed! ' + error)
    dispatch(signinFailed())
  }
}

export const signupUser = async (user, dispatch, navigate) => {
  dispatch(signupStart())
  try {
    await axios.post('/auth/signup', user)
    dispatch(signupSuccess())
    toast.success('Sign up Success!')
    navigate('/signin')
  } catch (error) {
    toast.error('Sign up Failed!')
    dispatch(signupFailed())
  }
}

export const changePassword = async (id, newpass, navigate) => {
  try {
    await axios.put(`/user/${id}/`, newpass)
    toast.success('Change Password Success!')
    navigate('/signin')
  } catch (error) {
    toast.error('Change password Failed!')
  }
}
