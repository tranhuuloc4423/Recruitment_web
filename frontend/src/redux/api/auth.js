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
    const res = await axios.post('/user/signin', user)
    dispatch(signinSuccess(res.data?.user))
    toast.success('Đăng nhập thành công')
    navigate('/home/')
  } catch (error) {
    toast.error('Đăng nhập thất bại! Lỗi : ' + error)
    dispatch(signinFailed())
  }
}

export const signupUser = async (user, dispatch, navigate) => {
  dispatch(signupStart())
  try {
    await axios.post('/user/signup', user)
    dispatch(signupSuccess())
    toast.success('Đăng ký tài khoản thành công!')
    navigate('/signin')
  } catch (error) {
    toast.error('Đăng ký tài khoản thất bại! Lỗi :' + error)
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
