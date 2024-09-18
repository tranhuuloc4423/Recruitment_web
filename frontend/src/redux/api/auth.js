import axios from '../../axios'
import {
  signinFailed,
  signinSuccess,
  signinStart,
  signupFailed,
  signupSuccess,
  signupStart
} from '../slices/authSlice'
import { toast } from 'react-toastify'

export const signinUser = async (user, dispatch, navigate) => {
  dispatch(signinStart())
  try {
    const res = await axios.post('/auth/signin', user)
    dispatch(signinSuccess(res.data))
    dispatch(signinSuccess(user))
    toast.success('Sign in Success!')
    localStorage.setItem('currentUser', JSON.stringify(user))
    navigate('/home/dashboard')
  } catch (error) {
    toast.error('Sign in Failed!')
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
    await axios.post(`/user/${id}/change-password`, newpass)
    toast.success('Change Password Success!')
    navigate('/signin')
  } catch (error) {
    toast.error('Change password Failed!')
  }
}
